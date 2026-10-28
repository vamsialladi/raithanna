import { useState } from 'react'
import LanguagePicker from '../LanguagePicker.jsx'
import SidebarResizeHandle from '../SidebarResizeHandle.jsx'
import notificationBell from '../../notification-bell.png'
import { translateDashboard as translate } from '../../../dashboardTranslations.js'

const navigation = [
  { section: '', items: [['Dashboard'], ['My Profile']] },
  {
    section: 'FARM MANAGEMENT',
    items: [
      ['My Farms & Land'],
      ['Crops & Soil'],
      ['Livestock & Dairy'],
      ['Poultry & Aquaculture'],
      ['Alternative Farming'],
    ],
  },
  {
    section: 'RESOURCES & OPERATIONS',
    items: [
      ['Labour & Machinery'],
      ['Water & Irrigation'],
      ['Weather & Alerts'],
      ['Inventory & Supplies'],
      ['Processing & Waste'],
    ],
  },
  {
    section: 'MARKET & FINANCE',
    items: [
      ['Marketplace & Orders'],
      ['Finance & Insurance'],
      ['Government Schemes'],
      ['Expert Support'],
      ['Community & Learning'],
      ['Smart Farming (IoT)'],
    ],
  },
  {
    section: 'REPORTS & SETTINGS',
    items: [
      ['Reports & Analytics'],
      ['Notifications'],
      ['Help & Support'],
    ],
  },
]

const navigationIcons = {
  Dashboard: '',
  'My Profile': '',
  'My Farms & Land': '',
  'Crops & Soil': '',
  'Livestock & Dairy': '',
  'Poultry & Aquaculture': '',
  'Alternative Farming': '',
  'Labour & Machinery': '',
  'Water & Irrigation': '',
  'Weather & Alerts': '',
  'Inventory & Supplies': '',
  'Processing & Waste': '',
  'Marketplace & Orders': '',
  'Finance & Insurance': '',
  'Government Schemes': '',
  'Expert Support': '',
  'Community & Learning': '',
  'Smart Farming (IoT)': '',
  'Reports & Analytics': '',
  Notifications: '',
  'Help & Support': '',
  'settings': '',
}

const farms = [
  {
    name: 'Main Farm',
    location: 'Rangareddy, Telangana',
    area: '5.0 Acres',
    crops: '3 Active Crops',
    image: 'photo-1500382017468-9049fed747ef',
  },
  {
    name: 'Chilli Farm',
    location: 'Nalgonda, Telangana',
    area: '4.0 Acres',
    crops: '1 Active Crop',
    image: 'photo-1518977676601-b53f82aba655',
  },
  {
    name: 'Vegetable Plot',
    location: 'Hyderabad, Telangana',
    area: '3.5 Acres',
    crops: '1 Active Crop',
    image: 'photo-1500937386664-56d1dfefc4f3',
  },
]

const tasks = [
  ['Irrigate paddy field (Farm 1)', 'Today, 09:00 AM', 'High'],
  ['Apply fertilizer to chilli crop', 'Today, 11:00 AM', 'Medium'],
  ['Check livestock feed', 'Today, 04:00 PM', 'Low'],
  ['Update inventory stock', 'Today, 06:00 PM', 'Low'],
]

function Icon({ children, className = '' }) {
  return (
    <span aria-hidden="true" className={`farmer-icon ${className}`}>
      {children}
    </span>
  )
}

function DashboardCard({ title, children, action = 'View All', className = '', t }) {
  return (
    <section className={`farmer-card ${className}`}>
      <div className="farmer-card__header">
        <h2>{t(title)}</h2>
        {typeof action === 'string' ? (
          <button type="button" className="farmer-link">{t(action)} →</button>
        ) : (
          action
        )}
      </div>
      {children}
    </section>
  )
}

function Farmer({ language, onLanguageChange, onNavigateRole, onLogout, userName = 'User' }) {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [farmTab, setFarmTab] = useState('Farms')
  const [period, setPeriod] = useState('6 Months')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(270)
  const t = (text) => translate(language, text)

  return (
    <main
      className="farmer-dashboard"
      style={{ '--dashboard-sidebar-width': `${sidebarWidth}px` }}
    >
      <aside className={`farmer-sidebar${sidebarOpen ? ' is-open' : ''}`}>
        <a className="farmer-brand" href="#farmer-dashboard" aria-label={`Raithanna ${t('Dashboard')}`}>
          <span className="farmer-brand__leaf">❧</span>
          <span>
            <strong>Raithanna</strong>
            <small>{t('Farmers Today, Brighter Tomorrow')}</small>
          </span>
        </a>
        <nav className="farmer-navigation" aria-label={`${t('Farmer')} ${t('Dashboard')}`}>
          {navigation.map((group) => (
            <div className="farmer-navigation__group" key={group.section || 'main'}>
              {group.section && <h2>{t(group.section)}</h2>}
              {group.items.map(([label]) => (
                <button
                  type="button"
                  key={label}
                  aria-current={activeNav === label ? 'page' : undefined}
                  className={`farmer-navigation__item${activeNav === label ? ' is-active' : ''}`}
                  onClick={() => {
                    setActiveNav(label)
                    setSidebarOpen(false)
                    if (label === 'Dashboard') {
                      document.getElementById('farmer-dashboard')?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  <Icon>{navigationIcons[label] ?? '•'}</Icon>
                  <span>{t(label)}</span>
                  {label === 'Notifications' && <b className="farmer-notification-count">3</b>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <button type="button" className="farmer-logout" onClick={onLogout}>
          <Icon>↪</Icon> {t('Logout')}
        </button>
      </aside>
      <SidebarResizeHandle
        width={sidebarWidth}
        onWidthChange={setSidebarWidth}
        label={t('Resize sidebar')}
      />

      {sidebarOpen && (
        <button
          type="button"
          className="farmer-sidebar-backdrop"
          aria-label={t('Close dashboard navigation')}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="farmer-main">
        <header className="farmer-topbar">
          <button
            type="button"
            className="farmer-menu-button"
            aria-label={t(sidebarOpen ? 'Close dashboard menu' : 'Open dashboard menu')}
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((open) => !open)}
          >
            ☰
          </button>
          <label className="farmer-search">
            <Icon>⌕</Icon>
            <input aria-label={t('Search dashboard')} placeholder={t('Search anything (crops, loans, buyers, schemes...)')} />
          </label>
          <nav className="farmer-role-shortcuts" aria-label={t('Switch dashboard')}>
            {['Buyer', 'Service Provider', 'Landlord Farmer'].map((role) => (
              <button type="button" key={role} onClick={() => onNavigateRole(role)}>
                {t(role)}
              </button>
            ))}
          </nav>
          <div className="farmer-topbar__actions">
            <LanguagePicker language={language} onLanguageChange={onLanguageChange} compact />
            <button type="button" className="farmer-bell" aria-label={t('Notifications')}>
              <img src={notificationBell} alt="" aria-hidden="true" />
            </button>
            <div className="farmer-profile-menu">
              <button
                type="button"
                className="farmer-profile"
                aria-expanded={profileMenuOpen}
                aria-haspopup="menu"
                onClick={() => setProfileMenuOpen((open) => !open)}
              >
                <span className="farmer-profile__avatar">{userName.charAt(0).toUpperCase()}</span>
                <span><strong>{userName}</strong><small>{t('Farmer')}</small></span>
                <span aria-hidden="true">⌄</span>
              </button>
              {profileMenuOpen && (
                <div className="farmer-profile-dropdown" role="menu">
                  <div className="farmer-profile-dropdown__identity">
                    <strong>{userName}</strong>
                    <span>{t('Farmer')}</span>
                  </div>
                  <button type="button" role="menuitem" onClick={onLogout}>
                    <Icon>↪</Icon> {t('Logout')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div
          className="farmer-content"
          id="farmer-dashboard"
          hidden={activeNav !== 'Dashboard'}
        >
          <section className="farmer-welcome">
            <div>
              <span>{t('Welcome back,')}</span>
              <h1>{userName} <span aria-hidden="true"></span></h1>
              <p>{t('Good farming today for a brighter tomorrow!')}</p>
            </div>
            <div className="farmer-welcome__motto">
              <span>🌱</span>
              <p>{t('Healthy Farms')}<br />{t('Healthy Farmers')}<br />{t('Healthy Future™')}</p>
            </div>
          </section>

          <section className="farmer-stat-grid" aria-label={t('Farm summary')}>
            <article className="farmer-stat farmer-stat--green">
              <span>{t('Total Farms')}</span><strong>3</strong><small>{t('12.5 Acres')}</small>
            </article>
            <article className="farmer-stat farmer-stat--mint">
              <span>{t('Active Crops')}</span><strong>5</strong><small>{t('Paddy, Chilli, Tomato...')}</small>
            </article>
            <article className="farmer-stat farmer-stat--yellow">
              <span>{t('Livestock')}</span><strong>8</strong><small>{t('6 Cows, 2 Goats')}</small>
            </article>
            <article className="farmer-stat farmer-stat--blue">
              <span>{t('Total Inventory')}</span><strong>24</strong><small>{t('Seeds, Fertilizers, Feed...')}</small>
            </article>
            <article className="farmer-stat farmer-stat--purple">
              <span>{t('Pending Tasks')}</span><strong>6</strong><small>{t('View Details')}</small>
            </article>
          </section>

          <div className="farmer-dashboard-grid">
            <DashboardCard title="Farm Overview" className="farmer-farms-card" t={t}>
              <div className="farmer-tabs" role="tablist" aria-label={t('Farm Overview')}>
                {['Farms', 'Crops', 'Livestock', 'Inventory'].map((tab) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={farmTab === tab}
                    className={farmTab === tab ? 'is-selected' : ''}
                    key={tab}
                    onClick={() => setFarmTab(tab)}
                  >
                    {tab === 'Farms' ? '♧' : tab === 'Crops' ? '❧' : tab === 'Livestock' ? '♞' : '▤'} {t(tab)}
                  </button>
                ))}
              </div>
              <div className="farmer-farm-list">
                {farms.map((farm) => (
                  <article className="farmer-farm" key={farm.name}>
                    <div
                      className="farmer-farm__image"
                      style={{
                        backgroundImage: `url(https://images.unsplash.com/${farm.image}?auto=format&fit=crop&w=240&q=80)`,
                      }}
                    />
                    <div className="farmer-farm__details">
                      <strong>{t(farm.name)}</strong>
                      <span>⌖ {t(farm.location)}</span>
                      <span>♧ {t(farm.area)}</span>
                    </div>
                    <span className="farmer-crop-badge">{t(farm.crops)}</span>
                    <span className="farmer-farm__arrow">›</span>
                  </article>
                ))}
              </div>
            </DashboardCard>

            <div className="farmer-middle-column">
              <DashboardCard title="Crop Status" action={null} t={t}>
                <div className="farmer-crop-chart">
                  <div className="farmer-donut"><strong>5<small>{t('Active Crops')}</small></strong></div>
                  <ul>
                    <li><i className="dot dot--green" />{t('Paddy')} <span>40%</span></li>
                    <li><i className="dot dot--red" />{t('Chilli')} <span>20%</span></li>
                    <li><i className="dot dot--orange" />{t('Tomato')} <span>20%</span></li>
                    <li><i className="dot dot--yellow" />{t('Groundnut')} <span>10%</span></li>
                    <li><i className="dot dot--gray" />{t('Others')} <span>10%</span></li>
                  </ul>
                </div>
              </DashboardCard>

              <DashboardCard
                title="Production & Sales"
                t={t}
                action={
                  <select aria-label={t('Production & Sales')} value={period} onChange={(event) => setPeriod(event.target.value)}>
                    <option value="6 Months">{t('6 Months')}</option>
                    <option value="12 Months">{t('12 Months')}</option>
                  </select>
                }
              >
                <div className="farmer-sales-chart">
                  <div className="farmer-chart-legend"><span>■ {t('Production (kg)')}</span><span>■ {t('Sales (kg)')}</span></div>
                  <div className="farmer-bar-chart">
                    {[['Jan', 42], ['Feb', 49], ['Mar', 53], ['Apr', 58], ['May', 82], ['Jun', 65]].map(([month, height]) => (
                      <div className="farmer-bar-group" key={month}>
                        <div className="farmer-bars"><i style={{ height: `${height}%` }} /><i style={{ height: `${height * 0.72}%` }} /></div>
                        <span>{t(month)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </DashboardCard>
            </div>

            <div className="farmer-right-column">
              <DashboardCard title="Weather & Alerts" t={t}>
                <div className="farmer-weather">
                  <span className="farmer-weather__icon">🌤️</span>
                  <div><strong>28°C</strong><span>{t('Partly Cloudy')}</span><small>⌖ {t('Hyderabad, Telangana')}</small></div>
                </div>
                <div className="farmer-weather-stats">
                  <span>💧 62%<small>{t('Humidity')}</small></span>
                  <span>≋ 12 km/h<small>{t('Wind')}</small></span>
                  <span>☀ 31°C<small>{t('Max')}</small></span>
                  <span>◐ 24°C<small>{t('Min')}</small></span>
                </div>
                <div className="farmer-irrigation"><strong>✓ {t('Good condition for irrigation')}</strong><span>{t('Suitable for paddy and vegetables.')}</span></div>
              </DashboardCard>

              <DashboardCard title="Today's Tasks" t={t}>
                <ul className="farmer-task-list">
                  {tasks.map(([task, time, priority]) => (
                    <li key={task}>
                      <input type="checkbox" aria-label={`${t('Mark task complete')}: ${t(task)}`} />
                      <span>{t(task)}<small>{t(time)}</small></span>
                      <b className={`priority priority--${priority.toLowerCase()}`}>{t(priority)}</b>
                    </li>
                  ))}
                </ul>
              </DashboardCard>
            </div>

            <DashboardCard title="Recent Activities" className="farmer-activity-card" t={t}>
              <ul className="farmer-activity-list">
                <li><span>▣</span><p>{t('1 ton paddy listed in marketplace')}<small>{t('2 hours ago')}</small></p></li>
                <li><span>❧</span><p>{t('Fertilizer added to Farm 1')}<small>{t('5 hours ago')}</small></p></li>
                <li><span>♧</span><p>{t('Milk record updated (6 litres)')}<small>{t('1 day ago')}</small></p></li>
                <li><span>₹</span><p>{t('Expense recorded - Seeds (₹2,500)')}<small>{t('1 day ago')}</small></p></li>
              </ul>
            </DashboardCard>

            <DashboardCard title="Market Prices (Today)" className="farmer-market-card" t={t}>
              <div className="farmer-market-grid">
                {[
                  ['🌾', 'Paddy', '₹2,180 / Qt', '2.3%', 'up'],
                  ['🍅', 'Tomato', '₹32 / kg', '5.1%', 'down'],
                  ['🥬', 'Green Chilli', '₹48 / kg', '3.4%', 'up'],
                  ['🥛', 'Milk', '₹52 / litre', '1.9%', 'up'],
                ].map(([emoji, name, price, change, direction]) => (
                  <article className="farmer-market-item" key={name}>
                    <span className="farmer-market-item__image">{emoji}</span>
                    <strong>{t(name)}</strong><b>{t(price)}</b>
                    <small className={`market-${direction}`}>{direction === 'up' ? '↑' : '↓'} {change}</small>
                  </article>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard title="Quick Actions" className="farmer-quick-card" action={null} t={t}>
              <div className="farmer-quick-grid">
                {[
                  ['❧', 'Add Crop', 'green'],
                  ['♞', 'Add Livestock', 'orange'],
                  ['₹', 'Add Expense', 'yellow'],
                  ['▣', 'List Produce', 'green'],
                  ['⚙', 'Book Service', 'blue'],
                  ['⚑', 'Check Schemes', 'blue'],
                  ['♙', 'Ask Expert', 'blue'],
                  ['▥', 'View Reports', 'blue'],
                ].map(([icon, label, color]) => (
                  <button className={`farmer-quick-action farmer-quick-action--${color}`} type="button" key={label}>
                    <Icon>{icon}</Icon><span>{t(label)}</span>
                  </button>
                ))}
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Farmer

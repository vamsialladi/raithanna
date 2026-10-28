import { useState } from 'react'
import LanguagePicker from '../LanguagePicker.jsx'
import { translateDashboard as translate } from '../../../dashboardTranslations.js'

const dashboardContent = {
  'Landlord Farmer': {
    welcome: 'Manage your land with confidence.',
    stats: [
      ['Listed Lands', '4', 'Across 2 districts'],
      ['Active Leases', '3', '2 renewals upcoming'],
      ['Total Area', '18.5', 'Acres listed'],
      ['Monthly Income', '₹42,000', 'From active leases'],
    ],
    sections: [
      ['My Land Listings', 'Manage land details, availability and lease offers.'],
      ['Lease Requests', 'Review applications from tenant farmers.'],
      ['Payments & Agreements', 'Track rent, agreements and upcoming renewals.'],
    ],
  },
  'Tenant Farmer': {
    welcome: 'Find land and grow your farm.',
    stats: [
      ['My Leased Farms', '2', '8.5 Acres in total'],
      ['Active Crops', '4', 'Across your farms'],
      ['Lease Renewals', '1', 'Due this season'],
      ['Pending Requests', '2', 'Waiting for a response'],
    ],
    sections: [
      ['Find Farmland', 'Browse available land and send lease requests.'],
      ['My Leases', 'View lease terms, land details and renewal dates.'],
      ['Crop Planning', 'Plan crops for your leased farmland.'],
    ],
  },
  Buyer: {
    welcome: 'Find fresh produce from local farms.',
    stats: [
      ['Open Orders', '6', '2 awaiting confirmation'],
      ['Nearby Farms', '18', 'Producers in your area'],
      ['Saved Produce', '9', 'Items on your list'],
      ['Completed Orders', '24', 'This season'],
    ],
    sections: [
      ['Browse Produce', 'Explore fresh crops available from nearby farmers.'],
      ['My Orders', 'Track new, active and completed orders.'],
      ['Farm Suppliers', 'Connect with farms and save preferred suppliers.'],
    ],
  },
  'Service Provider': {
    welcome: 'Connect your services with local farms.',
    stats: [
      ['Service Listings', '5', 'Currently available'],
      ['New Requests', '8', '3 need your response'],
      ['Scheduled Jobs', '4', 'Coming up this week'],
      ['Completed Jobs', '32', 'Customer rating 4.8'],
    ],
    sections: [
      ['My Services', 'Manage machinery, labour and agricultural services.'],
      ['Service Requests', 'Review requests and respond to farmers.'],
      ['Schedule & Earnings', 'Track upcoming jobs and completed work.'],
    ],
  },
}

function RoleDashboard({ role, language, onLanguageChange, onLogout, userName = 'User' }) {
  const [activeSection, setActiveSection] = useState('Dashboard')
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const t = (text) => translate(language, text)
  const content = dashboardContent[role]
  const sections = ['Dashboard', ...content.sections.map(([title]) => title)]

  return (
    <main className="role-dashboard">
      <aside className="role-dashboard__sidebar">
        <a className="role-dashboard__brand" href="/">
          <span aria-hidden="true">❧</span>
          <span>
            <strong>Raithanna</strong>
            <small>{t('Farmers Today, Brighter Tomorrow')}</small>
          </span>
        </a>
        <nav aria-label={`${t(role)} ${t('Dashboard')}`}>
          {sections.map((section, index) => (
            <button
              type="button"
              key={section}
              aria-current={activeSection === section ? 'page' : undefined}
              className={activeSection === section ? 'is-active' : ''}
              onClick={() => setActiveSection(section)}
            >
              <span aria-hidden="true">{index === 0 ? '▦' : ['❧', '▤', '◈'][index - 1]}</span>
              {t(section)}
            </button>
          ))}
        </nav>
        <button type="button" className="role-dashboard__logout" onClick={onLogout}>
          ↪ {t('Log out')}
        </button>
      </aside>

      <section className="role-dashboard__main">
        <header className="role-dashboard__topbar">
          <label aria-label={t('Search dashboard')}>
            <span aria-hidden="true">⌕</span>
            <input aria-label={t('Search dashboard')} placeholder={t('Search Raithanna...')} />
          </label>
          <div className="role-dashboard__actions">
            <LanguagePicker language={language} onLanguageChange={onLanguageChange} />
            <div className="role-dashboard__profile">
            <button
              type="button"
              className="role-dashboard__user"
              aria-expanded={profileMenuOpen}
              aria-haspopup="menu"
              onClick={() => setProfileMenuOpen((open) => !open)}
            >
              <span aria-hidden="true">C</span>
              <div><strong>{userName}</strong><small>{t(role)}</small></div>
              <span aria-hidden="true">⌄</span>
            </button>
            {profileMenuOpen && (
              <div className="role-dashboard__profile-menu" role="menu">
                <strong>{userName}</strong>
                <small>{t(role)}</small>
                <button type="button" role="menuitem" onClick={onLogout}>↪ {t('Log out')}</button>
              </div>
            )}
            </div>
          </div>
        </header>

        <div className="role-dashboard__content">
          <div className="role-dashboard__welcome">
            <span>{t('Welcome back,')} {userName}</span>
            <h1>{t(role)} {t('Dashboard')}</h1>
            <p>{t(content.welcome)}</p>
          </div>

          <div className="role-dashboard__stats">
            {content.stats.map(([label, value, note]) => (
              <article key={label}>
                <span>{t(label)}</span>
                <strong>{value}</strong>
                <small>{t(note)}</small>
              </article>
            ))}
          </div>

          <div className="role-dashboard__section-heading">
            <h2>{activeSection === 'Dashboard' ? t('Your workspace') : t(activeSection)}</h2>
            <span>{t('Updated just now')}</span>
          </div>
          <div className="role-dashboard__cards">
            {content.sections.map(([title, description], index) => (
              <article key={title}>
                <span className="role-dashboard__card-icon" aria-hidden="true">
                  {['❧', '▤', '◈'][index]}
                </span>
                <h3>{t(title)}</h3>
                <p>{t(description)}</p>
                <button type="button" onClick={() => setActiveSection(title)}>
                  {t('Open')} {t(title)} <span aria-hidden="true">→</span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default RoleDashboard

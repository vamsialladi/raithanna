import { useState } from 'react'

const navigation = [
  ['home', 'Dashboard', 'active'],
  ['leaf', 'My Services'],
  ['calendar', 'Bookings', '3'],
  ['tools', 'Equipment & Tools'],
  ['request', 'Service Requests', '5'],
  ['wallet', 'Earnings & Payments'],
  ['star', 'Reviews & Ratings'],
  ['message', 'Messages', '2'],
  ['settings', 'Profile & Settings'],
]

const categories = [
  ['leaf', 'Soil Testing', '& Analysis', 'green'],
  ['fertilizer', 'Fertilizer &', 'Input Supply', 'sand'],
  ['tractor', 'Farm Machinery', 'Rental', 'blue'],
  ['water', 'Irrigation &', 'Water Management', 'sky'],
  ['pest', 'Pest & Disease', 'Control', 'rose'],
  ['people', 'Harvesting &', 'Labor Support', 'cyan'],
  ['chat', 'Consultation', '& Advisory', 'teal'],
]

const schedule = [
  ['leaf', 'Soil Testing Service', 'Raman Reddy Farm, Medak', '08:00 AM - 10:00 AM', 'Upcoming', 'green'],
  ['fertilizer', 'Fertilizer Application', 'Srinivas Farm, Sangareddy', '11:00 AM - 01:00 PM', 'Upcoming', 'green'],
  ['tractor', 'Machinery Rental (Rotavator)', 'Anil Kumar Farm, Vikarabad', '03:00 PM - 05:00 PM', 'Confirmed', 'blue'],
  ['people', 'Farm Consultation', 'Lakshmi Farm, Medak', '06:00 PM - 07:00 PM', 'Upcoming', 'green'],
]

const requests = [
  ['fertilizer', 'Soil Testing & Analysis', 'Raman Reddy Farm · Medak', 'Apr 25, 2025 · 10:00 AM', 'Pending', 'orange'],
  ['pest', 'Pest Control (Organic)', 'Srinivas Farm · Sangareddy', 'Apr 25, 2025 · 02:30 PM', 'Confirmed', 'green'],
  ['tractor', 'Tractor Rental', 'Anil Kumar Farm · Vikarabad', 'Apr 26, 2025 · 09:00 AM', 'Confirmed', 'green'],
  ['water', 'Irrigation Setup', 'Lakshmi Farm · Medak', 'Apr 26, 2025 · 04:00 PM', 'Pending', 'orange'],
]

const messages = [
  ['RK', 'Ravi Kumar', 'Soil testing report is ready...', '2h ago', 'green'],
  ['LD', 'Lakshmi Devi', 'Can you come tomorrow...', '4h ago', 'orange'],
  ['AR', 'Anil Reddy', 'Thanks for the service!', '5h ago', 'blue'],
  ['S', 'Srinivas', 'Payment is successful.', '6h ago', 'green'],
]

function Icon({ name, size = 20 }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
    leaf: <><path d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-6 10-16Z" /><path d="M4 21c3-5 7-8 12-11" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h2M14 14h2M8 17h2" /></>,
    tools: <><path d="m14 7 3-3 4 4-3 3M5 19l9-9M4 8l4-4 4 4-4 4ZM14 16l4-4 4 4-4 4Z" /></>,
    request: <><path d="M4 20 9 7l4 4-9 9ZM9 7l3-3 7 7-3 3M14 13l6 7" /><path d="m17 5 2-2" /></>,
    wallet: <><rect x="3" y="5" width="18" height="15" rx="2" /><path d="M3 9h18M16 14h2M7 3h10" /></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
    message: <><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.6 9.6 0 0 1-4-.9L3 21l1.8-4.3A8 8 0 1 1 21 11.5Z" /><path d="M8 11h.01M12 11h.01M16 11h.01" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.2 1-1.2 2.1-1.5-.6a8 8 0 0 1-1.5.9l-.3 1.6h-2.4l-.3-1.6a8 8 0 0 1-1.5-.9l-1.5.6-1.2-2.1 1.2-1a7 7 0 0 1 0-1.8l-1.2-1 1.2-2.1 1.5.6a8 8 0 0 1 1.5-.9l.3-1.6h2.4l.3 1.6a8 8 0 0 1 1.5.9l1.5-.6 1.2 2.1-1.2 1a7 7 0 0 1 0 1.8Z" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    tractor: <><path d="M3 17h15l2-5h-7l-2-5H6l-2 5H3z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /><path d="M11 7h3l2 5" /></>,
    fertilizer: <><path d="M8 3h8v3l2 2v12H6V8l2-2zM8 6h8M9 12h6M9 16h6" /></>,
    water: <path d="M12 3s-7 8-7 12a7 7 0 0 0 14 0c0-4-7-12-7-12Z" />,
    pest: <><path d="M12 3v18M5 7l14 10M19 7 5 17M4 12h16" /><circle cx="12" cy="12" r="7" /></>,
    people: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5v1" /></>,
    chat: <><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.6 9.6 0 0 1-4-.9L3 21l1.8-4.3A8 8 0 1 1 21 11.5Z" /><path d="M8 11h8" /></>,
    bag: <><path d="M5 8h14l1 12H4L5 8ZM9 8V6a3 3 0 0 1 6 0v2" /><path d="m8 13 2 2 5-5" /></>,
    rupee: <><path d="M6 4h12M6 8h12M6 4c8 0 8 8 0 8h2l8 8" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  }

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || paths.leaf}
    </svg>
  )
}

function CardTitle({ title, link = 'View All', children }) {
  return (
    <div className="flex min-h-[30px] items-center justify-between gap-1 px-2">
      <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-[10px] font-bold text-[#2c3b35]">{title}</h2>
      {children || <a className="flex shrink-0 items-center gap-0.5 whitespace-nowrap text-[8px] font-semibold text-[#24905b]" href="#overview">{link} <Icon name="arrow" size={12} /></a>}
    </div>
  )
}

function ServiceDashboard({ onLogout }) {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [activeCategory, setActiveCategory] = useState('')
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  return (
    <main className="flex min-h-screen bg-[#f7fbf9] font-sans text-xs text-[#23352b]" id="overview">
      <aside className="sticky top-0 hidden h-screen w-14 shrink-0 flex-col border-r border-[#e4efea] bg-gradient-to-b from-[#f8fffb] to-[#effaf5] p-2 md:flex lg:w-[198px] lg:px-2">
        <a className="mb-4 flex h-10 items-center justify-center gap-2 text-[#136b3c] lg:justify-start" href="#overview" aria-label="Raithanna home">
          <span className="grid h-[38px] w-[38px] shrink-0 rotate-[-18deg] place-items-center text-[#4aa74d]"><Icon name="leaf" size={30} /></span>
          <span className="hidden lg:block"><strong className="block whitespace-nowrap text-[19px] font-extrabold tracking-[-0.8px]">Raithanna</strong><small className="mt-px block whitespace-nowrap text-[8px] text-[#4e7760]">Farmers · Markets · Better Tomorrow</small></span>
        </a>
        <nav className="grid gap-[3px]" aria-label="Main navigation">
          {navigation.map(([icon, label, badge]) => (
            <a
              href={`#${label.toLowerCase().replaceAll(' ', '-')}`}
              className={`flex min-h-8 items-center justify-center gap-[11px] rounded-md px-2.5 text-[#344a3d] transition-colors hover:bg-[#e3f3e9] hover:text-[#12663a] lg:justify-start ${activeNav === label ? 'bg-gradient-to-r from-[#229451] to-[#158247] text-white shadow-sm hover:text-white' : ''}`}
              key={label}
              onClick={() => setActiveNav(label)}
            >
              <span className={activeNav === label ? 'text-white' : 'text-[#21814e]'}><Icon name={icon} size={19} /></span>
              <span className="hidden text-[10px] lg:inline">{label}</span>
              {badge && badge !== 'active' && <b className="ml-auto hidden h-[15px] w-[15px] place-items-center rounded-full bg-[#ed493e] text-[9px] text-white lg:grid">{badge}</b>}
            </a>
          ))}
        </nav>
        <article className="mt-auto hidden overflow-hidden rounded-lg border border-[#d5eee0] bg-[#eaf8f1] lg:block">
          <div className="relative flex h-[91px] items-end justify-around overflow-hidden bg-[radial-gradient(ellipse_at_70%_22%,#fff8cc_0_12%,transparent_13%),linear-gradient(180deg,#d6f4f3_0%,#e8f7e4_63%,#93c94b_64%,#277943_100%)] pb-1 before:absolute before:-inset-x-4 before:bottom-5 before:h-[34px] before:rounded-[50%_50%_0_0] before:bg-[#b7d96b] after:absolute after:-bottom-px after:left-[30px] after:right-[-28px] after:h-[30px] after:rounded-[50%_50%_0_0] after:bg-[#35804b] after:content-['']" aria-hidden="true"><span className="relative z-10 self-start text-2xl">🌱</span><span className="relative z-10 text-[38px] drop-shadow">🚜</span></div>
          <h2 className="mx-2.5 mt-2.5 text-xs font-bold leading-tight text-[#1b5838]">Empowering Farmers with Your Expertise</h2>
          <p className="mx-2.5 my-2 text-[9px] leading-relaxed text-[#61776a]">Provide trusted services, help farmers grow, become a better tomorrow.</p>
          <a className="mb-2.5 ml-2.5 inline-flex min-h-[23px] items-center gap-1 rounded bg-[#208b4e] px-2 text-[9px] font-bold text-white" href="#categories">List New Service <Icon name="arrow" size={14} /></a>
        </article>
      </aside>

      <section className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 flex min-h-12 items-center gap-2 border-b border-[#e5eee9] bg-white/95 px-2.5 backdrop-blur sm:gap-3 sm:px-4">
          <label className="flex h-[30px] w-auto min-w-0 flex-1 items-center gap-2 rounded-md border border-[#e3eaf0] bg-[#fbfcfe] px-2.5 text-[#78909a] sm:w-[min(445px,48%)] sm:flex-none">
            <Icon name="search" size={17} />
            <input className="w-full min-w-0 bg-transparent text-[9px] text-[#344b42] outline-none placeholder:text-[#8899a6]" type="search" placeholder="Search for services, equipment, bookings, or farmers..." aria-label="Search dashboard" />
          </label>
          <button type="button" className="ml-auto flex shrink-0 items-center gap-1 text-[9px] text-[#3a4d48] sm:ml-auto"><span className="text-[#16794a]"><Icon name="pin" size={17} /></span><span className="hidden sm:inline">Hyderabad, Telangana</span><Icon name="chevron" size={14} /></button>
          <button type="button" className="relative grid h-8 w-8 shrink-0 place-items-center text-[#28774e]" aria-label="Notifications"><Icon name="bell" size={20} /><b className="absolute right-0 top-0 grid h-[13px] w-[13px] place-items-center rounded-full bg-[#ef463c] text-[8px] text-white">3</b></button>
          <button type="button" className="relative grid h-8 w-8 shrink-0 place-items-center text-[#28774e]" aria-label="Messages"><Icon name="message" size={20} /><b className="absolute right-0 top-0 grid h-[13px] w-[13px] place-items-center rounded-full bg-[#20a467] text-[8px] text-white">2</b></button>
          <div className="relative hidden shrink-0 sm:block">
            <button
              className="flex items-center gap-2 border-l border-[#e8efeb] pl-2.5 text-left"
              type="button"
              aria-haspopup="menu"
              aria-expanded={profileMenuOpen}
              onClick={() => setProfileMenuOpen((isOpen) => !isOpen)}
            >
              <span className="grid h-[31px] w-[31px] place-items-center rounded-full border-2 border-white bg-[radial-gradient(circle_at_50%_35%,#e9b18b_0_22%,#31483b_23%_51%,#c47e5c_52%)] text-[8px] font-extrabold text-white shadow-[0_0_0_1px_#dce5df]">SK</span>
              <span><strong className="block whitespace-nowrap text-[9px]">Suresh Kumar</strong><small className="mt-0.5 block whitespace-nowrap text-[8px] text-[#85938b]">Service Provider</small></span>
              <Icon name="chevron" size={14} />
            </button>
            {profileMenuOpen && (
              <div
                className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-40 rounded-lg border border-[#e2eee8] bg-white p-1.5 shadow-lg"
                role="menu"
                aria-label="Profile menu"
              >
                <div className="border-b border-[#edf2ef] px-2.5 py-2">
                  <strong className="block text-[10px] text-[#2c3b35]">Suresh Kumar</strong>
                  <span className="mt-0.5 block text-[8px] text-[#85938b]">Service Provider</span>
                </div>
                <button
                  className="mt-1 flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[10px] font-semibold text-[#b64036] hover:bg-[#fff2f0]"
                  type="button"
                  role="menuitem"
                  onClick={onLogout}
                >
                  <span aria-hidden="true">↪</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="mx-auto grid max-w-[1600px] gap-2 px-2 pt-2 sm:px-3">
          <div className="grid min-w-0 grid-cols-1 gap-2 xl:grid-cols-[minmax(0,1fr)_238px]">
            <section className="relative flex min-h-[139px] flex-col overflow-hidden rounded-lg border border-[#d8ede3] bg-[linear-gradient(90deg,rgba(226,247,237,.98)_0%,rgba(232,247,238,.95)_39%,rgba(226,241,220,.5)_65%,rgba(216,238,215,.16)_100%),radial-gradient(ellipse_at_80%_75%,#a8cc65_0_14%,transparent_15%),radial-gradient(ellipse_at_70%_79%,#6eae54_0_20%,transparent_21%),linear-gradient(172deg,#d6eef3_0%,#f6f7d8_50%,#b2d27b_51%,#3b8753_100%)] p-3 sm:p-4 after:absolute after:right-0 after:top-0 after:h-full after:w-[44%] after:bg-[linear-gradient(145deg,transparent_37%,#839b78_38%_40%,transparent_41%),linear-gradient(160deg,transparent_40%,#69895d_41%_44%,transparent_45%),linear-gradient(180deg,transparent_55%,#c7d67c_56%_65%,#3c8250_66%)] after:opacity-60 after:content-['']">
              <p className="relative z-[1] mb-0.5 text-[11px] text-[#315746]">Welcome back,</p>
              <h1 className="relative z-[1] m-0 flex items-center gap-1.5 text-[22px] font-extrabold leading-tight tracking-[-0.7px] text-[#183a2d]">Suresh Kumar! <span className="text-[#1c8b50]"><Icon name="leaf" size={22} /></span></h1>
              <p className="relative z-[1] mt-1 max-w-[80%] text-[9px] leading-relaxed text-[#4b6457] sm:text-[10px]">Your skills and services make a real difference in farmers' lives. Keep growing with RythuMitra!</p>
              <div className="relative z-[1] mt-auto grid w-full grid-cols-2 gap-2 pt-2 sm:flex sm:w-[88%] sm:gap-5">
                <span className="flex items-center gap-1.5 text-[#21814e]"><Icon name="leaf" size={17} /><span><b className="block whitespace-nowrap text-[8px] text-[#3b5345]">Expert Services</b><small className="block whitespace-nowrap text-[7px] text-[#6a7e70]">Directly to Farmers</small></span></span>
                <span className="hidden items-center gap-1.5 text-[#21814e] sm:flex"><Icon name="calendar" size={17} /><span><b className="block whitespace-nowrap text-[8px] text-[#3b5345]">Flexible Schedule</b><small className="block whitespace-nowrap text-[7px] text-[#6a7e70]">Manage Your Time</small></span></span>
                <span className="hidden items-center gap-1.5 text-[#21814e] sm:flex"><Icon name="bag" size={17} /><span><b className="block whitespace-nowrap text-[8px] text-[#3b5345]">Secure Payments</b><small className="block whitespace-nowrap text-[7px] text-[#6a7e70]">Get Paid Safely</small></span></span>
                <span className="hidden items-center gap-1.5 text-[#21814e] sm:flex"><Icon name="star" size={17} /><span><b className="block whitespace-nowrap text-[8px] text-[#3b5345]">Grow Your Business</b><small className="block whitespace-nowrap text-[7px] text-[#6a7e70]">More Opportunities</small></span></span>
              </div>
            </section>
            <section className="overflow-hidden rounded-lg border border-[#e2eee8] bg-gradient-to-br from-[#eff9f7] to-[#f9fefd] py-1 shadow-sm">
              <CardTitle title="Your Impact" link="" />
              <div className="grid grid-cols-2 gap-1 px-2 pb-2 sm:grid-cols-4 xl:grid-cols-2">
                <div className="grid min-h-[41px] grid-cols-[25px_1fr] grid-rows-[18px_12px] items-center gap-x-1 rounded-md border border-[#e3f0eb] bg-white p-1"><span className="row-span-2 grid h-[23px] w-[23px] place-items-center rounded-full bg-[#e9f7eb] text-[#21884e]"><Icon name="people" size={16} /></span><strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-[#293d34]">12</strong><small className="overflow-hidden text-ellipsis whitespace-nowrap text-[7px] text-[#75867d]">Completed Bookings</small></div>
                <div className="grid min-h-[41px] grid-cols-[25px_1fr] grid-rows-[18px_12px] items-center gap-x-1 rounded-md border border-[#e3f0eb] bg-white p-1"><span className="row-span-2 grid h-[23px] w-[23px] place-items-center rounded-full bg-[#e8f6f0] text-[#2c8a6e]"><Icon name="calendar" size={16} /></span><strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-[#293d34]">5</strong><small className="overflow-hidden text-ellipsis whitespace-nowrap text-[7px] text-[#75867d]">Active Bookings</small></div>
                <div className="grid min-h-[41px] grid-cols-[25px_1fr] grid-rows-[18px_12px] items-center gap-x-1 rounded-md border border-[#e3f0eb] bg-white p-1"><span className="row-span-2 grid h-[23px] w-[23px] place-items-center rounded-full bg-[#fff5dc] text-[#dc9a20]"><Icon name="star" size={16} /></span><strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-[#293d34]">4.8</strong><small className="overflow-hidden text-ellipsis whitespace-nowrap text-[7px] text-[#75867d]">Average Rating</small></div>
                <div className="grid min-h-[41px] grid-cols-[25px_1fr] grid-rows-[18px_12px] items-center gap-x-1 rounded-md border border-[#e3f0eb] bg-white p-1"><span className="row-span-2 grid h-[23px] w-[23px] place-items-center rounded-full bg-[#e5f6ed] text-[#16835a]"><Icon name="rupee" size={16} /></span><strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-[#293d34]">₹ 28,500</strong><small className="overflow-hidden text-ellipsis whitespace-nowrap text-[7px] text-[#75867d]">Total Earnings</small></div>
              </div>
            </section>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-2 xl:grid-cols-[minmax(0,1fr)_238px]">
            <div className="min-w-0">
              <section className="mb-2 overflow-hidden rounded-lg border border-[#e2eee8] bg-white pb-2 shadow-sm" id="categories">
                <CardTitle title="Service Categories" />
                <div className="grid grid-cols-2 gap-1 px-2 sm:grid-cols-4 lg:grid-cols-7">
                  {categories.map(([icon, line1, line2, tone]) => (
                    <button
                      type="button"
                      key={line1}
                      className={`flex min-h-[68px] min-w-0 flex-col items-center justify-center gap-1.5 rounded-md border p-1 text-center transition-transform hover:-translate-y-px hover:border-[#9bd4b2] motion-reduce:transition-none ${activeCategory === line1 ? 'border-[#9bd4b2]' : 'border-transparent'} ${tone === 'green' ? 'bg-[#f0f9ee] text-[#218b50]' : tone === 'sand' ? 'bg-[#fffaf0] text-[#218657]' : tone === 'blue' ? 'bg-[#edf6fc] text-[#258747]' : tone === 'sky' ? 'bg-[#f0f5ff] text-[#3881c3]' : tone === 'rose' ? 'bg-[#fff3f2] text-[#c45020]' : tone === 'cyan' ? 'bg-[#eef9f8] text-[#1783a4]' : 'bg-[#eff8fb] text-[#188399]'}`}
                      onClick={() => setActiveCategory(activeCategory === line1 ? '' : line1)}
                      aria-pressed={activeCategory === line1}
                    >
                      <Icon name={icon} size={28} /><span className="text-[8px] leading-relaxed text-[#385246]">{line1}<br />{line2}</span>
                    </button>
                  ))}
                </div>
              </section>

              <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <section className="min-w-0 overflow-hidden rounded-lg border border-[#e2eee8] bg-white pb-2 shadow-sm">
                  <CardTitle title="Today's Schedule" link="View Calendar" />
                  <div className="px-2">
                    {schedule.map(([icon, title, place, time, status, tone]) => (
                      <article className="flex min-w-0 items-center gap-1.5 border-b border-[#edf2ef] py-2 last:border-0" key={title}>
                        <span className={`grid h-[29px] w-[29px] shrink-0 place-items-center rounded-full ${tone === 'blue' ? 'bg-[#e5f4fd] text-[#1675bb]' : 'bg-[#e6f7ec] text-[#25864e]'}`}><Icon name={icon} size={18} /></span>
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5"><small className="flex items-center gap-1 text-[7px] text-[#77857e]"><Icon name="clock" size={11} /> {time}</small><strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[8px] text-[#34443b]">{title}</strong><span className="overflow-hidden text-ellipsis whitespace-nowrap text-[7px] text-[#7d8a82]">{place}</span></div>
                        <em className={`shrink-0 rounded-full px-1.5 py-1 text-[7px] not-italic ${status === 'Confirmed' ? 'bg-[#e3f3fb] text-[#347b9e]' : 'bg-[#fff3d8] text-[#aa7a1a]'}`}>{status}</em>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="min-w-0 overflow-hidden rounded-lg border border-[#e2eee8] bg-white pb-2 shadow-sm" id="service-requests">
                  <CardTitle title="Recent Service Requests" />
                  <div className="px-2">
                    {requests.map(([icon, title, place, time, status, tone]) => (
                      <article className="flex min-w-0 items-center gap-1.5 border-b border-[#edf2ef] py-2 last:border-0" key={title}>
                        <span className={`grid h-[27px] w-[27px] shrink-0 place-items-center rounded-full ${tone === 'green' ? 'bg-[#e6f7ec] text-[#25864e]' : tone === 'blue' ? 'bg-[#e5f4fd] text-[#1675bb]' : 'bg-[#fff3dc] text-[#dd941a]'}`}><Icon name={icon} size={17} /></span>
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5"><strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[8px] text-[#34443b]">{title}</strong><span className="overflow-hidden text-ellipsis whitespace-nowrap text-[7px] text-[#7d8a82]">{place}</span><small className="overflow-hidden text-ellipsis whitespace-nowrap text-[7px] text-[#7d8a82]">{time}</small></div>
                        <em className={`shrink-0 rounded-full px-1.5 py-1 text-[7px] not-italic ${tone === 'green' ? 'bg-[#e3f3fb] text-[#347b9e]' : 'bg-[#fff3d8] text-[#aa7a1a]'}`}>{status}</em>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="min-w-0 overflow-hidden rounded-lg border border-[#e2eee8] bg-white pb-2 shadow-sm">
                  <CardTitle title="Live Farm Locations" />
                  <div className="relative mx-2 h-[169px] overflow-hidden rounded-md bg-[repeating-linear-gradient(152deg,transparent_0_17px,#b5ce83_18px_20px,transparent_21px_31px),repeating-linear-gradient(38deg,#416c3c_0_24px,#5c8044_25px_39px,#487440_40px_58px)] shadow-inner" aria-label="Map showing service area and farm locations" role="img">
                    <span className="absolute left-[30%] top-[31%] z-[1] text-[#fa7046] drop-shadow"><Icon name="pin" size={20} /></span>
                    <span className="absolute left-[58%] top-[16%] z-[1] text-[#2781db] drop-shadow"><Icon name="pin" size={20} /></span>
                    <span className="absolute left-[68%] top-[68%] z-[1] text-[#19ae7a] drop-shadow"><Icon name="pin" size={20} /></span>
                    <span className="absolute left-[15%] top-[72%] z-[1] text-[#328ed6] drop-shadow"><Icon name="pin" size={20} /></span>
                    <div className="absolute bottom-1 right-1 z-[2] grid overflow-hidden rounded border border-[#d6dfd8] bg-white"><button className="h-5 w-[21px] bg-white text-base leading-none text-[#47574d]" type="button" aria-label="Zoom in">+</button><button className="h-5 w-[21px] border-t border-[#e5e9e5] bg-white text-base leading-none text-[#47574d]" type="button" aria-label="Zoom out">−</button></div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 px-1 pt-1.5 text-[6px] text-[#65756a]"><span className="flex items-center gap-1 whitespace-nowrap"><i className="h-1.5 w-1.5 rounded-full bg-[#1b9a59]" />Your Service Area</span><span className="flex items-center gap-1 whitespace-nowrap"><i className="h-1.5 w-1.5 rounded-full bg-[#2586d9]" />Farmer Location</span><span className="flex items-center gap-1 whitespace-nowrap"><i className="h-1.5 w-1.5 rounded-full bg-[#f27842]" />Active Service</span></div>
                </section>

                <section className="min-w-0 overflow-hidden rounded-lg border border-[#e2eee8] bg-white shadow-sm">
                  <CardTitle title="My Equipment & Tools" link="Manage Equipment" />
                  <div className="grid grid-cols-4 gap-1 px-2 pb-2">
                    {[
                      ['🚜', 'Tractor', '(2 units)', 'Available', 'green'],
                      ['🛠️', 'Rotavator', '(1 unit)', 'In Use', 'orange'],
                      ['🧴', 'Sprayer', '(3 units)', 'Available', 'green'],
                      ['🪓', 'Power Tiller', '(1 unit)', 'Available', 'green'],
                    ].map(([emoji, title, amount, status, tone]) => (
                      <article className="flex min-w-0 flex-col items-start rounded-md border border-[#edf1ed] p-1" key={title}><span className="grid h-[43px] w-full place-items-center rounded bg-gradient-to-br from-[#eef5e8] to-[#e1efe4] text-2xl">{emoji}</span><strong className="mt-1 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[7px] text-[#34463a]">{title}</strong><small className="mt-px text-[6px] text-[#87938a]">{amount}</small><em className={`mt-1 rounded px-1.5 py-[3px] text-[6px] not-italic ${tone === 'green' ? 'bg-[#e7f7eb] text-[#318254]' : 'bg-[#fff3dc] text-[#b97920]'}`}>{status}</em></article>
                    ))}
                  </div>
                </section>

                <section className="min-w-0 overflow-hidden rounded-lg border border-[#e2eee8] bg-white shadow-sm">
                  <CardTitle title="Earnings Overview" link="View Details" />
                  <div className="flex h-[99px] gap-1.5 px-2 pb-2">
                    <div className="relative flex min-w-0 flex-1 bg-[repeating-linear-gradient(to_bottom,#e9efeb_0_1px,transparent_1px_18px)] pb-3 pl-6">
                      <div className="absolute bottom-3 left-0 top-0 flex flex-col justify-between text-[6px] text-[#85938a]"><span>20K</span><span>15K</span><span>10K</span><span>5K</span><span>0</span></div>
                      <div className="flex h-full flex-1 items-end justify-around gap-1">{[24, 39, 48, 57, 68, 79, 91].map((height, index) => <span className="w-[9px] rounded-t-sm bg-gradient-to-b from-[#39b877] to-[#168650]" key={index} style={{ height: `${height}%` }} />)}</div>
                      <div className="absolute bottom-0 left-6 right-0 flex justify-between text-[5px] text-[#89968e]"><span>Apr 19</span><span>Apr 20</span><span>Apr 21</span><span>Apr 22</span><span>Apr 23</span><span>Apr 24</span><span>Apr 25</span></div>
                    </div>
                    <div className="flex w-[68px] shrink-0 flex-col justify-center rounded-md border border-[#ebefec] p-1"><small className="text-[7px] text-[#75847a]">This Week</small><strong className="mt-0.5 whitespace-nowrap text-[10px] text-[#293e33]">₹ 8,450</strong><em className="mt-0.5 text-[7px] not-italic text-[#21995a]">↑ 12%</em><hr className="my-1 w-full border-0 border-t border-[#edf1ee]" /><small className="text-[7px] text-[#75847a]">Last Week</small><strong className="mt-0.5 whitespace-nowrap text-[10px] text-[#293e33]">₹ 7,560</strong></div>
                  </div>
                </section>

                <section className="min-w-0 overflow-hidden rounded-lg border border-[#e2eee8] bg-white shadow-sm">
                  <CardTitle title="Reviews & Ratings" />
                  <div className="flex items-center gap-3 px-2 py-1.5">
                    <div className="flex flex-col items-center"><strong className="text-xl leading-none text-[#253b31]">4.8</strong><span className="text-[11px] tracking-[-1px] text-[#e9aa1a]">★★★★★</span><small className="whitespace-nowrap text-[6px] text-[#89958c]">(24 reviews)</small></div>
                    <div className="grid flex-1 gap-1">{[18, 4, 1, 1, 0].map((count, index) => <div className="flex items-center gap-1 text-[6px] text-[#758279]" key={index}><span className="w-[23px] whitespace-nowrap">{5 - index} ★</span><i className="h-1 flex-1 overflow-hidden rounded bg-[#edf1ee]"><b className="block h-full rounded bg-[#29a15e]" style={{ width: `${count * 5}%` }} /></i><small className="w-[11px] text-right">{count}</small></div>)}</div>
                  </div>
                </section>
              </div>
            </div>

            <aside className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 xl:flex xl:flex-col">
              <section className="overflow-hidden rounded-lg border border-[#e2eee8] bg-white pb-2 shadow-sm">
                <CardTitle title="Quick Actions" link="" />
                {[
                  ['plus', 'Add New Service'],
                  ['calendar', 'Update Availability'],
                  ['calendar', 'View Bookings'],
                  ['tractor', 'Manage Equipment'],
                ].map(([icon, label]) => <a className="mx-2 mb-1 flex min-h-7 items-center gap-2 rounded-md border border-[#e4eee8] bg-gradient-to-r from-[#f8fcf9] to-[#f4faf7] px-2 text-[8px] text-[#43544a] last:mb-0" href="#categories" key={label}><span className="text-[#21884f]"><Icon name={icon} size={19} /></span>{label}</a>)}
              </section>
              <section className="overflow-hidden rounded-lg border border-[#e2eee8] bg-white pb-1 shadow-sm">
                <CardTitle title="Recent Messages" />
                <div className="px-2">{messages.map(([initials, name, message, time, tone]) => <article className="relative flex min-h-[34px] items-center gap-1.5 border-b border-[#eff3f0] py-[3px] last:border-0" key={name}><span className={`grid h-[25px] w-[25px] shrink-0 place-items-center rounded-full text-[7px] font-bold text-white ${tone === 'orange' ? 'bg-gradient-to-br from-[#ebb886] to-[#7d5e43]' : tone === 'blue' ? 'bg-gradient-to-br from-[#dbad83] to-[#467493]' : 'bg-gradient-to-br from-[#d69a72] to-[#286344]'}`}>{initials}</span><div className="min-w-0 flex-1"><strong className="block text-[8px] text-[#35473d]">{name}</strong><p className="mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap text-[7px] text-[#7e8d83]">{message}</p></div><small className="self-start mt-[3px] whitespace-nowrap text-[6px] text-[#87938b]">{time}</small><b className="absolute bottom-0.5 right-0 grid h-[11px] w-[11px] place-items-center rounded-full bg-[#209a5b] text-[6px] text-white">{name === 'Anil Reddy' ? '2' : '1'}</b></article>)}</div>
              </section>
              <section className="overflow-hidden rounded-lg border border-[#e2eee8] bg-white pb-1 shadow-sm sm:col-span-2 xl:col-span-1">
                <CardTitle title="Notifications" />
                <div>
                  <article className="flex min-h-10 items-start gap-1.5 border-b border-[#eff3f0] px-2 py-1 last:border-0"><span className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-[#e9f7eb] text-[#21884e]"><Icon name="bag" size={16} /></span><div className="min-w-0 flex-1"><strong className="block text-[7px] leading-snug text-[#43544a]">New booking request received</strong><p className="mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap text-[6px] text-[#819087]">Soil Testing · Raman Reddy Farm</p></div><small className="whitespace-nowrap text-[6px] text-[#87948b]">2h ago</small></article>
                  <article className="flex min-h-10 items-start gap-1.5 border-b border-[#eff3f0] px-2 py-1 last:border-0"><span className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-[#fff4dc] text-[#d99116]"><Icon name="rupee" size={16} /></span><div className="min-w-0 flex-1"><strong className="block text-[7px] leading-snug text-[#43544a]">Payment received</strong><p className="mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap text-[6px] text-[#819087]">₹ 2,500 from Lakshmi Devi</p></div><small className="whitespace-nowrap text-[6px] text-[#87948b]">4h ago</small></article>
                  <article className="flex min-h-10 items-start gap-1.5 border-b border-[#eff3f0] px-2 py-1 last:border-0"><span className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-[#e9f5fc] text-[#247ac1]"><Icon name="star" size={16} /></span><div className="min-w-0 flex-1"><strong className="block text-[7px] leading-snug text-[#43544a]">New review received</strong><p className="mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap text-[6px] text-[#819087]">5 stars from Anil Reddy</p></div><small className="whitespace-nowrap text-[6px] text-[#87948b]">1d ago</small></article>
                </div>
              </section>
            </aside>
          </div>

          <footer className="mx-[-8px] flex min-h-9 flex-wrap items-center gap-x-2 gap-y-1 bg-gradient-to-r from-[#dff4e8] to-[#f2fbf6] px-3 py-1.5 text-[7px] text-[#537266] sm:mx-[-12px] sm:flex-nowrap sm:px-4 sm:text-[8px]"><strong className="flex items-center gap-1 whitespace-nowrap font-bold text-[#267c4d]"><Icon name="leaf" size={20} /> Raithanna</strong><span className="sm:border-l sm:border-[#bcd9c8] sm:pl-2">Supporting Farmers · Connecting Services · Building Sustainable Agriculture</span><em className="flex items-center gap-1 whitespace-nowrap font-bold italic text-[#267c4d] sm:ml-auto">Healthy Farms → Prosperous Future <Icon name="leaf" size={17} /></em></footer>
        </div>
      </section>
    </main>
  )
}

export default ServiceDashboard

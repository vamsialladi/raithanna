import { useState } from 'react'
import logo from '../images/Logo.png'
import { clearCurrentProfile, getCurrentProfile } from './authProfile.js'

const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Schemes', path: '/schemes' },
  { label: 'Contact', path: '/contact' },
]
const languages = [
  { value: 'English', label: 'English' },
  { value: 'Telugu', label: 'తెలుగు' },
  { value: 'Hindi', label: 'हिन्दी' },
  { value: 'Tamil', label: 'தமிழ்' },
  { value: 'Kannada', label: 'ಕನ್ನಡ' },
]

function Navbar({ activePage }) {
  const [language, setLanguage] = useState('English')
  const [profile, setProfile] = useState(getCurrentProfile)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-[#dfe5df] bg-white shadow-[0_1px_5px_rgb(21_48_30_/_8%)]">
      <div className="grid min-h-[76px] w-full grid-cols-[1fr_auto_1fr] items-center gap-[30px] px-5 max-[760px]:flex max-[760px]:min-h-[68px] max-[760px]:flex-wrap max-[760px]:gap-x-[18px] max-[760px]:gap-y-0 max-[760px]:px-[14px] max-[760px]:py-2 max-[380px]:gap-x-2 max-[380px]:px-[10px]">
        <a
          className="flex items-center justify-self-start max-[760px]:basis-[135px] max-[380px]:basis-[112px]"
          href="/"
          aria-label="Raithanna home"
        >
          <img
            className="block h-[58px] w-[180px] object-contain max-[760px]:h-[48px] max-[760px]:w-[135px] max-[380px]:w-[112px]"
            src={logo}
            alt="Raithanna"
          />
        </a>

        <nav
          className="flex h-full items-center justify-center gap-[clamp(18px,2.5vw,36px)] justify-self-center max-[760px]:order-1 max-[760px]:min-h-[42px] max-[760px]:w-full max-[760px]:justify-between max-[760px]:gap-[14px] max-[760px]:overflow-x-auto"
          aria-label="Main navigation"
        >
          {navigationItems.map((item) => (
            <a
              className={`relative flex h-full items-center whitespace-nowrap text-[15px] font-medium text-[#26352a] no-underline transition-colors hover:text-[#267444] max-[760px]:min-h-[42px] max-[760px]:text-[13px] ${
                activePage === item.path
                  ? 'text-[#267444] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-[#39895b] after:content-[""]'
                  : ''
              }`}
              href={item.path}
              key={item.path}
              aria-current={activePage === item.path ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-none items-center gap-[14px] justify-self-end max-[760px]:ml-auto max-[760px]:gap-2 max-[380px]:gap-1">
          <label className="relative inline-flex h-10 w-[132px] cursor-pointer items-center justify-start gap-2 rounded-md border border-[#d6dfd7] bg-white px-3 text-[14px] text-[#26352a] transition-colors hover:border-[#2e7950] focus-within:ring-2 focus-within:ring-[#2e7950]/30">
            <svg
              aria-hidden="true"
              className="h-[17px] w-[17px] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3.5 9h17M3.5 15h17M12 3c2.2 2.4 3.3 5.4 3.3 9s-1.1 6.6-3.3 9c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z" />
            </svg>
            <span className="sr-only">Select language</span>
            <select
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              aria-label="Select language"
            >
              {languages.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="whitespace-nowrap">
              {languages.find((option) => option.value === language)?.label}
            </span>
            <svg
              aria-hidden="true"
              className="pointer-events-none ml-auto h-3 w-3 shrink-0"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="m2 4 4 4 4-4" />
            </svg>
          </label>
          {profile ? (
            <div className="relative">
              <button
                className="flex min-h-10 max-w-[220px] items-center gap-2 rounded-xl border border-[#dce5df] bg-white px-2.5 py-1.5 text-left shadow-sm transition hover:border-[#2e7950] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e7950] max-[380px]:max-w-[150px] max-[380px]:gap-1.5 max-[380px]:px-1.5"
                type="button"
                aria-expanded={isProfileMenuOpen}
                aria-label={`Profile menu for ${profile.name}`}
                onClick={() => setIsProfileMenuOpen((isOpen) => !isOpen)}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#9be7b2] bg-[#dcfce7] text-xs font-bold text-[#166534]">
                  {profile.name.trim().charAt(0).toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xs font-semibold text-[#26352a]">
                    {profile.name}
                  </span>
                  <span className="block truncate text-[10px] text-[#718078]">
                    {profile.roleName}
                  </span>
                </span>
                <svg
                  aria-hidden="true"
                  className="h-3 w-3 shrink-0 text-[#718078]"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="m2 4 4 4 4-4" />
                </svg>
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 min-w-36 rounded-lg border border-[#dce5df] bg-white p-1 shadow-lg">
                  <a
                    className="block rounded-md px-3 py-2 text-sm font-medium text-[#26352a] hover:bg-[#f0faf3]"
                    href="/auth"
                    onClick={() => {
                      clearCurrentProfile()
                      setProfile(null)
                    }}
                  >
                    Log out
                  </a>
                </div>
              )}
            </div>
          ) : (
            <a
              className="inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-md border border-[#2e7950] bg-[#2e7950] px-[17px] text-[14px] font-semibold text-white transition-colors hover:bg-[#24633f] max-[760px]:px-[11px] max-[380px]:px-2 max-[380px]:text-xs"
              href="/auth"
            >
              Login / Register
            </a>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
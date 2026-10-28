import { useState } from 'react'
import { useTranslation } from '../../../context/LanguageContext.jsx'
import LanguagePicker from '../LanguagePicker.jsx'

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}

function Navbar({
  language: propLanguage,
  onLanguageChange,
  onAuthOpen,
  onLogin,
  onRegister,
  onHome,
  currentUser,
  onDashboardOpen,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  let contextLanguage = 'English'
  let setContextLanguage = null
  let t = (k) => k

  try {
    const ctx = useTranslation()
    if (ctx) {
      contextLanguage = ctx.language || 'English'
      setContextLanguage = ctx.setLanguage
      t = ctx.t || ((k) => k)
    }
  } catch {
    // Rendered outside of context
  }

  const langCode =
    propLanguage ||
    (contextLanguage === 'English'
      ? 'en'
      : contextLanguage === 'తెలుగు'
      ? 'te'
      : contextLanguage === 'ಕನ್ನಡ'
      ? 'kn'
      : contextLanguage === 'हिन्दी'
      ? 'hi'
      : contextLanguage === 'தமிழ்'
      ? 'ta'
      : 'en')

  const handleLanguageChange = (code) => {
    if (onLanguageChange) onLanguageChange(code)
    if (setContextLanguage) {
      const codeToName = { en: 'English', te: 'తెలుగు', kn: 'ಕನ್ನಡ', hi: 'हिन्दी', ta: 'தமிழ்' }
      setContextLanguage(codeToName[code] || code)
    }
  }

  const links = [
    { label: t('navHome') || 'Home', href: '#home', key: 'home' },
    { label: t('navAbout') || 'About', href: '#about', key: 'about' },
    { label: t('navContact') || 'Contact', href: '#contact', key: 'contact' },
    { label: t('navServices') || 'Services', href: '#services', key: 'services' },
  ]

  const handleAuthClick = () => {
    setMenuOpen(false)
    if (onAuthOpen) onAuthOpen('login')
    else if (onLogin) onLogin()
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#home" aria-label={t('navHome') || 'Raithanna home'} onClick={onHome}>
          <img className="brand__logo" src="/raithanna-logo.png" alt="Raithanna" />
        </a>

        <form className="search-box" role="search" action="#services">
          <input
            aria-label="Search Raithanna"
            name="q"
            placeholder={t('navSearchPlaceholder') || 'Search...'}
            type="search"
          />
          <button type="submit" aria-label={t('search') || 'Search'}>
            <SearchIcon />
          </button>
        </form>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`site-header__content${menuOpen ? ' is-open' : ''}`}>
          <nav className="site-nav" aria-label="Main navigation">
            {links.map((link) => (
              <a
                className="site-nav__link"
                href={link.href}
                key={link.key}
                onClick={() => {
                  setMenuOpen(false)
                  if (onHome) onHome()
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="site-header__actions">
            <LanguagePicker language={langCode} onLanguageChange={handleLanguageChange} />
            {currentUser ? (
              <button
                className="signup-button"
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  if (onDashboardOpen) onDashboardOpen()
                }}
              >
                {currentUser.roleKey === 'roleLandlord' ? t('dashNavDashboard') : t(currentUser.roleKey || 'roleFarmer')} ({currentUser.name})
              </button>
            ) : (
              <button
                className="signup-button"
                type="button"
                onClick={handleAuthClick}
              >
                {t('navLoginRegister') || 'Login / Register'}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
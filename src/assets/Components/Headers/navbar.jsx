import { useState } from 'react'
import { translations } from '../../../translations.js'
import LanguagePicker from '../LanguagePicker.jsx'

const links = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'contact', href: '#contact' },
  { key: 'services', href: '#services' },
]

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}

function Navbar({ language, onLanguageChange, onAuthOpen, onHome }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const t = translations[language]

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#home" aria-label={t.brandHome} onClick={onHome}>
          <img className="brand__logo" src="/raithanna-logo.png" alt="Raithanna" />
        </a>

        <form className="search-box" role="search" action="#services">
          <input aria-label={`${t.search} Raithanna`} name="q" placeholder={t.searchPlaceholder} type="search" />
          <button type="submit" aria-label={t.search}>
            <SearchIcon />
          </button>
        </form>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? t.closeNavigation : t.openNavigation}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`site-header__content${menuOpen ? ' is-open' : ''}`}>
          <nav className="site-nav" aria-label={t.mainNavigation}>
            {links.map((link) => (
              <a
                className="site-nav__link"
                href={link.href}
                key={link.key}
                onClick={() => {
                  setMenuOpen(false)
                  onHome()
                }}
              >
                {t[link.key]}
              </a>
            ))}
          </nav>

          <div className="site-header__actions">
            <LanguagePicker language={language} onLanguageChange={onLanguageChange} />
            <button
              className="signup-button"
              type="button"
              onClick={() => {
                setMenuOpen(false)
                onAuthOpen()
              }}
            >
              {t.loginRegister}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
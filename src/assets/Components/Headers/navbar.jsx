import { useState } from 'react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Services', href: '#services' },
]

const languages = ['English', 'తెలుగు', 'ಕನ್ನಡ', 'हिन्दी', 'தமிழ்']

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}

function Navbar({ onAuthOpen, onHome }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [language, setLanguage] = useState('English')

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#home" aria-label="Raithanna home" onClick={onHome}>
          <img className="brand__logo" src="/raithanna-logo.png" alt="Raithanna" />
        </a>

        <form className="search-box" role="search" action="#services">
          <input aria-label="Search Raithanna" name="q" placeholder="Search..." type="search" />
          <button type="submit" aria-label="Search">
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
                key={link.label}
                onClick={() => {
                  setMenuOpen(false)
                  onHome()
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="site-header__actions">
            <div className="language-picker">
              <button
                className="translate-button"
                type="button"
                aria-expanded={languageOpen}
                aria-label={`Translate, current language ${language}`}
                onClick={() => setLanguageOpen(!languageOpen)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
                </svg>
                <span>Translate</span>
              </button>
              {languageOpen && (
                <div className="language-menu" role="group" aria-label="Choose language">
                  {languages.map((option) => (
                    <button
                      className="language-menu__option"
                      type="button"
                      key={option}
                      aria-pressed={language === option}
                      onClick={() => {
                        setLanguage(option)
                        setLanguageOpen(false)
                      }}
                    >
                      {option}
                      {language === option && <span aria-hidden="true">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className="signup-button"
              type="button"
              onClick={() => {
                setMenuOpen(false)
                onAuthOpen()
              }}
            >
              Login / Register
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
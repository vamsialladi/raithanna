import { useState, useRef, useEffect } from 'react'
import { useTranslation } from '../../../context/LanguageContext.jsx'

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}

function Navbar({ onAuthOpen, onHome, currentUser, onDashboardOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const pickerRef = useRef(null)
  const { language, setLanguage, t, availableLanguages } = useTranslation()

  const links = [
    { label: t('navHome'), href: '#home' },
    { label: t('navAbout'), href: '#about' },
    { label: t('navContact'), href: '#contact' },
    { label: t('navServices'), href: '#services' },
  ]

  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setLanguageOpen(false)
      }
    }
    if (languageOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [languageOpen])

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#home" aria-label="Raithanna home" onClick={onHome}>
          <img className="brand__logo" src="/raithanna-logo.png" alt="Raithanna" />
        </a>

        <form className="search-box" role="search" action="#services">
          <input
            aria-label="Search Raithanna"
            name="q"
            placeholder={t('navSearchPlaceholder')}
            type="search"
          />
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
                key={link.href}
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
            <div className="language-picker" ref={pickerRef}>
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
                <span>{language === 'English' ? t('navTranslate') : language}</span>
              </button>
              {languageOpen && (
                <div className="language-menu" role="group" aria-label="Choose language">
                  {availableLanguages.map((option) => (
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
                      <span>{option}</span>
                      {language === option && <span aria-hidden="true" style={{ color: '#17613c', fontWeight: 'bold' }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
                onClick={() => {
                  setMenuOpen(false)
                  onAuthOpen()
                }}
              >
                {t('navLoginRegister')}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
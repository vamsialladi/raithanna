import { useEffect, useRef, useState } from 'react'
import { languages, translations } from '../../translations.js'

function LanguagePicker({ language, onLanguageChange, compact = false }) {
  const [open, setOpen] = useState(false)
  const pickerRef = useRef(null)
  const t = translations[language]
  const currentLanguage = languages.find((item) => item.code === language)

  useEffect(() => {
    function handlePointerDown(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) setOpen(false)
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className={`language-picker${compact ? ' language-picker--compact' : ''}`} ref={pickerRef}>
      <button
        className="translate-button"
        type="button"
        aria-expanded={open}
        aria-controls="language-menu"
        aria-label={`${t.chooseLanguage} (${currentLanguage?.name ?? language})`}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
        <span>{compact ? currentLanguage?.name : t.translate}</span>
      </button>
      {open && (
        <div id="language-menu" className="language-menu" role="group" aria-label={t.chooseLanguage}>
          {languages.map((option) => (
            <button
              className="language-menu__option"
              type="button"
              key={option.code}
              aria-pressed={language === option.code}
              onClick={() => {
                onLanguageChange(option.code)
                setOpen(false)
              }}
            >
              {option.name}
              {language === option.code && <span aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguagePicker

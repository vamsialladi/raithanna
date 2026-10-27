import { useState } from 'react'
import { useTranslation } from '../../../context/LanguageContext.jsx'

export default function UnderDevelopment({ user, onLogout, onHome, onSwitchToLandlord }) {
  const { t, language, setLanguage, availableLanguages } = useTranslation()
  const [showLangDropdown, setShowLangDropdown] = useState(false)

  const roleName = t(user?.roleKey || 'roleFarmer')

  return (
    <div className="min-h-screen bg-[#f4f7f4] text-[#1e293b] font-sans flex flex-col justify-between antialiased">
      {/* Top Navigation Bar */}
      <header className="h-[68px] bg-white border-b border-[#e2e8e2] px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onHome}>
          <img src="/raithanna-logo.png" alt="Raithanna" className="h-10 w-auto object-contain" />
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#1b7f45] px-3 py-1.5 rounded-full bg-[#f8faf8] border border-[#e2e8e2] transition cursor-pointer"
            >
              <span>🌐</span>
              <span className="hidden sm:inline">{language}</span>
              <span className="text-[10px] text-[#94a3b8]">▼</span>
            </button>

            {showLangDropdown && (
              <div className="absolute top-full mt-1.5 right-0 w-36 bg-white rounded-xl shadow-lg border border-[#e2e8e2] py-1 z-50">
                {availableLanguages?.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setLanguage(lang)
                      setShowLangDropdown(false)
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#f1f6f1] transition flex items-center justify-between ${
                      language === lang ? 'font-bold text-[#1b7f45]' : 'text-[#475569]'
                    }`}
                  >
                    <span>{lang}</span>
                    {language === lang && <span className="text-[#1b7f45] font-bold">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Badge */}
          <div className="flex items-center gap-2 pl-3 border-l border-[#e2e8e2]">
            <div className="h-8 w-8 rounded-full bg-[#e8f5e9] text-[#1b7f45] flex items-center justify-center font-bold text-xs ring-1 ring-[#1b7f45]/20">
              {user?.name ? user.name.charAt(0) : 'U'}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-[12px] font-bold text-[#0f172a] leading-none">
                {user?.name || 'Farmer'}
              </p>
              <p className="text-[10px] text-[#16a34a] font-semibold mt-0.5">
                {roleName}
              </p>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            type="button"
            onClick={onLogout}
            className="text-xs font-semibold text-[#ef4444] hover:bg-[#fef2f2] px-3 py-1.5 rounded-lg border border-[#fee2e2] transition cursor-pointer"
          >
            {t('dashSignOut')}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full bg-white rounded-3xl border border-[#e2e8e2] shadow-[0_20px_60px_rgba(15,44,25,0.08)] p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-[#e8f5e9]/70 via-[#f0fdf4]/30 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Top Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fef9c3] border border-[#fde047] text-[#854d0e] text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#eab308] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ca8a04]" />
            </span>
            {t('devBadge')}
          </div>

          {/* Main Visual Icon */}
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[#1b7f45] to-[#0f4a25] text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-900/15">
            <svg
              className="h-10 w-10 fill-none stroke-current stroke-[1.8]"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight mb-3">
            {roleName} — {t('devComingSoon')}
          </h1>

          {/* Descriptive text */}
          <p className="text-sm sm:text-base text-[#64748b] leading-relaxed max-w-lg mx-auto mb-8">
            {t('devDescPrefix')} <strong className="text-[#1b7f45]">{roleName}</strong>. {t('devDescSuffix')}
          </p>

          {/* Planned Features Grid */}
          <div className="bg-[#f8faf8] border border-[#e2e8e2] rounded-2xl p-5 mb-8 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#475569] mb-3 flex items-center gap-1.5">
              <span>🌾</span> {t('devFeaturesPlanned')}:
            </h4>
            <div className="space-y-2.5">
              {[
                { icon: '🌱', text: t('devFeature1') },
                { icon: '📜', text: t('devFeature2') },
                { icon: '🛰️', text: t('devFeature3') },
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-[#334155] font-medium">
                  <span className="text-sm">{feat.icon}</span>
                  <span>{feat.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onHome}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-white border border-[#cbd5e1] text-[#334155] font-bold text-xs hover:bg-[#f8faf8] transition shadow-xs cursor-pointer"
            >
              ← {t('devBackHome')}
            </button>

            {onSwitchToLandlord && (
              <button
                type="button"
                onClick={onSwitchToLandlord}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#1b7f45] text-white font-bold text-xs hover:bg-[#146235] transition shadow-md shadow-emerald-900/10 cursor-pointer"
              >
                {t('devTryLandlord')} →
              </button>
            )}

            <button
              type="button"
              onClick={onLogout}
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-[#dc2626] font-semibold text-xs hover:bg-[#fef2f2] transition border border-transparent hover:border-[#fecaca] cursor-pointer"
            >
              {t('devSignOut')}
            </button>
          </div>
        </div>
      </main>

      {/* Footer minimal info */}
      <footer className="py-4 text-center text-xs text-[#94a3b8] border-t border-[#e2e8e2] bg-white">
        © {new Date().getFullYear()} Raithanna. {t('footerTagline')}
      </footer>
    </div>
  )
}

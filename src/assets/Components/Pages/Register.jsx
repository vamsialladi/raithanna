import { useState } from 'react'
import { useTranslation } from '../../../context/LanguageContext.jsx'

const roleDefinitions = [
  { key: 'roleFarmer', fallback: 'Farmer' },
  { key: 'roleLandlord', fallback: 'Landlord Farmer' },
  { key: 'roleTenant', fallback: 'Tenant Farmer' },
  { key: 'roleBuyer', fallback: 'Buyer' },
  { key: 'roleServiceProvider', fallback: 'Service Provider' },
]

function Register({ onLogin, onRegisterSuccess }) {
  const { t } = useTranslation()
  const [role, setRole] = useState('roleLandlord')
  const [showPassword, setShowPassword] = useState(false)
  const [showUnderDevModal, setShowUnderDevModal] = useState(false)
  const [attemptedRoleKey, setAttemptedRoleKey] = useState('roleFarmer')

  function handleSubmit(event) {
    event.preventDefault()

    // Landlord Dashboard is only accessible for Landlord Farmer
    if (role !== 'roleLandlord') {
      setAttemptedRoleKey(role)
      setShowUnderDevModal(true)
      return
    }

    const formData = new FormData(event.target)
    const defaultNames = {
      roleLandlord: 'Ramu Naik',
      roleTenant: 'Ravi Teja',
      roleFarmer: 'Suresh Kumar',
      roleBuyer: 'Anand Reddy',
      roleServiceProvider: 'Kiran Agri Services',
    }
    const fullName = formData.get('fullName') || defaultNames[role] || 'Ramu Naik'
    const email = formData.get('email') || `${fullName.toLowerCase().replace(/\s+/g, '.')}@raithanna.org`
    if (onRegisterSuccess) {
      onRegisterSuccess({
        name: fullName,
        roleKey: role,
        role: roleDefinitions.find((r) => r.key === role)?.fallback || 'Landlord Farmer',
        email,
        location: 'Hyderabad, Telangana',
      })
    }
  }

  return (
    <main className="auth-page grid min-h-[calc(100svh-78px)] place-items-center bg-[radial-gradient(ellipse_at_10%_100%,rgba(196,220,151,0.18),transparent_30%),#f5f8f5] px-4 py-10 sm:px-6">
      <section
        aria-labelledby="register-title"
        className="auth-card w-full max-w-[540px] rounded-3xl border border-green-950/5 bg-white px-10 py-10 shadow-[0_24px_70px_rgba(17,63,37,0.12)] max-sm:px-6 max-sm:py-8"
      >
        <header className="mb-6 flex items-center justify-center gap-2 text-green-800">
          <svg
            aria-hidden="true"
            viewBox="0 0 42 36"
            className="h-8 w-9 fill-green-600 stroke-green-800"
          >
            <path d="M20.7 32.8C10.8 30.2 4.6 23.6 4.6 13.1c8.9.4 15.1 5.2 17.3 13.6" />
            <path d="M20.6 32.7C14 21.3 17.6 10 31.7 3.2c3.3 11.6-.4 21.3-9.9 28.1" />
            <path d="M5.2 13.3c5.8 2.8 10.1 7 12.9 12.4M29.7 6.7c-5.3 6.1-8.3 13-9 20.7" />
          </svg>
          <div className="grid gap-px">
            <span className="text-[19px] font-bold leading-tight tracking-tight">Raithanna</span>
            <span className="text-[7px] font-medium tracking-wide text-green-950/80">
              {t('footerTagline')}
            </span>
          </div>
        </header>

        <div className="mb-6 text-center">
          <h1 id="register-title" className="text-[25px] font-bold leading-tight tracking-tight text-slate-900">
            {t('registerTitle')}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{t('registerSubtitle')}</p>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-1.5">
            <span className="text-xs font-medium text-slate-700">{t('selectAccountType')}</span>
            <select
              name="role"
              aria-label={t('selectAccountType')}
              value={role}
              onChange={(event) => {
                const newRole = event.target.value
                setRole(newRole)
                if (newRole !== 'roleLandlord') {
                  setAttemptedRoleKey(newRole)
                  setShowUnderDevModal(true)
                }
              }}
              className="min-h-[46px] w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
            >
              {roleDefinitions.map((item) => (
                <option key={item.key} value={item.key}>
                  {t(item.key)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex min-h-[46px] items-center gap-2.5 rounded-lg border border-slate-200 px-3 transition focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/10">
            <input
              type="text"
              name="fullName"
              placeholder={t('fullName')}
              aria-label={t('fullName')}
              autoComplete="name"
              required
              className="min-w-0 flex-1 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-500"
            />
          </label>

          <label className="flex min-h-[46px] items-center gap-2.5 rounded-lg border border-slate-200 px-3 transition focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/10">
            <input
              type="tel"
              name="mobileNumber"
              placeholder={t('mobileNumber')}
              aria-label={t('mobileNumber')}
              autoComplete="tel"
              inputMode="tel"
              required
              className="min-w-0 flex-1 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-500"
            />
          </label>

          <label className="flex min-h-[46px] items-center gap-2.5 rounded-lg border border-slate-200 px-3 transition focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/10">
            <input
              type="email"
              name="email"
              placeholder={t('emailAddress')}
              aria-label={t('emailAddress')}
              autoComplete="email"
              required
              className="min-w-0 flex-1 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-500"
            />
          </label>

          <label className="flex min-h-[46px] items-center gap-2.5 rounded-lg border border-slate-200 px-3 transition focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/10">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-slate-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="5.5" y="10" width="13" height="10" rx="1.8" />
              <path d="M8.5 10V7.2a3.5 3.5 0 0 1 7 0V10M12 14v2" />
            </svg>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder={t('password')}
              aria-label={t('password')}
              autoComplete="new-password"
              required
              className="min-w-0 flex-1 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-500"
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((visible) => !visible)}
              className="rounded p-0.5 hover:bg-slate-100"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 12s3.4-5.3 9.5-5.3 9.5 5.3-3.4 5.3-9.5 5.3S2.5 12 2.5 12Z" />
                <circle cx="12" cy="12" r="2.4" />
              </svg>
            </button>
          </label>

          <label className="flex min-h-[46px] items-center gap-2.5 rounded-lg border border-slate-200 px-3 transition focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/10">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-slate-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="5.5" y="10" width="13" height="10" rx="1.8" />
              <path d="M8.5 10V7.2a3.5 3.5 0 0 1 7 0V10M12 14v2" />
            </svg>
            <input
              type="password"
              name="confirmPassword"
              placeholder={t('confirmPassword')}
              aria-label={t('confirmPassword')}
              autoComplete="new-password"
              required
              className="min-w-0 flex-1 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-500"
            />
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600">
            <input
              type="checkbox"
              name="termsAccepted"
              required
              className="h-4 w-4 accent-green-700"
            />
            <span>
              {t('agreeTerms')}
            </span>
          </label>

          <button
            type="submit"
            className="mt-0.5 flex min-h-[47px] items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-green-700 to-green-800 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-px hover:from-green-800 hover:to-green-900"
          >
            {t('signUpBtn')}
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current">
              <path d="M3.5 10h12m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
            </svg>
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-slate-500">
          {t('hasAccountPrompt')}{' '}
          <button
            type="button"
            onClick={onLogin}
            className="font-semibold text-green-800 hover:underline"
          >
            {t('signInBtn')}
          </button>
        </p>
      </section>

      {/* Under Development Popup Modal */}
      {showUnderDevModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95">
            <div className="h-14 w-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-3.5 text-2xl shadow-xs">
              🚧
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              {t(attemptedRoleKey || role)} — {t('underDevModalTitle')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              {t('underDevModalDesc')}
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setRole('roleLandlord')
                  setShowUnderDevModal(false)
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-green-700 hover:bg-green-800 text-white text-xs font-bold transition shadow-sm cursor-pointer"
              >
                {t('underDevSwitchToLandlord')}
              </button>
              <button
                type="button"
                onClick={() => setShowUnderDevModal(false)}
                className="w-full py-2 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition cursor-pointer"
              >
                {t('underDevClose')}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Register
import { useState } from 'react'
import { useTranslation } from '../../../context/LanguageContext.jsx'

const roleDefinitions = [
  { key: 'roleFarmer', fallback: 'Farmer' },
  { key: 'roleLandlord', fallback: 'Landlord Farmer' },
  { key: 'roleTenant', fallback: 'Tenant Farmer' },
  { key: 'roleBuyer', fallback: 'Buyer' },
  { key: 'roleServiceProvider', fallback: 'Service Provider' },
]

function getRoleIcon(role) {
  if (role === 'roleFarmer' || role === 'roleLandlord' || role === 'roleTenant') return '◈'
  if (role === 'roleBuyer') return '🛒'
  return '♟'
}

function LeafMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 36" className="h-8 w-9 fill-green-600 stroke-green-800">
      <path d="M20.7 32.8C10.8 30.2 4.6 23.6 4.6 13.1c8.9.4 15.1 5.2 17.3 13.6" />
      <path d="M20.6 32.7C14 21.3 17.6 10 31.7 3.2c3.3 11.6-.4 21.3-9.9 28.1" />
      <path d="M5.2 13.3c5.8 2.8 10.1 7 12.9 12.4M29.7 6.7c-5.3 6.1-8.3 13-9 20.7" />
    </svg>
  )
}

function FieldIcon({ name }) {
  const sharedProps = {
    'aria-hidden': true,
    viewBox: '0 0 24 24',
    className: 'h-5 w-5 shrink-0 text-slate-500',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  if (name === 'lock') {
    return (
      <svg {...sharedProps}>
        <rect x="5.5" y="10" width="13" height="10" rx="1.8" />
        <path d="M8.5 10V7.2a3.5 3.5 0 0 1 7 0V10M12 14v2" />
      </svg>
    )
  }

  if (name === 'eye') {
    return (
      <svg {...sharedProps}>
        <path d="M2.5 12s3.4-5.3 9.5-5.3 9.5 5.3 9.5 5.3-3.4 5.3-9.5 5.3S2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="2.4" />
      </svg>
    )
  }

  return (
    <svg {...sharedProps}>
      <circle cx="12" cy="8" r="3.3" />
      <path d="M5.5 19c.5-3.4 2.8-5.2 6.5-5.2s6 1.8 6.5 5.2" />
    </svg>
  )
}

function Login({ onRegister, onLoginSuccess }) {
  const { t } = useTranslation()
  const [selectedRoleKey, setSelectedRoleKey] = useState('roleLandlord')
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const rawInput = formData.get('email') || ''
    const defaultNames = {
      roleLandlord: 'Ramu Naik',
      roleTenant: 'Ravi Teja',
      roleFarmer: 'Suresh Kumar',
      roleBuyer: 'Anand Reddy',
      roleServiceProvider: 'Kiran Agri Services',
    }
    const displayName = rawInput && !rawInput.includes('@') && isNaN(rawInput)
      ? rawInput
      : defaultNames[selectedRoleKey] || 'Ramu Naik'

    if (onLoginSuccess) {
      onLoginSuccess({
        name: displayName,
        roleKey: selectedRoleKey,
        role: roleDefinitions.find((r) => r.key === selectedRoleKey)?.fallback || 'Landlord Farmer',
        email: rawInput || `${displayName.toLowerCase().replace(/\s+/g, '.')}@raithanna.org`,
        location: 'Hyderabad, Telangana',
      })
    }
  }

  return (
    <main className="auth-page grid min-h-[calc(100svh-78px)] place-items-center bg-[radial-gradient(ellipse_at_10%_100%,rgba(196,220,151,0.18),transparent_30%),#f5f8f5] px-4 py-10 sm:px-6">
      <section
        aria-labelledby="login-title"
        className="auth-card w-full max-w-[540px] rounded-3xl border border-green-950/5 bg-white px-10 py-10 shadow-[0_24px_70px_rgba(17,63,37,0.12)] max-sm:px-6 max-sm:py-8"
      >
        <header className="mb-8 flex items-center justify-center gap-3 text-green-800">
          <LeafMark />
          <div className="grid gap-px">
            <span className="text-2xl font-bold leading-tight tracking-tight">Raithanna</span>
            <span className="text-[9px] font-medium tracking-wide text-green-950/80">
              {t('footerTagline')}
            </span>
          </div>
        </header>

        <div className="mb-8 text-center">
          <h1 id="login-title" className="text-3xl font-bold leading-tight tracking-tight text-slate-900">
            {t('loginTitle')}
          </h1>
          <p className="mt-2 text-base text-slate-500">{t('loginSubtitle')}</p>
        </div>

        <div
          role="group"
          aria-label={t('selectAccountType')}
          className="mb-7 grid grid-cols-2 gap-1.5 rounded-xl border border-slate-200 p-1.5 sm:grid-cols-3"
        >
          {roleDefinitions.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={selectedRoleKey === item.key}
              onClick={() => setSelectedRoleKey(item.key)}
              className={`flex min-h-12 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs text-center transition-colors ${
                selectedRoleKey === item.key
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-green-50'
              }`}
            >
              <span aria-hidden="true">{getRoleIcon(item.key)}</span>
              {t(item.key)}
            </button>
          ))}
        </div>

        <form className="grid gap-5" onSubmit={handleSubmit}>
          <label className="grid gap-1">
            <span className="flex min-h-[54px] items-center gap-3 rounded-lg border border-slate-200 px-4 transition focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/10">
              <FieldIcon name="user" />
              <input
                type="text"
                name="email" 
                placeholder={t('emailOrMobile')}
                aria-label={t('emailOrMobile')}
                autoComplete="username"
                required
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500"
              />
            </span>
          </label>

          <label className="grid gap-1">
            <span className="flex min-h-[54px] items-center gap-3 rounded-lg border border-slate-200 px-4 transition focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/10">
              <FieldIcon name="lock" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder={t('password')}
                aria-label={t('password')}
                autoComplete="current-password"
                required
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((visible) => !visible)}
                className="rounded p-0.5 hover:bg-slate-100"
              >
                <FieldIcon name="eye" />
              </button>
            </span>
          </label>

          <div className="flex items-center justify-between text-sm text-slate-800">
            <label className="inline-flex cursor-pointer items-center gap-1.5">
              <input type="checkbox" name="remember" className="h-4 w-4 accent-green-700" />
              <span>{t('rememberMe')}</span>
            </label>
            <button type="button" className="font-semibold text-green-800 hover:underline">
              {t('forgotPassword')}
            </button>
          </div>

          <button
            type="submit"
            className="mt-1 flex min-h-[54px] items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-green-700 to-green-800 text-base font-semibold text-white shadow-sm transition hover:-translate-y-px hover:from-green-800 hover:to-green-900"
          >
            {t('signInBtn')}
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current">
              <path d="M3.5 10h12m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
            </svg>
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-500">
          {t('noAccountPrompt')}{' '}
          <button
            type="button"
            onClick={onRegister}
            className="font-semibold text-green-800 hover:underline"
          >
            {t('signUpBtn')}
          </button>
        </p>
      </section>
    </main>
  )
}

export default Login
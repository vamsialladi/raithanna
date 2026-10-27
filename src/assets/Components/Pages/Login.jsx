import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMarketplace } from '../../../context/MarketplaceContext';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import { useTranslation } from '../../../context/LanguageContext';
import { authService } from '../../../services/authService';
import { USER_ROLES, ROLE_DEFINITIONS, normalizeRole } from '../../../constants/roles';

function LeafMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 36" className="h-8 w-9 fill-green-600 stroke-green-800">
      <path d="M20.7 32.8C10.8 30.2 4.6 23.6 4.6 13.1c8.9.4 15.1 5.2 17.3 13.6" />
      <path d="M20.6 32.7C14 21.3 17.6 10 31.7 3.2c3.3 11.6-.4 21.3-9.9 28.1" />
      <path d="M5.2 13.3c5.8 2.8 10.1 7 12.9 12.4M29.7 6.7c-5.3 6.1-8.3 13-9 20.7" />
    </svg>
  );
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
  };

  if (name === 'lock') {
    return (
      <svg {...sharedProps}>
        <rect x="5.5" y="10" width="13" height="10" rx="1.8" />
        <path d="M8.5 10V7.2a3.5 3.5 0 0 1 7 0V10M12 14v2" />
      </svg>
    );
  }

  if (name === 'eye') {
    return (
      <svg {...sharedProps}>
        <path d="M2.5 12s3.4-5.3 9.5-5.3 9.5 5.3-3.4 5.3-9.5 5.3S2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="2.4" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <circle cx="12" cy="8" r="3.3" />
      <path d="M5.5 19c.5-3.4 2.8-5.2 6.5-5.2s6 1.8 6.5 5.2" />
    </svg>
  );
}

function Login({ onRegister, onLoginSuccess, onSuccess }) {
  const marketplace = useMarketplace ? useMarketplace() : null;
  const auth = useAuth ? useAuth() : null;
  const showToast = useToast ? useToast() : null;
  const { t } = useTranslation ? useTranslation() : { t: (k) => k };

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';
  const roleAccessError = location.state?.roleError;

  // Role state initialized to TENANT_FARMER
  const [role, setRole] = useState(USER_ROLES.TENANT_FARMER);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [roleNotice, setRoleNotice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated as Tenant Farmer
  useEffect(() => {
    if (
      marketplace?.isAuthenticated &&
      marketplace?.user &&
      normalizeRole(marketplace.user.role || marketplace.user.farmerType) === USER_ROLES.TENANT_FARMER
    ) {
      navigate('/dashboard', { replace: true });
    }
  }, [marketplace?.isAuthenticated, marketplace?.user, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setRoleNotice('');

    // 1. Validate email/mobile and password required fields
    if (!email.trim() && !password.trim()) {
      setError('Please enter your email or mobile number, and password.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email or mobile number.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }
    if (password.trim().length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      // 2. Authenticate using authService
      const authenticatedUser = await authService.authenticate({
        email: email.trim(),
        password: password.trim(),
        selectedRole: role,
      });

      const authorizedRole = normalizeRole(authenticatedUser.role || authenticatedUser.farmerType);

      authService.saveSession(authenticatedUser, remember);
      if (marketplace?.setUser) marketplace.setUser(authenticatedUser);
      if (marketplace?.setIsAuthenticated) marketplace.setIsAuthenticated(true);

      // Save role in session storage for service provider integration
      window.sessionStorage.setItem('accountRole', authorizedRole === USER_ROLES.SERVICE_PROVIDER ? 'Service Provider' : authorizedRole);

      // Sync with AuthContext for Buyer sessions
      if (auth?.login) {
        auth.login({
          email: authenticatedUser.email,
          role: authorizedRole === USER_ROLES.BUYER ? 'Buyer' : authorizedRole,
          name: authenticatedUser.farmerName || authenticatedUser.name || 'User',
        });
      }

      if (onLoginSuccess) {
        onLoginSuccess({
          ...authenticatedUser,
          roleKey: authorizedRole === USER_ROLES.LANDLORD_FARMER ? 'roleLandlord' : 'roleOther',
        });
      }
      if (onSuccess) {
        onSuccess(authorizedRole === USER_ROLES.SERVICE_PROVIDER ? 'Service Provider' : authorizedRole);
      }

      // Role routing
      if (authorizedRole === USER_ROLES.BUYER) {
        if (showToast) showToast('Logged in as Buyer! Redirecting to Buyer Dashboard...');
        navigate('/buyer/dashboard', { replace: true });
      } else if (authorizedRole === USER_ROLES.LANDLORD_FARMER) {
        if (showToast) showToast(`Welcome back, ${authenticatedUser.farmerName}! Redirecting to Landlord Dashboard...`);
        navigate('/landlord', { replace: true });
      } else if (authorizedRole === USER_ROLES.SERVICE_PROVIDER) {
        if (showToast) showToast(`Welcome back, ${authenticatedUser.farmerName}! Redirecting to Service Provider Hub...`);
        navigate('/service-dashboard', { replace: true });
      } else if (authorizedRole === USER_ROLES.TENANT_FARMER) {
        if (showToast) showToast(`Welcome back, ${authenticatedUser.farmerName}!`);
        navigate(from, { replace: true });
      } else {
        // General Farmer
        if (showToast) showToast(`Welcome back, ${authenticatedUser.farmerName}!`);
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  }

  const activeErrorMessage = error || roleAccessError;

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
              {t('footerTagline') || 'Farmers Today, Brighter Tomorrow'}
            </span>
          </div>
        </header>

        <div className="mb-8 text-center">
          <h1 id="login-title" className="text-3xl font-bold leading-tight tracking-tight text-slate-900">
            {t('loginTitle') || 'Welcome Back'}
          </h1>
          <p className="mt-2 text-base text-slate-500">{t('loginSubtitle') || 'Sign in to your Raithanna account'}</p>
        </div>

        {/* Role Selection Group */}
        <div
          role="group"
          aria-label={t('selectAccountType') || 'Select account type'}
          className="mb-7 grid grid-cols-2 gap-1.5 rounded-xl border border-slate-200 p-1.5 sm:grid-cols-3"
        >
          {ROLE_DEFINITIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={role === item.id}
              onClick={() => {
                setRole(item.id);
                setError('');
                setRoleNotice('');
              }}
              className={`flex min-h-12 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs text-center transition-colors cursor-pointer ${
                role === item.id
                  ? 'bg-green-700 text-white shadow-sm font-semibold'
                  : 'text-slate-700 hover:bg-green-50'
              }`}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        <form className="grid gap-5" onSubmit={handleSubmit}>
          {/* Error Message Alert */}
          {activeErrorMessage && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700 animate-fadeIn"
            >
              {activeErrorMessage}
            </div>
          )}

          {/* Role Status Notice */}
          {roleNotice && (
            <div
              role="status"
              className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs font-semibold text-amber-800 animate-fadeIn"
            >
              {roleNotice}
            </div>
          )}

          {/* Email / Mobile Field */}
          <label className="grid gap-1">
            <span className="flex min-h-[54px] items-center gap-3 rounded-lg border border-slate-200 px-4 transition focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/10">
              <FieldIcon name="user" />
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder={t('emailOrMobile') || 'Email or Mobile Number'}
                aria-label={t('emailOrMobile') || 'Email or mobile number'}
                autoComplete="username"
                required
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500"
              />
            </span>
            <span className="text-xs leading-relaxed text-slate-500">
              {t('enterEmailOrMobile') || 'Enter your registered email or mobile number'}
            </span>
          </label>

          {/* Password Field */}
          <label className="grid gap-1">
            <span className="flex min-h-[54px] items-center gap-3 rounded-lg border border-slate-200 px-4 transition focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/10">
              <FieldIcon name="lock" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder={t('passwordPlaceholder') || 'Password'}
                aria-label={t('passwordPlaceholder') || 'Password'}
                autoComplete="current-password"
                required
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((visible) => !visible)}
                className="rounded p-0.5 hover:bg-slate-100 cursor-pointer"
              >
                <FieldIcon name="eye" />
              </button>
            </span>
            <span className="text-xs leading-relaxed text-slate-500">{t('enterPassword') || 'Enter your password'}</span>
          </label>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between text-sm text-slate-800">
            <label className="inline-flex cursor-pointer items-center gap-1.5">
              <input
                type="checkbox"
                name="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 accent-green-700"
              />
              <span>{t('rememberMe') || 'Remember me'}</span>
            </label>
            <button type="button" className="font-semibold text-green-800 hover:underline">
              {t('forgotPassword') || 'Forgot password?'}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 flex min-h-[54px] items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-green-700 to-green-800 text-base font-semibold text-white shadow-sm transition hover:-translate-y-px hover:from-green-800 hover:to-green-900 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? 'Signing In...' : t('loginBtn') || 'Login'}
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current">
              <path d="M3.5 10h12m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
            </svg>
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-500">
          {t('noAccountPrompt') || "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={onRegister ? onRegister : () => navigate('/register')}
            className="font-semibold text-green-800 hover:underline cursor-pointer"
          >
            {t('registerLink') || 'Register'}
          </button>
        </p>
      </section>
    </main>
  );
}

export default Login;
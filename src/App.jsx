import { useEffect, useState } from 'react'
import Footer from './assets/Components/Headers/Footer.jsx'
import Navbar from './assets/Components/Headers/navbar.jsx'
import Landing from './assets/Components/Pages/Landing.jsx'
import RegisterPage from './assets/Components/Pages/Register.jsx'
import LoginPage from './assets/Components/Pages/Login.jsx'
import Farmer from './assets/Components/Pages/Farmer.jsx'
import Buyer from './assets/Components/Pages/Buyer.jsx'
import Landlord from './assets/Components/Pages/landord.jsx'
import TenantFarmer from './assets/Components/Pages/Tentant_Farmer.jsx'
import ServiceProvider from './assets/Components/Pages/serviceprovider.jsx'
import { translations } from './translations.js'
import './App.css'

const roleRoutes = {
  '/farmer': Farmer,
  '/tenant-farmer': TenantFarmer,
  '/buyer': Buyer,
  '/service-provider': ServiceProvider,
  '/landlord': Landlord,
}

const rolePaths = {
  Farmer: '/farmer',
  'Tenant Farmer': '/tenant-farmer',
  Buyer: '/buyer',
  'Service Provider': '/service-provider',
  'Landlord Farmer': '/landlord',
}

function App() {
  const [showAuthPage, setShowAuthPage] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [language, setLanguage] = useState('en')
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [userName, setUserName] = useState(() => sessionStorage.getItem('raithanna.username') || 'User')
  const t = translations[language]

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : `${language}-IN`
  }, [language])

  useEffect(() => {
    function syncPath() {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', syncPath)
    return () => window.removeEventListener('popstate', syncPath)
  }, [])

  function handleLogout() {
    sessionStorage.removeItem('raithanna.username')
    setUserName('User')
    window.history.replaceState({}, '', '/')
    setCurrentPath('/')
    setShowAuthPage(false)
  }

  function handleRoleNavigation(role) {
    const path = rolePaths[role]
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    setShowAuthPage(false)
  }

  const RolePage = roleRoutes[currentPath]

  if (RolePage) {
    return (
      <RolePage
        language={language}
        onLanguageChange={setLanguage}
        onNavigateRole={handleRoleNavigation}
        userName={userName}
        onLogout={handleLogout}
      />
    )
  }

  function handleLogin(role, loginIdentifier) {
    const enteredIdentifier = typeof loginIdentifier === 'string' ? loginIdentifier.trim() : ''
    const nameFromIdentifier = enteredIdentifier.includes('@')
      ? enteredIdentifier
        .split('@')[0]
        .split(/[._-]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
      : enteredIdentifier

    sessionStorage.setItem('raithanna.username', nameFromIdentifier || 'User')
    setUserName(nameFromIdentifier || 'User')
    handleRoleNavigation(role)
  }

  return (
    <>
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onAuthOpen={() => {
          setAuthMode('login')
          setShowAuthPage(true)
        }}
        onHome={() => setShowAuthPage(false)}
      />
      <main>
        {showAuthPage ? (
          authMode === 'login' ? (
            <LoginPage
              language={language}
              onLogin={handleLogin}
              onRegister={() => setAuthMode('register')}
            />
          ) : (
            <RegisterPage language={language} onLogin={() => setAuthMode('login')} />
          )
        ) : (
          <Landing t={t} />
        )}
      </main>
      <Footer t={t} />
    </>
  )
}

export default App

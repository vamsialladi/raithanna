import { useState } from 'react'
import Footer from './assets/Components/Headers/Footer.jsx'
import Navbar from './assets/Components/Headers/navbar.jsx'
import Landing from './assets/Components/Pages/Landing.jsx'
import RegisterPage from './assets/Components/Pages/Register.jsx'
import LoginPage from './assets/Components/Pages/Login.jsx'
import ServiceDashboard from './assets/Images/ServiceProvider/ServiceDsahboard.jsx'
import './App.css'

function App() {
  const [showAuthPage, setShowAuthPage] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [showDashboard, setShowDashboard] = useState(() => {
    const hasServiceProviderRole =
      window.sessionStorage.getItem('accountRole') === 'Service Provider'
    const isDashboardPath = window.location.pathname === '/service-dashboard'

    if (isDashboardPath && !hasServiceProviderRole) {
      window.history.replaceState({}, '', '/')
    }

    return isDashboardPath && hasServiceProviderRole
  })

  function handleAuthSuccess(role) {
    window.sessionStorage.setItem('accountRole', role)

    if (role === 'Service Provider') {
      window.history.pushState({}, '', '/service-dashboard')
      setShowDashboard(true)
      return
    }

    window.history.replaceState({}, '', '/')
    setShowAuthPage(false)
  }

  function handleLogout() {
    window.sessionStorage.removeItem('accountRole')
    window.history.replaceState({}, '', '/')
    setShowDashboard(false)
    setShowAuthPage(false)
    setAuthMode('login')
  }

  if (showDashboard) {
    return <ServiceDashboard onLogout={handleLogout} />
  }

  return (
    <>
      <Navbar
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
              onRegister={() => setAuthMode('register')}
              onSuccess={handleAuthSuccess}
            />
          ) : (
            <RegisterPage
              onLogin={() => setAuthMode('login')}
              onSuccess={handleAuthSuccess}
            />
          )
        ) : (
          <Landing />
        )}
      </main>
      <Footer />
    </>
  )
}

export default App

import { useState } from 'react'
import Footer from './assets/Components/Headers/Footer.jsx'
import Navbar from './assets/Components/Headers/navbar.jsx'
import Landing from './assets/Components/Pages/Landing.jsx'
import RegisterPage from './assets/Components/Pages/Register.jsx'
import LoginPage from './assets/Components/Pages/Login.jsx'
import LandlordDashboard from './assets/Components/Dashboard/LandlordDashboard.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import './App.css'

function App() {
  const [showAuthPage, setShowAuthPage] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [showDashboard, setShowDashboard] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const handleAuthSuccess = (userData) => {
    setCurrentUser(userData)
    setShowAuthPage(false)
    setShowDashboard(true)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setShowDashboard(false)
    setShowAuthPage(false)
  }

  const handleOpenDashboard = () => {
    if (currentUser) {
      setShowAuthPage(false)
      setShowDashboard(true)
    }
  }

  // If in dashboard view and user is logged in
  if (showDashboard && currentUser) {
    return (
      <LandlordDashboard
        user={currentUser}
        onLogout={handleLogout}
      />
    )
  }

  return (
    <>
      <Navbar
        currentUser={currentUser}
        onDashboardOpen={handleOpenDashboard}
        onAuthOpen={() => {
          setAuthMode('login')
          setShowAuthPage(true)
          setShowDashboard(false)
        }}
        onHome={() => {
          setShowAuthPage(false)
          setShowDashboard(false)
        }}
      />
      <main>
        {showAuthPage ? (
          authMode === 'login' ? (
            <LoginPage
              onRegister={() => setAuthMode('register')}
              onLoginSuccess={handleAuthSuccess}
            />
          ) : (
            <RegisterPage
              onLogin={() => setAuthMode('login')}
              onRegisterSuccess={handleAuthSuccess}
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

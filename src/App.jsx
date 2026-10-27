import { useState } from 'react'
import Footer from './assets/Components/Headers/Footer.jsx'
import Navbar from './assets/Components/Headers/navbar.jsx'
import Landing from './assets/Components/Pages/Landing.jsx'
import RegisterPage from './assets/Components/Pages/Register.jsx'
import LoginPage from './assets/Components/Pages/Login.jsx'
import LandlordDashboard from './assets/Components/Dashboard/LandlordDashboard.jsx'
import UnderDevelopment from './assets/Components/Pages/UnderDevelopment.jsx'
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

  const handleSwitchToLandlord = () => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        roleKey: 'roleLandlord',
        role: 'Landlord Farmer',
      })
      setShowDashboard(true)
    }
  }

  // If in dashboard view and user is logged in
  if (showDashboard && currentUser) {
    if (currentUser.roleKey === 'roleLandlord') {
      return (
        <LandlordDashboard
          user={currentUser}
          onLogout={handleLogout}
        />
      )
    } else {
      return (
        <UnderDevelopment
          user={currentUser}
          onLogout={handleLogout}
          onHome={() => {
            setShowDashboard(false)
            setShowAuthPage(false)
          }}
          onSwitchToLandlord={handleSwitchToLandlord}
        />
      )
    }
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

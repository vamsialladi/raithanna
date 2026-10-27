import { useState } from 'react'
import Footer from './assets/Components/Headers/Footer.jsx'
import Navbar from './assets/Components/Headers/navbar.jsx'
import Landing from './assets/Components/Pages/Landing.jsx'
import RegisterPage from './assets/Components/Pages/Register.jsx'
import LoginPage from './assets/Components/Pages/Login.jsx'
import './App.css'

function App() {
  const [showAuthPage, setShowAuthPage] = useState(false)
  const [authMode, setAuthMode] = useState('login')

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
            <LoginPage onRegister={() => setAuthMode('register')} />
          ) : (
            <RegisterPage onLogin={() => setAuthMode('login')} />
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

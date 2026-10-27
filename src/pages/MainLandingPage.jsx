import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../assets/Components/Headers/navbar.jsx';
import Footer from '../assets/Components/Headers/Footer.jsx';
import Landing from '../assets/Components/Pages/Landing.jsx';
import Login from '../assets/Components/Pages/Login.jsx';
import Register from '../assets/Components/Pages/Register.jsx';

export const MainLandingPage = ({ initialAuthMode = null }) => {
  const [searchParams] = useSearchParams();
  const authQuery = searchParams.get('auth');

  const [showAuthPage, setShowAuthPage] = useState(
    Boolean(initialAuthMode || authQuery)
  );
  const [authMode, setAuthMode] = useState(
    initialAuthMode || authQuery || 'login'
  );

  useEffect(() => {
    if (initialAuthMode) {
      setAuthMode(initialAuthMode);
      setShowAuthPage(true);
    } else if (authQuery) {
      setAuthMode(authQuery);
      setShowAuthPage(true);
    }
  }, [initialAuthMode, authQuery]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fbfaf6]">
      <Navbar
        onAuthOpen={(mode = 'login') => {
          setAuthMode(mode);
          setShowAuthPage(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onLogin={() => {
          setAuthMode('login');
          setShowAuthPage(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onRegister={() => {
          setAuthMode('register');
          setShowAuthPage(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onHome={() => {
          setShowAuthPage(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <main className="flex-1">
        {showAuthPage ? (
          authMode === 'login' ? (
            <Login onRegister={() => setAuthMode('register')} />
          ) : (
            <Register onLogin={() => setAuthMode('login')} />
          )
        ) : (
          <Landing />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MainLandingPage;

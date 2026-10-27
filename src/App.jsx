import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Footer from './assets/Components/Headers/Footer.jsx';
import Navbar from './assets/Components/Headers/navbar.jsx';
import Landing from './assets/Components/Pages/Landing.jsx';
import RegisterPage from './assets/Components/Pages/Register.jsx';
import LoginPage from './assets/Components/Pages/Login.jsx';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import TenantFarmerLayout from './components/layout/TenantFarmerLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import { USER_ROLES, normalizeRole } from './constants/roles';
import './styles/marketplace.css';
import './App.css';

/**
 * Root Route handler:
 * - Redirects to /dashboard if valid Tenant Farmer session exists
 * - Otherwise redirects to /login
 */
function RootRoute() {
  const { isAuthenticated, user } = useMarketplace();
  const isTenantFarmer =
    isAuthenticated &&
    user &&
    normalizeRole(user.role || user.farmerType) === USER_ROLES.TENANT_FARMER;
  return <Navigate to={isTenantFarmer ? '/dashboard' : '/login'} replace />;
}


/**
 * Public Landing Portal wrapper
 */
function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useMarketplace();

  return (
    <>
      <Navbar
        onAuthOpen={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
        onHome={() => navigate('/landing')}
      />
      <main>
        <div
          style={{
            textAlign: 'center',
            padding: '10px 16px',
            background: '#dcfce7',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <span>🌾 Viewing RythuMitra Public Portal.</span>
          <button
            type="button"
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
            style={{
              background: '#15803d',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '5px 14px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {isAuthenticated ? 'Go to Tenant Farmer Dashboard →' : 'Sign In to Dashboard →'}
          </button>
        </div>
        <Landing />
      </main>
      <Footer />
    </>
  );
}

/**
 * Main Application Routing Shell
 */
function AppRoutes() {
  const navigate = useNavigate();

  return (
    <MarketplaceProvider
      onSwitchToAuth={() => navigate('/login', { replace: true })}
      onSwitchToLanding={() => navigate('/landing')}
    >
      <Routes>
        {/* Root Redirect: /dashboard if session exists, else /login */}
        <Route path="/" element={<RootRoute />} />

        {/* Public Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* Protected Tenant Farmer Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <TenantFarmerLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <TenantFarmerLayout />
            </ProtectedRoute>
          }
        />

        {/* Fallback for Unknown Routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MarketplaceProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

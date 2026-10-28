import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';
import { useTranslation } from './context/LanguageContext';

// Public & Landing Pages
import MainLandingPage from './pages/MainLandingPage';

// Farmer Dashboard (New from developement)
import Farmer from './assets/Components/Pages/Farmer.jsx';

// Landlord Farmland Dashboard
import LandlordDashboard from './assets/Components/Dashboard/LandlordDashboard';

// Service Provider Hub
import ServiceDashboard from './assets/Images/ServiceProvider/ServiceDsahboard';

// Tenant Farmer Portal & Authentication
import TenantFarmerLayout from './components/layout/TenantFarmerLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Buyer Portal Pages & Layout
import BuyerLayout from './components/layout/BuyerLayout';
import BuyerDashboard from './pages/BuyerDashboard';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CategoryListingPage from './pages/CategoryListingPage';
import FarmerListingPage from './pages/FarmerListingPage';
import FarmerDetailsPage from './pages/FarmerDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import PriceTrendsPage from './pages/PriceTrendsPage';
import MessagesPage from './pages/MessagesPage';
import ReviewsPage from './pages/ReviewsPage';
import NotificationsPage from './pages/NotificationsPage';
import AddressesPage from './pages/AddressesPage';
import SupportPage from './pages/SupportPage';
import SettingsPage from './pages/SettingsPage';

// Styles
import './styles/marketplace.css';
import './App.css';

function FarmerRoute() {
  const { language, setLanguage } = useTranslation();
  const navigate = useNavigate();
  const userName = sessionStorage.getItem('raithanna.username') || 'Farmer User';

  const handleLogout = () => {
    sessionStorage.removeItem('raithanna.username');
    sessionStorage.removeItem('accountRole');
    navigate('/');
  };

  const handleNavigateRole = (role) => {
    const roleRoutes = {
      'Farmer': '/farmer',
      'Tenant Farmer': '/dashboard',
      'Buyer': '/buyer/dashboard',
      'Service Provider': '/service-dashboard',
      'Landlord Farmer': '/landlord',
    };
    if (roleRoutes[role]) {
      navigate(roleRoutes[role]);
    }
  };

  const langCodeMap = {
    English: 'en',
    'తెలుగు': 'te',
    'ಕನ್ನಡ': 'kn',
    'हिन्दी': 'hi',
    'தமிழ்': 'ta',
    en: 'en',
    te: 'te',
    kn: 'kn',
    hi: 'hi',
    ta: 'ta',
  };
  const code = langCodeMap[language] || 'en';

  return (
    <Farmer
      language={code}
      onLanguageChange={(newCode) => {
        const revMap = { en: 'English', te: 'తెలుగు', kn: 'ಕನ್ನಡ', hi: 'हिन्दी', ta: 'தமிழ்' };
        setLanguage(revMap[newCode] || newCode);
      }}
      onNavigateRole={handleNavigateRole}
      onLogout={handleLogout}
      userName={userName}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MarketplaceProvider>
          <CartProvider>
            <FavoritesProvider>
              <ToastProvider>
                <Routes>
                  {/* 1. Public Landing & Auth Routes */}
                  <Route path="/" element={<MainLandingPage />} />
                  <Route path="/landing" element={<MainLandingPage />} />
                  <Route path="/login" element={<MainLandingPage initialAuthMode="login" />} />
                  <Route path="/register" element={<MainLandingPage initialAuthMode="register" />} />

                  {/* 2. Farmer Dashboard Route */}
                  <Route path="/farmer/*" element={<FarmerRoute />} />
                  <Route path="/farmer" element={<FarmerRoute />} />

                  {/* 3. Service Provider Hub Routes */}
                  <Route
                    path="/service-dashboard"
                    element={
                      <ServiceDashboard
                        onLogout={() => {
                          window.sessionStorage.removeItem('accountRole');
                          window.location.href = '/';
                        }}
                      />
                    }
                  />
                  <Route
                    path="/service-provider/*"
                    element={
                      <ServiceDashboard
                        onLogout={() => {
                          window.sessionStorage.removeItem('accountRole');
                          window.location.href = '/';
                        }}
                      />
                    }
                  />
                  <Route
                    path="/service-provider"
                    element={
                      <ServiceDashboard
                        onLogout={() => {
                          window.sessionStorage.removeItem('accountRole');
                          window.location.href = '/';
                        }}
                      />
                    }
                  />

                  {/* 4. Landlord Farmland Dashboard Routes */}
                  <Route
                    path="/landlord/*"
                    element={
                      <LandlordDashboard
                        onLogout={() => {
                          window.location.href = '/';
                        }}
                      />
                    }
                  />
                  <Route
                    path="/landlord"
                    element={
                      <LandlordDashboard
                        onLogout={() => {
                          window.location.href = '/';
                        }}
                      />
                    }
                  />

                  {/* 5. Tenant Farmer Dashboard Routes (Protected) */}
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
                  <Route
                    path="/tenant-farmer/*"
                    element={<Navigate to="/dashboard" replace />}
                  />
                  <Route
                    path="/tenant-farmer"
                    element={<Navigate to="/dashboard" replace />}
                  />

                  {/* 6. Buyer Portal with Shared Layout */}
                  <Route path="/buyer" element={<BuyerLayout />}>
                    <Route index element={<Navigate to="/buyer/dashboard" replace />} />
                    <Route path="dashboard" element={<BuyerDashboard />} />
                    <Route path="products" element={<ProductListingPage />} />
                    <Route path="products/:productId" element={<ProductDetailsPage />} />
                    <Route path="categories" element={<CategoryListingPage />} />
                    <Route path="farmers" element={<FarmerListingPage />} />
                    <Route path="farmers/:farmerId" element={<FarmerDetailsPage />} />
                    <Route path="favorites" element={<FavoritesPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="orders/:orderId" element={<OrderDetailsPage />} />
                    <Route path="price-trends" element={<PriceTrendsPage />} />
                    <Route path="messages" element={<MessagesPage />} />
                    <Route path="reviews" element={<ReviewsPage />} />
                    <Route path="notifications" element={<NotificationsPage />} />
                    <Route path="addresses" element={<AddressesPage />} />
                    <Route path="support" element={<SupportPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>

                  {/* 7. Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </ToastProvider>
            </FavoritesProvider>
          </CartProvider>
        </MarketplaceProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

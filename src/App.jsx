import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';

// Public & Landing Pages
import MainLandingPage from './pages/MainLandingPage';

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

                  {/* 2. Service Provider Hub Routes */}
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

                  {/* 3. Landlord Farmland Dashboard Routes */}
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

                  {/* 4. Tenant Farmer Dashboard Routes (Protected) */}
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
                    element={
                      <ProtectedRoute>
                        <TenantFarmerLayout />
                      </ProtectedRoute>
                    }
                  />

                  {/* 5. Buyer Portal with Shared Layout */}
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

                  {/* 6. Fallback */}
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

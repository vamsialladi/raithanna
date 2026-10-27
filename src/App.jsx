import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';

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
import MainLandingPage from './pages/MainLandingPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <ToastProvider>
              <Routes>
                {/* 1. Main Dashboard (First open - contains Navbar with Login and Register) */}
                <Route path="/" element={<MainLandingPage />} />
                <Route path="/login" element={<MainLandingPage initialAuthMode="login" />} />
                <Route path="/register" element={<MainLandingPage initialAuthMode="register" />} />

                {/* 2. Buyer Portal with Shared Layout (Navigated after selecting Buyer & logging in) */}
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

                {/* Fallback to Main Dashboard */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ToastProvider>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

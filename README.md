# RythuMitra — Buyer Dashboard & Agricultural Marketplace

**RythuMitra** is a modern, responsive agricultural marketplace frontend designed to connect buyers directly with verified local farmers in Telangana and Andhra Pradesh.

---

## 🌟 Visual Reproduction & UI Overview

The interface replicates the **RythuMitra Buyer Dashboard** reference design with high visual fidelity:

- **Primary Colors:** Primary Green (`#198754`), Dark Green (`#14532D`), Mint Soft Green (`#EAF7EF`).
- **Typography & Aesthetics:** Modern typography, subtle shadows (`shadow-xs` / `shadow-sm`), rounded-2xl cards, and clean borders.
- **Three-Section Dashboard Layout:**
  1. **Left Sidebar:**
     - Brand logo with sprout icon & tagline: *"Farmers • Markets • Better Tomorrow"*
     - Active green indicator for current route (`Dashboard`, `Browse Produce`, `My Orders [2]`, `Favorites`, `Farmers & Sellers`, `Price Trends`, `Messages [1]`, `Reviews & Ratings`, `Support & Help`, `Settings`)
     - Promotional bottom card: *"Fresh. Local. Direct from Farmers."* with vegetable basket visual and *"Explore Now →"* button.
  2. **Top Navigation Header:**
     - Comprehensive search bar with green search button
     - Delivery location selector (*"Hyderabad, Telangana"*)
     - Notification bell with unread badge (`3`) & interactive popover
     - Farmer messages bubble with badge (`1`)
     - Buyer profile pill (*Arjun Sharma*, Buyer) with dropdown menu
  3. **Main Content Stream:**
     - **Welcome Banner:** *"Welcome back, Arjun Sharma!"* with 4 feature pills (*Fresh & Natural*, *Fair Prices*, *Secure Payments*, *Track Orders*) and harvest basket.
     - **Dashboard Summary Cards (4):** Total Orders (`5`), Saved Farmers (`3`), Total Spent (`₹ 12,450`), Active Deliveries (`1`).
     - **Shop by Category:** 9 categories (*Fresh Vegetables, Fresh Fruits, Grains & Cereals, Dairy Products, Spices, Pulses, Oils & Seeds, Organic Products, Flowers*).
     - **Featured Products:** Tomato (`₹32/kg`), Green Chilli (`₹48/kg`), Onion (`₹28/kg`), Rice Non-Basmati (`₹42/kg`), Fresh Cow Milk (`₹58/ltr`) with heart favorites and *"Add to Cart"* buttons.
     - **Popular Farmers:** Verified farmer profile cards (*Ramesh Reddy, Lakshmi Devi, Suresh Kumar, Ravi Teja*).
     - **Latest Deals:** Seasonal offer card for *Fresh Mangoes (20% OFF)*.
     - **Quick Actions (4):** *Search Produce, Track Order, Contact Farmer, View Reports*.
     - **Bottom Banner:** *"Good Food. Healthy Life."* banner with *"Start Shopping →"* action.
  4. **Right Column Panels:**
     - **Why Buy from RythuMitra?** benefit highlights.
     - **My Cart:** Real-time quantity increment/decrement, dynamic subtotal recalculation, and *"Proceed to Checkout"*.
     - **Order Tracking:** 4-stage stepper (*Order Placed → Processing → Out for Delivery → Delivered*).
     - **Market Price Trends:** Interactive Recharts line chart tracking Tomato, Onion, and Green Chilli with `7 Days`, `30 Days`, and `3 Months` filters.

---

## 🛠 Technology Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4**
- **React Router DOM v7**
- **Lucide React** (icons)
- **Recharts** (interactive price trend analytics)
- **Axios** (centralized API client with interceptors)
- **Context API** (`AuthContext`, `CartContext`, `FavoritesContext`, `ToastContext`)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the project root (copied from `.env.example`):
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── layout/
│   │   ├── BuyerLayout.jsx
│   │   ├── BuyerSidebar.jsx
│   │   └── BuyerHeader.jsx
│   ├── dashboard/
│   │   ├── WelcomeBanner.jsx
│   │   ├── SummaryCards.jsx
│   │   ├── CategorySection.jsx
│   │   ├── FeaturedProducts.jsx
│   │   ├── PopularFarmers.jsx
│   │   ├── LatestDeals.jsx
│   │   ├── QuickActions.jsx
│   │   ├── WhyBuyCard.jsx
│   │   ├── CartSummary.jsx
│   │   ├── OrderTracking.jsx
│   │   ├── PriceTrendChart.jsx
│   │   └── BottomBanner.jsx
│   └── common/
│       └── ProductCard.jsx
├── pages/
│   ├── BuyerDashboard.jsx
│   ├── ProductListingPage.jsx
│   ├── ProductDetailsPage.jsx
│   ├── CategoryListingPage.jsx
│   ├── FarmerListingPage.jsx
│   ├── FarmerDetailsPage.jsx
│   ├── FavoritesPage.jsx
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   ├── OrdersPage.jsx
│   ├── OrderDetailsPage.jsx
│   ├── PriceTrendsPage.jsx
│   ├── MessagesPage.jsx
│   ├── ReviewsPage.jsx
│   ├── NotificationsPage.jsx
│   ├── AddressesPage.jsx
│   ├── SupportPage.jsx
│   ├── SettingsPage.jsx
│   ├── LoginPage.jsx
│   └── RegisterPage.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── FavoritesContext.jsx
│   └── ToastContext.jsx
├── services/
│   ├── apiClient.js
│   ├── productApi.js
│   └── apiServices.js
└── data/
    ├── mockCategories.js
    ├── mockProducts.js
    ├── mockFarmers.js
    ├── mockPriceTrends.js
    ├── mockOrders.js
    └── mockNotifications.js
```

---

## 🚦 End-to-End Buyer Journey

1. **Dashboard** (`/buyer/dashboard`) → Browse overview, summary statistics, real-time cart, and market price trends.
2. **Product Catalog** (`/buyer/products`) → Search, filter by 9 categories, toggle organic certification, and sort by price/rating.
3. **Product Details** (`/buyer/products/:productId`) → Inspect farm provenance, harvest date, nutritional benefits, select quantity, and add to cart.
4. **Cart & Review** (`/buyer/cart`) → Review items, apply promo codes (`RYTHU50`, `FARMER10`), and see free delivery thresholds.
5. **Checkout** (`/buyer/checkout`) → Select delivery address, choose morning/afternoon/evening delivery slot, pick payment method (UPI, Card, Net Banking, COD), and confirm order.
6. **Order Tracking** (`/buyer/orders/:orderId`) → Live 4-step stepper, driver contact, and invoice download.
7. **Direct Farmer Engagement** (`/buyer/farmers`, `/buyer/messages`) → View farmer acreage and bio, chat directly with farmers, and write product reviews.

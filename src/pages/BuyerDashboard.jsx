import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import SummaryCards from '../components/dashboard/SummaryCards';
import CategorySection from '../components/dashboard/CategorySection';
import FeaturedProducts from '../components/dashboard/FeaturedProducts';
import PopularFarmers from '../components/dashboard/PopularFarmers';
import LatestDeals from '../components/dashboard/LatestDeals';
import QuickActions from '../components/dashboard/QuickActions';
import BottomBanner from '../components/dashboard/BottomBanner';
import WhyBuyCard from '../components/dashboard/WhyBuyCard';
import CartSummary from '../components/dashboard/CartSummary';
import OrderTracking from '../components/dashboard/OrderTracking';
import PriceTrendChart from '../components/dashboard/PriceTrendChart';

export const BuyerDashboard = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 sm:gap-6">
      {/* Center Main Dashboard Stream (8 cols on XL, or 9 cols) */}
      <div className="xl:col-span-8 2xl:col-span-9 space-y-6">
        {/* Section 1: Welcome Banner */}
        <WelcomeBanner />

        {/* Section 2: Summary Cards (4 stats) */}
        <SummaryCards />

        {/* Section 3: Shop by Category */}
        <CategorySection />

        {/* Section 4: Featured Products */}
        <FeaturedProducts />

        {/* Section 5, 6, 7: Popular Farmers, Latest Deals, Quick Actions in a responsive row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6">
            <PopularFarmers />
          </div>
          <div className="lg:col-span-3">
            <LatestDeals />
          </div>
          <div className="lg:col-span-3">
            <QuickActions />
          </div>
        </div>

        {/* Section 11: Bottom Promotional Banner */}
        <BottomBanner />
      </div>

      {/* Right Column (4 cols on XL, or 3 cols on 2XL) */}
      <div className="xl:col-span-4 2xl:col-span-3 space-y-5">
        {/* Why Buy Card */}
        <WhyBuyCard />

        {/* Section 8: My Cart Panel */}
        <CartSummary />

        {/* Section 9: Order Tracking Panel */}
        <OrderTracking />

        {/* Section 10: Market Price Trends */}
        <PriceTrendChart />
      </div>
    </div>
  );
};

export default BuyerDashboard;

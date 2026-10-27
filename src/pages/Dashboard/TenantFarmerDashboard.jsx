import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import LeaseSummaryCards from '../../components/dashboard/LeaseSummaryCards';
import MyLeasesSection from '../../components/dashboard/MyLeasesSection';
import MyCropsProgress from '../../components/dashboard/MyCropsProgress';
import SeasonalEarningsChart from '../../components/dashboard/SeasonalEarningsChart';
import LandUsageChart from '../../components/dashboard/LandUsageChart';
import RecentlyViewedLand from '../../components/dashboard/RecentlyViewedLand';
import LatestNotifications from '../../components/dashboard/LatestNotifications';
import QuickActions from '../../components/dashboard/QuickActions';
import UpcomingTasks from '../../components/dashboard/UpcomingTasks';
import SoilPromoCard from '../../components/dashboard/SoilPromoCard';

export default function TenantFarmerDashboard() {
  const { setActiveModal } = useMarketplace();

  function handleSelectLease(lease) {
    setActiveModal({ type: 'lease', data: lease });
  }

  function handleSelectCrop(crop) {
    setActiveModal({ type: 'crop', data: crop });
  }

  function handleSelectLand(land) {
    setActiveModal({ type: 'land', data: land });
  }

  return (
    <div className="rm-dashboard-content">
      {/* 1. Welcome Banner */}
      <WelcomeBanner />

      {/* 2. Four Summary Cards */}
      <LeaseSummaryCards />

      {/* 3. Main Dashboard Layout (Left 2-Column Section + Right Column) */}
      <div className="rm-dashboard-grid-layout">
        {/* Left Section */}
        <div className="rm-main-left-column">
          {/* Row A: My Leases + My Crops & Progress */}
          <div className="rm-leases-crops-row">
            <MyLeasesSection onSelectLease={handleSelectLease} />
            <MyCropsProgress onSelectCrop={handleSelectCrop} />
          </div>

          {/* Row B: Seasonal Earnings + Land Usage */}
          <div className="rm-charts-row">
            <SeasonalEarningsChart />
            <LandUsageChart />
          </div>

          {/* Row C: Recently Viewed Land + Latest Notifications */}
          <div className="rm-land-notif-row">
            <RecentlyViewedLand onSelectLand={handleSelectLand} />
            <LatestNotifications />
          </div>
        </div>

        {/* Right Section */}
        <div className="rm-main-right-column">
          <QuickActions />
          <UpcomingTasks />
          <SoilPromoCard />
        </div>
      </div>
    </div>
  );
}

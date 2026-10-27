import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import FarmerSidebar from './FarmerSidebar';
import FarmerTopbar from './FarmerTopbar';
import TenantFarmerDashboard from '../../pages/Dashboard/TenantFarmerDashboard';
import MyLeasesPage from '../../pages/Leases/MyLeasesPage';
import MyCropsPage from '../../pages/Crops/MyCropsPage';
import TasksPage from '../../pages/Tasks/TasksPage';
import MarketPricesPage from '../../pages/MarketPrices/MarketPricesPage';
import EquipmentPage from '../../pages/Equipment/EquipmentPage';
import ServicesPage from '../../pages/Services/ServicesPage';
import MessagesPage from '../../pages/Messages/MessagesPage';
import NotificationsPage from '../../pages/Notifications/NotificationsPage';
import FarmerProfilePage from '../../pages/Profile/FarmerProfilePage';
import LandMarketplacePage from '../../pages/LandMarketplace/LandMarketplacePage';
import LandlordDashboard from '../../pages/Landlord/LandlordDashboard';
import BuyerDashboard from '../../pages/Buyer/BuyerDashboard';
import ServiceProviderDashboard from '../../pages/ServiceProvider/ServiceProviderDashboard';
import DetailsModal from '../common/DetailsModal';

export default function TenantFarmerLayout() {
  const { activeRoute, activeModule, toast } = useMarketplace();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  function renderPage() {
    // If a separate module is selected from the top vertical buttons:
    if (activeModule === 'landlord') {
      return <LandlordDashboard />;
    }
    if (activeModule === 'buyer') {
      return <BuyerDashboard />;
    }
    if (activeModule === 'service-provider') {
      return <ServiceProviderDashboard />;
    }

    // Default: Tenant Farmer module routes
    switch (activeRoute) {
      case 'leases':
        return <MyLeasesPage />;
      case 'crops':
        return <MyCropsPage />;
      case 'tasks':
        return <TasksPage />;
      case 'market-prices':
        return <MarketPricesPage />;
      case 'equipment':
        return <EquipmentPage />;
      case 'services':
        return <ServicesPage />;
      case 'messages':
        return <MessagesPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <FarmerProfilePage />;
      case 'land-marketplace':
        return <LandMarketplacePage />;
      case 'dashboard':
      default:
        return <TenantFarmerDashboard />;
    }
  }

  return (
    <div className="rythu-app">
      <div className="rythu-shell">
        {/* Left Sticky Sidebar */}
        <FarmerSidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="rythu-main-wrapper">
          <FarmerTopbar
            onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          />

          <main id="main-content" style={{ flex: 1 }}>
            {renderPage()}
          </main>
        </div>
      </div>

      {/* Global Interactive Detail Modal */}
      <DetailsModal />

      {/* Global Feedback Toast */}
      {toast && (
        <div className="rm-toast-container" role="status" aria-live="polite">
          <div className="rm-toast">
            <span>🌱</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

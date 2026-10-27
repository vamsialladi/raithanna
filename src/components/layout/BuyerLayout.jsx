import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BuyerSidebar from './BuyerSidebar';
import BuyerHeader from './BuyerHeader';

export const BuyerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FBF9] text-gray-800 antialiased font-sans">
      {/* Sidebar */}
      <BuyerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content wrapper */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <BuyerHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-3 sm:p-5 lg:p-6 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BuyerLayout;

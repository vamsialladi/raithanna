import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { HomeIcon, ShoppingCartIcon, TractorIcon } from './Icons';

export default function TopVerticalModules() {
  const { activeModule, switchModule } = useMarketplace();

  // The 3 separate modules requested by the user: Landlord, Buyer, Service Provider
  // Exactly "One Beside One On the Top" and styled like the reference green button
  // "Tenant Farmer" button is removed completely as requested.
  const modules = [
    {
      id: 'landlord',
      label: 'Landlord',
      icon: <HomeIcon className="w-4 h-4 text-white" />,
      title: 'Landlord Dashboard & Land Listings',
    },
    {
      id: 'buyer',
      label: 'Buyer',
      icon: <ShoppingCartIcon className="w-4 h-4 text-white" />,
      title: 'Buyer Marketplace & Crop Orders',
    },
    {
      id: 'service-provider',
      label: 'Service Provider',
      icon: <TractorIcon className="w-4 h-4 text-white" />,
      title: 'Agri Service Provider & Machinery Bookings',
    },
  ];

  const handleModuleClick = (modId) => {
    // If clicking the active module again, return to Tenant Farmer dashboard
    if (activeModule === modId) {
      switchModule('tenant-farmer');
    } else {
      switchModule(modId);
    }
  };

  return (
    <div
      className="rm-top-horizontal-modules"
      role="group"
      aria-label="RythuMitra Ecosystem Modules"
    >
      {modules.map((mod) => {
        const isActive = activeModule === mod.id;
        return (
          <button
            key={mod.id}
            type="button"
            className={`rm-green-module-btn ${isActive ? 'is-active' : ''}`}
            onClick={() => handleModuleClick(mod.id)}
            aria-pressed={isActive}
            title={isActive ? `Currently viewing ${mod.label} (click to return to Tenant Farmer)` : mod.title}
          >
            <span className="rm-btn-svg-icon" aria-hidden="true">
              {mod.icon}
            </span>
            <span className="rm-btn-text">{mod.label}</span>
          </button>
        );
      })}
    </div>
  );
}


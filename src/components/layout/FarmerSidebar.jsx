import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import {
  LeafLogoIcon,
  HomeIcon,
  FileTextIcon,
  SproutIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  TractorIcon,
  HeadsetIcon,
  ChatIcon,
  BellIcon,
  GearIcon,
  ArrowRightIcon,
  XIcon,
} from '../common/Icons';

export default function FarmerSidebar({ mobileOpen, onCloseMobile }) {
  const { activeRoute, navigateTo, summaryMetrics } = useMarketplace();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'leases', label: 'My Leases', icon: FileTextIcon, badge: summaryMetrics.activeLeasesCount },
    { id: 'crops', label: 'My Crops', icon: SproutIcon },
    { id: 'tasks', label: 'Tasks & Reminders', icon: CheckCircleIcon, badge: 1 },
    { id: 'market-prices', label: 'Market Prices', icon: TrendingUpIcon },
    { id: 'equipment', label: 'Equipment Booking', icon: TractorIcon },
    { id: 'services', label: 'Services & Support', icon: HeadsetIcon },
    { id: 'messages', label: 'Messages', icon: ChatIcon, badge: summaryMetrics.unreadMessages },
    { id: 'notifications', label: 'Notifications', icon: BellIcon, badge: summaryMetrics.unreadNotifications },
    { id: 'profile', label: 'Profile & Settings', icon: GearIcon },
  ];

  function handleNav(id) {
    navigateTo(id);
    if (onCloseMobile) onCloseMobile();
  }

  return (
    <aside
      className={`rythu-sidebar ${mobileOpen ? 'is-open' : ''}`}
      aria-label="Tenant farmer sidebar navigation"
    >
      {/* Brand Header */}
      <div className="rm-sidebar-brand">
        <LeafLogoIcon className="h-8 w-8 text-green-700 shrink-0" />
        <div>
          <div className="rm-brand-title">RythuMitra</div>
          <div className="rm-brand-tagline">Farmers • Markets • Better Tomorrow</div>
        </div>
        {mobileOpen && (
          <button
            type="button"
            className="md:hidden p-1 text-slate-500 hover:text-slate-900 ml-auto"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
          >
            <XIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Navigation List */}
      <nav className="rm-nav-section" aria-label="Tenant farmer navigation menu">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`rm-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && !isActive && (
                <span className="rm-nav-badge-red">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Promotional Card */}
      <div style={{ marginTop: 'auto' }}>
        <div
          className="rm-sidebar-grow-card"
          style={{ backgroundImage: 'url("/images/grow_promo.jpg")' }}
          role="button"
          tabIndex={0}
          onClick={() => handleNav('land-marketplace')}
          onKeyDown={(e) => e.key === 'Enter' && handleNav('land-marketplace')}
        >
          <div className="rm-sidebar-grow-overlay" />
          <div className="rm-sidebar-grow-content">
            <div className="rm-sidebar-grow-title">
              Grow with
              <br />
              RythuMitra
            </div>
            <div className="rm-sidebar-grow-sub">
              Better land. Better crops.
              <br />
              Better income.
            </div>
            <button
              type="button"
              className="rm-sidebar-grow-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleNav('land-marketplace');
              }}
            >
              <span>Find More Land</span>
              <ArrowRightIcon className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

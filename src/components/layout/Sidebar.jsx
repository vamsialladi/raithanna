import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import {
  LeafLogoIcon,
  HomeIcon,
  LeafIcon,
  GridIcon,
  BagIcon,
  BookmarkIcon,
  HandshakeIcon,
  StoreIcon,
  TruckIcon,
  CreditCardIcon,
  StarIcon,
  ChatIcon,
  ClipboardCheckIcon,
  HeadsetIcon,
  BookOpenIcon,
  ChevronRightIcon,
  XIcon,
} from '../common/Icons';

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  const { activeRoute, navigateTo, stats, savedItemIds } = useMarketplace();

  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'browse', label: 'Browse Produce', icon: LeafIcon },
    { id: 'categories', label: 'Categories', icon: GridIcon },
    { id: 'orders', label: 'My Orders', icon: BagIcon, badge: stats.totalOrders },
    { id: 'saved', label: 'Saved Items', icon: BookmarkIcon, badge: savedItemIds.length },
    { id: 'negotiations', label: 'Negotiations & Offers', icon: HandshakeIcon, badge: stats.activeNegotiations },
    { id: 'suppliers', label: 'Suppliers', icon: StoreIcon },
    { id: 'deliveries', label: 'Track Deliveries', icon: TruckIcon, badge: stats.deliveriesInTransit },
    { id: 'payments', label: 'Payments & Invoices', icon: CreditCardIcon },
    { id: 'reviews', label: 'Reviews & Ratings', icon: StarIcon },
    { id: 'chat', label: 'Chat with Farmers', icon: ChatIcon },
  ];

  const moreNav = [
    { id: 'traceability', label: 'Traceability', icon: ClipboardCheckIcon },
    { id: 'support', label: 'Support & Complaints', icon: HeadsetIcon },
    { id: 'learning', label: 'Learning & Resources', icon: BookOpenIcon },
  ];

  function handleNav(id) {
    navigateTo(id);
    if (onCloseMobile) onCloseMobile();
  }

  return (
    <aside
      className={`rythu-sidebar ${mobileOpen ? 'is-open' : ''}`}
      aria-label="Sidebar navigation"
    >
      <div className="rm-sidebar-brand">
        <LeafLogoIcon className="h-9 w-9 text-green-700" />
        <div style={{ flex: 1 }}>
          <div className="rm-brand-title">RythuMitra</div>
          <div className="rm-brand-tagline">Farmers Today, Brighter Tomorrow</div>
        </div>
        {mobileOpen && (
          <button
            type="button"
            className="md:hidden p-1 text-slate-500 hover:text-slate-900"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
          >
            <XIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="rm-nav-section">
        {mainNav.map((item) => {
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
              {item.badge !== undefined && (
                <span className="rm-nav-badge">{item.badge}</span>
              )}
            </button>
          );
        })}

        <div className="rm-nav-heading">MORE</div>

        {moreNav.map((item) => {
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
            </button>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <div
          className="rm-sidebar-promo"
          onClick={() => handleNav('browse')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNav('browse')}
        >
          <img
            src="/images/basket_promo.jpg"
            alt="Support Farmers Basket"
            className="rm-sidebar-promo-img"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80';
            }}
          />
          <div className="rm-sidebar-promo-text">
            Support Farmers
            <br />
            Choose Fresh
            <br />
            Choose Local
          </div>
          <div className="rm-sidebar-promo-arrow">
            <ChevronRightIcon className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </aside>
  );
}

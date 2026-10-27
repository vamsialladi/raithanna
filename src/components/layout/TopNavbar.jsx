import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import {
  MenuIcon,
  SearchIcon,
  MapPinIcon,
  GlobeIcon,
  BellIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
  XIcon,
} from '../common/Icons';

export default function TopNavbar({ onToggleMobileSidebar, onOpenCartModal }) {
  const {
    user,
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    selectedLanguage,
    setSelectedLanguage,
    notificationsCount,
    setNotificationsCount,
    cartItemCount,
    navigateTo,
    onSwitchToAuth,
    onSwitchToLanding,
  } = useMarketplace();

  const [locationOpen, setLocationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const sampleLocations = [
    'Hyderabad, Telangana',
    'Warangal, Telangana',
    'Nalgonda, Telangana',
    'Karimnagar, Telangana',
    'Nizamabad, Telangana',
    'Khammam, Telangana',
  ];

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('browse');
    }
  }

  return (
    <header className="rm-topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
        <button
          type="button"
          className="rm-icon-btn md:hidden"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle navigation menu"
        >
          <MenuIcon className="w-5 h-5 text-slate-700" />
        </button>

        {/* Global Search Bar */}
        <form
          className="rm-search-container"
          role="search"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="search"
            className="rm-search-input"
            placeholder="Search for fresh produce (e.g., rice, tomato, chilli...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search produce"
          />
          <button
            type="submit"
            className="rm-search-btn"
            aria-label="Submit search"
          >
            <SearchIcon className="w-4 h-4 text-white" />
          </button>
        </form>
      </div>

      {/* Top Navbar Actions */}
      <div className="rm-topbar-actions">
        {/* Location Selector */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="rm-action-chip"
            onClick={() => setLocationOpen(!locationOpen)}
            aria-expanded={locationOpen}
            aria-label="Select location"
          >
            <MapPinIcon className="w-4 h-4 text-slate-600" />
            <span style={{ fontWeight: 600 }}>{selectedLocation}</span>
            <ChevronDownIcon className="w-3.5 h-3.5 text-slate-400" />
          </button>
          {locationOpen && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                left: 0,
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                minWidth: '200px',
                zIndex: 50,
                padding: '6px',
              }}
            >
              {sampleLocations.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 12px',
                    fontSize: '0.82rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: selectedLocation === loc ? '#f0fdf4' : 'transparent',
                    color: selectedLocation === loc ? '#166534' : '#334155',
                    fontWeight: selectedLocation === loc ? 700 : 500,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setLocationOpen(false);
                  }}
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language Selector */}
        <button
          type="button"
          className="rm-action-chip"
          onClick={() => setSelectedLanguage((l) => (l === 'en' ? 'te' : 'en'))}
          aria-label="Toggle language"
        >
          <GlobeIcon className="w-4 h-4 text-slate-600" />
          <span style={{ fontWeight: 700 }}>
            {selectedLanguage === 'en' ? 'తెలుగు' : 'English'}
          </span>
          <span
            style={{
              fontSize: '0.68rem',
              background: '#e2e8f0',
              padding: '1px 5px',
              borderRadius: '4px',
              fontWeight: 800,
            }}
          >
            {selectedLanguage.toUpperCase()}
          </span>
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="rm-icon-btn"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-label="View notifications"
          >
            <BellIcon className="w-5 h-5 text-slate-700" />
            {notificationsCount > 0 && (
              <span className="rm-badge-count">{notificationsCount}</span>
            )}
          </button>
          {notificationsOpen && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                width: '300px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                zIndex: 50,
                padding: '14px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                  borderBottom: '1px solid #f1f5f9',
                  paddingBottom: '8px',
                }}
              >
                <span style={{ fontWeight: 750, fontSize: '0.88rem' }}>Notifications</span>
                <button
                  type="button"
                  style={{
                    fontSize: '0.72rem',
                    color: '#15803d',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                  onClick={() => setNotificationsCount(0)}
                >
                  Clear all
                </button>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#475569' }}>
                <div style={{ padding: '6px 0', borderBottom: '1px solid #f8fafc' }}>
                  <strong>Price Drop Alert:</strong> Hybrid Tomatoes now ₹32/kg from Rythu FPO.
                </div>
                <div style={{ padding: '6px 0', borderBottom: '1px solid #f8fafc' }}>
                  <strong>Order Update:</strong> ORD-8854 has departed dispatch hub.
                </div>
                <div style={{ padding: '6px 0' }}>
                  <strong>Negotiation:</strong> Rythu FPO accepted counter offer.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Shopping Cart */}
        <button
          type="button"
          className="rm-icon-btn"
          onClick={onOpenCartModal}
          aria-label="Open shopping cart"
        >
          <ShoppingCartIcon className="w-5 h-5 text-slate-700" />
          {cartItemCount > 0 && (
            <span className="rm-badge-count">{cartItemCount}</span>
          )}
        </button>

        {/* User Profile */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="rm-profile-btn"
            onClick={() => setProfileOpen(!profileOpen)}
            aria-expanded={profileOpen}
            aria-label="User account menu"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="rm-avatar"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
              }}
            />
            <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 750, color: '#0f172a' }}>
                {user.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }}>
                {user.role}
              </div>
            </div>
            <ChevronDownIcon className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileOpen && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                width: '230px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                zIndex: 50,
                padding: '8px',
              }}
            >
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontWeight: 750, fontSize: '0.88rem' }}>{user.name}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{user.email}</div>
              </div>

              <button
                type="button"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  fontSize: '0.82rem',
                  color: '#334155',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  borderRadius: '8px',
                }}
                onClick={() => {
                  setProfileOpen(false);
                  navigateTo('orders');
                }}
              >
                My Account & Purchases
              </button>

              <button
                type="button"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  fontSize: '0.82rem',
                  color: '#334155',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  borderRadius: '8px',
                }}
                onClick={() => {
                  setProfileOpen(false);
                  navigateTo('support');
                }}
              >
                Help & Support
              </button>

              <div style={{ height: '1px', background: '#f1f5f9', margin: '4px 0' }} />

              <button
                type="button"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  fontSize: '0.82rem',
                  color: '#15803d',
                  fontWeight: 600,
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  borderRadius: '8px',
                }}
                onClick={() => {
                  setProfileOpen(false);
                  if (onSwitchToLanding) onSwitchToLanding();
                }}
              >
                Switch to Landing Page
              </button>

              <button
                type="button"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  fontSize: '0.82rem',
                  color: '#dc2626',
                  fontWeight: 600,
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  borderRadius: '8px',
                }}
                onClick={() => {
                  setProfileOpen(false);
                  if (onSwitchToAuth) onSwitchToAuth();
                }}
              >
                Sign In Screen / Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

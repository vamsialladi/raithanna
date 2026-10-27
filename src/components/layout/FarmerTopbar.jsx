import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import {
  MenuIcon,
  SearchIcon,
  MapPinIcon,
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
} from '../common/Icons';
import TopVerticalModules from '../common/TopVerticalModules';

export default function FarmerTopbar({ onToggleMobileSidebar }) {
  const {
    user,
    logout,
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    summaryMetrics,
    navigateTo,
    onSwitchToAuth,
    onSwitchToLanding,
  } = useMarketplace();

  // Safe fallback mappings for authenticated farmer
  const farmerName = user?.farmerName || user?.name || 'Tenant Farmer';
  const farmerType = user?.farmerType || user?.role || 'Tenant Farmer';
  const farmerAvatar =
    user?.avatar ||
    user?.profileImage ||
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80';
  const farmerVillage = user?.village || user?.location || 'Telangana';


  const [locationOpen, setLocationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const sampleLocations = [
    'Hyderabad, Telangana',
    'Vikarabad, Telangana',
    'Sangareddy, Telangana',
    'Medak, Telangana',
    'Chevella, Telangana',
    'Rangareddy, Telangana',
  ];

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('land-marketplace');
    }
  }

  return (
    <header className="rm-topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
        <button
          type="button"
          className="rm-icon-btn-badge md:hidden"
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
          <SearchIcon className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="search"
            className="rm-search-input"
            placeholder="Search land, crops, tools, services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search dashboard"
          />
        </form>
      </div>

      {/* Topbar Actions */}
      <div className="rm-topbar-actions">
        {/* Vertical Module Buttons on the Top: Landlord, Buyer, Service Provider */}
        <TopVerticalModules />

        {/* Location Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="rm-location-btn"
            onClick={() => setLocationOpen(!locationOpen)}
            aria-expanded={locationOpen}
            aria-label="Select location"
          >
            <MapPinIcon className="w-4 h-4 text-green-700" />
            <span>{selectedLocation}</span>
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

        {/* Notifications Icon with Badge 3 */}
        <button
          type="button"
          className="rm-icon-btn-badge"
          onClick={() => navigateTo('notifications')}
          aria-label="Notifications"
        >
          <BellIcon className="w-5 h-5 text-slate-700" />
          {summaryMetrics.unreadNotifications > 0 && (
            <span className="rm-badge-count">
              {summaryMetrics.unreadNotifications}
            </span>
          )}
        </button>

        {/* Messages Icon with Badge 2 */}
        <button
          type="button"
          className="rm-icon-btn-badge"
          onClick={() => navigateTo('messages')}
          aria-label="Messages"
        >
          <ChatIcon className="w-5 h-5 text-slate-700" />
          {summaryMetrics.unreadMessages > 0 && (
            <span className="rm-badge-count">
              {summaryMetrics.unreadMessages}
            </span>
          )}
        </button>

        {/* Farmer Profile */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="rm-user-chip"
            onClick={() => setProfileOpen(!profileOpen)}
            aria-expanded={profileOpen}
            aria-label="Farmer profile menu"
          >
            <img
              src={farmerAvatar}
              alt={farmerName}
              className="rm-avatar-img"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
              }}
            />
            <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 750, color: '#0f172a' }}>
                {farmerName}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }}>
                {farmerType}
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
                border: '1px solid #e2e8e2',
                borderRadius: '14px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                zIndex: 50,
                padding: '8px',
              }}
            >
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontWeight: 750, fontSize: '0.88rem' }}>{farmerName}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  {farmerType} • {farmerVillage}
                </div>
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
                  navigateTo('profile');
                }}
              >
                Farmer Profile & Agronomics
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
                  navigateTo('leases');
                }}
              >
                My Leased Lands
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
                  if (logout) {
                    logout();
                  } else if (onSwitchToAuth) {
                    onSwitchToAuth();
                  }
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

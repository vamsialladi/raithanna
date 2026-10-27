import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import {
  MapPinIcon,
  FileTextIcon,
  SproutIcon,
  RupeeIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '../../components/common/Icons';

export default function LandlordDashboard() {
  const { showToast, switchModule } = useMarketplace();

  const parcels = [
    {
      id: 'LND-LL-1',
      name: 'North Field',
      survey: 'SY-42/A',
      area: '2.5 Acres',
      location: 'Vikarabad, Telangana',
      status: 'Leased Out',
      tenant: 'Ravi Teja',
      crop: 'Paddy (Kharif)',
      rent: '₹ 22,500',
      period: 'Apr 1, 2025 - Sep 30, 2025',
      payment: 'Received',
    },
    {
      id: 'LND-LL-2',
      name: 'East Field',
      survey: 'SY-78/B',
      area: '2.0 Acres',
      location: 'Sangareddy, Telangana',
      status: 'Leased Out',
      tenant: 'Ravi Teja',
      crop: 'Maize (Rabi)',
      rent: '₹ 17,000',
      period: 'Nov 1, 2024 - Mar 31, 2025',
      payment: 'Received',
    },
    {
      id: 'LND-LL-3',
      name: 'West Field',
      survey: 'SY-104/C',
      area: '3.0 Acres',
      location: 'Vikarabad, Telangana',
      status: 'Available',
      tenant: 'None',
      crop: 'Arable Farmland',
      rent: '₹ 27,600 (Expected)',
      period: 'Ready for Immediate Lease',
      payment: 'Vacant',
    },
    {
      id: 'LND-LL-4',
      name: 'South Field',
      survey: 'SY-31/1',
      area: '1.0 Acre',
      location: 'Medak, Telangana',
      status: 'Available',
      tenant: 'None',
      crop: 'Red Loam Soil',
      rent: '₹ 8,000 (Expected)',
      period: 'Ready for Immediate Lease',
      payment: 'Vacant',
    },
  ];

  const inquiries = [
    {
      id: 'INQ-101',
      farmer: 'Mallesh K.',
      land: 'West Field (3.0 Acres)',
      offeredRent: '₹ 9,000 / acre',
      plannedCrop: 'Cotton / Millets',
      time: 'Yesterday',
    },
    {
      id: 'INQ-102',
      farmer: 'Ramesh Reddy',
      land: 'South Field (1.0 Acre)',
      offeredRent: '₹ 8,000 / acre',
      plannedCrop: 'Vegetables (Tomato)',
      time: '2 days ago',
    },
  ];

  return (
    <div className="rm-dashboard-content">
      {/* Module Navigation Return Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #e2f5e5 100%)',
          border: '1px solid #bbf7d0',
          borderRadius: '12px',
          padding: '10px 16px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
          <span style={{ fontSize: '1.2rem' }}>🏛️</span>
          <strong>Landlord Portal</strong>
          <span style={{ color: '#64748b' }}>• Farmland Ownership & Lease Management</span>
        </div>
        <button
          type="button"
          onClick={() => switchModule('tenant-farmer')}
          style={{
            background: '#15803d',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '5px 12px',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          ← Return to Tenant Farmer Dashboard
        </button>
      </div>

      {/* Summary Cards */}
      <div className="rm-summary-cards-row">
        <div className="rm-summary-card">
          <div className="rm-summary-label">Total Land Owned</div>
          <div className="rm-summary-value">8.5 Acres</div>
          <div className="rm-summary-subtext">Across 4 registered survey plots</div>
        </div>
        <div className="rm-summary-card">
          <div className="rm-summary-label">Currently Leased Out</div>
          <div className="rm-summary-value" style={{ color: '#15803d' }}>
            4.5 Acres
          </div>
          <div className="rm-summary-subtext">Active leases with Ravi Teja</div>
        </div>
        <div className="rm-summary-card">
          <div className="rm-summary-label">Available for Lease</div>
          <div className="rm-summary-value" style={{ color: '#d97706' }}>
            4.0 Acres
          </div>
          <div className="rm-summary-subtext">West Field & South Field</div>
        </div>
        <div className="rm-summary-card">
          <div className="rm-summary-label">Total Lease Rent Collected</div>
          <div className="rm-summary-value" style={{ color: '#9333ea' }}>
            ₹ 39,500
          </div>
          <div className="rm-summary-subtext">100% on-time payment record</div>
        </div>
      </div>

      {/* Grid of Owned Parcels & Inquiries */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: '20px' }}>
        {/* Left: Registered Farmland Plots */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
          <div className="rm-panel-header" style={{ marginBottom: '14px' }}>
            <h2 className="rm-panel-title">Owned Farmland Parcels & Lease Status</h2>
            <button
              type="button"
              className="rm-add-cart-btn"
              style={{ width: 'auto', padding: '6px 14px', fontSize: '0.78rem' }}
              onClick={() => showToast('New land parcel registration form initiated.')}
            >
              + List New Parcel
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {parcels.map((p) => (
              <div
                key={p.id}
                style={{
                  border: '1px solid #f1f5f9',
                  borderRadius: '12px',
                  padding: '14px',
                  background: p.status === 'Leased Out' ? '#fcfdfc' : '#ffffff',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '0.98rem', fontWeight: 800, margin: 0 }}>
                      {p.name} ({p.area})
                    </h3>
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Survey: {p.survey}</span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 750,
                      padding: '2px 8px',
                      borderRadius: '999px',
                      background: p.status === 'Leased Out' ? '#dcfce7' : '#fef3c7',
                      color: p.status === 'Leased Out' ? '#15803d' : '#b45309',
                    }}
                  >
                    {p.status}
                  </span>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '8px' }}>
                  <MapPinIcon className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                  {p.location} • Tenant: <strong>{p.tenant}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>Lease Agreement: </span>
                    <strong>{p.rent}</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      className="rm-outline-btn"
                      onClick={() => showToast(`Lease deed downloaded for ${p.name}.`)}
                    >
                      View Deed
                    </button>
                    {p.status === 'Available' && (
                      <button
                        type="button"
                        className="rm-add-cart-btn"
                        style={{ width: 'auto', padding: '4px 10px', fontSize: '0.72rem' }}
                        onClick={() => showToast(`Published ${p.name} to RythuMitra marketplace!`)}
                      >
                        Publish Listing
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Tenant Farmer Inquiries */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', height: 'fit-content' }}>
          <div className="rm-panel-header" style={{ marginBottom: '14px' }}>
            <h2 className="rm-panel-title">Pending Tenant Inquiries</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '12px',
                  background: '#f8fafc',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.88rem' }}>{inq.farmer}</strong>
                  <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{inq.time}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 600, marginTop: '2px' }}>
                  Target: {inq.land}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#475569', marginTop: '2px' }}>
                  Offer: <strong>{inq.offeredRent}</strong> • Crop: {inq.plannedCrop}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <button
                    type="button"
                    className="rm-add-cart-btn"
                    style={{ flex: 1, padding: '6px', fontSize: '0.72rem' }}
                    onClick={() => showToast(`Accepted lease inquiry from ${inq.farmer}!`)}
                  >
                    Accept & Draft Lease
                  </button>
                  <button
                    type="button"
                    className="rm-outline-btn"
                    style={{ flex: 1, padding: '6px', fontSize: '0.72rem' }}
                    onClick={() => showToast(`Declined inquiry from ${inq.farmer}.`)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

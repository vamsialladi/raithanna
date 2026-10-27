import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { TractorIcon, MapPinIcon } from '../../components/common/Icons';

export default function EquipmentPage() {
  const { equipmentList, showToast } = useMarketplace();

  return (
    <div className="rm-dashboard-content">
      <div className="rm-panel-header" style={{ marginBottom: '18px' }}>
        <div>
          <h1 className="rm-panel-title" style={{ fontSize: '1.5rem' }}>
            Farm Equipment & Machinery Booking
          </h1>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
            Rent vetted tractors, drone sprayers, harvesters, and land levellers with verified operators.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {equipmentList.map((eq) => (
          <div
            key={eq.id}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#eaf8ec',
                  color: '#15803d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TractorIcon className="w-5 h-5" />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>{eq.category}</span>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>{eq.name}</h3>
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '12px' }}>
              <MapPinIcon className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
              Location: <strong>{eq.location}</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '14px', marginTop: 'auto' }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#15803d' }}>
                ₹ {eq.ratePerHour}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>/ hour (with operator)</span>
            </div>

            <button
              type="button"
              className="rm-add-cart-btn"
              disabled={!eq.available}
              style={{
                background: eq.available ? '#16a34a' : '#cbd5e1',
                cursor: eq.available ? 'pointer' : 'not-allowed',
              }}
              onClick={() => showToast(`Booking request for ${eq.name} sent to ${eq.location}!`)}
            >
              {eq.available ? 'Book for Slot' : 'Currently Rented Out'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

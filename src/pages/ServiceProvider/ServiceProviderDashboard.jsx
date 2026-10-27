import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import {
  TractorIcon,
  FlaskIcon,
  CheckCircleIcon,
  MapPinIcon,
  ArrowRightIcon,
} from '../../components/common/Icons';

export default function ServiceProviderDashboard() {
  const { showToast, switchModule } = useMarketplace();

  const fleet = [
    {
      id: 'FL-01',
      name: 'Mahindra 575 DI Tractor',
      category: 'Tractors',
      operator: 'Suresh Kumar',
      status: 'On Mission (Chevella)',
      statusColor: '#15803d',
      bg: '#dcfce7',
      rate: '₹ 650/hr',
    },
    {
      id: 'FL-02',
      name: '16L Agri Drone Sprayer',
      category: 'Drone Protection',
      operator: 'Vikas Rao',
      status: 'Dispatched (Vikarabad)',
      statusColor: '#0284c7',
      bg: '#e0f2fe',
      rate: '₹ 450/hr',
    },
    {
      id: 'FL-03',
      name: 'Multi-Crop Paddy Thresher',
      category: 'Harvesting',
      operator: 'Ramesh G.',
      status: 'Available at Depot',
      statusColor: '#15803d',
      bg: '#dcfce7',
      rate: '₹ 800/hr',
    },
    {
      id: 'FL-04',
      name: 'Laser Land Leveller',
      category: 'Land Prep',
      operator: 'None (In Maintenance)',
      status: 'Routine Maintenance',
      statusColor: '#b45309',
      bg: '#fef3c7',
      rate: '₹ 950/hr',
    },
  ];

  const labQueue = [
    {
      id: 'LAB-401',
      farmer: 'Ravi Teja',
      land: 'North Field (2.5 Acres)',
      test: 'Complete NPK & Soil Health Card',
      status: 'In Spectrophotometer Analysis',
      time: 'Expected: 4:00 PM Today',
    },
    {
      id: 'LAB-402',
      farmer: 'G. Narayana Rao',
      land: 'West Field (3.0 Acres)',
      test: 'Salinity & Organic Carbon Audit',
      status: 'Sample Registered & Drying',
      time: 'Expected: Tomorrow',
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
          <span style={{ fontSize: '1.2rem' }}>🛠️</span>
          <strong>Service Provider Hub</strong>
          <span style={{ color: '#64748b' }}>• Farm Machinery Fleet, Drone Missions & Soil Lab Operations</span>
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

      {/* Summary Metrics */}
      <div className="rm-summary-cards-row">
        <div className="rm-summary-card">
          <div className="rm-summary-label">Machinery in Fleet</div>
          <div className="rm-summary-value">6 Units</div>
          <div className="rm-summary-subtext">4 Tractors, 1 Drone, 1 Harvester</div>
        </div>
        <div className="rm-summary-card">
          <div className="rm-summary-label">Active Field Missions</div>
          <div className="rm-summary-value" style={{ color: '#15803d' }}>
            4 Booked
          </div>
          <div className="rm-summary-subtext">Operators deployed across 2 mandals</div>
        </div>
        <div className="rm-summary-card">
          <div className="rm-summary-label">Soil Lab Samples</div>
          <div className="rm-summary-value" style={{ color: '#0284c7' }}>
            8 In Queue
          </div>
          <div className="rm-summary-subtext">NPK testing & micronutrient profiling</div>
        </div>
        <div className="rm-summary-card">
          <div className="rm-summary-label">Monthly Service Billings</div>
          <div className="rm-summary-value" style={{ color: '#9333ea' }}>
            ₹ 46,200
          </div>
          <div className="rm-summary-subtext">Direct escrow settlements</div>
        </div>
      </div>

      {/* Main Grid: Machinery Fleet + Soil Lab Queue */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
        {/* Left: Machinery Fleet Dispatch */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
          <div className="rm-panel-header" style={{ marginBottom: '14px' }}>
            <h2 className="rm-panel-title">Machinery Fleet & Operator Status</h2>
            <button
              type="button"
              className="rm-add-cart-btn"
              style={{ width: 'auto', padding: '6px 14px', fontSize: '0.78rem' }}
              onClick={() => showToast('New machine registration form opened.')}
            >
              + Add Machine
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {fleet.map((m) => (
              <div
                key={m.id}
                style={{
                  border: '1px solid #f1f5f9',
                  borderRadius: '12px',
                  padding: '14px',
                  background: '#fcfdfc',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: '#eaf8ec',
                    color: '#15803d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <TractorIcon className="w-5 h-5" />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>{m.name}</h3>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 750,
                        padding: '2px 7px',
                        borderRadius: '999px',
                        background: m.bg,
                        color: m.statusColor,
                      }}
                    >
                      {m.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                    Operator: <strong>{m.operator}</strong> • Rate: <strong>{m.rate}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="rm-outline-btn"
                  onClick={() => showToast(`Dispatched operator instructions for ${m.name}.`)}
                >
                  Manage Slot
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Soil Testing Lab Queue */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', height: 'fit-content' }}>
          <div className="rm-panel-header" style={{ marginBottom: '14px' }}>
            <h2 className="rm-panel-title">Soil Lab Testing Queue</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {labQueue.map((item) => (
              <div
                key={item.id}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '12px',
                  background: '#f8fafc',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FlaskIcon className="w-4 h-4 text-purple-600" />
                    <strong style={{ fontSize: '0.88rem' }}>{item.farmer}</strong>
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#64748b' }}>{item.id}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 600, marginTop: '3px' }}>
                  {item.land}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#475569', marginTop: '2px' }}>
                  Test: {item.test}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 600, marginTop: '4px' }}>
                  {item.status} ({item.time})
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <button
                    type="button"
                    className="rm-add-cart-btn"
                    style={{ flex: 1, padding: '6px', fontSize: '0.72rem' }}
                    onClick={() => showToast(`Generated Soil Health Report for ${item.farmer}!`)}
                  >
                    Upload Report Card
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

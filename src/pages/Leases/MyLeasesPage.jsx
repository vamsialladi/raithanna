import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import {
  FileTextIcon,
  MapPinIcon,
  SproutIcon,
  CalendarIcon,
  RupeeIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '../../components/common/Icons';

export default function MyLeasesPage() {
  const { leases, setActiveModal, showToast } = useMarketplace();
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = leases.filter((l) =>
    filterStatus === 'All' ? true : l.leaseStatus === filterStatus
  );

  return (
    <div className="rm-dashboard-content">
      <div className="rm-panel-header" style={{ marginBottom: '18px' }}>
        <div>
          <h1 className="rm-panel-title" style={{ fontSize: '1.5rem' }}>
            My Leased Lands & Agreements
          </h1>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
            Manage active agricultural lease contracts, survey numbers, and landowner agreements.
          </p>
        </div>

        <button
          type="button"
          className="rm-add-cart-btn"
          style={{ width: 'auto', padding: '10px 18px' }}
          onClick={() => showToast('Lease renewal request sent to landowner for review.')}
        >
          <span>Renew Active Lease</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {['All', 'Active', 'Past / Expired'].map((st) => (
          <button
            key={st}
            type="button"
            className="rm-outline-btn"
            style={{
              background: filterStatus === st ? '#16a34a' : 'transparent',
              color: filterStatus === st ? '#ffffff' : '#16a34a',
            }}
            onClick={() => setFilterStatus(st)}
          >
            {st}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '16px' }}>
        {filtered.map((lease) => (
          <div
            key={lease.leaseId}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
              <img
                src={lease.image}
                alt={lease.landName}
                style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="rm-lease-badge-active">{lease.leaseStatus}</span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                    {lease.landName}
                  </h3>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                  <MapPinIcon className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                  {lease.location} (Survey: {lease.surveyNumber})
                </div>
                <div style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 600, marginTop: '2px' }}>
                  <SproutIcon className="w-3.5 h-3.5 inline mr-1" />
                  {lease.cropAssociated}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                  <CalendarIcon className="w-3.5 h-3.5 inline mr-1" />
                  {lease.leasePeriod}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                background: '#f8fafc',
                padding: '10px',
                borderRadius: '10px',
                textAlign: 'center',
                marginBottom: '14px',
              }}
            >
              <div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Area</div>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>
                  {lease.area} {lease.areaUnit}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Rate / Acre</div>
                <div style={{ fontWeight: 800, color: '#15803d', fontSize: '0.9rem' }}>
                  ₹ {lease.rentPerAcre.toLocaleString()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Total Rent</div>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>
                  ₹ {lease.totalLeaseRent.toLocaleString()}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                Landowner: <strong>{lease.landOwnerName}</strong>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="rm-outline-btn"
                  onClick={() => setActiveModal({ type: 'lease', data: lease })}
                >
                  View Details
                </button>
                <button
                  type="button"
                  className="rm-outline-btn"
                  style={{ background: '#f0fdf4', borderColor: '#86efac' }}
                  onClick={() => showToast(`Agreement PDF downloaded for ${lease.landName}.`)}
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

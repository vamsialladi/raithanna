import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import {
  MapPinIcon,
  SproutIcon,
  CalendarIcon,
  ArrowRightIcon,
} from '../common/Icons';

export default function MyLeasesSection({ onSelectLease }) {
  const { leases, navigateTo } = useMarketplace();

  return (
    <div>
      <div className="rm-panel-header">
        <h2 className="rm-panel-title">My Leases</h2>
        <button
          type="button"
          className="rm-panel-view-all"
          onClick={() => navigateTo('leases')}
        >
          <span>View All</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      <div>
        {leases.map((lease) => (
          <div key={lease.leaseId} className="rm-lease-card">
            <img
              src={lease.image}
              alt={lease.landName}
              className="rm-lease-thumb"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=300&q=80';
              }}
            />

            <div className="rm-lease-content">
              <div className="rm-lease-title-row">
                <span className="rm-lease-badge-active">{lease.leaseStatus}</span>
                <span className="rm-lease-title">
                  {lease.landName} ({lease.area} {lease.areaUnit})
                </span>
              </div>

              <div className="rm-lease-meta-row">
                <MapPinIcon className="w-3.5 h-3.5 text-slate-500" />
                <span>{lease.location}</span>
              </div>

              <div className="rm-lease-meta-row">
                <SproutIcon className="w-3.5 h-3.5 text-green-700" />
                <span>{lease.cropAssociated}</span>
              </div>

              <div className="rm-lease-meta-row">
                <CalendarIcon className="w-3.5 h-3.5 text-slate-500" />
                <span>Lease Period: {lease.leasePeriod}</span>
              </div>
            </div>

            <div className="rm-lease-right-pricing">
              <button
                type="button"
                className="rm-outline-btn"
                onClick={() => (onSelectLease ? onSelectLease(lease) : navigateTo('leases'))}
              >
                View Details
              </button>

              <div style={{ textAlign: 'right', marginTop: 'auto' }}>
                <div className="rm-lease-rate">
                  ₹ {lease.rentPerAcre.toLocaleString()} / acre
                </div>
                <div className="rm-lease-total">
                  Total: ₹ {lease.totalLeaseRent.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

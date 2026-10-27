import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ArrowRightIcon } from '../common/Icons';

export default function RecentlyViewedLand({ onSelectLand }) {
  const { recentlyViewedLand, navigateTo } = useMarketplace();

  return (
    <div>
      <div className="rm-panel-header">
        <h2 className="rm-panel-title">Recently Viewed Land</h2>
        <button
          type="button"
          className="rm-panel-view-all"
          onClick={() => navigateTo('land-marketplace')}
        >
          <span>View All</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="rm-recent-land-grid">
        {recentlyViewedLand.map((land) => (
          <div key={land.landId} className="rm-recent-land-card">
            <img
              src={land.image}
              alt={land.landName}
              className="rm-recent-land-img"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=250&q=80';
              }}
            />
            <div className="rm-recent-land-body">
              <div className="rm-recent-land-name">{land.landName}</div>
              <div className="rm-recent-land-meta">
                {land.area} {land.areaUnit} | {land.location}
              </div>

              <div className="rm-recent-land-bottom">
                <span className={`rm-land-badge ${land.statusType}`}>
                  {land.status}
                </span>

                <button
                  type="button"
                  className="rm-recent-view-link"
                  onClick={() =>
                    onSelectLand ? onSelectLand(land) : navigateTo('land-marketplace')
                  }
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

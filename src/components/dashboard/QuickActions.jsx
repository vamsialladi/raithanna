import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import {
  LeafIcon,
  TractorIcon,
  UserIcon,
  SackIcon,
} from '../common/Icons';
export { BuyerQuickActions } from './BuyerQuickActions';

export default function QuickActions() {
  const { navigateTo } = useMarketplace();

  const actions = [
    {
      id: 'find-land',
      label: 'Find Land For Lease',
      icon: LeafIcon,
      route: 'land-marketplace',
      bg: '#eaf8ec',
      color: '#15803d',
    },
    {
      id: 'equipment',
      label: 'Book Equipment & Machinery',
      icon: TractorIcon,
      route: 'equipment',
      bg: '#eaf8ec',
      color: '#15803d',
    },
    {
      id: 'services',
      label: 'Request Services (Soil Testing, etc.)',
      icon: UserIcon,
      route: 'services',
      bg: '#eaf8ec',
      color: '#15803d',
    },
    {
      id: 'prices',
      label: 'Check Market Prices',
      icon: SackIcon,
      route: 'market-prices',
      bg: '#eaf8ec',
      color: '#15803d',
    },
  ];

  return (
    <div className="rm-right-card">
      <div className="rm-panel-header" style={{ marginBottom: '10px' }}>
        <h2 className="rm-panel-title">Quick Actions</h2>
      </div>

      <div className="rm-quick-actions-2x2">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <div
              key={act.id}
              className="rm-quick-action-box"
              onClick={() => navigateTo(act.route)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigateTo(act.route)}
            >
              <div
                className="rm-quick-action-box-icon"
                style={{ background: act.bg, color: act.color }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="rm-quick-action-box-lbl">{act.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

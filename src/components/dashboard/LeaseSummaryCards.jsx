import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import {
  UsersIcon,
  SproutIcon,
  SackIcon,
  RupeeIcon,
  ArrowRightIcon,
} from '../common/Icons';

export default function LeaseSummaryCards() {
  const { summaryMetrics, navigateTo } = useMarketplace();

  const cards = [
    {
      id: 'active-leases',
      label: 'Active Leases',
      value: summaryMetrics.activeLeasesCount,
      unit: '',
      subtext: '',
      actionText: 'View Details',
      actionRoute: 'leases',
      icon: UsersIcon,
      bgColor: '#eaf8ec',
      textColor: '#15803d',
    },
    {
      id: 'total-land',
      label: 'Total Land Area',
      value: `${summaryMetrics.totalLandArea}`,
      unit: 'Acres',
      subtext: '',
      actionText: 'View Land',
      actionRoute: 'leases',
      icon: SproutIcon,
      bgColor: '#e0f2fe',
      textColor: '#0284c7',
    },
    {
      id: 'current-crops',
      label: 'Current Crops',
      value: summaryMetrics.currentCropsCount,
      unit: '',
      subtext: '',
      actionText: 'View Crops',
      actionRoute: 'crops',
      icon: SackIcon,
      bgColor: '#fef3c7',
      textColor: '#d97706',
    },
    {
      id: 'monthly-rent',
      label: 'Total Monthly Rent',
      value: `₹ ${summaryMetrics.totalMonthlyRent.toLocaleString()}`,
      unit: '',
      subtext: '(₹ 9,000 / acre)',
      actionText: 'View Payments',
      actionRoute: 'leases',
      icon: RupeeIcon,
      bgColor: '#f3e8ff',
      textColor: '#9333ea',
    },
  ];

  return (
    <div className="rm-summary-cards-row">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="rm-summary-card"
            onClick={() => navigateTo(card.actionRoute)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigateTo(card.actionRoute)}
          >
            <div className="rm-summary-top-row">
              <div
                className="rm-summary-icon-wrap"
                style={{ background: card.bgColor, color: card.textColor }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="rm-summary-label">{card.label}</div>
            </div>

            <div className="rm-summary-val-row">
              <span className="rm-summary-value">{card.value}</span>
              {card.unit && (
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#334155' }}>
                  {card.unit}
                </span>
              )}
              {card.subtext && (
                <span className="rm-summary-subtext">{card.subtext}</span>
              )}
            </div>

            <button
              type="button"
              className="rm-summary-action"
              style={{ color: card.textColor }}
              onClick={(e) => {
                e.stopPropagation();
                navigateTo(card.actionRoute);
              }}
            >
              <span>{card.actionText}</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

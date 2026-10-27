import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import {
  RupeeIcon,
  SproutIcon,
  FlaskIcon,
  TrendingUpIcon,
  ArrowRightIcon,
} from '../common/Icons';

export default function LatestNotifications() {
  const { notifications, markNotificationRead, navigateTo } = useMarketplace();

  function getIcon(category) {
    if (category === 'payment') {
      return { icon: RupeeIcon, bg: '#dcfce7', color: '#15803d' };
    }
    if (category === 'land') {
      return { icon: SproutIcon, bg: '#fef3c7', color: '#d97706' };
    }
    if (category === 'service') {
      return { icon: FlaskIcon, bg: '#e0f2fe', color: '#0284c7' };
    }
    return { icon: TrendingUpIcon, bg: '#f3e8ff', color: '#9333ea' };
  }

  return (
    <div className="rm-chart-card">
      <div className="rm-panel-header" style={{ marginBottom: '6px' }}>
        <h2 className="rm-panel-title">Latest Notifications</h2>
        <button
          type="button"
          className="rm-panel-view-all"
          onClick={() => navigateTo('notifications')}
        >
          <span>View All</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {notifications.slice(0, 4).map((notif) => {
          const style = getIcon(notif.category);
          const Icon = style.icon;

          return (
            <div
              key={notif.id}
              className="rm-notif-item"
              onClick={() => markNotificationRead(notif.id)}
              style={{ cursor: 'pointer' }}
            >
              <div
                className="rm-notif-icon-circle"
                style={{ background: style.bg, color: style.color }}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="rm-notif-title">{notif.title}</div>
                <div className="rm-notif-desc">{notif.description}</div>
              </div>

              <div className="rm-notif-time">{notif.timestamp}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

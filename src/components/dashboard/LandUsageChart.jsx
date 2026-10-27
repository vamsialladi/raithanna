import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';

export default function LandUsageChart() {
  const { landUsage } = useMarketplace();

  // Calculate SVG strokeDasharray for doughnut
  // Circumference = 2 * PI * r = 2 * 3.14159 * 42 = 263.89
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  const paddyPercent = 56;
  const maizePercent = 44;

  const paddyDash = (paddyPercent / 100) * circumference;
  const maizeDash = (maizePercent / 100) * circumference;
  const paddyOffset = 0;
  const maizeOffset = -paddyDash;

  return (
    <div className="rm-chart-card">
      <div className="rm-panel-header" style={{ marginBottom: '8px' }}>
        <h2 className="rm-panel-title">Land Usage</h2>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          flex: 1,
          padding: '10px 0',
        }}
      >
        {/* Doughnut Chart */}
        <div style={{ position: 'relative', width: '130px', height: '130px' }}>
          <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#f1f5f9"
              strokeWidth="15"
            />
            {/* Maize slice (Yellow) */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#eab308"
              strokeWidth="15"
              strokeDasharray={`${maizeDash} ${circumference}`}
              strokeDashoffset={maizeOffset}
            />
            {/* Paddy slice (Green) */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#15803d"
              strokeWidth="15"
              strokeDasharray={`${paddyDash} ${circumference}`}
              strokeDashoffset={paddyOffset}
            />
          </svg>

          {/* Center text: 4.5 Acres */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontSize: '1.15rem', fontWeight: 850, color: '#0f172a', lineHeight: 1.1 }}>
              {landUsage.totalArea}
            </div>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748b' }}>
              {landUsage.unit}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {landUsage.distribution.map((item) => (
            <div
              key={item.name}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem' }}
            >
              <span
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: item.color,
                  display: 'inline-block',
                }}
              />
              <span style={{ fontWeight: 700, color: '#1e293b' }}>{item.name}</span>
              <span style={{ color: '#64748b', fontSize: '0.72rem' }}>
                {item.area} ac ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

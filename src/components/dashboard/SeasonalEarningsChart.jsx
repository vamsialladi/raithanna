import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ArrowRightIcon } from '../common/Icons';

export default function SeasonalEarningsChart() {
  const { seasonalEarnings, navigateTo } = useMarketplace();
  const [hoveredMonth, setHoveredMonth] = useState(null);

  const maxVal = 20000;
  const chartHeight = 130;
  const chartWidth = 460;
  const barWidth = 18;
  const totalBars = seasonalEarnings.monthlyData.length;
  const spacing = (chartWidth - totalBars * barWidth) / (totalBars + 1);

  return (
    <div className="rm-chart-card">
      <div className="rm-panel-header" style={{ marginBottom: '6px' }}>
        <h2 className="rm-panel-title">Seasonal Earnings</h2>
        <button
          type="button"
          className="rm-panel-view-all"
          onClick={() => navigateTo('profile')}
        >
          <span>View Details</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      <div style={{ position: 'relative', width: '100%', marginTop: '6px' }}>
        {/* Floating tooltip badge above October bar */}
        <div
          style={{
            position: 'absolute',
            top: '0px',
            right: '80px',
            background: '#ffffff',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            padding: '3px 8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: '#15803d',
            zIndex: 10,
          }}
        >
          ₹ 18,000{' '}
          <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b' }}>
            (So Far)
          </span>
        </div>

        <svg
          viewBox={`0 0 ${chartWidth + 50} ${chartHeight + 35}`}
          style={{ width: '100%', height: '175px', overflow: 'visible' }}
        >
          {/* Grid lines and Y-axis labels */}
          {[0, 5000, 10000, 15000, 20000].map((val) => {
            const y = chartHeight - (val / maxVal) * chartHeight + 15;
            const label = val === 0 ? '0' : `${val / 1000}K`;
            return (
              <g key={val}>
                <line
                  x1="35"
                  y1={y}
                  x2={chartWidth + 40}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                  strokeDasharray={val === 0 ? 'none' : '3 3'}
                />
                <text
                  x="28"
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill="#94a3b8"
                  fontWeight="600"
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* Monthly Bars */}
          {seasonalEarnings.monthlyData.map((item, idx) => {
            const barH = (item.earnings / maxVal) * chartHeight;
            const x = 42 + idx * (barWidth + spacing);
            const y = chartHeight - barH + 15;
            const isHovered = hoveredMonth === item.month;
            const isOctober = item.month === 'Oct';

            return (
              <g
                key={item.month}
                onMouseEnter={() => setHoveredMonth(item.month)}
                onMouseLeave={() => setHoveredMonth(null)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barH}
                  rx="4"
                  fill={isHovered ? '#15803d' : isOctober ? '#16a34a' : '#22c55e'}
                  opacity={isHovered ? 1 : isOctober ? 1 : 0.85}
                  style={{ transition: 'all 150ms ease' }}
                />
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 30}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill={isOctober ? '#0f172a' : '#64748b'}
                  fontWeight={isOctober ? '750' : '550'}
                >
                  {item.month}
                </text>
              </g>
            );
          })}
        </svg>

        {hoveredMonth && (
          <div
            style={{
              fontSize: '0.72rem',
              color: '#475569',
              textAlign: 'center',
              marginTop: '4px',
            }}
          >
            Earnings for {hoveredMonth}:{' '}
            <strong>
              ₹
              {seasonalEarnings.monthlyData
                .find((m) => m.month === hoveredMonth)
                ?.earnings.toLocaleString()}
            </strong>
          </div>
        )}
      </div>
    </div>
  );
}

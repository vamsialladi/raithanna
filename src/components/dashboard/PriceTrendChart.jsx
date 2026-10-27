import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import {
  mockPriceTrends7Days,
  mockPriceTrends30Days,
  mockPriceTrends3Months
} from '../../data/mockPriceTrends';

export const PriceTrendChart = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const chartData =
    timeRange === '7d'
      ? mockPriceTrends7Days
      : timeRange === '30d'
      ? mockPriceTrends30Days
      : mockPriceTrends3Months;

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold text-gray-900 tracking-tight">Market Price Trends</h4>
        <Link
          to="/buyer/price-trends"
          className="text-[11px] font-semibold text-[#198754] hover:underline inline-flex items-center gap-0.5"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Time Range Filter Buttons */}
      <div className="flex items-center gap-1.5 mb-3 bg-gray-50 p-1 rounded-xl">
        <button
          onClick={() => setTimeRange('7d')}
          className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all ${
            timeRange === '7d'
              ? 'bg-[#198754] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          7 Days
        </button>
        <button
          onClick={() => setTimeRange('30d')}
          className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all ${
            timeRange === '30d'
              ? 'bg-[#198754] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          30 Days
        </button>
        <button
          onClick={() => setTimeRange('3m')}
          className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all ${
            timeRange === '3m'
              ? 'bg-[#198754] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          3 Months
        </button>
      </div>

      {/* Legend matching screenshot */}
      <div className="flex items-center justify-center gap-4 text-[10px] font-semibold mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
          <span className="text-gray-700">Tomato</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
          <span className="text-gray-700">Onion</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          <span className="text-gray-700">Green Chilli</span>
        </div>
      </div>

      {/* Recharts LineChart */}
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 9, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 9, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
              domain={[0, 60]}
              ticks={[0, 20, 40, 60]}
              tickFormatter={(v) => `₹${v}`}
            />
            <Tooltip
              formatter={(value, name) => [`₹${value}/kg`, name]}
              contentStyle={{
                fontSize: '11px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Line
              type="monotone"
              dataKey="Tomato"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 3, fill: '#ef4444' }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Onion"
              stroke="#a855f7"
              strokeWidth={2}
              dot={{ r: 3, fill: '#a855f7' }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Green Chilli"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3, fill: '#10b981' }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-[9px] text-gray-400 text-center mt-1">
        Live Telangana mandi modal prices • Updated daily
      </p>
    </div>
  );
};

export default PriceTrendChart;

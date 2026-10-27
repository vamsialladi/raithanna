import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';
import { TrendingUp, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  mockPriceTrends7Days,
  mockPriceTrends30Days,
  mockPriceTrends3Months
} from '../data/mockPriceTrends';

export const PriceTrendsPage = () => {
  const [range, setRange] = useState('7d');
  const [selectedCommodity, setSelectedCommodity] = useState('all');

  const chartData =
    range === '7d'
      ? mockPriceTrends7Days
      : range === '30d'
      ? mockPriceTrends30Days
      : mockPriceTrends3Months;

  const PRICE_SUMMARIES = [
    { name: 'Tomato', current: '₹32/kg', change: '+12%', isUp: true, mandi: 'Bowenpally, Hyd' },
    { name: 'Onion', current: '₹28/kg', change: '-5%', isUp: false, mandi: 'Malakpet, Hyd' },
    { name: 'Green Chilli', current: '₹48/kg', change: '+4%', isUp: true, mandi: 'Warangal Mandi' },
    { name: 'Rice (BPT)', current: '₹42/kg', change: '0%', isUp: true, mandi: 'Nizamabad Mandi' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Agricultural Market Price Trends
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time wholesale and farmgate price analytics across Telangana agricultural mandis
          </p>
        </div>

        {/* Range Buttons */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setRange('7d')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              range === '7d'
                ? 'bg-[#198754] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setRange('30d')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              range === '30d'
                ? 'bg-[#198754] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => setRange('3m')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              range === '3m'
                ? 'bg-[#198754] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            3 Months
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {PRICE_SUMMARIES.map((item) => (
          <div
            key={item.name}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs"
          >
            <p className="text-xs text-gray-500 font-medium">{item.name}</p>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl font-extrabold text-gray-900">{item.current}</span>
              <span
                className={`text-xs font-bold flex items-center gap-0.5 ${
                  item.isUp ? 'text-emerald-600' : 'text-red-500'
                }`}
              >
                {item.isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {item.change}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">{item.mandi}</p>
          </div>
        ))}
      </div>

      {/* Main Chart Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">
            Price History Comparison (₹ per kg)
          </h3>
          <span className="text-xs text-gray-400">Modal Mandi Rates</span>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis
                tick={{ fontSize: 11, fill: '#6b7280' }}
                domain={[0, 60]}
                tickFormatter={(v) => `₹${v}`}
              />
              <Tooltip
                formatter={(val, name) => [`₹${val}/kg`, name]}
                contentStyle={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="Tomato"
                stroke="#ef4444"
                strokeWidth={2.5}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Onion"
                stroke="#a855f7"
                strokeWidth={2.5}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Green Chilli"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#198754] shrink-0" />
          <span>
            RythuMitra guarantees transparent pricing with zero middleman markups. Farmers earn up to 40% more and buyers save on retail rates.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceTrendsPage;

import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import {
  ShoppingCartIcon,
  HeartIcon,
  HandshakeIcon,
  TruckIcon,
  StarIcon,
  MapPinIcon,
  ArrowRightIcon,
  LeafIcon,
  CheckCircleIcon,
} from '../../components/common/Icons';

export default function BuyerDashboard() {
  const {
    showToast,
    switchModule,
    mockCategories = [],
    mockProducts = [],
    orders = [],
  } = useMarketplace();

  const buyerStats = [
    { label: 'Total Orders', value: '12', sub: '+2 this month', icon: ShoppingCartIcon, bg: '#dcfce7', color: '#15803d' },
    { label: 'Saved Items', value: '8', sub: '+3 new items', icon: HeartIcon, bg: '#fee2e2', color: '#dc2626' },
    { label: 'Active Negotiations', value: '4', sub: '2 pending response', icon: HandshakeIcon, bg: '#fef3c7', color: '#d97706' },
    { label: 'Deliveries in Transit', value: '3', sub: 'View Tracking', icon: TruckIcon, bg: '#e0f2fe', color: '#0284c7' },
    { label: 'Average Rating', value: '4.8', sub: 'From 12 purchases', icon: StarIcon, bg: '#f3e8ff', color: '#9333ea' },
  ];

  const categories = [
    { name: 'Grains & Cereals', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=200&q=80' },
    { name: 'Fruits', img: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=200&q=80' },
    { name: 'Vegetables', img: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=200&q=80' },
    { name: 'Spices', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=200&q=80' },
    { name: 'Dairy Products', img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=200&q=80' },
    { name: 'Millets', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=200&q=80' },
    { name: 'Pulses', img: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=200&q=80' },
    { name: 'Oil Seeds', img: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=200&q=80' },
  ];

  const featuredProduce = [
    {
      name: 'Tomato',
      price: '₹32',
      unit: 'kg',
      location: 'Nalgonda, Telangana',
      supplier: 'Rythu FPO',
      rating: '4.6 (120)',
      badge: 'Fresh',
      img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Green Chilli',
      price: '₹48',
      unit: 'kg',
      location: 'Warangal, Telangana',
      supplier: 'Local Farmer',
      rating: '4.7 (86)',
      badge: 'Organic',
      img: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Paddy (Sona)',
      price: '₹2,180',
      unit: 'Quintal',
      location: 'Karimnagar, Telangana',
      supplier: 'LPDO Society',
      rating: '4.7 (86)',
      badge: 'Best Price',
      img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Fresh Cow Milk',
      price: '₹52',
      unit: 'litre',
      location: 'Medchal, Telangana',
      supplier: 'Dairy Cooperative',
      rating: '4.8 (210)',
      badge: 'Fresh',
      img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="rm-dashboard-content">
      {/* Return to Tenant Farmer Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #e2f5e5 100%)',
          border: '1px solid #bbf7d0',
          borderRadius: '12px',
          padding: '10px 16px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
          <span style={{ fontSize: '1.2rem' }}>🛒</span>
          <strong>Buyer Marketplace Portal</strong>
          <span style={{ color: '#64748b' }}>• Direct Farm Produce Procurement & Wholesale Sourcing</span>
        </div>
        <button
          type="button"
          onClick={() => switchModule('tenant-farmer')}
          style={{
            background: '#15803d',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '5px 12px',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          ← Return to Tenant Farmer Dashboard
        </button>
      </div>

      {/* Buyer Hero Banner */}
      <section className="rm-hero-banner" style={{ marginBottom: '20px' }}>
        <div>
          <div className="rm-hero-welcome">Welcome back,</div>
          <div className="rm-hero-name-row">
            <h1 className="rm-hero-name">Chandrabose</h1>
            <LeafIcon className="w-7 h-7 text-green-600 shrink-0" />
          </div>
          <div className="rm-hero-tagline">Good food supports better farms!</div>
          <div className="rm-hero-quote-pill">
            <LeafIcon className="w-4 h-4 text-green-600 shrink-0" />
            <span>&ldquo;Fresh Produce • Fair Prices • Direct from Farmers&rdquo;</span>
          </div>
        </div>

        <div className="rm-hero-farmer-container">
          <img
            src="/images/farmer_hero.jpg"
            alt="Happy farmer holding produce basket"
            className="rm-hero-farmer-img"
          />
        </div>

        <div>
          <div className="rm-hero-why-box">
            <div className="rm-hero-why-title">Why Buy from RythuMitra?</div>
            {[
              'Direct from verified farmers',
              'Fresh and quality produce',
              'Transparent pricing',
              'Traceable supply chain',
              'Support sustainable farming',
            ].map((text) => (
              <div key={text} className="rm-hero-why-item">
                <CheckCircleIcon className="w-4 h-4 text-green-600 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Buyer Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '22px' }}>
        {buyerStats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '16px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: item.bg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon className="w-4 h-4" />
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 650, color: '#64748b' }}>{item.label}</span>
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 850, color: '#0f172a' }}>{item.value}</div>
              <div style={{ fontSize: '0.7rem', color: '#15803d', fontWeight: 600, marginTop: '2px' }}>{item.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Popular Categories */}
      <div style={{ marginBottom: '24px' }}>
        <div className="rm-panel-header" style={{ marginBottom: '12px' }}>
          <h2 className="rm-panel-title">Popular Categories</h2>
          <span style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 700, cursor: 'pointer' }}>
            View All →
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '10px' }}>
          {categories.map((cat, i) => (
            <div
              key={i}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '10px 6px',
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={() => showToast(`Filtered produce by ${cat.name}`)}
            >
              <img
                src={cat.img}
                alt={cat.name}
                style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover', margin: '0 auto 6px auto' }}
              />
              <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#1e293b', lineHeight: 1.2 }}>
                {cat.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Produce 4 Product Cards */}
      <div>
        <div className="rm-panel-header" style={{ marginBottom: '12px' }}>
          <h2 className="rm-panel-title">Featured Produce</h2>
          <span style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 700, cursor: 'pointer' }}>
            View All →
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {featuredProduce.map((prod, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: '145px' }}>
                <img src={prod.img} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    fontSize: '0.68rem',
                    fontWeight: 750,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: '#16a34a',
                    color: '#ffffff',
                  }}
                >
                  {prod.badge}
                </span>
              </div>

              <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '0.98rem', fontWeight: 800, margin: 0 }}>{prod.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px', margin: '4px 0 6px 0' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: 850, color: '#0f172a' }}>{prod.price}</span>
                  <span style={{ fontSize: '0.76rem', color: '#64748b' }}>/ {prod.unit}</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  <MapPinIcon className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                  {prod.location}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                  Supplier: <strong>{prod.supplier}</strong>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#0f172a', fontWeight: 700, margin: '6px 0 10px 0' }}>
                  ★ {prod.rating}
                </div>

                <button
                  type="button"
                  className="rm-add-cart-btn"
                  style={{ marginTop: 'auto' }}
                  onClick={() => showToast(`Added ${prod.name} to wholesale cart!`)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

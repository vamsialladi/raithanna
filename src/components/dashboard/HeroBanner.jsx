import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { LeafIcon, CheckCircleIcon } from '../common/Icons';

export default function HeroBanner() {
  const { user } = useMarketplace();

  const benefits = [
    'Direct from verified farmers',
    'Fresh and quality produce',
    'Transparent pricing',
    'Traceable supply chain',
    'Support sustainable farming',
  ];

  return (
    <section className="rm-hero-banner" aria-label="Welcome banner">
      {/* Left Column: Greetings and Taglines */}
      <div>
        <div className="rm-hero-welcome">Welcome back,</div>
        <div className="rm-hero-name-row">
          <h1 className="rm-hero-name">{user?.name || user?.farmerName || 'Tenant Farmer'}</h1>
          <LeafIcon className="w-7 h-7 text-green-600 shrink-0" />
        </div>
        <div className="rm-hero-tagline">Good food supports better farms!</div>

        <div className="rm-hero-quote-pill">
          <LeafIcon className="w-4 h-4 text-green-600 shrink-0" />
          <span>&ldquo;Fresh Produce • Fair Prices • Direct from Farmers&rdquo;</span>
        </div>
      </div>

      {/* Middle Column: Authentic Farmer Imagery */}
      <div className="rm-hero-farmer-container">
        <img
          src="/images/farmer_hero.jpg"
          alt="Happy farmer holding a fresh harvest basket"
          className="rm-hero-farmer-img"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=500&q=80';
          }}
        />
      </div>

      {/* Right Column: Why Buy from RythuMitra Panel */}
      <div>
        <div className="rm-hero-why-box">
          <div className="rm-hero-why-title">Why Buy from RythuMitra?</div>
          {benefits.map((item) => (
            <div key={item} className="rm-hero-why-item">
              <CheckCircleIcon className="w-4 h-4 text-green-600 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { LeafIcon, SproutIcon, QuoteIcon } from '../common/Icons';

export default function WelcomeBanner() {
  const { user } = useMarketplace();

  return (
    <section
      className="rm-welcome-banner"
      style={{ backgroundImage: 'url("/images/farmer_sunrise.jpg")' }}
      aria-label="Welcome banner"
    >
      <div className="rm-welcome-banner-overlay" />

      {/* Left Column: Greeting and Taglines */}
      <div className="rm-welcome-left">
        <div className="rm-welcome-greeting">Welcome back,</div>
        <div className="rm-welcome-title">
          <span>{user?.farmerName || user?.name || 'Tenant Farmer'}!</span>
          <LeafIcon className="w-8 h-8 text-green-600 shrink-0" />
        </div>
        <div className="rm-welcome-sub">
          Your hard work grows more than crops,
          <br />
          it grows a better tomorrow.
        </div>
      </div>

      {/* Right Column: Floating Quote Card */}
      <div className="rm-welcome-quote-card">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <QuoteIcon className="w-5 h-5 text-green-600 shrink-0" />
          <div className="rm-welcome-quote-text">
            &ldquo;Good farming is not just about growing crops, it&apos;s about growing your future.&rdquo;
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
          <SproutIcon className="w-5 h-5 text-green-600" />
        </div>
      </div>
    </section>
  );
}

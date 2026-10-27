import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ArrowRightIcon } from '../common/Icons';

export default function SoilPromoCard() {
  const { navigateTo } = useMarketplace();

  return (
    <div
      className="rm-soil-promo-card"
      style={{ backgroundImage: 'url("/images/soil_promo.jpg")' }}
    >
      <div className="rm-soil-promo-overlay" />
      <div className="rm-soil-promo-content">
        <div className="rm-soil-promo-title">
          Healthy Soil,
          <br />
          Better Yields
        </div>
        <div className="rm-soil-promo-desc">
          Get soil testing, farm advisory
          <br />
          and more services.
        </div>
        <button
          type="button"
          className="rm-soil-promo-btn"
          onClick={() => navigateTo('services')}
        >
          <span>Request Service</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

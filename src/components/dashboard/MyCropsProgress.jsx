import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { SproutIcon, ArrowRightIcon } from '../common/Icons';

export default function MyCropsProgress({ onSelectCrop }) {
  const { crops, navigateTo } = useMarketplace();

  return (
    <div>
      <div className="rm-panel-header">
        <h2 className="rm-panel-title">My Crops & Progress</h2>
        <button
          type="button"
          className="rm-panel-view-all"
          onClick={() => navigateTo('crops')}
        >
          <span>View All</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      <div>
        {crops.map((crop) => (
          <div
            key={crop.cropId}
            className="rm-crop-card"
            onClick={() => (onSelectCrop ? onSelectCrop(crop) : navigateTo('crops'))}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === 'Enter' && (onSelectCrop ? onSelectCrop(crop) : navigateTo('crops'))
            }
          >
            <img
              src={crop.image}
              alt={crop.cropName}
              className="rm-crop-thumb"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80';
              }}
            />

            <div className="rm-crop-info">
              <div className="rm-crop-name">{crop.cropName}</div>
              <div className="rm-crop-sub">{crop.landName}</div>

              <div className="rm-crop-stage">
                <SproutIcon className="w-3.5 h-3.5 text-green-700" />
                <span>{crop.cropStage}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="rm-progress-bar-bg">
                  <div
                    className="rm-progress-bar-fill"
                    style={{ width: `${crop.progress}%` }}
                  />
                </div>
                <span className="rm-crop-percent">{crop.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

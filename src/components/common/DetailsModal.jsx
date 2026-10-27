import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { XIcon, MapPinIcon, SproutIcon, CalendarIcon, RupeeIcon } from './Icons';

export default function DetailsModal() {
  const { activeModal, setActiveModal, showToast } = useMarketplace();

  if (!activeModal) return null;

  const { type, data } = activeModal;

  function closeModal() {
    setActiveModal(null);
  }

  return (
    <div
      className="rm-modal-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={closeModal}
    >
      <div
        className="rm-modal-window"
        style={{ maxWidth: '580px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rm-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SproutIcon className="w-5 h-5 text-green-700" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
              {type === 'lease' && `Lease Agreement: ${data.landName}`}
              {type === 'crop' && `Crop Cycle Details: ${data.cropName}`}
              {type === 'land' && `Available Land Parcel: ${data.landName}`}
            </h3>
          </div>
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close modal"
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <XIcon className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="rm-modal-body">
          {type === 'lease' && (
            <div>
              <img
                src={data.image}
                alt={data.landName}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '16px',
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem' }}>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Survey Number</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{data.surveyNumber || 'SY-42/A'}</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Land Owner</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{data.landOwnerName} ({data.landOwnerContact})</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Total Area</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{data.area} {data.areaUnit}</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Rent Rate</div>
                  <div style={{ fontWeight: 700, color: '#15803d' }}>₹ {data.rentPerAcre.toLocaleString()} / acre</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Soil & Irrigation</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{data.soilType} • {data.irrigationType}</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Lease Period</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{data.leasePeriod}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#475569', marginTop: '14px', lineHeight: 1.5 }}>
                {data.description}
              </p>
            </div>
          )}

          {type === 'crop' && (
            <div>
              <img
                src={data.image}
                alt={data.cropName}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '16px',
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem' }}>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Cultivated Plot</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{data.landName}</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Current Stage</div>
                  <div style={{ fontWeight: 700, color: '#15803d' }}>{data.cropStage} ({data.progress}%)</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Season & Sowing</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{data.season} • {data.sowingDate}</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Expected Harvest Yield</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{data.expectedYield}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#475569', marginTop: '14px', lineHeight: 1.5 }}>
                {data.notes}
              </p>
            </div>
          )}

          {type === 'land' && (
            <div>
              <img
                src={data.image}
                alt={data.landName}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '16px',
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem' }}>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Land Parcel</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{data.landName} ({data.area} {data.areaUnit})</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Status</div>
                  <div style={{ fontWeight: 700, color: data.status === 'Available' ? '#15803d' : '#b91c1c' }}>
                    {data.status}
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Location</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{data.location}, Telangana</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Expected Rent Rate</div>
                  <div style={{ fontWeight: 700, color: '#15803d' }}>₹ {data.rentPerAcre || 9000} / acre</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rm-modal-footer">
          <button
            type="button"
            className="rm-outline-btn"
            onClick={closeModal}
          >
            Close
          </button>
          {type === 'land' && data.status === 'Available' && (
            <button
              type="button"
              className="rm-add-cart-btn"
              style={{ maxWidth: '200px' }}
              onClick={() => {
                showToast('Lease inquiry request submitted to Landowner!');
                closeModal();
              }}
            >
              Submit Lease Inquiry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

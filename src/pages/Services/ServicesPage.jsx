import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { FlaskIcon, HeadsetIcon, SproutIcon, CheckCircleIcon } from '../../components/common/Icons';

export default function ServicesPage() {
  const { showToast } = useMarketplace();
  const [serviceType, setServiceType] = useState('Soil Health & NPK Lab Test');
  const [selectedField, setSelectedField] = useState('North Field (2.5 Acres)');
  const [notes, setNotes] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    showToast(`Service request for "${serviceType}" submitted! An officer will visit your plot.`);
    setNotes('');
  }

  return (
    <div className="rm-dashboard-content">
      <div className="rm-panel-header" style={{ marginBottom: '18px' }}>
        <div>
          <h1 className="rm-panel-title" style={{ fontSize: '1.5rem' }}>
            Agricultural Services & Soil Advisory
          </h1>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
            Schedule government-backed soil health testing, drone spraying, and on-field agronomy consultations.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '20px' }}>
        {/* Left: Service Packages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FlaskIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                  Soil Health & NPK Testing
                </h3>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Includes 12 parameter micro-nutrient test + Soil Health Card</div>
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.4 }}>
              Lab specialists collect core soil samples from your leased parcel to determine exact nitrogen, phosphorus, potash, and organic carbon levels.
            </p>
          </div>

          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SproutIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                  Pest & Disease Field Advisory
                </h3>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>KVK Agronomist Visit & Diagnosis</div>
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.4 }}>
              Direct on-site diagnosis for stem borers, leaf blast, fall armyworm, and customized organic bio-pesticide recommendations.
            </p>
          </div>
        </div>

        {/* Right: Request Booking Form */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '22px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#14532d', marginBottom: '14px' }}>
            Book a Farm Service
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
              Select Service
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              >
                <option value="Soil Health & NPK Lab Test">Soil Health & NPK Lab Test</option>
                <option value="Pest & Disease Field Advisory">Pest & Disease Field Advisory</option>
                <option value="Precision Drone Foliar Spraying">Precision Drone Foliar Spraying</option>
                <option value="Borewell Water Salinity Test">Borewell Water Salinity Test</option>
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
              Field Parcel
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              >
                <option value="North Field (2.5 Acres)">North Field (2.5 Acres)</option>
                <option value="East Field (2.0 Acres)">East Field (2.0 Acres)</option>
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
              Notes or Symptoms
              <textarea
                rows="3"
                placeholder="Mention any crop yellowing, leaf spot, or preferred visit date..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </label>

            <button type="submit" className="rm-add-cart-btn" style={{ padding: '12px' }}>
              Confirm Service Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

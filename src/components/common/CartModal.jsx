import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { XIcon, ShoppingCartIcon, ArrowRightIcon } from './Icons';

export default function CartModal({ isOpen, onClose }) {
  const {
    cart,
    cartTotalAmount,
    updateCartQty,
    removeFromCart,
    clearCart,
    placeOrderFromCart,
    navigateTo,
  } = useMarketplace();

  if (!isOpen) return null;

  return (
    <div
      className="rm-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
      onClick={onClose}
    >
      <div
        className="rm-modal-window"
        style={{ maxWidth: '540px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rm-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingCartIcon className="w-5 h-5 text-green-700" />
            <h2 id="cart-title" style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
              Shopping Cart ({cart.length} items)
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <XIcon className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="rm-modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 12px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 14px auto',
                  color: '#94a3b8',
                }}
              >
                <ShoppingCartIcon className="w-7 h-7" />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#334155' }}>
                Your cart is currently empty
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '6px' }}>
                Explore fresh produce direct from verified farmers and add items.
              </p>
              <button
                type="button"
                className="rm-add-cart-btn"
                style={{ maxWidth: '200px', margin: '18px auto 0 auto' }}
                onClick={() => {
                  onClose();
                  navigateTo('browse');
                }}
              >
                Browse Produce
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cart.map((item) => (
                <div
                  key={item.productId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    background: '#f8fafc',
                  }}
                >
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80';
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 750, fontSize: '0.9rem', color: '#0f172a' }}>
                      {item.product?.name}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                      ₹{item.unitPrice} / {item.unit} • {item.product?.supplierName}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '6px',
                      }}
                    >
                      <button
                        type="button"
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          background: '#ffffff',
                          cursor: 'pointer',
                          fontWeight: 700,
                        }}
                        onClick={() => updateCartQty(item.productId, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, minWidth: '32px', textAlign: 'center' }}>
                        {item.quantity} {item.unit}
                      </span>
                      <button
                        type="button"
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          background: '#ffffff',
                          cursor: 'pointer',
                          fontWeight: 700,
                        }}
                        onClick={() => updateCartQty(item.productId, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#14532d' }}>
                      ₹{item.lineTotal.toLocaleString()}
                    </div>
                    <button
                      type="button"
                      style={{
                        fontSize: '0.72rem',
                        color: '#ef4444',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        marginTop: '6px',
                      }}
                      onClick={() => removeFromCart(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="rm-modal-footer" style={{ flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                fontSize: '1rem',
                fontWeight: 800,
                color: '#0f172a',
                marginBottom: '8px',
              }}
            >
              <span>Total Estimated Amount:</span>
              <span style={{ color: '#15803d' }}>₹{cartTotalAmount.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
              <button
                type="button"
                style={{
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button
                type="button"
                className="rm-add-cart-btn"
                style={{ flex: 1, padding: '12px' }}
                onClick={() => {
                  placeOrderFromCart();
                  onClose();
                }}
              >
                <span>Confirm & Place Order</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
            <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: '6px 0 0 0', textAlign: 'center' }}>
              Simulated demonstration order. No actual payment credentials will be billed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

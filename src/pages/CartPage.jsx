import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    totalItemsCount,
    subtotal,
    deliveryFee,
    discountAmount,
    grandTotal,
    coupon,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon
  } = useCart();
  const showToast = useToast();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    showToast(res.message, res.success ? 'success' : 'error');
    if (res.success) setCouponInput('');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 shadow-xs">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 text-[#198754]" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Your Basket is Empty</h2>
        <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
          Support local farmers by adding farm-fresh fruits, vegetables, and dairy to your basket.
        </p>
        <button
          onClick={() => navigate('/buyer/products')}
          className="mt-6 px-6 py-2.5 rounded-xl bg-[#198754] hover:bg-[#14532D] text-white text-xs font-bold transition-all shadow-xs"
        >
          Explore Fresh Produce
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Shopping Cart ({totalItemsCount} items)
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Fresh harvest reserved for you direct from farms
          </p>
        </div>
        <Link
          to="/buyer/products"
          className="text-xs font-semibold text-[#198754] hover:underline"
        >
          + Add more items
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover bg-gray-50 shrink-0 border border-gray-100"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 truncate">{item.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Farmer: {item.farmerName}</p>
                  <p className="text-xs font-semibold text-[#198754] mt-0.5">
                    ₹{item.price} / {item.unit}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1.5 hover:bg-gray-200 text-gray-600 rounded-l-xl transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-gray-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1.5 hover:bg-gray-200 text-gray-600 rounded-r-xl transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right w-16">
                  <span className="text-sm font-extrabold text-gray-900">
                    ₹{item.price * item.quantity}
                  </span>
                </div>

                <button
                  onClick={() => {
                    removeFromCart(item.id);
                    showToast(`Removed ${item.name} from basket`);
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Delivery Note */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#198754] shrink-0" />
            <span>
              Orders over <strong>₹500</strong> qualify for <strong>FREE direct farm delivery</strong>!
            </span>
          </div>
        </div>

        {/* Right: Bill Summary & Coupon */}
        <div className="lg:col-span-4 space-y-4">
          {/* Coupon Box */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#198754]" /> Apply Coupon
            </h4>
            {coupon ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <div>
                  <span className="font-bold text-emerald-900">{coupon}</span>
                  <span className="text-[11px] text-emerald-700 block">
                    Saved ₹{discountAmount}
                  </span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="e.g. RYTHU50 or FARMER10"
                  className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#198754]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#198754] hover:bg-[#14532D] text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Bill Breakdown */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-3">
            <h4 className="text-sm font-bold text-gray-900">Order Summary</h4>
            <div className="divide-y divide-gray-100 text-xs space-y-2 pt-1">
              <div className="flex justify-between text-gray-600 pt-2">
                <span>Items Subtotal</span>
                <span className="font-semibold text-gray-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600 pt-2">
                <span>Direct Farm Delivery Fee</span>
                <span className="font-semibold text-gray-900">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 pt-2 font-medium">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-3">
                <span>Grand Total</span>
                <span className="text-base text-[#198754]">₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/buyer/checkout')}
              className="mt-4 w-full py-3 px-4 rounded-xl bg-[#198754] hover:bg-[#14532D] text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

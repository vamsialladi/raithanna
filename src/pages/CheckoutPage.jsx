import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  CreditCard,
  CheckCircle2,
  Truck,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { mockAddresses } from '../data/mockNotifications';
import { orderApi } from '../services/apiServices';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, grandTotal, subtotal, deliveryFee, discountAmount, clearCart } = useCart();
  const { user } = useAuth();
  const showToast = useToast();

  const [selectedAddressId, setSelectedAddressId] = useState(mockAddresses[0].id);
  const [selectedSlot, setSelectedSlot] = useState('morning');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SLOTS = [
    { id: 'morning', label: 'Tomorrow Morning', time: '7:00 AM - 10:00 AM', tag: 'Fastest' },
    { id: 'afternoon', label: 'Tomorrow Afternoon', time: '1:00 PM - 4:00 PM', tag: 'Standard' },
    { id: 'evening', label: 'Tomorrow Evening', time: '5:00 PM - 8:00 PM', tag: 'Eco Slot' }
  ];

  const PAYMENT_OPTIONS = [
    { id: 'upi', name: 'UPI (Google Pay, PhonePe, Paytm)', desc: 'Instant & Zero Transaction Fee' },
    { id: 'card', name: 'Credit / Debit Card', desc: 'Visa, MasterCard, RuPay' },
    { id: 'netbanking', name: 'Net Banking', desc: 'All Major Indian Banks' },
    { id: 'cod', name: 'Cash on Delivery', desc: 'Pay when farm harvest arrives' }
  ];

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      showToast('Your cart is empty', 'error');
      navigate('/buyer/products');
      return;
    }

    setIsSubmitting(true);
    const selectedAddress = mockAddresses.find((a) => a.id === selectedAddressId) || mockAddresses[0];

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          price: item.price,
          total: item.price * item.quantity,
          image: item.image,
          farmer: item.farmerName
        })),
        itemCount: cartItems.length,
        subtotal,
        deliveryFee,
        discount: discountAmount,
        totalAmount: grandTotal,
        paymentMethod: PAYMENT_OPTIONS.find((p) => p.id === paymentMethod)?.name || 'UPI',
        paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
        deliveryAddress: selectedAddress,
        deliverySlot: SLOTS.find((s) => s.id === selectedSlot)
      };

      const created = await orderApi.create(orderData);
      clearCart();
      showToast('Order placed successfully! Direct farm dispatch initiated.', 'success');
      navigate(`/buyer/orders/${created.id}`);
    } catch {
      showToast('Could not place order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Checkout & Place Order
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Review your delivery address, slot, and payment method
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Address, Slots, Payment */}
        <div className="lg:col-span-8 space-y-5">
          {/* 1. Delivery Address */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-[#198754]">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">1. Delivery Address</h3>
            </div>

            <div className="space-y-3">
              {mockAddresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedAddressId(addr.id)}
                  className={`cursor-pointer p-4 rounded-xl border text-left transition-all flex items-start justify-between ${
                    selectedAddressId === addr.id
                      ? 'border-[#198754] bg-emerald-50/40 ring-1 ring-[#198754]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-900">{addr.name}</span>
                      <span className="text-[10px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                        {addr.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{addr.addressLine}, {addr.landmark}</p>
                    <p className="text-xs text-gray-600">
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">Phone: {addr.phone}</p>
                  </div>
                  {selectedAddressId === addr.id && (
                    <CheckCircle2 className="w-5 h-5 text-[#198754] shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 2. Delivery Slot */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-[#198754]">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">2. Select Delivery Slot</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SLOTS.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`cursor-pointer p-3 rounded-xl border transition-all text-left ${
                    selectedSlot === slot.id
                      ? 'border-[#198754] bg-emerald-50/40 ring-1 ring-[#198754]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">{slot.label}</span>
                    <span className="text-[9px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full">
                      {slot.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">{slot.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-[#198754]">
                <CreditCard className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">3. Payment Method</h3>
            </div>

            <div className="space-y-2.5">
              {PAYMENT_OPTIONS.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id)}
                  className={`cursor-pointer p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    paymentMethod === opt.id
                      ? 'border-[#198754] bg-emerald-50/40 ring-1 ring-[#198754]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <h5 className="text-xs font-bold text-gray-900">{opt.name}</h5>
                    <p className="text-[11px] text-gray-500 mt-0.5">{opt.desc}</p>
                  </div>
                  {paymentMethod === opt.id && (
                    <CheckCircle2 className="w-4 h-4 text-[#198754] shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Order Summary Confirmation */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-3">
            <h4 className="text-sm font-bold text-gray-900">Order Items ({cartItems.length})</h4>

            <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                  <div className="truncate pr-2">
                    <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-400">
                      {item.quantity} {item.unit} × ₹{item.price}
                    </p>
                  </div>
                  <span className="font-bold text-gray-900 shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3 text-xs space-y-1.5">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t">
                <span>Total Payable</span>
                <span className="text-[#198754]">₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting || cartItems.length === 0}
              className="w-full mt-4 py-3 px-4 rounded-xl bg-[#198754] hover:bg-[#14532D] text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Confirming Order...' : 'Confirm & Place Order'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 flex items-center gap-2 mt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Buyer Protection & Freshness Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

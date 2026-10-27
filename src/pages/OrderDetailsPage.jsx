import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  PackageCheck,
  Truck,
  Home,
  MapPin,
  CreditCard,
  FileText,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';
import { mockOrders } from '../data/mockOrders';
import { useToast } from '../context/ToastContext';

export const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const showToast = useToast();

  const order = mockOrders.find((o) => o.id === orderId) || mockOrders[0];

  const STEPS = [
    { label: 'Order Placed', time: order.timeline[0]?.time || 'Apr 25, 10:30 AM', icon: CheckCircle2, status: 'done' },
    { label: 'Processing', time: order.timeline[1]?.time || 'Apr 25, 12:45 PM', icon: PackageCheck, status: 'done' },
    { label: 'Out for Delivery', time: order.timeline[2]?.time || 'Apr 25, 3:20 PM', icon: Truck, status: order.currentStatus === 'Delivered' ? 'done' : 'current' },
    { label: 'Delivered', time: order.timeline[3]?.time || 'ETA: Apr 25, 6:00 PM', icon: Home, status: order.currentStatus === 'Delivered' ? 'done' : 'pending' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/buyer/orders')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#198754] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Orders
      </button>

      {/* Header Info */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">Order #{order.id}</h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {order.currentStatus}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Placed on {order.date}</p>
        </div>

        <button
          onClick={() => showToast('Invoice downloaded to your device!')}
          className="px-3.5 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 flex items-center gap-1.5 transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>Download Invoice</span>
        </button>
      </div>

      {/* Live Tracking Stepper */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
        <h3 className="text-sm font-bold text-gray-900 mb-6">Delivery Progress</h3>
        
        <div className="relative py-4">
          <div className="absolute top-9 left-12 right-12 h-0.5 bg-gray-200 z-0">
            <div
              className={`h-full bg-[#198754] transition-all duration-500 ${
                order.currentStatus === 'Delivered' ? 'w-full' : 'w-2/3'
              }`}
            />
          </div>

          <div className="relative z-10 grid grid-cols-4 gap-2 text-center">
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isDone = step.status === 'done';
              const isCurrent = step.status === 'current';

              return (
                <div key={step.label} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isDone
                        ? 'bg-[#198754] text-white shadow-xs'
                        : isCurrent
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 animate-pulse'
                        : 'bg-gray-100 text-gray-400 border border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-gray-900 mt-3">{step.label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{step.time}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#198754]" />
            <span className="text-emerald-900 font-medium">
              Delivery Partner: <strong>RythuExpress Hyderabad</strong> (Vehicle: TS-09-EA-4122)
            </span>
          </div>
          <button
            onClick={() => showToast('Connecting you with the delivery driver...')}
            className="text-xs font-bold text-[#198754] hover:underline flex items-center gap-1"
          >
            <PhoneCall className="w-3.5 h-3.5" /> Call Driver
          </button>
        </div>
      </div>

      {/* Items & Bill Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Items List */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
          <h4 className="text-sm font-bold text-gray-900 mb-3">Items in this Delivery</h4>
          <div className="divide-y divide-gray-100 space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="pt-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{item.name}</p>
                    <p className="text-[10px] text-gray-500">
                      {item.quantity} {item.unit} • ₹{item.price}/{item.unit}
                    </p>
                  </div>
                </div>
                <span className="font-extrabold text-gray-900">₹{item.total}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Address & Payment Info */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#198754]" /> Delivery Destination
            </h4>
            <p className="text-xs font-semibold text-gray-800">{order.deliveryAddress.name}</p>
            <p className="text-xs text-gray-600">
              {order.deliveryAddress.addressLine}, {order.deliveryAddress.city} -{' '}
              {order.deliveryAddress.pincode}
            </p>
            <p className="text-xs text-gray-500 mt-1">Phone: {order.deliveryAddress.phone}</p>
          </div>

          <div className="pt-3 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-[#198754]" /> Payment Information
            </h4>
            <p className="text-xs text-gray-700">
              Method: <strong>{order.paymentMethod}</strong>
            </p>
            <p className="text-xs text-gray-700">
              Status: <span className="text-emerald-700 font-bold">{order.paymentStatus}</span>
            </p>
            <p className="text-xs text-gray-900 font-bold mt-2">
              Total Amount: <span className="text-[#198754] text-sm">₹{order.totalAmount}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, PackageCheck, Truck, Home } from 'lucide-react';
import { mockOrders } from '../../data/mockOrders';

export const OrderTracking = () => {
  const activeOrder = mockOrders[0]; // RM-84920

  const STEPS = [
    { label: 'Order Placed', time: 'Apr 25, 10:30 AM', icon: CheckCircle2, status: 'done' },
    { label: 'Processing', time: 'Apr 25, 12:45 PM', icon: PackageCheck, status: 'done' },
    { label: 'Out for Delivery', time: 'Apr 25, 3:20 PM', icon: Truck, status: 'current' },
    { label: 'Delivered', time: 'ETA: Apr 25, 6:00 PM', icon: Home, status: 'pending' },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-gray-900 tracking-tight">Order Tracking</h4>
          <p className="text-[10px] text-gray-400 font-medium">#{activeOrder.id}</p>
        </div>
        <Link
          to={`/buyer/orders/${activeOrder.id}`}
          className="text-[11px] font-semibold text-[#198754] hover:underline inline-flex items-center gap-0.5"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Horizontal Stepper matching the screenshot */}
      <div className="relative py-2">
        {/* Connecting Line */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 z-0">
          <div className="h-full bg-[#198754] w-[66%]" />
        </div>

        <div className="relative z-10 grid grid-cols-4 gap-1 text-center">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isDone = step.status === 'done';
            const isCurrent = step.status === 'current';

            return (
              <div key={step.label} className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isDone
                      ? 'bg-[#198754] text-white shadow-xs'
                      : isCurrent
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 animate-pulse'
                      : 'bg-gray-100 text-gray-400 border border-gray-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <p className="text-[10px] font-bold text-gray-900 mt-2 leading-tight">
                  {step.label}
                </p>
                <span className="text-[8px] text-gray-500 mt-0.5 leading-tight">
                  {step.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;

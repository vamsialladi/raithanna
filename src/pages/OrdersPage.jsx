import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package, Truck, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { mockOrders } from '../data/mockOrders';

export const OrdersPage = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = mockOrders.filter((order) => {
    if (statusFilter === 'active') return order.currentStatus !== 'Delivered';
    if (statusFilter === 'delivered') return order.currentStatus === 'Delivered';
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            My Orders
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Track active deliveries and review past orders directly from farms
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'all'
                ? 'bg-[#198754] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({mockOrders.length})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'active'
                ? 'bg-[#198754] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Active (1)
          </button>
          <button
            onClick={() => setStatusFilter('delivered')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'delivered'
                ? 'bg-[#198754] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Delivered ({mockOrders.length - 1})
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const isActive = order.currentStatus !== 'Delivered';

          return (
            <div
              key={order.id}
              onClick={() => navigate(`/buyer/orders/${order.id}`)}
              className="group cursor-pointer bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-[#198754]'
                    }`}
                  >
                    {isActive ? <Truck className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-gray-900">Order #{order.id}</h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {order.currentStatus}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">{order.date}</p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-gray-500 font-medium">Total Paid:</span>
                  <span className="text-sm sm:text-base font-extrabold text-gray-900 ml-1.5">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>

              {/* Items in order */}
              <div className="py-3 flex flex-wrap items-center gap-3">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-1.5 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <span className="text-xs font-semibold text-gray-800">
                      {item.name} ({item.quantity} {item.unit})
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  Delivering to: <strong className="text-gray-700">{order.deliveryAddress.city}</strong>
                </span>

                <span className="text-xs font-bold text-[#198754] group-hover:underline inline-flex items-center gap-1">
                  <span>Track & View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersPage;

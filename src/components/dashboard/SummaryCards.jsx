import { ShoppingCart, Heart, IndianRupee, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';

export const SummaryCards = () => {
  const { savedFarmersCount } = useFavorites();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-5">
      {/* 1. Total Orders */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">5</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
            <ShoppingCart className="w-5 h-5 text-[#198754]" />
          </div>
        </div>
        <Link
          to="/buyer/orders"
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#198754] hover:underline"
        >
          <span>View Orders</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* 2. Saved Farmers */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">Saved Farmers</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{savedFarmersCount || 3}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600">
            <Heart className="w-5 h-5 text-pink-600 fill-pink-500" />
          </div>
        </div>
        <Link
          to="/buyer/favorites"
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-pink-600 hover:underline"
        >
          <span>View Favorites</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* 3. Total Spent */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">Total Spent</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">₹ 12,450</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/50 flex items-center justify-center text-emerald-600">
            <IndianRupee className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
        <Link
          to="/buyer/orders"
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:underline"
        >
          <span>This month</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* 4. Active Deliveries */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">Active Deliveries</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">1</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
            <Truck className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <Link
          to="/buyer/orders/RM-84920"
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
        >
          <span>Track Order</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

export default SummaryCards;

import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Tag, Clock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { mockProducts } from '../../data/mockProducts';

export const LatestDeals = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const showToast = useToast();

  const mangoDeal = mockProducts.find((p) => p.id === 'prod-6') || mockProducts[0];

  const handleClaimDeal = (e) => {
    e.stopPropagation();
    addToCart(mangoDeal, 1);
    showToast('Added Fresh Mangoes deal to your cart!');
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900 tracking-tight">Latest Deals</h3>
          <Link
            to="/buyer/products"
            className="text-[11px] font-semibold text-[#198754] hover:underline inline-flex items-center gap-0.5"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div
          onClick={() => navigate(`/buyer/products/${mangoDeal.id}`)}
          className="group cursor-pointer rounded-xl border border-emerald-100 p-2.5 bg-gradient-to-br from-emerald-50/40 to-white hover:shadow-xs transition-all flex gap-3"
        >
          <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative bg-amber-50">
            <img
              src={mangoDeal.image}
              alt="Fresh Mangoes"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <Tag className="w-2.5 h-2.5" /> Seasonal Offer
                </span>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                  20% OFF
                </span>
              </div>

              <h5 className="text-xs font-bold text-gray-900 mt-1">Fresh Mangoes</h5>

              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xs font-bold text-[#198754]">₹45 / kg</span>
                <span className="text-[10px] text-gray-400 line-through">(₹60)</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-1">
              <span className="text-[9px] text-amber-700 flex items-center gap-1 font-medium">
                <Clock className="w-2.5 h-2.5" /> Limited time offer
              </span>
              <button
                onClick={handleClaimDeal}
                className="text-[10px] font-bold text-white bg-[#198754] hover:bg-[#14532D] px-2 py-0.5 rounded-md transition-colors"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestDeals;

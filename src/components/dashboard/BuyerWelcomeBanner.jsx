import { Leaf, Handshake, ShieldCheck, Truck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const BuyerWelcomeBanner = () => {
  const { user } = useAuth();
  const userName = user?.name || 'Arjun Sharma';

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#e7f7ed] via-[#f1faf4] to-[#fcfcfb] border border-emerald-100/70 p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left Welcome Copy */}
        <div className="max-w-xl text-left">
          <p className="text-sm font-semibold text-gray-500">Welcome back,</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14532D] tracking-tight mt-0.5">
            {userName}!
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-md leading-relaxed">
            Get fresh, quality produce directly from farmers and support sustainable farming.
          </p>

          {/* 4 Feature Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-emerald-100 shadow-2xs">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                <Leaf className="w-3.5 h-3.5 text-[#198754]" />
              </div>
              <div className="leading-tight text-left">
                <span className="text-[11px] font-bold text-gray-800 block">Fresh & Natural</span>
                <span className="text-[9px] text-gray-500">Products</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-emerald-100 shadow-2xs">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                <Handshake className="w-3.5 h-3.5 text-[#198754]" />
              </div>
              <div className="leading-tight text-left">
                <span className="text-[11px] font-bold text-gray-800 block">Fair Prices</span>
                <span className="text-[9px] text-gray-500">Direct from farmers</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-emerald-100 shadow-2xs">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#198754]" />
              </div>
              <div className="leading-tight text-left">
                <span className="text-[11px] font-bold text-gray-800 block">Secure Payments</span>
                <span className="text-[9px] text-gray-500">Multiple Options</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-emerald-100 shadow-2xs">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                <Truck className="w-3.5 h-3.5 text-[#198754]" />
              </div>
              <div className="leading-tight text-left">
                <span className="text-[11px] font-bold text-gray-800 block">Track Orders</span>
                <span className="text-[9px] text-gray-500">Real-time Updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Harvest Basket Image */}
        <div className="w-full sm:w-72 lg:w-80 h-44 sm:h-48 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-emerald-200/60">
          <img
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80"
            alt="Fresh produce harvest basket"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default BuyerWelcomeBanner;

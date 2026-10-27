import { Leaf, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BottomBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-7 rounded-2xl overflow-hidden bg-gradient-to-r from-[#14532D] via-[#166534] to-[#15803d] text-white p-4 sm:p-5 shadow-sm relative">
      {/* Decorative leaf watermark background */}
      <div className="absolute right-32 -bottom-10 opacity-10 pointer-events-none">
        <Leaf className="w-56 h-56 text-white" />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20">
            <Leaf className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Good Food. Healthy Life.
            </h4>
            <p className="text-xs text-emerald-100 mt-0.5">
              Fresh produce • Direct from farmers • Support local
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/buyer/products')}
          className="whitespace-nowrap px-4 py-2 rounded-xl bg-white text-[#14532D] hover:bg-emerald-50 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#14532D]" />
        </button>
      </div>
    </div>
  );
};

export default BottomBanner;

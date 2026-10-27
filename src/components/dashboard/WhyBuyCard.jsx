import { CheckCircle2, Sprout } from 'lucide-react';

export const WhyBuyCard = () => {
  const BENEFITS = [
    'Direct from verified farmers',
    'Fresh and chemical-free produce',
    'Transparent pricing',
    'Support sustainable farming'
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#EAF7EF]/70 to-white rounded-2xl p-4 border border-emerald-100 shadow-xs">
      {/* Decorative leaf motif */}
      <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-15 pointer-events-none text-emerald-800">
        <Sprout className="w-28 h-28" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-[#198754]" />
          </div>
          <h4 className="text-xs font-bold text-gray-900 tracking-tight">
            Why Buy from RythuMitra?
          </h4>
        </div>

        <ul className="space-y-2">
          {BENEFITS.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[11px] text-gray-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#198754] shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WhyBuyCard;

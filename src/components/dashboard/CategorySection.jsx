import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { mockCategories } from '../../data/mockCategories';

export const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-7">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">Shop by Category</h3>
        <Link
          to="/buyer/categories"
          className="text-xs font-semibold text-[#198754] hover:text-[#14532D] inline-flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Categories Grid / Horizontal scroll */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
        {mockCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/buyer/products?category=${cat.slug}`)}
            className="group cursor-pointer flex flex-col items-center p-2 rounded-2xl bg-white border border-gray-100/90 shadow-2xs hover:shadow-md hover:border-emerald-200 transition-all text-center"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-emerald-50/50 mb-2 p-1 flex items-center justify-center">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-[11px] font-semibold text-gray-800 group-hover:text-[#198754] leading-tight line-clamp-2">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;

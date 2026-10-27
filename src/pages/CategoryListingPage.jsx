import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { mockCategories } from '../data/mockCategories';

export const CategoryListingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          All Produce Categories
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Explore all fresh agriculture categories supplied directly by farmers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/buyer/products?category=${cat.slug}`)}
            className="group cursor-pointer bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all p-4 flex gap-4 items-center"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-emerald-50">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#198754] transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {cat.itemCount} items
                </span>
                <span className="text-xs font-bold text-[#198754] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Browse <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryListingPage;

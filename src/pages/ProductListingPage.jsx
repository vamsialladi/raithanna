import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import { mockProducts } from '../data/mockProducts';
import { mockCategories } from '../data/mockCategories';

export const ProductListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [sortBy, setSortBy] = useState('featured');
  const [onlyOrganic, setOnlyOrganic] = useState(false);

  const filteredProducts = useMemo(() => {
    return mockProducts
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (onlyOrganic && !p.isOrganic) return false;
        if (searchTerm) {
          const q = searchTerm.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.farmLocation.toLowerCase().includes(q) ||
            p.farmerName.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [selectedCategory, searchTerm, sortBy, onlyOrganic]);

  const handleCategorySelect = (slug) => {
    setSelectedCategory(slug);
    setSearchParams(slug === 'all' ? {} : { category: slug });
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Browse Fresh Produce
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Direct from verified farmers in Telangana and Andhra Pradesh
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search produce or farmer..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#198754] focus:outline-none"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-8 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-[#198754]"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#198754] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-[#198754]'
            }`}
          >
            All Products ({mockProducts.length})
          </button>
          {mockCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCategorySelect(c.slug)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === c.slug
                  ? 'bg-[#198754] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-[#198754]'
              }`}
            >
              {c.name}
            </button>
          ))}
          <label className="flex items-center gap-1.5 ml-auto text-xs font-semibold text-emerald-800 cursor-pointer bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shrink-0">
            <input
              type="checkbox"
              checked={onlyOrganic}
              onChange={(e) => setOnlyOrganic(e.target.checked)}
              className="accent-[#198754] rounded"
            />
            Organic Certified Only
          </label>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-6">
          <SlidersHorizontal className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-800">No products found</h3>
          <p className="text-xs text-gray-500 mt-1">Try clearing some filters or searching for another keyword.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
              setOnlyOrganic(false);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#198754] text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;

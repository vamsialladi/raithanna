import { useState } from 'react';
import { Heart, Sprout, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { mockProducts } from '../data/mockProducts';
import { mockFarmers } from '../data/mockFarmers';
import ProductCard from '../components/common/ProductCard';

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favoriteProducts, favoriteFarmers } = useFavorites();
  const [activeTab, setActiveTab] = useState('products');

  const savedProductsList = mockProducts.filter((p) => favoriteProducts.includes(p.id));
  const savedFarmersList = mockFarmers.filter((f) => favoriteFarmers.includes(f.id));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            My Favorites
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Quick access to your preferred farmers and favorite fresh produce
          </p>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-[#198754] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Saved Products ({savedProductsList.length})
          </button>
          <button
            onClick={() => setActiveTab('farmers')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'farmers'
                ? 'bg-[#198754] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Saved Farmers ({savedFarmersList.length})
          </button>
        </div>
      </div>

      {activeTab === 'products' ? (
        savedProductsList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-6">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800">No favorite products saved yet</h3>
            <p className="text-xs text-gray-500 mt-1">
              Tap the heart icon on any produce card to save it here for fast ordering.
            </p>
            <button
              onClick={() => navigate('/buyer/products')}
              className="mt-4 px-4 py-2 rounded-xl bg-[#198754] text-white text-xs font-bold"
            >
              Browse Produce
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {savedProductsList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )
      ) : savedFarmersList.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-6">
          <Sprout className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-800">No favorite farmers saved yet</h3>
          <p className="text-xs text-gray-500 mt-1">
            Follow farmers to support their harvest directly and receive harvest updates.
          </p>
          <button
            onClick={() => navigate('/buyer/farmers')}
            className="mt-4 px-4 py-2 rounded-xl bg-[#198754] text-white text-xs font-bold"
          >
            Find Farmers
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedFarmersList.map((farmer) => (
            <div
              key={farmer.id}
              onClick={() => navigate(`/buyer/farmers/${farmer.id}`)}
              className="cursor-pointer bg-white rounded-2xl border border-gray-100 p-4 shadow-xs hover:shadow-md transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={farmer.avatar}
                  alt={farmer.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20"
                />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{farmer.name}</h4>
                  <p className="text-[11px] text-gray-500">{farmer.location}</p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                    {farmer.acres} Acres Farm
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;

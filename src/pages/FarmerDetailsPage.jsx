import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Star,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowLeft,
  Calendar,
  Sparkles,
  Heart
} from 'lucide-react';
import { mockFarmers } from '../data/mockFarmers';
import { mockProducts } from '../data/mockProducts';
import ProductCard from '../components/common/ProductCard';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';

export const FarmerDetailsPage = () => {
  const { farmerId } = useParams();
  const navigate = useNavigate();
  const { isFarmerFavorite, toggleFarmerFavorite } = useFavorites();
  const showToast = useToast();

  const farmer = mockFarmers.find((f) => f.id === farmerId) || mockFarmers[0];
  const farmerProducts = mockProducts.filter((p) => p.farmerId === farmer.id);

  const isFav = isFarmerFavorite(farmer.id);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#198754] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Farmers
      </button>

      {/* Hero Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={farmer.avatar}
              alt={farmer.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-emerald-500/20 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                  {farmer.name}
                </h1>
                {farmer.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#198754]" /> Verified Farmer
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4 text-gray-400" /> {farmer.location}
              </p>
              <div className="flex items-center gap-3 text-xs mt-2 text-gray-600">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {farmer.rating}{' '}
                  <span className="text-gray-400 font-normal">({farmer.reviewCount} reviews)</span>
                </span>
                <span>•</span>
                <span>{farmer.experience} in farming</span>
                <span>•</span>
                <span>{farmer.acres} Acres</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                toggleFarmerFavorite(farmer.id);
                showToast(isFav ? `Removed ${farmer.name} from saved` : `Saved ${farmer.name}!`);
              }}
              className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all ${
                isFav
                  ? 'border-pink-200 bg-pink-50 text-pink-600'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-pink-300'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-pink-600' : ''}`} />
              <span>{isFav ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => navigate('/buyer/messages')}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-[#198754] hover:bg-[#14532D] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat with Farmer</span>
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            About the Farm & Practices
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl">
            {farmer.bio}
          </p>
        </div>
      </div>

      {/* Produce listed by this farmer */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Fresh Produce by {farmer.name} ({farmerProducts.length})
          </h3>
        </div>

        {farmerProducts.length === 0 ? (
          <p className="text-xs text-gray-500 py-6 text-center bg-white rounded-2xl border">
            Currently preparing next seasonal harvest.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {farmerProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDetailsPage;

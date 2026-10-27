import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Heart, CheckCircle2, Sprout, ArrowRight } from 'lucide-react';
import { mockFarmers } from '../data/mockFarmers';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';

export const FarmerListingPage = () => {
  const navigate = useNavigate();
  const { isFarmerFavorite, toggleFarmerFavorite } = useFavorites();
  const showToast = useToast();

  const [search, setSearch] = useState('');

  const filteredFarmers = mockFarmers.filter((f) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      f.name.toLowerCase().includes(q) ||
      f.location.toLowerCase().includes(q) ||
      f.specialties.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Verified Farmers & Sellers
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Connect directly with sustainable and organic farmers across Telangana
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by farmer, district, or crop..."
            className="w-full pl-10 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#198754] focus:outline-none"
          />
        </div>
      </div>

      {/* Farmers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFarmers.map((farmer) => {
          const isFav = isFarmerFavorite(farmer.id);
          return (
            <div
              key={farmer.id}
              onClick={() => navigate(`/buyer/farmers/${farmer.id}`)}
              className="group cursor-pointer bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Farmer Avatar & Badges */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={farmer.avatar}
                      alt={farmer.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-500/30 group-hover:ring-emerald-600 transition-all"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#198754] transition-colors">
                          {farmer.name}
                        </h3>
                        {farmer.isVerified && (
                          <CheckCircle2 className="w-4 h-4 text-[#198754] fill-emerald-100" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-gray-400" /> {farmer.location}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFarmerFavorite(farmer.id);
                      showToast(isFav ? `Removed ${farmer.name} from saved` : `Saved ${farmer.name}!`);
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFav ? 'text-pink-600 fill-pink-600' : 'text-gray-400 hover:text-pink-600'
                      }`}
                    />
                  </button>
                </div>

                {/* Rating & Stats Strip */}
                <div className="grid grid-cols-3 gap-2 mt-4 py-2 border-y border-gray-100 text-center">
                  <div>
                    <span className="text-[10px] text-gray-400 block font-medium">Rating</span>
                    <span className="text-xs font-bold text-amber-500 flex items-center justify-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400" /> {farmer.rating}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block font-medium">Experience</span>
                    <span className="text-xs font-bold text-gray-800">{farmer.experience}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block font-medium">Farm Area</span>
                    <span className="text-xs font-bold text-gray-800">{farmer.acres} Acres</span>
                  </div>
                </div>

                {/* Bio & Specialties */}
                <p className="text-xs text-gray-600 mt-3 line-clamp-2 leading-relaxed">
                  {farmer.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {farmer.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="text-[10px] font-medium bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Profile Action */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/buyer/farmers/${farmer.id}`);
                }}
                className="mt-4 w-full py-2 px-3 rounded-xl bg-gray-50 hover:bg-[#198754] text-gray-800 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span>View Farm & Produce</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FarmerListingPage;

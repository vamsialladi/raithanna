import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { mockFarmers } from '../../data/mockFarmers';

export const PopularFarmers = () => {
  const navigate = useNavigate();
  const farmers = mockFarmers.slice(0, 4);

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900 tracking-tight">Popular Farmers</h3>
          <Link
            to="/buyer/farmers"
            className="text-[11px] font-semibold text-[#198754] hover:underline inline-flex items-center gap-0.5"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {farmers.map((farmer) => (
            <div
              key={farmer.id}
              onClick={() => navigate(`/buyer/farmers/${farmer.id}`)}
              className="group cursor-pointer flex flex-col items-center text-center p-2.5 rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-xs transition-all bg-gray-50/50 hover:bg-emerald-50/20"
            >
              <img
                src={farmer.avatar}
                alt={farmer.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/20 group-hover:ring-emerald-500 transition-all mb-1.5"
              />
              <h5 className="text-xs font-bold text-gray-900 line-clamp-1 group-hover:text-[#198754]">
                {farmer.name}
              </h5>
              <div className="flex items-center gap-1 text-[10px] text-amber-500 font-semibold mt-0.5">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                <span>{farmer.rating}</span>
                <span className="text-gray-400 font-normal">({farmer.reviewCount})</span>
              </div>
              <p className="text-[10px] text-gray-500 truncate w-full mt-0.5">
                {farmer.location.split(',')[0]}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/buyer/farmers/${farmer.id}`);
                }}
                className="mt-2 w-full py-1 px-2 rounded-lg bg-emerald-50 hover:bg-[#198754] hover:text-white text-[#198754] text-[10px] font-bold transition-all"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularFarmers;

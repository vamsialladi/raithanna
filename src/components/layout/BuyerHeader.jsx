import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Bell,
  MessageSquare,
  ChevronDown,
  Menu,
  User,
  LogOut,
  MapPinned,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockNotifications } from '../../data/mockNotifications';

export const BuyerHeader = ({ onMenuClick }) => {
  const { user, logout, currentLocation, setCurrentLocation } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showLocationMenu, setShowLocationMenu] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/buyer/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/buyer/products');
    }
  };

  const LOCATIONS = [
    'Hyderabad, Telangana',
    'Warangal, Telangana',
    'Nalgonda, Telangana',
    'Nizamabad, Telangana',
    'Medak, Telangana',
    'Sangareddy, Telangana'
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-xs">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Left: Hamburger menu for mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Center-Left: Search Bar */}
        <div className="flex-1 max-w-xl">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for fresh produce, products, or farmers..."
                className="w-full pl-10 pr-12 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#198754] focus:outline-none transition-all placeholder:text-gray-400 text-gray-800"
              />
            </div>
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#198754] hover:bg-[#14532D] text-white flex items-center justify-center transition-colors shadow-xs"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Location Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowLocationMenu(!showLocationMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-700 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-[#198754]" />
              <span className="font-medium max-w-[130px] truncate">{currentLocation}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {showLocationMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Select Delivery Location
                </div>
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setCurrentLocation(loc);
                      setShowLocationMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 ${
                      loc === currentLocation ? 'text-[#198754] font-semibold bg-emerald-50/60' : 'text-gray-700'
                    }`}
                  >
                    <span>{loc}</span>
                    {loc === currentLocation && <CheckCircle className="w-3.5 h-3.5 text-[#198754]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Icon with Badge 3 */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                3
              </span>
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50">
                <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                  <h4 className="text-xs font-bold text-gray-900">Notifications (3 New)</h4>
                  <Link
                    to="/buyer/notifications"
                    onClick={() => setShowNotifMenu(false)}
                    className="text-[11px] text-[#198754] font-medium hover:underline flex items-center gap-1"
                  >
                    View All <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {mockNotifications.map((notif) => (
                    <Link
                      key={notif.id}
                      to={notif.link}
                      onClick={() => setShowNotifMenu(false)}
                      className={`block px-3 py-2.5 rounded-xl hover:bg-emerald-50/50 transition-colors text-left ${
                        !notif.read ? 'bg-emerald-50/30' : ''
                      }`}
                    >
                      <p className="text-xs font-semibold text-gray-900">{notif.title}</p>
                      <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-2">{notif.message}</p>
                      <span className="text-[10px] text-gray-400 mt-1 block">{notif.time}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Messages Icon with Badge 1 */}
          <button
            onClick={() => navigate('/buyer/messages')}
            className="relative p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Messages"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
              1
            </span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 pl-2 rounded-xl border border-gray-200 hover:border-emerald-500 transition-all bg-white"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name || 'Buyer'}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-emerald-500/30"
              />
              <div className="hidden sm:block text-left pr-1 leading-tight">
                <p className="text-xs font-bold text-gray-900">{user?.name || 'Arjun Sharma'}</p>
                <p className="text-[10px] text-gray-500">{user?.role || 'Buyer'}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 pr-1" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs font-bold text-gray-900">{user?.name}</p>
                  <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                </div>
                <Link
                  to="/buyer/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#198754]"
                >
                  <User className="w-4 h-4" /> My Profile
                </Link>
                <Link
                  to="/buyer/addresses"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#198754]"
                >
                  <MapPinned className="w-4 h-4" /> Addresses
                </Link>
                <Link
                  to="/buyer/orders"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#198754]"
                >
                  <CheckCircle className="w-4 h-4" /> My Orders
                </Link>
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                    navigate('/');
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 text-left"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default BuyerHeader;

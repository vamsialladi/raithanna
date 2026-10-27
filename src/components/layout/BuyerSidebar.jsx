import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Sprout,
  ShoppingBag,
  Heart,
  Users,
  TrendingUp,
  MessageSquare,
  Star,
  HelpCircle,
  Settings,
  ArrowRight,
  X
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/buyer/dashboard', icon: LayoutDashboard },
  { name: 'Browse Produce', path: '/buyer/products', icon: Sprout },
  { name: 'My Orders', path: '/buyer/orders', icon: ShoppingBag, badge: 2 },
  { name: 'Favorites', path: '/buyer/favorites', icon: Heart },
  { name: 'Farmers & Sellers', path: '/buyer/farmers', icon: Users },
  { name: 'Price Trends', path: '/buyer/price-trends', icon: TrendingUp },
  { name: 'Messages', path: '/buyer/messages', icon: MessageSquare, badge: 1 },
  { name: 'Reviews & Ratings', path: '/buyer/reviews', icon: Star },
  { name: 'Support & Help', path: '/buyer/support', icon: HelpCircle },
  { name: 'Settings', path: '/buyer/settings', icon: Settings },
];

export const BuyerSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto px-4 py-4 scrollbar-thin">
          {/* Header Brand */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => {
                navigate('/buyer/dashboard');
                onClose?.();
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shadow-xs">
                <Sprout className="w-6 h-6 text-[#198754]" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[#14532D] leading-none">
                  RythuMitra
                </h1>
                <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                  Farmers • Markets • Better Tomorrow
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="mt-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#198754] text-white shadow-xs font-semibold'
                        : 'text-gray-700 hover:bg-emerald-50/70 hover:text-[#198754]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        item.badge > 0
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Promotional Card */}
          <div className="mt-6 mb-2 p-3.5 rounded-2xl bg-[#EAF7EF] border border-emerald-100/80 shadow-xs">
            <div className="w-full h-24 rounded-xl overflow-hidden mb-3 bg-white">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80"
                alt="Fresh vegetable basket"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-sm font-bold text-gray-900 leading-snug">
              Fresh. Local. Direct from Farmers.
            </h4>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Support local farmers and get the best quality produce.
            </p>
            <button
              onClick={() => {
                navigate('/buyer/products');
                onClose?.();
              }}
              className="mt-3 w-full py-2 px-3 rounded-xl bg-[#198754] hover:bg-[#14532D] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Explore Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default BuyerSidebar;

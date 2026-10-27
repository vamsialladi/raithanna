import { Search, Truck, Phone, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuickActions = () => {
  const navigate = useNavigate();

  const ACTIONS = [
    {
      title: 'Search Produce',
      icon: Search,
      path: '/buyer/products',
      color: 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100/70 border-emerald-100'
    },
    {
      title: 'Track Order',
      icon: Truck,
      path: '/buyer/orders/RM-84920',
      color: 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 border-emerald-100'
    },
    {
      title: 'Contact Farmer',
      icon: Phone,
      path: '/buyer/messages',
      color: 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100/70 border-emerald-100'
    },
    {
      title: 'View Reports',
      icon: BarChart2,
      path: '/buyer/price-trends',
      color: 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 border-emerald-100'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-gray-900 tracking-tight mb-3">Quick Actions</h3>

        <div className="grid grid-cols-2 gap-2.5">
          {ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.title}
                onClick={() => navigate(action.path)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all hover:scale-[1.02] shadow-2xs ${action.color}`}
              >
                <Icon className="w-5 h-5 mb-1 text-[#198754]" />
                <span className="text-[11px] font-bold text-gray-800 leading-tight">
                  {action.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;

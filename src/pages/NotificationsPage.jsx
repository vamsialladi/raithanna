import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCircle2, Tag, TrendingDown, MessageSquare, ExternalLink } from 'lucide-react';
import { mockNotifications } from '../data/mockNotifications';

export const NotificationsPage = () => {
  const [notifs, setNotifs] = useState(mockNotifications);

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Notifications
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Order tracking alerts, price changes, and farmer updates
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="text-xs font-semibold text-[#198754] hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs divide-y divide-gray-100 overflow-hidden">
        {notifs.map((n) => (
          <Link
            key={n.id}
            to={n.link}
            className={`p-4 flex items-start gap-3.5 hover:bg-emerald-50/40 transition-colors block ${
              !n.read ? 'bg-emerald-50/20' : ''
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                n.type === 'order'
                  ? 'bg-blue-100 text-blue-600'
                  : n.type === 'offer'
                  ? 'bg-emerald-100 text-[#198754]'
                  : n.type === 'price'
                  ? 'bg-amber-100 text-amber-600'
                  : 'bg-purple-100 text-purple-600'
              }`}
            >
              {n.type === 'order' ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : n.type === 'offer' ? (
                <Tag className="w-4 h-4" />
              ) : n.type === 'price' ? (
                <TrendingDown className="w-4 h-4" />
              ) : (
                <MessageSquare className="w-4 h-4" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-900">{n.title}</h4>
                <span className="text-[10px] text-gray-400">{n.time}</span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">{n.message}</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400 shrink-0 self-center" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;

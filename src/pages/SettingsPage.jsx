import { useState } from 'react';
import { User, Bell, Shield, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const SettingsPage = () => {
  const { user, updateProfile } = useAuth();
  const showToast = useToast();

  const [name, setName] = useState(user?.name || 'Arjun Sharma');
  const [email, setEmail] = useState(user?.email || 'arjun.sharma@example.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [location, setLocation] = useState(user?.location || 'Hyderabad, Telangana');

  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [orderSms, setOrderSms] = useState(true);
  const [priceDropNotify, setPriceDropNotify] = useState(true);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ name, email, phone, location });
    showToast('Profile updated successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Account Settings
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Manage your personal buyer profile, contact preferences, and notifications
        </p>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
          <User className="w-4 h-4 text-[#198754]" />
          <h3 className="text-sm font-bold text-gray-900">Personal Information</h3>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
              alt={name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-500/20"
            />
            <div>
              <p className="text-sm font-bold text-gray-900">{name}</p>
              <p className="text-xs text-gray-500">{user?.role || 'Buyer'}</p>
              <button
                type="button"
                onClick={() => showToast('Avatar update feature enabled')}
                className="text-xs font-semibold text-[#198754] hover:underline mt-1"
              >
                Change Photo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#198754]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#198754]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#198754]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Primary City</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#198754]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#198754] hover:bg-[#14532D] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile</span>
          </button>
        </form>
      </div>

      {/* Notifications Preferences */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <Bell className="w-4 h-4 text-[#198754]" />
          <h3 className="text-sm font-bold text-gray-900">Notification Preferences</h3>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50/60 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-gray-900">WhatsApp Dispatch & Delivery Updates</p>
              <p className="text-[11px] text-gray-500">Receive live driver tracking on WhatsApp</p>
            </div>
            <input
              type="checkbox"
              checked={whatsappAlerts}
              onChange={(e) => setWhatsappAlerts(e.target.checked)}
              className="w-4 h-4 accent-[#198754] rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50/60 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-gray-900">SMS Order Status Updates</p>
              <p className="text-[11px] text-gray-500">Order placed, dispatched, and delivery OTP alerts</p>
            </div>
            <input
              type="checkbox"
              checked={orderSms}
              onChange={(e) => setOrderSms(e.target.checked)}
              className="w-4 h-4 accent-[#198754] rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50/60 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-gray-900">Mandi Price Drop Alerts</p>
              <p className="text-[11px] text-gray-500">Alert me when favored produce drops in wholesale price</p>
            </div>
            <input
              type="checkbox"
              checked={priceDropNotify}
              onChange={(e) => setPriceDropNotify(e.target.checked)}
              className="w-4 h-4 accent-[#198754] rounded"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

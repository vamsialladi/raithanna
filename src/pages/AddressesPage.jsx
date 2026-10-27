import { useState } from 'react';
import { MapPin, Plus, CheckCircle2, Trash2, Edit2 } from 'lucide-react';
import { mockAddresses } from '../data/mockNotifications';
import { useToast } from '../context/ToastContext';

export const AddressesPage = () => {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    type: 'Home',
    name: 'Arjun Sharma',
    phone: '+91 98765 43210',
    addressLine: '',
    landmark: '',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: ''
  });
  const showToast = useToast();

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.addressLine || !newAddr.pincode) return;

    const added = {
      id: `addr-${Date.now()}`,
      isDefault: addresses.length === 0,
      ...newAddr
    };

    setAddresses([...addresses, added]);
    setShowAddModal(false);
    showToast('Delivery address saved successfully!');
    setNewAddr({
      type: 'Home',
      name: 'Arjun Sharma',
      phone: '+91 98765 43210',
      addressLine: '',
      landmark: '',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: ''
    });
  };

  const setDefault = (id) => {
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
    showToast('Default address updated');
  };

  const removeAddress = (id) => {
    if (addresses.length <= 1) {
      showToast('You must keep at least one delivery address', 'error');
      return;
    }
    setAddresses(addresses.filter((a) => a.id !== id));
    showToast('Address removed');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Delivery Addresses
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage your home, office, and commercial delivery locations
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-[#198754] hover:bg-[#14532D] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Address</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between ${
              addr.isDefault
                ? 'border-[#198754] ring-1 ring-[#198754] shadow-xs'
                : 'border-gray-100 shadow-xs hover:border-gray-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded-md">
                  {addr.type}
                </span>
                {addr.isDefault && (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#198754]" /> Default
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-gray-900">{addr.name}</h4>
              <p className="text-xs text-gray-600 mt-1">
                {addr.addressLine}, {addr.landmark}
              </p>
              <p className="text-xs text-gray-600">
                {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p className="text-xs text-gray-500 mt-2 font-medium">Contact: {addr.phone}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              {!addr.isDefault ? (
                <button
                  onClick={() => setDefault(addr.id)}
                  className="font-bold text-[#198754] hover:underline"
                >
                  Set as Default
                </button>
              ) : (
                <span className="text-[11px] text-gray-400">Primary delivery</span>
              )}

              <button
                onClick={() => removeAddress(addr.id)}
                className="text-gray-400 hover:text-red-500 p-1"
                title="Remove address"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold text-gray-900 mb-4">Add New Delivery Address</h3>

            <form onSubmit={handleAddAddress} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Address Type
                </label>
                <div className="flex gap-2">
                  {['Home', 'Office', 'Other'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewAddr({ ...newAddr, type: t })}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-xl border ${
                        newAddr.type === t
                          ? 'border-[#198754] bg-emerald-50 text-[#198754]'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Full Flat / House / Street Details
                </label>
                <input
                  type="text"
                  required
                  value={newAddr.addressLine}
                  onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                  placeholder="e.g. Flat 301, Lakeview Apts"
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#198754]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Landmark</label>
                  <input
                    type="text"
                    value={newAddr.landmark}
                    onChange={(e) => setNewAddr({ ...newAddr, landmark: e.target.value })}
                    placeholder="e.g. Near Metro"
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#198754]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    placeholder="e.g. 500081"
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#198754]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#198754]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">State</label>
                  <input
                    type="text"
                    value={newAddr.state}
                    disabled
                    className="w-full px-3 py-2 text-xs bg-gray-100 border border-gray-200 rounded-xl text-gray-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold text-white bg-[#198754] hover:bg-[#14532D] rounded-xl transition-colors"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressesPage;

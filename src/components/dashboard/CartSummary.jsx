import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartSummary = () => {
  const navigate = useNavigate();
  const { cartItems, totalItemsCount, subtotal, updateQuantity } = useCart();

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-gray-900 tracking-tight">My Cart</h4>
          <Link
            to="/buyer/cart"
            className="text-[11px] font-semibold text-[#198754] hover:underline inline-flex items-center gap-0.5"
          >
            <span>View Cart</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Cart Item Rows */}
        {cartItems.length === 0 ? (
          <div className="text-center py-6 px-3 bg-gray-50/70 rounded-xl border border-dashed border-gray-200">
            <ShoppingBag className="w-8 h-8 text-gray-300 mx-auto mb-1.5" />
            <p className="text-xs font-semibold text-gray-600">Your cart is empty</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Add fresh produce to get started</p>
            <button
              onClick={() => navigate('/buyer/products')}
              className="mt-3 px-3 py-1 rounded-lg bg-[#198754] text-white text-[10px] font-bold"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-2 p-2 rounded-xl border border-gray-100 bg-gray-50/40 hover:bg-white hover:shadow-2xs transition-all"
              >
                {/* Thumbnail & Name */}
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-lg object-cover bg-white shrink-0 border border-gray-100"
                  />
                  <div className="min-w-0 leading-tight">
                    <p className="text-xs font-bold text-gray-900 truncate">
                      {item.name} {item.quantity > 1 ? `(${item.quantity} ${item.unit})` : ''}
                    </p>
                    <p className="text-[10px] text-gray-500 font-medium">
                      ₹{item.price}/{item.unit}
                    </p>
                  </div>
                </div>

                {/* Counter & Line Total */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:bg-gray-100 text-gray-600 rounded-l-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-2.5 h-2.5" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-gray-100 text-gray-600 rounded-r-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-2.5 h-2.5" />
                    </button>
                  </div>

                  <span className="text-xs font-bold text-gray-900 w-12 text-right">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subtotal & Checkout Button */}
      {cartItems.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="text-gray-600 font-medium">
              Total ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
            </span>
            <span className="text-base font-extrabold text-gray-900">₹{subtotal}</span>
          </div>

          <button
            onClick={() => navigate('/buyer/checkout')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#198754] hover:bg-[#14532D] text-white text-xs font-bold transition-all shadow-xs active:scale-95 text-center"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSummary;

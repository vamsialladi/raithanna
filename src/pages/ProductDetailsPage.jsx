import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Heart,
  Star,
  MapPin,
  ShoppingBag,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Calendar,
  User,
  Minus,
  Plus,
  MessageSquare
} from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import { mockFarmers } from '../data/mockFarmers';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isProductFavorite, toggleProductFavorite } = useFavorites();
  const showToast = useToast();

  const product = mockProducts.find((p) => p.id === productId) || mockProducts[0];
  const farmer = mockFarmers.find((f) => f.id === product.farmerId) || mockFarmers[0];

  const [quantity, setQuantity] = useState(1);
  const isFav = isProductFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`Added ${quantity} ${product.unit} of ${product.name} to Cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/buyer/checkout');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#198754] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </button>

      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-gray-100 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Product Image */}
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-gray-50 aspect-4/3 border border-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => {
                toggleProductFavorite(product.id);
                showToast(isFav ? 'Removed from favorites' : 'Added to favorites!');
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:scale-110 transition-all"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFav ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'
                }`}
              />
            </button>
            {product.isOrganic && (
              <span className="absolute top-4 left-4 bg-[#198754] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                100% Certified Organic
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <Truck className="w-4 h-4 text-[#198754] mx-auto mb-1" />
              <p className="text-[10px] font-bold text-gray-800">Fresh Dispatch</p>
              <p className="text-[9px] text-gray-500">Within 24 Hours</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <ShieldCheck className="w-4 h-4 text-[#198754] mx-auto mb-1" />
              <p className="text-[10px] font-bold text-gray-800">Quality Tested</p>
              <p className="text-[9px] text-gray-500">Chemical Free</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <Calendar className="w-4 h-4 text-[#198754] mx-auto mb-1" />
              <p className="text-[10px] font-bold text-gray-800">Harvest Date</p>
              <p className="text-[9px] text-gray-500">{product.harvestDate || 'Freshly picked'}</p>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold ml-auto">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-gray-400 font-normal">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {product.name}
            </h1>

            {/* Price Display */}
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#198754]">
                ₹{product.price}
              </span>
              <span className="text-sm text-gray-500 font-medium">/ {product.unit}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through ml-2">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-600 mt-4 leading-relaxed">
              {product.description}
            </p>

            {/* Farmer Card */}
            <div className="mt-6 p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={farmer.avatar}
                  alt={farmer.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20"
                />
                <div>
                  <h5 className="text-xs font-bold text-gray-900">{farmer.name}</h5>
                  <p className="text-[11px] text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" /> {farmer.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/buyer/farmers/${farmer.id}`}
                  className="text-xs font-semibold text-[#198754] hover:underline"
                >
                  Profile
                </Link>
                <Link
                  to="/buyer/messages"
                  className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#198754]"
                  title="Message farmer"
                >
                  <MessageSquare className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Stock status */}
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span className="text-xs font-medium text-emerald-800">
                In Stock ({product.stock} {product.unit} available)
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-xs font-bold text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-xl bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-gray-100 text-gray-600 rounded-l-xl transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="p-2 hover:bg-gray-100 text-gray-600 rounded-r-xl transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-xs text-gray-500 font-medium">
                Total: <strong className="text-gray-900">₹{product.price * quantity}</strong>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              className="py-3 px-4 rounded-xl border-2 border-[#198754] text-[#198754] hover:bg-emerald-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="py-3 px-4 rounded-xl bg-[#198754] hover:bg-[#14532D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

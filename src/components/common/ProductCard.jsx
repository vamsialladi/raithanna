import { Heart, Star, MapPin, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isProductFavorite, toggleProductFavorite } = useFavorites();
  const showToast = useToast();

  const isFav = isProductFavorite(product.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleProductFavorite(product.id);
    showToast(isFav ? `Removed ${product.name} from favorites` : `Saved ${product.name} to favorites!`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added 1 ${product.unit} of ${product.name} to Cart!`);
  };

  return (
    <div
      onClick={() => navigate(`/buyer/products/${product.id}`)}
      className="group cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      <div className="relative w-full h-32 sm:h-36 overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Favorite Icon */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs shadow-xs flex items-center justify-center hover:bg-white hover:scale-110 transition-all z-10"
          aria-label="Save to favorites"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFav ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          />
        </button>

        {/* Organic Tag if present */}
        {product.isOrganic && (
          <span className="absolute bottom-2 left-2 text-[10px] bg-emerald-600/90 text-white font-semibold px-2 py-0.5 rounded-full backdrop-blur-xs">
            Organic
          </span>
        )}
      </div>

      <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-[#198754] transition-colors">
            {product.name}
          </h4>

          {/* Price & Unit */}
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-sm sm:text-base font-extrabold text-[#198754]">
              ₹{product.price}
            </span>
            <span className="text-xs text-gray-500">/ {product.unit}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[11px] text-gray-400 line-through ml-1">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Farm Location */}
          <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1 line-clamp-1">
            <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="truncate">{product.farmLocation}</span>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold mt-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
            <span>{product.rating}</span>
            <span className="text-gray-400 font-normal">({product.reviewCount})</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-3 w-full py-1.5 sm:py-2 px-3 rounded-xl bg-[#198754] hover:bg-[#14532D] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs active:scale-95"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../common/ProductCard';
import { mockProducts } from '../../data/mockProducts';

export const FeaturedProducts = () => {
  const featured = mockProducts.filter((p) => p.isFeatured).slice(0, 5);

  return (
    <div className="mt-7">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">Featured Products</h3>
        <Link
          to="/buyer/products"
          className="text-xs font-semibold text-[#198754] hover:text-[#14532D] inline-flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;

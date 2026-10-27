import { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { mockProducts } from '../data/mockProducts';

export const ReviewsPage = () => {
  const showToast = useToast();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0].name);

  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      productName: 'Tomato',
      farmerName: 'Ramesh Reddy',
      rating: 5,
      date: '2026-10-22',
      comment: 'Super fresh country tomatoes! Perfectly ripe and rich in flavor. Delivered within 6 hours of harvest.',
      likes: 12
    },
    {
      id: 'rev-2',
      productName: 'Green Chilli',
      farmerName: 'Lakshmi Devi',
      rating: 5,
      date: '2026-10-18',
      comment: 'Very spicy Warangal chillies, aromatic and completely pesticide free. Highly recommended!',
      likes: 8
    },
    {
      id: 'rev-3',
      productName: 'Rice (Non-Basmati)',
      farmerName: 'Suresh Kumar',
      rating: 4,
      date: '2026-10-10',
      comment: 'Clean BPT rice grain with zero stones or foreign matter. Cooks very soft.',
      likes: 5
    }
  ]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      productName: selectedProduct,
      farmerName: 'Local Farmer',
      rating,
      date: 'Today',
      comment: comment.trim(),
      likes: 0
    };

    setReviews([newRev, ...reviews]);
    setComment('');
    showToast('Your review has been submitted for farm verification!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Product Reviews & Farmer Ratings
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Share your direct farm feedback to reward farmers for organic quality
        </p>
      </div>

      {/* Write a review box */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Write a Produce Review</h3>

        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Select Produce
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#198754]"
              >
                {mockProducts.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} (from {p.farmerName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Your Rating
              </label>
              <div className="flex items-center gap-1.5 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-gray-700 ml-2">{rating} / 5 Stars</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Your Feedback
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others about freshness, taste, and packaging..."
              className="w-full p-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#198754] focus:bg-white"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#198754] hover:bg-[#14532D] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Review</span>
          </button>
        </form>
      </div>

      {/* Existing Reviews */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-900">Recent Buyer Reviews</h3>
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs space-y-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-gray-900">
                  {rev.productName}{' '}
                  <span className="text-gray-400 font-normal">by {rev.farmerName}</span>
                </h4>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[10px] text-gray-400 ml-1">{rev.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-gray-500">
                <ThumbsUp className="w-3.5 h-3.5 text-gray-400" />
                <span>{rev.likes}</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;

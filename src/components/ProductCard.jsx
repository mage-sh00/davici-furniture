import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ArrowLeftRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart, isWishlisted, onToggleWishlist }) {
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-700 aspect-square">

        {/* Badge */}
        {product.badge === 'sale' && (
          <span className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md uppercase">
            Sale
          </span>
        )}
        {product.badge === 'new' && (
          <span className="absolute top-3 left-3 z-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md uppercase">
            New
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            size={15}
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>

        {/* Product Image */}
        <img
          src={product.img}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Hover Actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm py-3 flex justify-center gap-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-yellow-600"
          >
            <Eye size={14} /> Quick View
          </button>
          <button
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-yellow-600"
          >
            <ArrowLeftRight size={14} /> Compare
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-sm ${i < product.stars ? 'text-yellow-400' : 'text-gray-200'}`}>
              ★
            </span>
          ))}
          <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
        </div>

        <h3 className="font-semibold text-gray-800 dark:text-white text-sm leading-snug mb-1">
          {product.title}
        </h3>
        <p className="text-xs text-gray-400 mb-3">Free Delivery · In Stock</p>

        {/* Price + Add */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-yellow-600 font-bold text-lg">{product.price}</span>
            {product.old && (
              <span className="text-gray-300 text-sm line-through ml-2">{product.old}</span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg transition-colors duration-300 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-yellow-600'
            }`}
          >
            {added ? '✓' : '+'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
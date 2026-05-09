import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../data/data';

export default function ProductDetail({ onAddToCart, wishlist, onToggleWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === parseInt(id));
  const related = PRODUCTS.filter(p => p.id !== parseInt(id)).slice(0, 4);
  const isWishlisted = wishlist?.some(w => w.id === product?.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 dark:text-white">Product not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-yellow-600 hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 hover:text-yellow-600 transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            {product.badge && (
              <span className={`absolute top-4 left-4 z-10 text-white text-xs font-bold px-3 py-1 rounded-md uppercase ${product.badge === 'sale' ? 'bg-orange-500' : 'bg-green-500'}`}>
                {product.badge}
              </span>
            )}
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-[500px] object-cover rounded-3xl shadow-xl"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center space-y-6"
          >
            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < product.stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              {product.title}
            </h1>

            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Crafted with premium quality materials, this piece brings elegance and comfort to your home. 
              Perfect for modern and traditional interiors alike. Each piece is carefully inspected for 
              quality before delivery.
            </p>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-yellow-600">{product.price}</span>
              {product.old && (
                <span className="text-xl text-gray-300 line-through">{product.old}</span>
              )}
              {product.old && (
                <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-1 rounded-lg">
                  Save {Math.round((1 - parseInt(product.price.replace(/[^0-9]/g,'')) / parseInt(product.old.replace(/[^0-9]/g,''))) * 100)}%
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAddToCart(product)}
                className="flex-1 bg-gray-900 dark:bg-yellow-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-yellow-600 dark:hover:bg-yellow-500 transition-colors"
              >
                Add to Cart 🛒
              </motion.button>
              <button
                onClick={() => onToggleWishlist(product)}
                className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? 'border-red-400 bg-red-50 text-red-500'
                    : 'border-gray-200 hover:border-red-400 text-gray-400 hover:text-red-400'
                }`}
              >
                <Heart size={22} className={isWishlisted ? 'fill-red-500' : ''} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t dark:border-gray-700">
              {[
                { icon: <Truck size={20} />, label: 'Free Delivery' },
                { icon: <Shield size={20} />, label: '2 Year Warranty' },
                { icon: <RefreshCw size={20} />, label: 'Easy Returns' },
              ].map(f => (
                <div key={f.label} className="flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 bg-yellow-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-yellow-600">
                    {f.icon}
                  </div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{f.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            You May Also <span className="text-yellow-600">Like</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(`/product/${p.id}`)}
                className="cursor-pointer group"
              >
                <div className="rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800 aspect-square mb-3">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="font-semibold text-gray-800 dark:text-white text-sm">{p.title}</p>
                <p className="text-yellow-600 font-bold mt-1">{p.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
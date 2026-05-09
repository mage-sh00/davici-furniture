import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from './ProductCard';
import { PRODUCTS, TABS } from '../data/data';

export default function HotProducts({ onAddToCart, wishlist, onToggleWishlist }) {
  const [activeTab, setActiveTab] = useState('Latest Products');
  const [sortBy, setSortBy] = useState('default');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Sofa', 'Chair', 'Table', 'Light', 'Mirror', 'Clock'];

  const filtered = PRODUCTS
    .filter(p => {
      if (filterCategory === 'All') return true;
      return p.title.toLowerCase().includes(filterCategory.toLowerCase());
    })
    .sort((a, b) => {
      const aPrice = parseInt(a.price.replace(/[^0-9]/g, ''));
      const bPrice = parseInt(b.price.replace(/[^0-9]/g, ''));
      if (sortBy === 'price-low') return aPrice - bPrice;
      if (sortBy === 'price-high') return bPrice - aPrice;
      if (sortBy === 'rating') return b.stars - a.stars;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return 0;
    });

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Hot <span className="text-yellow-600">Products</span>
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-colors ${
                showFilters
                  ? 'bg-yellow-600 text-white border-yellow-600'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-yellow-600 hover:text-yellow-600'
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
            <button className="text-sm font-bold text-yellow-600 hover:underline">
              View All →
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-100 dark:border-gray-700">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-4 text-sm font-semibold transition-colors relative ${
                activeTab === tab
                  ? 'text-yellow-600'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-600"
                />
              )}
            </button>
          ))}
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl"
            >
              <div className="flex flex-col md:flex-row gap-6">

                {/* Category Filter */}
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Category
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                          filterCategory === cat
                            ? 'bg-yellow-600 text-white'
                            : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-yellow-50 border border-gray-200 dark:border-gray-600'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Sort By
                  </p>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="bg-white dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-yellow-600 cursor-pointer"
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="reviews">Most Reviewed</option>
                  </select>
                </div>

                {/* Reset */}
                <div className="flex items-end">
                  <button
                    onClick={() => { setSortBy('default'); setFilterCategory('All'); }}
                    className="flex items-center gap-2 text-sm text-red-400 hover:text-red-600 font-semibold"
                  >
                    <X size={14} /> Reset Filters
                  </button>
                </div>
              </div>

              {/* Results count */}
              <p className="mt-4 text-xs text-gray-400">
                Showing {filtered.length} of {PRODUCTS.length} products
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-4 text-center py-16"
              >
                <p className="text-4xl mb-4">🛋️</p>
                <p className="text-gray-400 font-semibold">No products found for this filter.</p>
                <button
                  onClick={() => setFilterCategory('All')}
                  className="mt-4 text-yellow-600 font-bold hover:underline"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    isWishlisted={wishlist?.some(w => w.id === product.id)}
                    onToggleWishlist={onToggleWishlist}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
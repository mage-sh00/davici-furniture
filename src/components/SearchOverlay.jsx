import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../data/data';

export default function SearchOverlay({ open, query, setQuery, onClose, onAddToCart }) {
  const results = PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Input */}
            <div className="flex items-center gap-3 p-4 border-b dark:border-gray-700">
              <span className="text-xl">🔍</span>
              <input
                autoFocus
                type="text"
                placeholder="Search furniture..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 text-lg outline-none bg-transparent dark:text-white placeholder-gray-400"
              />
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {query === '' ? (
                <div className="p-8 text-center text-gray-400">
                  Start typing to search... 🛋️
                </div>
              ) : results.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  No results for "{query}" 😕
                </div>
              ) : (
                results.map(p => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 border-b dark:border-gray-700 last:border-0"
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-semibold dark:text-white">{p.title}</p>
                      <p className="text-yellow-600 font-bold">{p.price}</p>
                    </div>
                    <button
                      onClick={() => { onAddToCart(p); onClose(); }}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
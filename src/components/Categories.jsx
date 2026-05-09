import { motion } from 'framer-motion';
import { CATEGORIES } from '../data/data';

export default function Categories() {
  return (
    <section className="py-16 px-4 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Shop by <span className="text-yellow-600">Categories</span>
            </h2>
            <p className="text-gray-400 mt-1">2,345 unique products</p>
          </div>
          <button className="text-sm font-bold text-yellow-600 hover:underline">
            All Categories →
          </button>
        </div>

        <div className="flex gap-8">
          {/* Left promo */}
          <div className="hidden md:flex flex-col justify-between bg-[#f9f7f4] rounded-2xl p-8 w-64 shrink-0">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 leading-snug">
                Top Picks <br /> For You
              </h3>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                Hand-curated selections from our finest collections.
              </p>
            </div>
            <button className="text-yellow-600 font-bold text-sm text-left hover:underline">
              View All →
            </button>
          </div>

          {/* Categories grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="cursor-pointer group"
              >
                <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-semibold text-gray-800 dark:text-white">{cat.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{cat.count}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
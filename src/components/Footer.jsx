import { motion } from 'framer-motion';

export default function Footer() {
  const links = {
    Shop: ['Living Room', 'Bedroom', 'Dining Room', 'Office'],
    Help: ['FAQ', 'Shipping', 'Returns', 'Track Order'],
    Contact: ['hello@davici.com', '+1 800 123 4567', 'Mon–Fri · 9am–6pm'],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600 text-2xl">⬡</span>
              <span className="text-white text-xl font-bold tracking-widest">DAVICI</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Crafting beautiful furniture for modern homes since 2010. Quality you can feel.
            </p>
            <div className="flex gap-3">
              {['f', 'in', 'tw', 'ig'].map(s => (
                <div
                  key={s}
                  className="w-9 h-9 bg-gray-800 hover:bg-yellow-600 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition-colors duration-300"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-bold mb-4 tracking-wide">{title}</h4>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item}>
                    <span className="text-sm text-gray-400 hover:text-yellow-500 cursor-pointer transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-bold text-lg">Subscribe to our newsletter</h4>
              <p className="text-gray-400 text-sm mt-1">Get the latest offers and updates.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 bg-gray-800 text-white px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-yellow-600 placeholder-gray-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-600 hover:bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2025 DAVICI Furniture. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <span key={item} className="text-gray-500 hover:text-gray-300 text-xs cursor-pointer transition-colors">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
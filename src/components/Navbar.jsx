import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Heart, User, Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar({ onSearchOpen, onCartOpen, cartCount, darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ['Home', 'Shop', 'Blog', 'Vendors', 'Pages'];

  return (
    <nav className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-yellow-600 text-2xl">⬡</span>
          <span className="text-xl font-bold tracking-widest dark:text-white">DAVICI</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <li key={link}>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors cursor-pointer">
                {link}
              </span>
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {darkMode
              ? <Sun size={18} className="text-yellow-400" />
              : <Moon size={18} className="text-gray-600" />
            }
          </button>

          <button
            onClick={onSearchOpen}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Search size={18} className="text-gray-600 dark:text-gray-300" />
          </button>

          <button className="w-9 h-9 hidden md:flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Heart size={18} className="text-gray-600 dark:text-gray-300" />
          </button>

          <button className="w-9 h-9 hidden md:flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <User size={18} className="text-gray-600 dark:text-gray-300" />
          </button>

          <button
            onClick={onCartOpen}
            className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ShoppingCart size={18} className="text-gray-600 dark:text-gray-300" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {menuOpen
              ? <X size={18} className="dark:text-white" />
              : <Menu size={18} className="dark:text-white" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
          >
            {links.map(link => (
              <div
                key={link}
                className="block px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-yellow-600 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
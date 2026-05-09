import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import Categories from './components/Categories';
import RoomBanners from './components/RoomBanners';
import HotProducts from './components/HotProducts';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import SearchOverlay from './components/SearchOverlay';
import ProductDetail from './pages/ProductDetail';
import { PRODUCTS } from './data/data';

function HomePage({ onAddToCart, wishlist, onToggleWishlist }) {
  return (
    <>
      <HeroCarousel />
      <Categories />
      <RoomBanners />
      <HotProducts
        onAddToCart={onAddToCart}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
      />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('davici-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('davici-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('davici-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('davici-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        return prev.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    toast.success(`${product.title} added to cart!`, {
      icon: '🛒',
      style: { borderRadius: '10px', fontWeight: '600' }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
    toast.error('Item removed from cart');
  };

  const changeQty = (id, delta) => {
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    );
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        toast('Removed from wishlist', { icon: '💔' });
        return prev.filter(i => i.id !== product.id);
      }
      toast.success('Added to wishlist!', { icon: '❤️' });
      return [...prev, product];
    });
  };

  const totalCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cartItems.reduce((s, i) => {
    const num = parseInt(i.price.replace(/[^0-9]/g, ''));
    return s + num * i.qty;
  }, 0);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center z-50">
        <div className="text-4xl font-bold tracking-widest text-gray-800 dark:text-white mb-6">
          ⬡ DAVICI
        </div>
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-600 rounded-full animate-pulse w-3/4" />
        </div>
        <p className="mt-4 text-xs tracking-widest text-gray-400">
          LOADING COLLECTION...
        </p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Toaster position="top-right" />

        <SearchOverlay
          open={searchOpen}
          query={searchQuery}
          setQuery={setSearchQuery}
          onClose={() => { setSearchOpen(false); setSearchQuery(''); }}
          onAddToCart={addToCart}
        />

        <CartSidebar
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          cartItems={cartItems}
          onRemove={removeFromCart}
          onChangeQty={changeQty}
          totalCount={totalCount}
          totalPrice={totalPrice}
        />

        <Navbar
          onSearchOpen={() => setSearchOpen(true)}
          onCartOpen={() => setCartOpen(true)}
          cartCount={totalCount}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <Routes>
          <Route path="/" element={
            <HomePage
              onAddToCart={addToCart}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
            />
          } />
          <Route path="/product/:id" element={
            <ProductDetail
              onAddToCart={addToCart}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
            />
          } />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
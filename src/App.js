import { useState, useEffect } from 'react';
import Navbar       from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import Categories   from './components/Categories';
import RoomBanners  from './components/RoomBanners';
import HotProducts  from './components/HotProducts';
import Footer       from './components/Footer';
import { PRODUCTS } from './data/data';
import './styles/global.css';

function SearchOverlay({ query, setQuery, onClose, onAddToCart }) {
  const results = PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-box" onClick={e => e.stopPropagation()}>
        <div className="search-input-wrap">
          <span>🔍</span>
          <input
            autoFocus
            type="text"
            placeholder="Search furniture..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button onClick={onClose}>✕</button>
        </div>
        <div className="search-results">
          {query === '' ? (
            <div className="search-no-result">Start typing to search... 🛋️</div>
          ) : results.length === 0 ? (
            <div className="search-no-result">No results for "{query}" 😕</div>
          ) : (
            results.map(p => (
              <div key={p.id} className="search-result-item">
                <img className="search-result-img" src={p.img} alt={p.title} />
                <div className="search-result-info">
                  <div className="search-result-name">{p.title}</div>
                  <div className="search-result-price">{p.price}</div>
                </div>
                <button
                  style={{
                    background:'#e8622a', color:'white', border:'none',
                    padding:'6px 12px', borderRadius:4, cursor:'pointer',
                    fontSize:12, fontWeight:700
                  }}
                  onClick={() => { onAddToCart(p); onClose(); }}
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [loading,     setLoading]     = useState(true);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen,    setCartOpen]    = useState(false);
  const [cartItems,   setCartItems]   = useState([]);

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
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const changeQty = (id, delta) => {
    setCartItems(prev =>
      prev
        .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    );
  };

  const totalCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cartItems.reduce((s, i) => {
    const num = parseInt(i.price.replace(/[^0-9]/g, ''));
    return s + num * i.qty;
  }, 0);

  return (
    <>
      {/* LOADING SPINNER */}
      <div className={`loader-wrap ${loading ? '' : 'hide'}`}>
        <div className="loader-logo"><span>⬡</span> DAVICI</div>
        <div className="loader-bar"><div className="loader-fill" /></div>
        <div className="loader-text">LOADING COLLECTION...</div>
      </div>

      {/* SEARCH */}
      {searchOpen && (
        <SearchOverlay
          query={searchQuery}
          setQuery={setSearchQuery}
          onClose={() => { setSearchOpen(false); setSearchQuery(''); }}
          onAddToCart={addToCart}
        />
      )}

      {/* CART OVERLAY */}
      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)} />
      )}

      {/* CART SIDEBAR */}
      <div className={`cart-sidebar ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>🛒 My Cart ({totalCount})</h3>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div>🛒</div>
              <p>Your cart is empty!</p>
              <p style={{ fontSize:12, marginTop:8 }}>Add some furniture 😊</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img className="cart-item-img" src={item.img} alt={item.title} />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.title}</div>
                  <div className="cart-item-price">{item.price}</div>
                  <div className="cart-qty">
                    <button onClick={() => changeQty(item.id, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout →</button>
          </div>
        )}
      </div>

      {/* MAIN SITE */}
      <Navbar
        onSearchOpen={() => setSearchOpen(true)}
        onCartOpen={() => setCartOpen(true)}
        cartCount={totalCount}
      />
      <HeroCarousel />
      <Categories />
      <RoomBanners />
      <HotProducts onAddToCart={addToCart} />
      <Footer />
    </>
  );
}

export default App;
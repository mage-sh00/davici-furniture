import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data/data';

function Navbar({ onSearchOpen, onCartOpen, cartCount }) {
  const [activeLink, setActiveLink] = useState('Home');
  const [darkMode,   setDarkMode]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') { setDarkMode(true); document.body.classList.add('dark'); }
  }, []);

  const toggleDark = () => {
    const n = !darkMode; setDarkMode(n);
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', n);
  };

  return (
    <>
      <header className="dav-nav">
        <div className="dav-logo"><span>⬡</span> DAVICI</div>

        <ul className="dav-navlinks">
          {NAV_LINKS.map(link => (
            <li key={link}
              className={activeLink === link ? 'active' : ''}
              onClick={() => setActiveLink(link)}>
              {link}
            </li>
          ))}
        </ul>

        {/* Desktop search bar */}
        <div className="dav-search" onClick={onSearchOpen} style={{cursor:'pointer'}}>
          <input readOnly placeholder="Search furniture..." />
          <button>🔍</button>
        </div>

        <div className="dav-actions">
          <button className="dark-toggle" onClick={toggleDark}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <span>👤</span>

          {/* Cart with badge */}
          <div className="cart-wrap" onClick={onCartOpen}>
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map(link => (
            <div key={link}
              className={`mobile-menu-item ${activeLink === link ? 'active' : ''}`}
              onClick={() => { setActiveLink(link); setMenuOpen(false); }}>
              {link}
            </div>
          ))}
          {/* Search in mobile menu */}
          <div className="mobile-menu-item" onClick={() => { onSearchOpen(); setMenuOpen(false); }}>
            🔍 Search
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data/data';

function Navbar() {
  const [activeLink, setActiveLink] = useState('Home');
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Remember dark mode even after page refresh
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      setDarkMode(true);
      document.body.classList.add('dark');
    }
  }, []);

  const toggleDark = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', newMode);
  };

  return (
    <header className="dav-nav">
      <div className="dav-logo"><span>⬡</span> DAVICI</div>

      {/* Desktop nav links */}
      <ul className="dav-navlinks">
        {NAV_LINKS.map(link => (
          <li
            key={link}
            className={activeLink === link ? 'active' : ''}
            onClick={() => setActiveLink(link)}
          >
            {link}
          </li>
        ))}
      </ul>

      {/* Desktop search */}
      <div className="dav-search">
        <input type="text" placeholder="Search..." />
        <button>🔍</button>
      </div>

      {/* Right side actions */}
      <div className="dav-actions">
        {/* 🌙 Dark mode toggle */}
        <button className="dark-toggle" onClick={toggleDark}>
          {darkMode ? '☀️' : '🌙'}
        </button>
        <span>👤</span>
        <span>🛒</span>

        {/* 📱 Mobile hamburger menu */}
        <span
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display:'none', fontSize:22, cursor:'pointer' }}
        >
          {menuOpen ? '✕' : '☰'}
        </span>
      </div>

      {/* 📱 Mobile dropdown menu */}
      {menuOpen && (
        <div style={{
          position:'absolute', top:52, left:0, right:0,
          background: darkMode ? '#1a1a1a' : '#fff',
          borderBottom:'1px solid #e8e8e8',
          padding:'12px 20px', zIndex:999,
          display:'flex', flexDirection:'column', gap:16
        }}>
          {NAV_LINKS.map(link => (
            <span
              key={link}
              style={{
                fontSize:14, cursor:'pointer',
                color: activeLink === link ? '#e8622a' : (darkMode ? '#ccc' : '#222'),
                fontWeight: activeLink === link ? 700 : 400
              }}
              onClick={() => { setActiveLink(link); setMenuOpen(false); }}
            >
              {link}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
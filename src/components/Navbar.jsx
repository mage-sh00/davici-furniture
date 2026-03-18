import { useState } from 'react';
import { NAV_LINKS } from '../data/data';

function Navbar() {
  const [activeLink, setActiveLink] = useState('Home');
  return (
    <header className="dav-nav">
      <div className="dav-logo"><span>⬡</span> DAVICI</div>
      <ul className="dav-navlinks">
        {NAV_LINKS.map(link => (
          <li key={link} className={activeLink === link ? 'active' : ''} onClick={() => setActiveLink(link)}>{link}</li>
        ))}
      </ul>
      <div className="dav-search">
        <input type="text" placeholder="Search..." />
        <button>🔍</button>
      </div>
      <div className="dav-actions">
        <span>👤 Login</span><span>🛒 0</span><span>❤️ 0</span>
      </div>
    </header>
  );
}
export default Navbar;
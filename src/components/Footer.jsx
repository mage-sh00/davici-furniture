function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div><div className="footer-logo"><span>⬡</span> DAVICI</div><p style={{fontSize:13,lineHeight:1.8}}>Crafting beautiful furniture for modern homes since 2010.</p></div>
        <div><div className="footer-h">Shop</div><ul className="footer-ul">{['Living Room','Bedroom','Dining Room','Office'].map(i=><li key={i}>{i}</li>)}</ul></div>
        <div><div className="footer-h">Help</div><ul className="footer-ul">{['FAQ','Shipping','Returns','Track Order'].map(i=><li key={i}>{i}</li>)}</ul></div>
        <div><div className="footer-h">Contact</div><ul className="footer-ul">{['hello@davici.com','+1 800 123 4567','Mon–Fri · 9am–6pm'].map(i=><li key={i}>{i}</li>)}</ul></div>
      </div>
      <div className="footer-bottom">© 2025 DAVICI Furniture</div>
    </footer>
  );
}
export default Footer;
import { CATEGORIES } from '../data/data';
function Categories() {
  return (
    <section className="section" style={{ background:'#fff', borderBottom:'1px solid #e8e8e8' }}>
      <div className="sec-head">
        <div><h2 className="sec-title">Shop<br/>by categories</h2><p className="sec-sub">2,345 unique products</p></div>
        <span className="see-all">All Categories →</span>
      </div>
      <div className="cats-wrap">
        <div className="cat-left">
          <div><h3>Top Picks<br/>For You</h3><p>Hand-curated selections from our finest collections.</p></div>
          <button style={{background:'none',border:'none',color:'#e8622a',fontWeight:700,cursor:'pointer',fontSize:11}}>View All →</button>
        </div>
        <div className="cats-row">
          {CATEGORIES.map(cat => (
            <div key={cat.name} className="cat-item">
              <div className="cat-img-wrap"><img className="cat-img" src={cat.img} alt={cat.name} /></div>
              <div className="cat-name">{cat.name}</div>
              <div className="cat-count">{cat.count}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Categories;
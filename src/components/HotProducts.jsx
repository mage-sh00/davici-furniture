import { useState } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS, TABS } from '../data/data';
function HotProducts() {
  const [activeTab, setActiveTab] = useState('Latest Products');
  return (
    <section className="section" style={{ background:'#fff' }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
        <h2 style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:22, fontWeight:700 }}>Hot Products</h2>
      </div>
      <div className="prod-tabs">
        {TABS.map(tab => (
          <button key={tab} className={`prod-tab ${activeTab===tab?'active':''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
        ))}
      </div>
      <div className="prods-grid">
        {PRODUCTS.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
export default HotProducts;
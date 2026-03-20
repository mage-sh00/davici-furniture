import { useState } from 'react';

function ProductCard({ product, onAddToCart }) {
  const [liked,   setLiked]   = useState(false);
  const [beating, setBeating] = useState(false);
  const [ripple,  setRipple]  = useState(false);
  const [added,   setAdded]   = useState(false);

  const handleHeart = (e) => {
    e.stopPropagation();
    setLiked(prev => !prev);
    setBeating(false);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setBeating(true);
      setTimeout(() => setBeating(false), 450);
    }));
    if (!liked) { setRipple(true); setTimeout(() => setRipple(false), 560); }
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  const stars = '★'.repeat(product.stars) + '☆'.repeat(5 - product.stars);

  return (
    <div className="prod-card">
      <div className="prod-img-wrap">
        {product.badge === 'sale' && <span className="badge badge-sale">Sale</span>}
        {product.badge === 'new'  && <span className="badge badge-new">New</span>}

        <button className={`heart-btn ${beating ? 'beat' : ''}`} onClick={handleHeart}>
          <svg width="15" height="15" viewBox="0 0 24 24">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              style={{ fill: liked?'#ed2651':'none', stroke: liked?'#ed2651':'#bbb', strokeWidth:1.8, transition:'fill .15s,stroke .15s' }}
            />
          </svg>
          {ripple && <div className="heart-ripple" />}
        </button>

        <img className="prod-img" src={product.img} alt={product.title} />
        <div className="prod-actions"><span>👁 Quick View</span><span>⇄ Compare</span></div>
      </div>

      <div className="prod-info">
        <div className="prod-stars">{stars}<span className="prod-review">({product.reviews} reviews)</span></div>
        <div className="prod-title">{product.title}</div>
        <div className="prod-meta">Free Delivery · In Stock</div>
        <div className="prod-footer">
          <div>
            <span className="prod-price">{product.price}</span>
            {product.old && <span className="prod-old">{product.old}</span>}
          </div>
          {/* Add to cart button with feedback */}
          <button
            className="prod-add"
            onClick={handleAdd}
            style={{ background: added ? '#2a9d5c' : '' }}
            title="Add to cart"
          >
            {added ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
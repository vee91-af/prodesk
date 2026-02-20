import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <div className="product-grid">
      {products.map(p => (
        <div key={p.id} className="product-card">
          <img src={p.thumbnail} alt={p.title} />
          <h3>{p.title}</h3>
          <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${p.price}</p>
          <Link to={`/product/${p.id}`} style={{ color: '#007185', textDecoration: 'none' }}>Details</Link>
          <button className="btn-add" onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
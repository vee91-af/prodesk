import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`).then(res => res.json()).then(data => setProduct(data));
  }, [id]);

  if (!product) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</h2>;

  return (
    <div style={{ display: 'flex', padding: '50px 10%', gap: '50px', flexWrap: 'wrap' }}>
      <img src={product.thumbnail} alt={product.title} style={{ width: '400px', borderRadius: '10px' }} />
      <div style={{ flex: 1 }}>
        <h1>{product.title}</h1>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>{product.description}</p>
        <h2>${product.price}</h2>
        <button className="btn-add" style={{ width: 'auto' }} onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}
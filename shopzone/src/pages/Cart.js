import React from 'react';
import { useCart } from '../CartContext';

export default function Cart() {
  const { cart, totalPrice } = useCart();

  return (
    <div style={{ padding: '40px 10%' }}>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <div>
          {cart.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #ddd' }}>
              <span>{item.title}</span>
              <b>${item.price}</b>
            </div>
          ))}
          <h2 style={{ textAlign: 'right', marginTop: '20px' }}>Total: ${totalPrice.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}
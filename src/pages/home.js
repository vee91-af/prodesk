import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <div className="hero">
        <h1>Welcome to ShopZone</h1>
        <p>Premium quality products at your fingertips.</p>
        <Link to="/shop" style={{ padding: '12px 25px', backgroundColor: '#ff9900', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
          Explore Products
        </Link>
      </div>
    </div>
  );
}
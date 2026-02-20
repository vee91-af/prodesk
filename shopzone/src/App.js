import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider, useCart } from './CartContext';
import './App.css';

// Import Pages
import Home from './pages/home';
import Shop from './pages/shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

const Navbar = () => {
  const { totalItems } = useCart();
  return (
    <nav className="navbar">
      <Link to="/" className="logo" style={{ textDecoration: 'none' }}>ShopZone</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart 🛒 ({totalItems})</Link>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer style={{ backgroundColor: '#232f3e', color: 'white', padding: '20px', textAlign: 'center', marginTop: '50px' }}>
    <p>&copy; 2026 ShopZone | Developed by Vaishnavi</p>
  </footer>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
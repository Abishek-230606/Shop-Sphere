import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [searchCategory, setSearchCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMiniCart, setShowMiniCart] = useState(false);

  // Mock cart items for the mini-cart demonstration
  const mockCartItems = [];
  const cartItemsCount = mockCartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = mockCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(`Searching for "${searchQuery}" in category "${searchCategory}"`);
  };

  return (
    <header className="site-header">
      {/* Main Navbar */}
      <nav className="site-navbar">
        <div className="site-navbar__inner">
          {/* Logo */}
          <Link to="/" className="site-navbar__brand" aria-label="ShopSphere Home">
            <span className="site-navbar__brand-shop">Shop</span>
            <span className="site-navbar__brand-sphere">Sphere</span>
            <span className="site-navbar__brand-dot">.</span>
          </Link>

          {/* Delivery Location Mock */}
          <div className="navbar-delivery">
            <div className="navbar-delivery__icon">📍</div>
            <div className="navbar-delivery__text">
              <span className="navbar-delivery__line1">Deliver to</span>
              <span className="navbar-delivery__line2">India</span>
            </div>
          </div>

          {/* Search Bar */}
          <form className="navbar-search" onSubmit={handleSearchSubmit}>
            <div className="navbar-search__select-wrapper">
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="navbar-search__select"
                aria-label="Search category"
              >
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Kitchen">Home</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Search unique products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search__input"
              aria-label="Search items"
            />
            <button type="submit" className="navbar-search__button" aria-label="Submit search">
              🔍
            </button>
          </form>

          {/* Accounts & Orders */}
          <div className="navbar-right-menus">
            <div className="navbar-menu-item dropdown-trigger">
              <span className="navbar-menu-item__line1">Hello, Sign in</span>
              <span className="navbar-menu-item__line2">Account & Lists ▾</span>
              <div className="navbar-dropdown-content accounts-dropdown">
                <div className="accounts-dropdown__box">
                  <button className="btn-premium-primary sign-in-btn">Sign in</button>
                  <p className="new-customer-text">New customer? <a href="#register">Start here.</a></p>
                  <hr className="dropdown-divider" />
                  <div className="dropdown-lists-section">
                    <div className="dropdown-list-column">
                      <h4>Your Lists</h4>
                      <a href="#wishlist">Create a Wish List</a>
                      <a href="#find-list">Find a Wish List</a>
                    </div>
                    <div className="dropdown-list-column">
                      <h4>Your Account</h4>
                      <a href="#account">Your Account</a>
                      <Link to="/returns-orders">Your Orders</Link>
                      <a href="#recommendations">Recommendations</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/returns-orders" className="navbar-menu-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="navbar-menu-item__line1">Returns</span>
              <span className="navbar-menu-item__line2">& Orders</span>
            </Link>

            {/* Shopping Cart Trigger */}
            <div 
              className="navbar-cart-wrapper"
              onMouseEnter={() => setShowMiniCart(true)}
              onMouseLeave={() => setShowMiniCart(false)}
            >
              <Link to="/cart" className="mini-cart" aria-label="View shopping cart">
                <div className="mini-cart__icon-container">
                  <span className="mini-cart__icon" aria-hidden="true">🛒</span>
                  <span className="mini-cart__count">{cartItemsCount}</span>
                </div>
                <span className="mini-cart__label">Cart</span>
              </Link>

              {/* Hover Mini-Cart Dropdown */}
              {showMiniCart && (
                <div className="mini-cart-dropdown" role="dialog" aria-label="Mini Cart Preview">
                  <div className="mini-cart-dropdown__header">
                    <h3>Shopping Cart Preview</h3>
                  </div>
                  <div className="mini-cart-dropdown__items">
                    {mockCartItems.map((item) => (
                      <div className="mini-cart-item" key={item.id}>
                        <img src={item.image} alt={item.title} className="mini-cart-item__img" />
                        <div className="mini-cart-item__details">
                          <h4 className="mini-cart-item__title">{item.title}</h4>
                          <p className="mini-cart-item__category">{item.category}</p>
                          <div className="mini-cart-item__price-qty">
                            <span>Qty: {item.quantity}</span>
                            <span className="mini-cart-item__price">${item.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mini-cart-dropdown__footer">
                    <div className="mini-cart-dropdown__subtotal">
                      <span>Subtotal:</span>
                      <strong className="subtotal-price">${cartSubtotal}</strong>
                    </div>
                    <div className="mini-cart-dropdown__actions">
                      <Link to="/cart" className="btn-premium-secondary cart-btn-full" onClick={() => setShowMiniCart(false)}>
                        Go to Cart
                      </Link>
                      <Link to="/cart" className="btn-premium-primary cart-btn-full" onClick={() => setShowMiniCart(false)}>
                        Proceed to Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sub Navbar (Utility Navigation) - SPECIFICALLY SIMPLIFIED */}
      <div className="site-subnav">
        <div className="site-subnav__inner">
          <ul className="site-subnav__links">
            <li className="subnav-all-menu">
              <a href="#menu" className="subnav-link-all">
                <span className="hamburger-icon">☰</span> All
              </a>
            </li>
            <li>
              <NavLink 
                to="/shop" 
                className={({ isActive }) => isActive ? 'subnav-link active' : 'subnav-link'}
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? 'subnav-link active' : 'subnav-link'}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => isActive ? 'subnav-link active' : 'subnav-link'}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
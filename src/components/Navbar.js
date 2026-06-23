import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  function handleSearch(e) {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/shop');
    }
  }

  function handleClearSearch() {
    setSearchTerm('');
    navigate('/shop');
  }

  return (
    <nav className="site-navbar">
      {/* Top bar */}
      <div className="site-navbar__top">
        <div className="site-navbar__top-inner">

          {/* Brand */}
          <NavLink to="/" className="site-navbar__brand">
            <span className="brand-shop">Shop</span>
            <span className="brand-sphere">Sphere</span>
            <span className="brand-dot">.com</span>
          </NavLink>


          {/* Search */}
          <form className="site-navbar__search" onSubmit={handleSearch}>
            <div className="search-inner">
              <input
                type="text"
                className="search-input"
                placeholder="Search unique products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search products"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
              <button type="submit" className="search-btn" aria-label="Search">
                🔍
              </button>
            </div>
          </form>

          {/* Right actions */}
          <div className="site-navbar__actions">
            <NavLink to="/cart" className="mini-cart" aria-label="View cart">
              <span className="mini-cart__icon">🛒</span>
              <span className="mini-cart__count">{cartCount}</span>
              <span className="mini-cart__label">Cart</span>
            </NavLink>
          </div>

        </div>
      </div>

      {/* Bottom nav */}
      <div className="site-navbar__bottom">
        <div className="site-navbar__bottom-inner">
          <ul className="site-navbar__links">
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive ? 'site-navbar__link active' : 'site-navbar__link'
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'site-navbar__link active' : 'site-navbar__link'
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'site-navbar__link active' : 'site-navbar__link'
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ cartCount = 0 }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/shop');
    }
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
            <span className="brand-dot">.</span>
          </NavLink>

          {/* Search */}
          <form className="site-navbar__search" onSubmit={handleSearch}>
            <div className="search-inner" style={{ position: 'relative' }}>
              <input
                type="text"
                className="search-input"
                placeholder="Search unique products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search products"
                style={{ paddingRight: '2.5rem' }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    navigate('/shop');
                  }}
                  className="search-clear-btn"
                  aria-label="Clear search"
                  style={{
                    position: 'absolute',
                    right: '4.50rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    fontSize: '0.95rem',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.2rem'
                  }}
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

      {/* Bottom nav bar */}
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
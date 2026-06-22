import React from 'react';
import './StaticPage.css';

function Shop() {
  return (
    <div className="shop-page-wrapper coming-soon-view">
      <div className="coming-soon-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
        <span className="badge-coming-soon">COMING SOON</span>
        <h2>Shop Sphere Catalog</h2>
        <p className="coming-soon-desc" style={{ marginBottom: '2rem' }}>
          We are currently crafting a premium shopping experience. The Shop catalog is coming soon!
        </p>

        <div className="dashboard-actions" style={{ justifyContent: 'center' }}>
          <a href="/" className="btn-premium-secondary">Back to Homepage</a>
          <a href="/contact" className="btn-premium-primary">Contact Support</a>
        </div>
      </div>
    </div>
  );
}

export default Shop;
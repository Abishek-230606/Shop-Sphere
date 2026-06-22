import React from 'react';
import './StaticPage.css';

function About() {
  return (
    <div className="about-page-wrapper">
      <h2>About ShopSphere</h2>
      <p className="about-tagline">Making online shopping simple, accessible, and fast for customers worldwide.</p>

      {/* Stats Cards */}
      <section className="about-stats-grid">
        <div className="stat-card">
          <h3>5M+</h3>
          <p>Active Users</p>
        </div>
        <div className="stat-card">
          <h3>100+</h3>
          <p>Countries Shipped</p>
        </div>
        <div className="stat-card">
          <h3>24/7</h3>
          <p>Customer Care</p>
        </div>
        <div className="stat-card">
          <h3>10k+</h3>
          <p>Curated Items</p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="about-mission-section">
        <div className="mission-card">
          <h3>Our Vision</h3>
          <p>
            To build the most customer-centric mock online storefront where people can find and discover anything they want to buy online at competitive prices with rapid delivery options.
          </p>
        </div>
        <div className="mission-card">
          <h3>Our Mission</h3>
          <p>
            We strive to provide our customers with high-quality services, frictionless search tools, responsive support, and security safeguards to ensure every purchase is a delightful experience.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values-section">
        <h3>Our Core Values</h3>
        <div className="values-grid">
          <div className="value-item">
            <span className="value-icon">❤️</span>
            <h4>Customer Obsession</h4>
            <p>We start with the customer and work backwards to earn and maintain their trust.</p>
          </div>
          <div className="value-item">
            <span className="value-icon">⚡</span>
            <h4>Deliver Speed</h4>
            <p>We value quick processing times and rapid resolutions to customer inquiries.</p>
          </div>
          <div className="value-item">
            <span className="value-icon">💡</span>
            <h4>Innovate Daily</h4>
            <p>We constantly seek improvements in our search tools, grids, and user interfaces.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
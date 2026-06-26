import React from 'react';
import { Heart, Zap, Lightbulb, Star } from 'lucide-react';
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
            <span className="value-icon"><Heart size={32} className="text-danger" /></span>
            <h4>Customer Obsession</h4>
            <p>We start with the customer and work backwards to earn and maintain their trust.</p>
          </div>
          <div className="value-item">
            <span className="value-icon"><Zap size={32} className="text-warning" /></span>
            <h4>Deliver Speed</h4>
            <p>We value quick processing times and rapid resolutions to customer inquiries.</p>
          </div>
          <div className="value-item">
            <span className="value-icon"><Lightbulb size={32} className="text-info" /></span>
            <h4>Innovate Daily</h4>
            <p>We constantly seek improvements in our search tools, grids, and user interfaces.</p>
          </div>
        </div>
      </section>

      {/* Satisfied Customers & Vendor Reviews */}
      <section className="about-reviews-section">
        <h3>What Our Partners & Customers Say</h3>
        <p className="section-subtitle">Real reviews from our satisfied shoppers and vendors worldwide.</p>
        
        <div className="reviews-grid">
          <div className="review-card">
            <div className="review-rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#ffc107" stroke="#ffc107" className="me-1" />
              ))}
            </div>
            <p className="review-text">
              &quot;ShopSphere has completely changed how we procure products. The shipping is lightning fast and the customer support is top-notch!&quot;
            </p>
            <div className="review-author">— Ananya Sharma, Satisfied Customer</div>
          </div>
          <div className="review-card">
            <div className="review-rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#ffc107" stroke="#ffc107" className="me-1" />
              ))}
            </div>
            <p className="review-text">
              &quot;As a vendor, selling on ShopSphere has been incredibly smooth. The merchant support team and payment clearances are always on time.&quot;
            </p>
            <div className="review-author">— Rajesh Patel, Gold Partner Vendor</div>
          </div>
          <div className="review-card">
            <div className="review-rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#ffc107" stroke="#ffc107" className="me-1" />
              ))}
            </div>
            <p className="review-text">
              &quot;Excellent product quality! I ordered a mechanical keyboard and it was delivered within 2 days in mint condition. 10/10 recommended.&quot;
            </p>
            <div className="review-author">— David Miller, Tech Enthusiast</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
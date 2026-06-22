import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: 'Curated Tech for Modern Living',
      subtitle: 'Explore our handpicked collection of high-performance wireless audio, smart gear, and modern workspaces.',
      cta: 'Explore Collection',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&fit=crop&q=80'
    },
    {
      id: 2,
      title: 'Elevate Your Everyday Style',
      subtitle: 'Discover refined essentials, modern active apparel, and premium travel accessories tailored for comfort.',
      cta: 'Shop Apparel',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&fit=crop&q=80'
    },
    {
      id: 3,
      title: 'Harmonious Spaces, Simple Living',
      subtitle: 'Create a sanctuary with functional minimalist furniture, warm ambient lighting, and organic accents.',
      cta: 'Browse Interior',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&fit=crop&q=80'
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="home-container">
      {/* Unique Hero Banner Carousel */}
      <section className="home-hero-carousel">
        <div 
          className="carousel-slide" 
          style={{ backgroundImage: `linear-gradient(to right, rgba(17, 22, 37, 0.9) 25%, rgba(17, 22, 37, 0.4) 60%, rgba(17, 22, 37, 0.1) 100%), url(${heroSlides[activeSlide].image})` }}
        >
          <div className="carousel-slide__content">
            <span className="hero-tag">NEW SEASON INSIDER</span>
            <h1>{heroSlides[activeSlide].title}</h1>
            <p>{heroSlides[activeSlide].subtitle}</p>
            <Link to="/shop" className="btn-premium-primary hero-cta-btn">
              {heroSlides[activeSlide].cta}
            </Link>
          </div>
        </div>
      </section>

      {/* Unique Category Cards Section */}
      <section className="home-grid-container">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Carefully curated departments to suit your refined lifestyle.</p>
        </div>

        <div className="home-card-grid">
          {/* Card 1 - Electronics */}
          <div className="category-card">
            <div className="category-card__img-wrapper">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&fit=crop&q=80" alt="Premium Audio & Laptops" />
            </div>
            <div className="category-card__info">
              <h3>Signature Tech</h3>
              <p>Wireless headphones, smartwatches, and work gear built for productivity.</p>
              <Link to="/shop" className="card-link">Explore Electronics →</Link>
            </div>
          </div>

          {/* Card 2 - Fashion */}
          <div className="category-card">
            <div className="category-card__img-wrapper">
              <img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&fit=crop&q=80" alt="Modern Fashion & Activewear" />
            </div>
            <div className="category-card__info">
              <h3>Refined Apparel</h3>
              <p>Timeless styles, breathable athletic gear, and premium sunglasses.</p>
              <Link to="/shop" className="card-link">Browse Fashion →</Link>
            </div>
          </div>

          {/* Card 3 - Home Decor */}
          <div className="category-card">
            <div className="category-card__img-wrapper">
              <img src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&fit=crop&q=80" alt="Minimalist Home & Furniture" />
            </div>
            <div className="category-card__info">
              <h3>Interior & Decor</h3>
              <p>Warm lighting fixtures, ergonomic chairs, and handcrafted plant decors.</p>
              <Link to="/shop" className="card-link">Shop Home Decor →</Link>
            </div>
          </div>

          {/* Card 4 - Fitness */}
          <div className="category-card">
            <div className="category-card__img-wrapper">
              <img src="https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&fit=crop&q=80" alt="Gym Gear & Water Bottles" />
            </div>
            <div className="category-card__info">
              <h3>Active Wellness</h3>
              <p>High-density yoga mats, adjustable weights, and premium water bottles.</p>
              <Link to="/shop" className="card-link">View Fitness Gear →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Banner */}
      <section className="home-trust-banners">
        <div className="trust-card">
          <div className="trust-card__icon">📦</div>
          <div className="trust-card__text">
            <h4>Complimentary Shipping</h4>
            <p>Free express delivery on all premium orders exceeding $100.</p>
          </div>
        </div>
        <div className="trust-card">
          <div className="trust-card__icon">🔒</div>
          <div className="trust-card__text">
            <h4>Encrypted Checkout</h4>
            <p>Secure SSL standards to safeguard payment information.</p>
          </div>
        </div>
        <div className="trust-card">
          <div className="trust-card__icon">🌿</div>
          <div className="trust-card__text">
            <h4>30-Day Guarantee</h4>
            <p>Frictionless return solutions for absolute peace of mind.</p>
          </div>
        </div>
        <div className="trust-card">
          <div className="trust-card__icon">👤</div>
          <div className="trust-card__text">
            <h4>Curated Service</h4>
            <p>Inquiries resolved swiftly by our dedicated customer team.</p>
          </div>
        </div>
      </section>

      {/* Back to Top Section */}
      <button className="back-to-top-btn" onClick={scrollToTop}>
        Back to top
      </button>

      {/* Footer */}
      <footer className="footer-mock">
        <div className="footer-mock__inner">
          <div className="footer-column">
            <h4>About ShopSphere</h4>
            <a href="http://localhost:3000/about">Who We Are</a>
            <a href="http://localhost:3000/press">Press Releases</a>
            <a href="http://localhost:3000/careers">Careers</a>
          </div>
          <div className="footer-column">
            <h4>Assistance</h4>
            <a href="http://localhost:3000/contact">Help Center</a>
            <a href="http://localhost:3000/contact">Track Shipment</a>
            <a href="http://localhost:3000/contact">Returns & Exchanges</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026, ShopSphere.com</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
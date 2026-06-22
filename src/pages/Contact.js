import React, { useState } from 'react';
import './StaticPage.css';

function Contact() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'How do I track my ShopSphere order?',
      a: 'Once your order ships, we send an email with tracking details. You can also track shipments directly in your account under "Returns & Orders".'
    },
    {
      q: 'What is your return policy?',
      a: 'We offer a hassle-free 30-day money-back guarantee. You can print return labels and drop off packages at any authorized shipper in your area.'
    },
    {
      q: 'Can I change my delivery address after placing an order?',
      a: 'Address changes can be requested within 30 minutes of order placement. Go to "Returns & Orders", select your purchase, and click "Edit Order Details".'
    },
    {
      q: 'Do you offer international shipping?',
      a: 'Yes, ShopSphere ships products to over 100 countries. International rates, duties, and customs fees are calculated at checkout.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(prev => prev === index ? null : index);
  };

  return (
    <div className="contact-page-wrapper">
      <h2>Customer Support</h2>
      <p className="contact-subhead">Have questions or need assistance? Our support networks are available to help you.</p>

      {/* Support Cards Grid */}
      <div className="support-cards-grid">
        <div className="support-card helpline-card">
          <div className="support-card__icon">📞</div>
          <h4>Helpline Number</h4>
          <p className="support-details">1800 001 001</p>
          <p className="support-hours">Toll-free, 24/7 client helpline</p>
        </div>

        <div className="support-card">
          <div className="support-card__icon">✉️</div>
          <h4>Email Support</h4>
          <p className="support-details">support@shopsphere.com</p>
          <p className="support-hours">Response within 24 hours</p>
        </div>

        <div className="support-card">
          <div className="support-card__icon">📍</div>
          <h4>Corporate Headquarters</h4>
          <p className="support-details">ShopSphere Plaza, Tech City</p>
          <p className="support-hours">Mon - Fri, 9am - 6pm</p>
        </div>
      </div>

      {/* FAQs Section */}
      <section className="contact-faq-section full-width-faq">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <div 
              className={`faq-node ${openFaq === index ? 'open' : ''}`} 
              key={index}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <span>{faq.q}</span>
                <span className="faq-toggle-icon">{openFaq === index ? '▲' : '▼'}</span>
              </div>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Contact;
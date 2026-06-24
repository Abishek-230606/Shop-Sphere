import React, { useState } from 'react';
import { submitContactForm } from '../api/contact';
import './StaticPage.css';

function Contact() {
  const [openFaqs, setOpenFaqs] = useState([]);

  // Form input values
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Field touched state (so errors show only after user interacts)
  const [touched, setTouched] = useState({});

  // Submission state
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');

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
    setOpenFaqs(prev =>
      prev.includes(index) ? prev.filter(item => item !== index) : [...prev, index]
    );
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Name can only contain letters and spaces';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (value.trim() && !/^[0-9+\s\-()]{7,15}$/.test(value)) {
          error = 'Please enter a valid phone number (7-15 digits)';
        }
        break;
      case 'subject':
        if (!value.trim()) {
          error = 'Subject is required';
        } else if (value.trim().length < 4) {
          error = 'Subject must be at least 4 characters';
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formValues).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const newErrors = {};
    Object.keys(formValues).forEach(key => {
      const error = validateField(key, formValues[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    // If there are errors, block submission
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);
    setSubmitError('');
    setSuccess(false);

    try {
      await submitContactForm(formValues);
      
      // Generate a random ticket ID
      const randomTicket = 'SSP-' + Math.floor(100000 + Math.random() * 900000);
      setTicketNumber(randomTicket);
      setSuccess(true);

      // Reset form
      setFormValues({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setTouched({});
      setErrors({});
    } catch (err) {
      setSubmitError('Failed to send message. Please ensure the contact database server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getValidationClass = (fieldName) => {
    if (!touched[fieldName]) return '';
    return errors[fieldName] ? 'is-invalid' : 'is-valid';
  };

  return (
    <div className="contact-page-wrapper">
      <h2>Customer Support</h2>
      <p className="contact-subhead">Have questions or need assistance? Send us a message or reach out via our support networks.</p>

      <div className="contact-split-grid">
        {/* Contact Form Column */}
        <div className="contact-form-card">
          <h3>Send Us a Message</h3>

          {success && (
            <div className="contact-success-banner">
              <div className="success-banner-icon">✓</div>
              <h4>Message Sent Successfully!</h4>
              <p>Thank you for reaching out. We will get back to you within 24 hours.</p>
              <div>
                Support Ticket ID: <span className="ticket-number">{ticketNumber}</span>
              </div>
            </div>
          )}

          {submitError && (
            <div className="contact-error-banner">
              ⚠️ {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Name & Email Row */}
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Name <span className="required-star">*</span>
                </label>
                <div className="form-input-wrapper">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-input ${getValidationClass('name')}`}
                    placeholder="Your Name"
                    value={formValues.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </div>
                {touched.name && errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address <span className="required-star">*</span>
                </label>
                <div className="form-input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${getValidationClass('email')}`}
                    placeholder="name@example.com"
                    value={formValues.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </div>
                {touched.email && errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
            </div>

            {/* Phone & Subject Row */}
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  Phone Number
                </label>
                <div className="form-input-wrapper">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`form-input ${getValidationClass('phone')}`}
                    placeholder="e.g. +1 (555) 000-0000 (Optional)"
                    value={formValues.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.phone && errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">
                  Subject <span className="required-star">*</span>
                </label>
                <div className="form-input-wrapper">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className={`form-input ${getValidationClass('subject')}`}
                    placeholder="How can we help you?"
                    value={formValues.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </div>
                {touched.subject && errors.subject && (
                  <span className="error-message">{errors.subject}</span>
                )}
              </div>
            </div>

            {/* Message Group */}
            <div className="form-group">
              <label className="form-label" htmlFor="message">
                Message <span className="required-star">*</span>
              </label>
              <div className="form-input-wrapper">
                <textarea
                  id="message"
                  name="message"
                  className={`form-input ${getValidationClass('message')}`}
                  placeholder="Describe your inquiry in detail..."
                  value={formValues.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
              {touched.message && errors.message && (
                <span className="error-message">{errors.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-premium-primary contact-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="btn-spinner" role="status" aria-hidden="true" />
                  Sending Message...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>

        {/* Support Sidebar Info Column */}
        <div className="contact-sidebar">
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
      </div>

      {/* FAQs Section */}
      <section className="contact-faq-section full-width-faq">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-accordion">
          {faqs.map((faq, index) => {
            const isOpen = openFaqs.includes(index);

            return (
              <div className={`faq-node ${isOpen ? 'open' : ''}`} key={index}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{faq.q}</span>
                  <span className="faq-toggle-icon">{isOpen ? '▲' : '▼'}</span>
                </button>
                <div id={`faq-answer-${index}`} className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Contact;
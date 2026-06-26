import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, AlertTriangle, Phone, Mail, MapPin, ChevronUp, ChevronDown } from 'lucide-react';
import { submitContactForm } from '../api/contact';
import './StaticPage.css';

// Define validation schema restricting name field to letters (A-Z, a-z) and spaces
const contactSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name must only contain letters and spaces'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z.string().optional().refine(
    (val) => !val || /^[0-9+\s\-()]{7,15}$/.test(val),
    { message: 'Please enter a valid phone number (7-15 digits)' }
  ),
  subject: z.string()
    .min(1, 'Subject is required')
    .min(4, 'Subject must be at least 4 characters'),
  message: z.string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters'),
});

function Contact() {
  const [openFaqs, setOpenFaqs] = useState([]);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, touchedFields }
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

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

  const onSubmit = async (data) => {
    setSubmitError('');
    setSuccess(false);

    try {
      await submitContactForm(data);
      
      // Generate a random ticket ID
      const randomTicket = 'SSP-' + Math.floor(100000 + Math.random() * 900000);
      setTicketNumber(randomTicket);
      setSuccess(true);

      // Reset form
      reset();
    } catch (err) {
      setSubmitError('Failed to send message. Please ensure the contact database server is running.');
      console.error(err);
    }
  };

  const getValidationClass = (fieldName) => {
    if (!touchedFields[fieldName]) return '';
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
              <div className="success-banner-icon">
                <Check size={20} strokeWidth={3} />
              </div>
              <h4>Message Sent Successfully!</h4>
              <p>Thank you for reaching out. We will get back to you within 24 hours.</p>
              <div>
                Support Ticket ID: <span className="ticket-number">{ticketNumber}</span>
              </div>
            </div>
          )}

          {submitError && (
            <div className="contact-error-banner">
              <AlertTriangle className="me-2" size={18} /> {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    className={`form-input ${getValidationClass('name')}`}
                    placeholder="Your Name"
                    {...register('name')}
                  />
                </div>
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
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
                    className={`form-input ${getValidationClass('email')}`}
                    placeholder="name@example.com"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
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
                    className={`form-input ${getValidationClass('phone')}`}
                    placeholder="e.g. +1 (555) 000-0000 (Optional)"
                    {...register('phone')}
                  />
                </div>
                {errors.phone && (
                  <span className="error-message">{errors.phone.message}</span>
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
                    className={`form-input ${getValidationClass('subject')}`}
                    placeholder="How can we help you?"
                    {...register('subject')}
                  />
                </div>
                {errors.subject && (
                  <span className="error-message">{errors.subject.message}</span>
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
                  className={`form-input ${getValidationClass('message')}`}
                  placeholder="Describe your inquiry in detail..."
                  {...register('message')}
                />
              </div>
              {errors.message && (
                <span className="error-message">{errors.message.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-premium-primary contact-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
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
            <div className="support-card__icon">
              <Phone size={24} />
            </div>
            <h4>Helpline Number</h4>
            <p className="support-details">1800 001 001</p>
            <p className="support-hours">Toll-free, 24/7 client helpline</p>
          </div>

          <div className="support-card">
            <div className="support-card__icon">
              <Mail size={24} />
            </div>
            <h4>Email Support</h4>
            <p className="support-details">support@shopsphere.com</p>
            <p className="support-hours">Response within 24 hours</p>
          </div>

          <div className="support-card">
            <div className="support-card__icon">
              <MapPin size={24} />
            </div>
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
                  <span className="faq-toggle-icon">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
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
import React, { useState } from 'react';
import './StaticPage.css';

function Cart() {
  // Mock cart items matching Navbar's preview list
  const [cartItems, setCartItems] = useState([]);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SHOPSPHERE10') {
      setDiscount(0.10);
      setPromoMessage('Promo code SHOPSPHERE10 applied! 10% discount subtracted.');
    } else {
      setPromoMessage('Invalid promo code. Try "SHOPSPHERE10".');
    }
  };

  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = rawSubtotal * discount;
  const finalSubtotal = (rawSubtotal - discountAmount).toFixed(2);
  const freeShippingLimit = 100;
  const progressPercent = Math.min((rawSubtotal / freeShippingLimit) * 100, 100);

  return (
    <div className="cart-page-wrapper">
      <div className="cart-content-layout">
        
        {/* Left Column: Cart Items List */}
        <main className="cart-main-section">
          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <span className="cart-price-header">Price</span>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-cart-view">
              <h3>Your ShopSphere Cart is empty.</h3>
              <p>Your Shopping Cart lives to serve. Give it purpose — fill it with electronics, clothing, books, and more.</p>
              <a href="/shop" className="btn-amazon-primary shop-cta-empty">Continue Shopping</a>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div className="cart-item-row" key={item.id}>
                  <div className="cart-item-row__img-col">
                    <img src={item.image} alt={item.title} />
                  </div>
                  
                  <div className="cart-item-row__desc-col">
                    <h3 className="cart-item-title">{item.title}</h3>
                    <p className="stock-status">{item.stock}</p>
                    
                    {item.isPrime && (
                      <span className="prime-badge-small">
                        <span className="prime-text">✓</span>prime
                      </span>
                    )}

                    <div className="cart-item-actions">
                      <div className="qty-selector-wrapper">
                        <label htmlFor={`qty-${item.id}`}>Qty: </label>
                        <select 
                          id={`qty-${item.id}`}
                          value={item.quantity}
                          onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                      <span className="action-divider">|</span>
                      <button className="text-action-btn" onClick={() => removeItem(item.id)}>Delete</button>
                      <span className="action-divider">|</span>
                      <button className="text-action-btn">Save for later</button>
                    </div>
                  </div>

                  <div className="cart-item-row__price-col">
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    {item.quantity > 1 && (
                      <span className="item-unit-price">(${item.price} each)</span>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="cart-footer-subtotal">
                <span>Subtotal ({itemCount} items): </span>
                <strong>${rawSubtotal.toFixed(2)}</strong>
              </div>
            </div>
          )}
        </main>

        {/* Right Column: Checkout Sidebar */}
        {cartItems.length > 0 && (
          <aside className="cart-checkout-sidebar">
            {/* Free Shipping Alert */}
            <div className="shipping-progress-box">
              {rawSubtotal >= freeShippingLimit ? (
                <p className="shipping-success">🎉 Your order qualifies for <strong>FREE Shipping</strong>.</p>
              ) : (
                <>
                  <p className="shipping-need">Add <strong>${(freeShippingLimit - rawSubtotal).toFixed(2)}</strong> more for FREE Shipping.</p>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </>
              )}
            </div>

            {/* Subtotal & CTA */}
            <div className="checkout-summary-box">
              <p className="checkout-subtotal">
                Subtotal ({itemCount} items): <strong>${finalSubtotal}</strong>
              </p>
              {discount > 0 && (
                <p className="discount-applied">Discount (10%): -${discountAmount.toFixed(2)}</p>
              )}
              <label className="gift-checkbox">
                <input type="checkbox" /> This order contains a gift
              </label>
              
              <button className="btn-amazon-primary checkout-btn-gold">
                Proceed to Checkout
              </button>
            </div>

            {/* Promo Code Entry Form */}
            <div className="promo-code-box">
              <h4>Apply Promo Code</h4>
              <form onSubmit={applyPromo} className="promo-form">
                <input 
                  type="text" 
                  placeholder="Enter code" 
                  value={promoCode} 
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                />
                <button type="submit" className="btn-amazon-secondary promo-btn">Apply</button>
              </form>
              {promoMessage && (
                <p className={`promo-feedback ${discount > 0 ? 'success' : 'error'}`}>{promoMessage}</p>
              )}
              <span className="promo-tip">Tip: Try "SHOPSPHERE10" for 10% off.</span>
            </div>
          </aside>
        )}

      </div>
    </div>
  );
}

export default Cart;
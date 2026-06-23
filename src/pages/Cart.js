import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from '../features/cart/cartslice';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cart.css';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  function handleCheckout() {
    alert(
      `✅ Order placed successfully!\n\nThank you for shopping with ShopSphere.\nYour order of ₹${subtotal.toLocaleString('en-IN')} will be delivered soon.`
    );
    dispatch(clearCart());
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty__icon">🛒</div>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="cart-empty__btn">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page__inner">

        {/* Header */}
        <div className="cart-page__header">
          <h1>
            🛒 Your Cart{' '}
            <span className="cart-page__count">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </h1>
        </div>

        <div className="cart-page__body">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item card mb-3">
                <div className="card-body">
                  <div className="cart-item__inner">
                    {/* Image */}
                    <div className="cart-item__image-wrap">
                      <img
                        src={item.image}
                        alt={item.product_name}
                        className="cart-item__image"
                      />
                    </div>

                    {/* Details */}
                    <div className="cart-item__details">
                      <span className="cart-item__brand">{item.brand}</span>
                      <h3 className="cart-item__name">{item.product_name}</h3>
                      <p className="cart-item__sku">SKU: {item.sku}</p>
                      <p className="cart-item__unit-price">
                        ₹{item.price.toLocaleString('en-IN')} per item
                      </p>

                      {/* Quantity controls */}
                      <div className="cart-item__controls">
                        <div className="qty-control">
                          <button
                            className="qty-control__btn"
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="qty-control__value">
                            {item.quantity}
                          </span>
                          <button
                            className="qty-control__btn"
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="cart-item__remove"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          🗑 Remove
                        </button>
                      </div>
                    </div>

                    {/* Item total */}
                    <div className="cart-item__total">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="cart-summary card">
            <div className="card-body">
              <h2 className="cart-summary__title">Order Summary</h2>

              <div className="cart-summary__row">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="cart-summary__row">
                <span>Shipping</span>
                <span className="cart-summary__free">FREE</span>
              </div>

              <div className="cart-summary__row">
                <span>Tax (18% GST)</span>
                <span>
                  ₹{Math.round(subtotal * 0.18).toLocaleString('en-IN')}
                </span>
              </div>

              <hr className="cart-summary__divider" />

              <div className="cart-summary__row cart-summary__row--total">
                <span>Total</span>
                <span>
                  ₹
                  {(subtotal + Math.round(subtotal * 0.18)).toLocaleString(
                    'en-IN'
                  )}
                </span>
              </div>

              <button
                className="cart-summary__checkout-btn btn w-100"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>

              <Link to="/shop" className="cart-summary__continue">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
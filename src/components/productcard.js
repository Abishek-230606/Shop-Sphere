import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Image, ShoppingCart, Check, CheckCircle } from 'lucide-react';
import { addToCart } from '../features/cart/cartslice';
import './productcard.css';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [product?.id, product?.image]);

  function handleAddToCart() {
    dispatch(addToCart(product));
    setAdded(true);
    // Auto-dismiss the popup/toast after 2 seconds
    const timer = setTimeout(() => {
      setAdded(false);
    }, 2000);
    return () => clearTimeout(timer);
  }

  return (
    <div className="product-card">
      <div className="product-card__image-wrapper">
        {imageError || !product.image ? (
          <div className="product-card__placeholder">
            <Image size={40} className="product-card__placeholder-icon text-muted" />
            <span className="product-card__placeholder-text">Image Unavailable</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.product_name}
            className="product-card__image"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="product-card__body">
        <span className="product-card__brand">{product.brand}</span>
        <h3 className="product-card__name">{product.product_name}</h3>
        <p className="product-card__sku">SKU: {product.sku}</p>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__footer">
          <span className="product-card__price">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <button
            className={`product-card__cart-btn ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <Check size={16} className="me-1" /> Added
              </>
            ) : (
              <>
                <ShoppingCart size={16} className="me-1" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
      {added && (
        <div className="cart-toast">
          <span className="cart-toast__icon">
            <CheckCircle size={18} />
          </span>
          <span className="cart-toast__message">
            Added <strong>{product.product_name}</strong> to cart!
          </span>
        </div>
      )}
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    product_name: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
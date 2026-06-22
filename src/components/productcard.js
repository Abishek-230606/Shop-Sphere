import React from 'react';
import PropTypes from 'prop-types';
import './productcard.css';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-card__image-wrapper">
        <img
          src={product.image}
          alt={product.product_name}
          className="product-card__image"
          loading="lazy"
        />
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
            className="product-card__cart-btn"
            onClick={() => onAddToCart && onAddToCart(product)}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
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
  onAddToCart: PropTypes.func,
};

ProductCard.defaultProps = {
  onAddToCart: null,
};

export default ProductCard;
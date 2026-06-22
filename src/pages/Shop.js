import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/productcard';
import { fetchProducts } from '../api/product';
import './shop.css';

function Shop() {
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchProducts();
        if (isMounted) setAllProducts(data);
      } catch (err) {
        if (isMounted)
          setError(
            'Unable to load products. Make sure the API server is running with: npm run server'
          );
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const filterProducts = useCallback(() => {
    if (!searchQuery.trim()) {
      setFiltered(allProducts);
      return;
    }
    const q = searchQuery.toLowerCase();
    setFiltered(
      allProducts.filter(
        (p) =>
          p.product_name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    );
  }, [allProducts, searchQuery]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  return (
    <div className="shop-page">
      {/* Page header */}
      <div className="shop-page__header">
        <p className="shop-page__header-label">Shop</p>
        <h1 className="shop-page__title">Discover Your Next Favourite Find</h1>
        <p className="shop-page__subtitle">
          Quality products at the best prices, delivered to your door.
        </p>
      </div>

      <div className="shop-page__content">

        {/* Result count + active search tag */}
        {!isLoading && !error && (
          <div className="shop-page__toolbar">
            {searchQuery && (
              <div className="shop-page__search-tag">
                <span>Results for &quot;{searchQuery}&quot;</span>
              </div>
            )}
            <p className="shop-page__count">
              {filtered.length === allProducts.length
                ? `${allProducts.length} products`
                : `${filtered.length} of ${allProducts.length} products`}
            </p>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="shop-page__status">
            <div className="shop-spinner" />
            <p>Loading products…</p>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="shop-page__error">
            <span>⚠️</span>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        )}

        {/* No results */}
        {!isLoading && !error && filtered.length === 0 && (
          <div className="shop-page__empty">
            <span>🔍</span>
            <p>No products found for &quot;{searchQuery}&quot;</p>
          </div>
        )}

        {/* Product grid */}
        {!isLoading && !error && filtered.length > 0 && (
          <div className="shop-page__grid">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
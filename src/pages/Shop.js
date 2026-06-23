import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/productcard';
import { fetchProducts } from '../api/product';
import 'bootstrap/dist/css/bootstrap.min.css';
import './shop.css';

const PRODUCTS_PER_PAGE = 8;

function Shop() {
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
    return () => { isMounted = false; };
  }, []);

  const filterProducts = useCallback(() => {
    setCurrentPage(1);
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

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filtered.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="shop-page">
      {/* Header */}
      <div className="shop-page__header">
        <p className="shop-page__header-label">Shop</p>
        <h1 className="shop-page__title">Discover Your Next Favourite Find</h1>
        <p className="shop-page__subtitle">
          Quality products at the best prices, delivered to your door.
        </p>
      </div>

      <div className="shop-page__content">

        {/* Toolbar */}
        {!isLoading && !error && (
          <div className="shop-page__toolbar">
            {searchQuery && (
              <div className="shop-page__search-tag">
                Results for &quot;{searchQuery}&quot;
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
        {!isLoading && !error && currentProducts.length > 0 && (
          <>
            <div className="shop-page__grid">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Bootstrap Pagination */}
            {totalPages > 1 && (
              <div className="shop-page__pagination">
                <nav aria-label="Product pagination">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        &laquo; Prev
                      </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <li
                          key={page}
                          className={`page-item ${currentPage === page ? 'active' : ''}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        </li>
                      )
                    )}

                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
                <p className="shop-page__page-info">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Shop;
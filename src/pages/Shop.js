import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertTriangle, Search } from 'lucide-react';
import ProductCard from '../components/productcard';
import { fetchProducts } from '../api/product';
import 'bootstrap/dist/css/bootstrap.min.css';
import './shop.css';

const PRODUCTS_PER_PAGE = 8;

function Shop() {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  // Track the previous search query to reset the page to 1 when search changes
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    setCurrentPage(1);
  }

  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchProducts({
          page: currentPage,
          limit: PRODUCTS_PER_PAGE,
          search: searchQuery,
        });
        if (isMounted) {
          setProducts(data.products);
          setTotalCount(data.totalCount);
        }
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
  }, [currentPage, searchQuery]);

  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);

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
              {searchQuery
                ? `Found ${totalCount} product${totalCount === 1 ? '' : 's'} for "${searchQuery}"`
                : `${totalCount} product${totalCount === 1 ? '' : 's'}`}
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
            <AlertTriangle size={24} className="text-danger mb-2" />
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        )}

        {/* No results */}
        {!isLoading && !error && products.length === 0 && (
          <div className="shop-page__empty">
            <Search size={48} className="text-muted mb-3" />
            <p>No products found for &quot;{searchQuery}&quot;</p>
          </div>
        )}

        {/* Product grid */}
        {!isLoading && !error && products.length > 0 && (
          <>
            <div className="shop-page__grid">
              {products.map((product) => (
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
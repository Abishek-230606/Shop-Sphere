import apiClient from './client';

export async function fetchProducts({ page = 1, limit = 8, search = '' } = {}) {
  const params = {
    _page: page,
    _limit: limit,
  };
  if (search && search.trim()) {
    params.q = search.trim();
  }
  const response = await apiClient.get('/products', { params });
  const totalCount = parseInt(response.headers['x-total-count'] || '0', 10);
  return {
    products: response.data,
    totalCount,
  };
}

export async function fetchProductById(id) {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
}
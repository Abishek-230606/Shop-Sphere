import apiClient from './client';

export async function fetchProducts() {
  const response = await apiClient.get('/products');
  return response.data;
}

export async function fetchProductById(id) {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
}
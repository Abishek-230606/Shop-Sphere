import apiClient from './client';

export async function submitContactForm(contactData) {
  const response = await apiClient.post('/contacts', {
    ...contactData,
    submittedAt: new Date().toISOString(),
  });
  return response.data;
}
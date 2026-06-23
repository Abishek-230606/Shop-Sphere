import axios from 'axios';

const contactApiClient = axios.create({
  baseURL: process.env.REACT_APP_CONTACT_API_BASE_URL || 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function submitContactForm(contactData) {
  const response = await contactApiClient.post('/contacts', {
    ...contactData,
    submittedAt: new Date().toISOString(),
  });
  return response.data;
}
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.error?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

/**
 * Analyze text content
 * @param {string} text - Text content to analyze
 * @param {Object} options - Analysis options
 * @returns {Promise} Analysis results
 */
export const analyzeText = async (text, options = {}) => {
  try {
    const response = await api.post('/analyze', { text, options });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Health check
 */
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response;
  } catch (error) {
    throw error;
  }
};

export default api;

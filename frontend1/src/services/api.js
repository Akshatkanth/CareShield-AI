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
 * Analyze image content
 * @param {File} imageFile - Image file to analyze
 * @param {Object} options - Analysis options
 * @returns {Promise} Analysis results
 */
export const analyzeImage = async (imageFile, options = {}) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    // Use a custom config to override the json content type
    const response = await api.post('/analyze-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Chat with AI about analysis context
 * @param {string} message - Chat message
 * @param {Object} analysisContext - Context from previous analysis
 * @param {Array} conversationHistory - Previous chat messages
 * @returns {Promise} Chat response
 */
export const chatWithContext = async (message, analysisContext = null, conversationHistory = []) => {
  try {
    const response = await api.post('/chat', {
      message,
      analysisContext,
      conversationHistory
    });
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

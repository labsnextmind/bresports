import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Use relative path for Vite proxy
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the token to every request if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for global error handling
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized: Token is invalid or expired
      console.error("Authentication Error: Token is invalid or expired. Logging out.");
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      
      // Redirect to the appropriate login page
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      } else {
        window.location.href = '/login';
      }
    }
    // For other errors, just pass them along to be handled by the component
    return Promise.reject(error);
  }
);


export default api;
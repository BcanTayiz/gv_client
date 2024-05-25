import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


api.interceptors.request.use(config => {
  // Retrieve the authorization token from local storage or wherever it's stored
  const token = 'USER123'; // Example token, replace with your actual token
  
  // Validate the token format
  const tokenRegex = /^USER\d{3}$/;
  if (!tokenRegex.test(token)) {
    console.error('Invalid token format');
    // Optionally, throw an error or handle the invalid token format
  }

  // Set the Authorization header with the bearer token
  config.headers.Authorization = `Bearer ${token}`;
  
  return config;
}, error => {
  // Handle request errors
  console.error('Request error:', error);
  return Promise.reject(error);
});

export default api;


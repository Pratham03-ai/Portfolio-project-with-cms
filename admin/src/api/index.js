import axios from 'axios';

export const API_BASE = 'http://localhost:5001/api';
export const ASSET_BASE = 'http://localhost:5001';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cms_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname !== '/login') {
        localStorage.removeItem('cms_token');
        localStorage.removeItem('cms_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;

import axios from 'axios';
export const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1', timeout: 14000, withCredentials: true });
api.interceptors.request.use((config) => { const token = localStorage.getItem('stone_token'); if (token) config.headers.Authorization = `Bearer ${token}`; return config; });
api.interceptors.response.use((response) => response, (error) => { if (error.response?.status === 401) localStorage.removeItem('stone_token'); return Promise.reject(error); });
export const unwrap = (response) => response.data?.data || response.data;
export default api;

import api, { unwrap } from './api';
export const authService = {
  login: (payload) => api.post('/auth/login', payload).then(unwrap),
  register: (payload) => api.post('/auth/register', payload).then(unwrap),
  forgotPassword: (payload) => api.post('/auth/forgot-password', payload).then(unwrap),
  resendVerification: (payload) => api.post('/auth/resend-verification', payload).then(unwrap),
  me: () => api.get('/auth/me').then(unwrap),
  logout: () => api.post('/auth/logout').then(unwrap)
};
export default authService;

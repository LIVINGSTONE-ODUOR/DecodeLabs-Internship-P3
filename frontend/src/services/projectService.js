import api, { unwrap } from './api';
export const projectService = {
  getStarted: (payload) => api.post('/get-started', payload).then(unwrap),
  quote: (payload) => api.post('/quote', payload).then(unwrap),
  dashboard: () => api.get('/admin/dashboard').then(unwrap)
};
export default projectService;

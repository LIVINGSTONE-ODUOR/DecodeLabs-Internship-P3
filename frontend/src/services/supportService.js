import api, { unwrap } from './api';

export const supportService = {
  createTicket: (payload) => api.post('/support', payload).then(unwrap)
};

export default supportService;

import api, { unwrap } from './api';
export const contactService = { submit: (payload) => api.post('/contact', payload).then(unwrap) };
export default contactService;

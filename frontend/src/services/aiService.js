import api, { unwrap } from './api';
export const aiService = { send: (payload) => api.post('/ai/chat', payload).then(unwrap), history: (sessionId) => api.get(`/ai/history/${sessionId}`).then(unwrap) };
export default aiService;

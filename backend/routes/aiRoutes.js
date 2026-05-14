import { Router } from 'express';
import { chatWithAi, getAiHistory } from '../controllers/aiController.js';
import validateMiddleware from '../middleware/validateMiddleware.js';
import { aiChatValidation } from '../utils/validators/aiValidator.js';
const router = Router();
router.post('/chat', aiChatValidation, validateMiddleware, chatWithAi);
router.get('/history/:sessionId', getAiHistory);
export default router;

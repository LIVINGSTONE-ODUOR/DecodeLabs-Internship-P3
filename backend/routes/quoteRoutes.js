import { Router } from 'express';
import { createQuoteRequest, getQuoteRequests } from '../controllers/quoteController.js';
import validateMiddleware from '../middleware/validateMiddleware.js';
import { createQuoteValidation, quoteQueryValidation } from '../utils/validators/quoteValidator.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', createQuoteValidation, validateMiddleware, createQuoteRequest);
router.get('/', protect, authorize(['admin']), quoteQueryValidation, validateMiddleware, getQuoteRequests);

export default router;

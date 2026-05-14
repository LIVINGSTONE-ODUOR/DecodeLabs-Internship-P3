import { Router } from 'express';
import { submitGetStartedRequest, getStartedRequests } from '../controllers/getStartedController.js';
import validateMiddleware from '../middleware/validateMiddleware.js';
import { getStartedValidation, getStartedQueryValidation } from '../utils/validators/getStartedValidator.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', getStartedValidation, validateMiddleware, submitGetStartedRequest);
router.get('/', protect, authorize(['admin']), getStartedQueryValidation, validateMiddleware, getStartedRequests);

export default router;

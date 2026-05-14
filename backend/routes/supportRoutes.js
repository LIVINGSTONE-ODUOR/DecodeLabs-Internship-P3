import { Router } from 'express';
import { createSupportTicket, getSupportTickets } from '../controllers/supportController.js';
import validateMiddleware from '../middleware/validateMiddleware.js';
import { createSupportTicketValidation, supportQueryValidation } from '../utils/validators/supportValidator.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', createSupportTicketValidation, validateMiddleware, createSupportTicket);
router.get('/', protect, authorize(['admin']), supportQueryValidation, validateMiddleware, getSupportTickets);

export default router;

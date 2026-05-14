import { Router } from 'express';
import { createContactMessage, getContactMessages, updateContactStatus } from '../controllers/contactController.js';
import validateMiddleware from '../middleware/validateMiddleware.js';
import { createContactValidation, updateContactValidation, contactQueryValidation } from '../utils/validators/contactValidator.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', createContactValidation, validateMiddleware, createContactMessage);
router.get('/', protect, authorize(['admin']), contactQueryValidation, validateMiddleware, getContactMessages);
router.patch('/:id', protect, authorize(['admin']), updateContactValidation, validateMiddleware, updateContactStatus);

export default router;

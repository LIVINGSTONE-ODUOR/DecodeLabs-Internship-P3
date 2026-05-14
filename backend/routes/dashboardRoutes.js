import { Router } from 'express';
import { getAdminDashboard } from '../controllers/dashboardController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/dashboard', protect, authorize(['admin']), getAdminDashboard);

export default router;

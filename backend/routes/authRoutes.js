import { Router } from 'express';
import { register, login, getMe, logout, forgotPassword, resendVerification } from '../controllers/authController.js';
import validateMiddleware from '../middleware/validateMiddleware.js';
import { registerValidation, loginValidation, forgotPasswordValidation, resendVerificationValidation } from '../utils/validators/authValidator.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', registerValidation, validateMiddleware, register);
router.post('/login', loginValidation, validateMiddleware, login);
router.post('/forgot-password', forgotPasswordValidation, validateMiddleware, forgotPassword);
router.post('/resend-verification', resendVerificationValidation, validateMiddleware, resendVerification);
router.get('/me', protect, getMe);
router.post('/logout', logout);

export default router;

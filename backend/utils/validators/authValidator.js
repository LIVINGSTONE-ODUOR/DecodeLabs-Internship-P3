import { body } from 'express-validator';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export const registerValidation = [
  body('fullName').trim().notEmpty().withMessage('Full name is required').isLength({ max: 100 }).withMessage('Full name must be 100 characters or fewer'),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid'),
  body('password').notEmpty().withMessage('Password is required').matches(passwordPattern).withMessage('Password must be at least 8 characters and include uppercase, lowercase, number, and special character')
];

export const loginValidation = [
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid'),
  body('password').notEmpty().withMessage('Password is required')
];

export const forgotPasswordValidation = [
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid')
];

export const resendVerificationValidation = [
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid')
];

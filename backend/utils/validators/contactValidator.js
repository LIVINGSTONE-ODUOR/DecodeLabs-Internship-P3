import { body, param, query } from 'express-validator';

export const createContactValidation = [
  body('fullName').trim().notEmpty().withMessage('Full name is required').isLength({ max: 100 }).withMessage('Full name must contain 100 characters or fewer'),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Please provide a valid email address'),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }).withMessage('Subject must contain 200 characters or fewer'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10, max: 4000 }).withMessage('Message must be between 10 and 4000 characters')
];

export const updateContactValidation = [
  param('id').isUUID().withMessage('Contact message id is invalid'),
  body('status').trim().notEmpty().withMessage('Status is required').isIn(['pending', 'read', 'replied']).withMessage('Invalid status value')
];

export const contactQueryValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a number greater than 0'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['pending', 'read', 'replied']).withMessage('Status filter is invalid')
];

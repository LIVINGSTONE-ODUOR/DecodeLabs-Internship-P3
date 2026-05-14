import { body, query } from 'express-validator';

const topics = [
  'Website issue',
  'Email or account access',
  'Network outage',
  'Software installation',
  'Security concern',
  'AI assistant support',
  'Billing or contract'
];

export const createSupportTicketValidation = [
  body('topic').trim().isIn(topics).withMessage('Support topic is invalid'),
  body('priority').trim().isIn(['Low', 'Medium', 'High', 'Critical']).withMessage('Priority is invalid'),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ min: 10, max: 4000 }).withMessage('Description must be between 10 and 4000 characters')
];

export const supportQueryValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a number greater than 0'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['open', 'triage', 'in_progress', 'resolved', 'closed']).withMessage('Status filter is invalid'),
  query('priority').optional().isIn(['Low', 'Medium', 'High', 'Critical']).withMessage('Priority filter is invalid')
];

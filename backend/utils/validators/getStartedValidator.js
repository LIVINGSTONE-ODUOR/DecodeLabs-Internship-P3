import { body, query } from 'express-validator';
const services = ['Web Development', 'Software Installation', 'IT Support', 'Technical Consulting', 'AI-Powered Assistance', 'Digital Solutions', 'Other', 'web-development', 'software-installation', 'it-support', 'consulting', 'technical-consulting', 'ai-assistant', 'ai-powered-assistance', 'digital-solutions', 'other'];
const budgets = ['Under $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '$50,000+', 'Not Sure', 'under-5k', '5k-15k', '15k-50k', '50k+', 'not-sure'];
const timelines = ['Immediate', 'Within 1 Month', '1-3 Months', '3-6 Months', 'Flexible', 'immediate', '1-month', '1-3-months', '3-6-months', 'flexible'];
export const getStartedValidation = [
  body('fullName').trim().notEmpty().withMessage('Full name is required').isLength({ max: 100 }).withMessage('Full name must contain 100 characters or fewer'),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Please provide a valid email address'),
  body('companyName').optional({ values: 'falsy' }).trim().isLength({ max: 200 }).withMessage('Company name must contain 200 characters or fewer'),
  body('serviceInterestedIn').trim().notEmpty().withMessage('Service selection is required').isIn(services).withMessage('Service selection is invalid'),
  body('projectDescription').trim().notEmpty().withMessage('Project description is required').isLength({ min: 20, max: 4000 }).withMessage('Project description must be between 20 and 4000 characters'),
  body('budget').optional({ values: 'falsy' }).trim().isIn(budgets).withMessage('Budget selection is invalid'),
  body('timeline').optional({ values: 'falsy' }).trim().isIn(timelines).withMessage('Timeline selection is invalid')
];
export const getStartedQueryValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a number greater than 0'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['new', 'reviewed', 'contacted', 'converted', 'closed']).withMessage('Status filter is invalid')
];

import { body, query } from 'express-validator';

const projectTypes = ['website', 'saas', 'mobile', 'automation', 'support'];
const complexities = ['standard', 'advanced', 'enterprise'];
const timelines = ['normal', 'urgent', 'relaxed'];

export const createQuoteValidation = [
  body('projectType').trim().isIn(projectTypes).withMessage('Project type is invalid'),
  body('complexity').trim().isIn(complexities).withMessage('Complexity is invalid'),
  body('timeline').trim().isIn(timelines).withMessage('Timeline is invalid'),
  body('features').isArray({ min: 0, max: 12 }).withMessage('Features must be an array'),
  body('features.*').optional().trim().isLength({ min: 1, max: 50 }).withMessage('Feature value is invalid'),
  body('estimate').isInt({ min: 0, max: 10000000 }).withMessage('Estimate is invalid'),
  body('email').optional({ values: 'falsy' }).trim().isEmail().withMessage('Email must be valid'),
  body('fullName').optional({ values: 'falsy' }).trim().isLength({ max: 100 }).withMessage('Full name must contain 100 characters or fewer'),
  body('companyName').optional({ values: 'falsy' }).trim().isLength({ max: 200 }).withMessage('Company name must contain 200 characters or fewer'),
  body('notes').optional({ values: 'falsy' }).trim().isLength({ max: 4000 }).withMessage('Notes must contain 4000 characters or fewer')
];

export const quoteQueryValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a number greater than 0'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['new', 'reviewed', 'proposal_sent', 'won', 'lost']).withMessage('Status filter is invalid')
];

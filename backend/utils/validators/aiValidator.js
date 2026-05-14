import { body } from 'express-validator';

export const aiChatValidation = [
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('sessionId').optional().isString().withMessage('Session ID must be a valid string')
];

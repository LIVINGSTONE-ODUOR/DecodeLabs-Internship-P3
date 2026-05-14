import { validationResult } from 'express-validator';
import ApiResponse from '../utils/apiResponse.js';

const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.error(res, 'Validation failed', 422, errors.array().map(error => ({ field: error.path || error.param, message: error.msg })));
  }
  return next();
};

export default validateMiddleware;

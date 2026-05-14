import ApiResponse from '../utils/apiResponse.js';
import { logger } from '../utils/logger.js';

const errorMiddleware = (err, req, res, _next) => {
  logger.error('Unhandled error in request', { message: err.message, stack: err.stack, path: req.originalUrl });

  let statusCode = err.statusCode || 500;
  let message = err.message || 'An unexpected error occurred';
  let errorDetails;

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    message = 'Invalid identifier format';
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate field value entered';
    errorDetails = Object.keys(err.keyValue).map((key) => ({ field: key, value: err.keyValue[key] }));
  }

  if (err.name === 'ValidationError') {
    statusCode = 422;
    message = 'Validation failed for one or more fields';
    errorDetails = Object.values(err.errors).map((error) => ({ field: error.path, message: error.message }));
  }

  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token has expired';
  }

  if (process.env.NODE_ENV === 'development') {
    errorDetails = errorDetails || err.stack || err;
  }

  return ApiResponse.error(res, message, statusCode, errorDetails);
};

export default errorMiddleware;

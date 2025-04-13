/**
 * Global error handling middleware
 * Standardizes error responses across the application
 */

export const errorHandler = (err, req, res, next) => {
  // Log the error details for debugging
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  
  // Determine appropriate HTTP status code
  const statusCode = err.statusCode || 500;
  
  // Create standardized error response
  const errorResponse = {
    error: {
      message: err.message || 'An unexpected error occurred',
      code: err.code || 'SERVER_ERROR',
      // Include additional error details for non-production environments
      ...(process.env.NODE_ENV !== 'production' && { 
        details: err.details,
        stack: err.stack 
      })
    }
  };
  
  // Send error response
  res.status(statusCode).json(errorResponse);
};

/**
 * Error wrapper utility to standardize async route handlers
 * @param {Function} fn - Async route handler function
 * @returns {Function} Express middleware function
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Custom error class with status code support
 */
export class AppError extends Error {
  constructor(message, statusCode, code = 'SERVER_ERROR', details = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default {
  errorHandler,
  asyncHandler,
  AppError
};
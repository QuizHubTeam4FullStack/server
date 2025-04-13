// Collection of helper utility functions

/**
 * Validates if a string is a valid MongoDB ObjectId (24 hex characters)
 * @param {string} id - The ID to validate
 * @returns {boolean} - Whether the ID is valid
 */
export const isValidObjectId = (id) => {
  if (!id) return false;
  
  // MongoDB ObjectIds are 24 character hex strings
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(id);
};

/**
 * Sanitizes request parameters to prevent injection
 * @param {Object} params - The parameters to sanitize
 * @returns {Object} - The sanitized parameters
 */
export const sanitizeParams = (params) => {
  const sanitized = {};
  
  // Remove any potentially dangerous characters
  Object.keys(params).forEach(key => {
    if (typeof params[key] === 'string') {
      // Remove any control characters and non-printable characters
      sanitized[key] = params[key].replace(/[^\x20-\x7E]/g, '');
    } else {
      sanitized[key] = params[key];
    }
  });
  
  return sanitized;
};

/**
 * Format error for consistent API responses
 * @param {Error} error - The error object
 * @returns {Object} - Formatted error response
 */
export const formatError = (error) => {
  return {
    error: {
      message: error.message || 'An unexpected error occurred',
      code: error.code || 'UNKNOWN_ERROR',
      // Avoid exposing stack traces in production
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }
  };
};

/**
 * Input sanitization utility functions
 * Provides methods to clean and validate user input
 */

/**
 * Sanitizes a string by removing potentially dangerous characters
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeString = (str) => {
  if (!str || typeof str !== 'string') return '';
  
  // Remove control characters and non-printable characters
  return str.replace(/[^\x20-\x7E]/g, '');
};

/**
 * Sanitizes an object by recursively sanitizing all string properties
 * @param {Object} obj - Object to sanitize
 * @returns {Object} Sanitized object
 */
export const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  
  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }
  
  // Handle objects
  const sanitized = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

/**
 * Express middleware to sanitize request body
 */
export const sanitizeBody = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  next();
};

/**
 * Express middleware to sanitize request query parameters
 * Instead of replacing req.query, we copy sanitized values to a new object
 */
export const sanitizeQuery = (req, res, next) => {
  if (req.query) {
    // Can't assign directly to req.query, so handle each property
    const sanitizedQuery = sanitizeObject(Object.assign({}, req.query));
    
    // Clear existing query properties
    for (const key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        delete req.query[key];
      }
    }
    
    // Copy sanitized values back
    for (const key in sanitizedQuery) {
      if (Object.prototype.hasOwnProperty.call(sanitizedQuery, key)) {
        req.query[key] = sanitizedQuery[key];
      }
    }
  }
  next();
};

/**
 * Express middleware to sanitize both body and query
 */
export const sanitizeAll = (req, res, next) => {
  // Sanitize body
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  
  // Sanitize query parameters
  if (req.query) {
    // Can't assign directly to req.query, so handle each property
    const sanitizedQuery = sanitizeObject(Object.assign({}, req.query));
    
    // Clear existing query properties and copy sanitized values
    for (const key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        const sanitizedValue = sanitizedQuery[key];
        req.query[key] = sanitizedValue;
      }
    }
  }
  
  next();
};

export default {
  sanitizeString,
  sanitizeObject,
  sanitizeBody,
  sanitizeQuery,
  sanitizeAll
};
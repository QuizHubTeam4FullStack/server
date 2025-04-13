/**
 * Authentication middleware
 * Handles user authentication and authorization
 */
import { AppError } from './errorHandler.js';
import logger from '../utils/logger.js';

/**
 * Basic authentication middleware
 * Attaches user information to the request
 * NOTE: This is a placeholder that would be replaced with real JWT authentication
 */
export const auth = (req, res, next) => {
  try {
    // Check for authorization header
    const authHeader = req.headers.authorization;
    
    // If there's an authorization header, extract the token
    if (authHeader && authHeader.startsWith('Bearer ')) {
      // In a real app, you'd verify this token
      // For now, just accept any token and set a default user
      req.user = {
        username: 'api_user',
        role: 'user'
      };
      
      logger.debug(`User authenticated with token: ${req.user.username}`);
    } else {
      // For backward compatibility, still set a default user
      // This allows non-auth endpoints to work as before
      req.user = {
        username: 'api_user',
        role: 'user'
      };
      
      logger.debug(`User authenticated without token: ${req.user.username}`);
    }
    
    next();
  } catch (error) {
    logger.error('Authentication error', error);
    next(new AppError('Authentication failed', 401, 'AUTH_FAILED'));
  }
};

/**
 * Middleware to require authentication
 * Verifies that the user is authenticated
 */
export const requireAuth = (req, res, next) => {
  if (!req.user) {
    throw new AppError('Authentication required', 401, 'AUTH_REQUIRED');
  }
  next();
};

/**
 * Middleware to require admin role
 * Verifies that the user has admin privileges
 */
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    throw new AppError('Authentication required', 401, 'AUTH_REQUIRED');
  }
  
  if (req.user.role !== 'admin') {
    throw new AppError('Admin privileges required', 403, 'FORBIDDEN');
  }
  
  next();
};

export default {
  auth,
  requireAuth,
  requireAdmin
};
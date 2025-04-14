/**
 * Environment configuration
 * Centralizes environment variables and configuration settings
 */

// Database configuration
const DB_CONFIG = {
  // url: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  url: process.env.MONGODB_URI || 'mongodb+srv://iptable:Jacky789@cluster0.2n8ys.mongodb.net/',
  name: process.env.DB_NAME || 'quizmk',
  options: {
    maxPoolSize: 10,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }
};

// Server configuration
const SERVER_CONFIG = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  corsOptions: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
};

// Authentication configuration
const AUTH_CONFIG = {
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d'
};

export default {
  db: DB_CONFIG,
  server: SERVER_CONFIG,
  auth: AUTH_CONFIG,
  isDev: process.env.NODE_ENV !== 'production',
  isProd: process.env.NODE_ENV === 'production'
};
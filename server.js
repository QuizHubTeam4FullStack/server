import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import database from './config/db.js';
import config from './config/env.js';
import apiRoutes from './routes/api.js';
import { auth } from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import { sanitizeAll } from './utils/sanitizer.js';
import logger from './utils/logger.js';

// Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Initialize Express app
const app = express();
const PORT = config.server.port;

// Apply global middleware
app.use(cors(config.server.corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply sanitization middleware
app.use(sanitizeAll);

// Apply authentication middleware globally
app.use(auth);

// Mount API routes
app.use('/api', apiRoutes);

// Root route for API status check
app.get('/', (req, res) => {
  res.json({ 
    status: 'healthy',
    message: 'Welcome to the QuizMK API',
    version: '1.0.0',
    environment: config.server.env
  });
});

// Handle 404 - Route not found
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  error.code = 'ROUTE_NOT_FOUND';
  next(error);
});

// Apply error handling middleware
app.use(errorHandler);

// Start the server
async function startServer() {
  try {
    // Connect to MongoDB
    await database.connect();
    
    // Start Express server
    app.listen(PORT, () => {
      logger.info(`Server running in ${config.server.env} mode on port ${PORT}`);
      logger.info(`http://localhost:${PORT}`);
    });

    // Handle graceful shutdown
    const gracefulShutdown = async (signal) => {
      logger.info(`${signal} received. Starting graceful shutdown...`);
      
      // Close database connection
      await database.close();
      
      // Exit process
      logger.info('Server successfully shut down');
      process.exit(0);
    };

    // Register shutdown handlers
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception', error);
      gracefulShutdown('UNCAUGHT_EXCEPTION');
    });
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection', { reason, promise });
      gracefulShutdown('UNHANDLED_REJECTION');
    });
    
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Run the server
startServer();
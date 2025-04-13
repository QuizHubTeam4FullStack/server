/**
 * Centralized logger utility
 * Provides consistent logging across the application
 */

// Log levels
const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

// Current log level based on environment
const currentLevel = process.env.NODE_ENV === 'production' ? LOG_LEVELS.INFO : LOG_LEVELS.DEBUG;

// Level priority
const levelPriority = {
  [LOG_LEVELS.ERROR]: 0,
  [LOG_LEVELS.WARN]: 1,
  [LOG_LEVELS.INFO]: 2,
  [LOG_LEVELS.DEBUG]: 3
};

/**
 * Formats a log message with timestamp and level
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {Object} data - Additional data to log
 * @returns {string} Formatted log message
 */
const formatLogMessage = (level, message, data = null) => {
  const timestamp = new Date().toISOString();
  const formattedLevel = `[${level}]`.padEnd(7);
  
  let logMessage = `${timestamp} ${formattedLevel} ${message}`;
  
  if (data) {
    const dataString = typeof data === 'object' 
      ? JSON.stringify(data, null, 2)
      : data.toString();
    
    logMessage += `\n${dataString}`;
  }
  
  return logMessage;
};

/**
 * Logs a message if the level is at or above the current log level
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {Object} data - Additional data to log
 */
const log = (level, message, data = null) => {
  if (levelPriority[level] <= levelPriority[currentLevel]) {
    const formattedMessage = formatLogMessage(level, message, data);
    
    switch (level) {
      case LOG_LEVELS.ERROR:
        console.error(formattedMessage);
        break;
      case LOG_LEVELS.WARN:
        console.warn(formattedMessage);
        break;
      default:
        console.log(formattedMessage);
    }
  }
};

// Public API
export default {
  error: (message, data = null) => log(LOG_LEVELS.ERROR, message, data),
  warn: (message, data = null) => log(LOG_LEVELS.WARN, message, data),
  info: (message, data = null) => log(LOG_LEVELS.INFO, message, data),
  debug: (message, data = null) => log(LOG_LEVELS.DEBUG, message, data),
  levels: LOG_LEVELS
};
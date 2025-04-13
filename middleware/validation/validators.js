/**
 * Input validation middleware functions
 */
import { AppError } from '../errorHandler.js';

/**
 * Validate question input
 */
export const validateQuestion = (req, res, next) => {
  const { question_text, answers, correct_answer } = req.body;
  const errors = {};

  // Validate required fields
  if (!question_text || question_text.trim() === '') {
    errors.question_text = 'Question text is required';
  }

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    errors.answers = 'At least one answer option is required';
  } else {
    // Check for empty answer options
    const hasEmptyAnswer = answers.some(a => !a.content || a.content.trim() === '');
    if (hasEmptyAnswer) {
      errors.answers = 'All answer options must have content';
    }
  }

  if (correct_answer === undefined || correct_answer === null) {
    errors.correct_answer = 'A correct answer must be selected';
  }

  // If validation fails, throw error with validation details
  if (Object.keys(errors).length > 0) {
    throw new AppError('Validation failed', 400, 'VALIDATION_ERROR', errors);
  }

  next();
};

/**
 * Validate question set input
 */
export const validateQuestionSet = (req, res, next) => {
  console.log('--- Inside validateQuestionSet ---');
  console.log('Received req.body:', JSON.stringify(req.body, null, 2));
  const { title } = req.body;
  console.log('Value of title before validation:', title);
  const errors = {};

  // Validate required fields
  if (!title || title.trim() === '') {
    errors.title = 'Title is required';
  }

  // If validation fails, throw error with validation details
  if (Object.keys(errors).length > 0) {
    throw new AppError('Validation failed', 400, 'VALIDATION_ERROR', errors);
  }

  next();
};
export const validateQuestionSetUpdate = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw new AppError('Validation failed: Update request body cannot be empty.', 400, 'VALIDATION_ERROR');
  }
  next();
};


/**
 * Validate quiz set input
 */
export const validateQuizSet = (req, res, next) => {
  

  const { title } = req.body;
  
  const errors = {};

  // Validate required fields
  if (!title || title.trim() === '') {
    errors.title = 'Title is required';
  }

  // If validation fails, throw error with validation details
  if (Object.keys(errors).length > 0) {
    throw new AppError('Validation failed', 400, 'VALIDATION_ERROR', errors);
  }

  next();
};

export default {
  validateQuestion,
  validateQuestionSet,
  validateQuizSet,
  validateQuestionSetUpdate
};
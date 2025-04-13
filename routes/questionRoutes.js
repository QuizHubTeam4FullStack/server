import express from 'express';
import questionController from '../controllers/questionController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateQuestion } from '../middleware/validation/validators.js';

const router = express.Router();

// Get all questions (with optional filtering)
router.get('/', questionController.getQuestions);

// Get a single question by ID
router.get('/:id', questionController.getQuestionById);

// Create a new question - apply auth & validation middleware
router.post('/', requireAuth, validateQuestion, questionController.createQuestion);

// Update a question - apply auth & validation middleware
router.put('/:id', requireAuth, validateQuestion, questionController.updateQuestion);

// Delete a question - apply auth middleware
router.delete('/:id', requireAuth, questionController.deleteQuestion);

export default router;
import express from 'express';
import quizController from '../controllers/quizController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateQuizSet } from '../middleware/validation/validators.js';

const router = express.Router();

// Get all quiz sets
router.get('/', quizController.getQuizSets);

// Get a single quiz set by ID
router.get('/:id', quizController.getQuizSetById);

// Create a new quiz set - apply auth & validation middleware
router.post('/', requireAuth, validateQuizSet, quizController.createQuizSet);

// Update a quiz set - apply auth & validation middleware
router.put('/:id', requireAuth, validateQuizSet, quizController.updateQuizSet);

// Delete a quiz set - apply auth middleware
router.delete('/:id', requireAuth, quizController.deleteQuizSet);

// Add a question set to a quiz - apply auth middleware
router.post('/:id/question-sets', requireAuth, quizController.addQuestionSetToQuiz);

// Remove a question set from a quiz - apply auth middleware
router.delete('/:id/question-sets/:question_set_id', requireAuth, quizController.removeQuestionSetFromQuiz);

export default router;
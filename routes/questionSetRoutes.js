import express from 'express';
import questionSetController from '../controllers/questionSetController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateQuestionSet, validateQuestionSetUpdate  } from '../middleware/validation/validators.js';

const router = express.Router();

// Get all question sets
router.get('/', questionSetController.getQuestionSets);

// Get a single question set by ID
router.get('/:id', questionSetController.getQuestionSetById);

// Create a new question set - apply auth & validation middleware
router.post('/', requireAuth, validateQuestionSet, questionSetController.createQuestionSet);

// Update a question set - apply auth & validation middleware
router.put('/:id', requireAuth, validateQuestionSetUpdate, questionSetController.updateQuestionSet);

// Delete a question set - apply auth middleware
router.delete('/:id', requireAuth, questionSetController.deleteQuestionSet);

export default router;
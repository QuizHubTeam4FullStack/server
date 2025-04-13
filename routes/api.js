import express from 'express';
import questionRoutes from './questionRoutes.js';
import questionSetRoutes from './questionSetRoutes.js';
import quizRoutes from './quizRoutes.js';
import questionController from '../controllers/questionController.js';

const router = express.Router();

// Mount sub-routes
router.use('/questions', questionRoutes);
router.use('/question-sets', questionSetRoutes);
router.use('/quiz-sets', quizRoutes);

// Get all tags
router.get('/tags', questionController.getAllTags);

export default router;

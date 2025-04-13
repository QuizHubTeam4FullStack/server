import questionService from '../services/questionService.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';

/**
 * Get all questions with optional filtering
 * @route GET /api/questions
 */
export const getQuestions = asyncHandler(async (req, res) => {
  const { tags, difficulty, set_id, limit } = req.query;
  
  const filters = {};
  
  if (tags) {
    filters.tags = tags.split(',');
  }
  
  if (difficulty) {
    filters.difficulty = difficulty;
  }
  
  if (set_id) {
    filters.set_id = set_id;
  }
  
  if (limit) {
    const parsedLimit = parseInt(limit);
    if (isNaN(parsedLimit)) {
      throw new AppError('Invalid limit parameter', 400, 'INVALID_PARAMETER');
    }
    filters.limit = parsedLimit;
  }
  
  const questions = await questionService.getQuestions(filters);
  res.json(questions);
});

/**
 * Get a single question by ID
 * @route GET /api/questions/:id
 */
export const getQuestionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const question = await questionService.getQuestionById(id);
  
  if (!question) {
    throw new AppError('Question not found', 404, 'RESOURCE_NOT_FOUND');
  }
  
  res.json(question);
});

/**
 * Create a new question
 * @route POST /api/questions
 */
export const createQuestion = asyncHandler(async (req, res) => {
  const { question_text, image_url, answers, correct_answer, set_id, tags, difficulty, explanation } = req.body;
  
  // Create question document
  const questionData = {
    question_text,
    image_url,
    answers,
    correct_answer,
    set_id,
    tags: tags || [],
    difficulty: difficulty || 'medium',
    explanation,
    created_by: req.user?.username || 'api_user',
    created_at: new Date(),
    updated_at: new Date()
  };
  
  const result = await questionService.createQuestion(questionData);
  res.status(201).json({ _id: result.insertedId, ...questionData });
});

/**
 * Update a question
 * @route PUT /api/questions/:id
 */
export const updateQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { question_text, image_url, answers, correct_answer, set_id, tags, difficulty, explanation } = req.body;
  
  // Prepare update data
  const updateData = {};
  
  if (question_text !== undefined) updateData.question_text = question_text;
  if (image_url !== undefined) updateData.image_url = image_url;
  if (answers !== undefined) updateData.answers = answers;
  if (correct_answer !== undefined) updateData.correct_answer = correct_answer;
  if (set_id !== undefined) updateData.set_id = set_id;
  if (tags !== undefined) updateData.tags = tags;
  if (difficulty !== undefined) updateData.difficulty = difficulty;
  if (explanation !== undefined) updateData.explanation = explanation;
  
  const result = await questionService.updateQuestion(id, updateData);
  
  if (result.matchedCount === 0) {
    throw new AppError('Question not found', 404, 'RESOURCE_NOT_FOUND');
  }
  
  res.json({ _id: id, ...updateData });
});

/**
 * Delete a question
 * @route DELETE /api/questions/:id
 */
export const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const result = await questionService.deleteQuestion(id);
  
  if (result.deletedCount === 0) {
    throw new AppError('Question not found', 404, 'RESOURCE_NOT_FOUND');
  }
  
  res.json({ message: 'Question deleted successfully' });
});

/**
 * Get all tags
 * @route GET /api/tags
 */
export const getAllTags = asyncHandler(async (req, res) => {
  const tags = await questionService.getAllTags();
  res.json(tags);
});

export default {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getAllTags
};
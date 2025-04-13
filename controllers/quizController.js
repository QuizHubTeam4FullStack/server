import quizService from '../services/quizService.js';

// Get all quiz sets
export const getQuizSets = async (req, res) => {
  try {
    const { tags, created_by, is_public, question_set_id, limit } = req.query;
    
    const filters = {};
    if (tags) {
      filters.tags = tags.split(',');
    }
    if (created_by) {
      filters.created_by = created_by;
    }
    if (is_public !== undefined) {
      filters.is_public = is_public === 'true';
    }
    if (question_set_id) {
      filters.question_set_id = question_set_id;
    }
    if (limit) {
      filters.limit = parseInt(limit);
    }
    
    const quizSets = await quizService.getQuizSets(filters);
    res.json(quizSets);
  } catch (error) {
    console.error('Error fetching quiz sets:', error);
    res.status(500).json({ error: 'Failed to fetch quiz sets' });
  }
};

// Get a single quiz set by ID
export const getQuizSetById = async (req, res) => {
  try {
    const quizSet = await quizService.getQuizSetById(req.params.id);
    
    if (!quizSet) {
      return res.status(404).json({ error: 'Quiz set not found' });
    }
    
    res.json(quizSet);
  } catch (error) {
    console.error('Error fetching quiz set:', error);
    res.status(500).json({ error: 'Failed to fetch quiz set' });
  }
};

// Create a new quiz set
export const createQuizSet = async (req, res) => {
  try {
    const { _id, title, description, tags, question_sets, settings, is_public } = req.body;
    
    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: 'Missing required field: title' });
    }
    
    // Create quiz set document
    const quizData = {
      _id: _id || new Date().getTime().toString(),
      title,
      description: description || '',
      tags: tags || [],
      question_sets: question_sets || [],
      settings: settings || {
        shuffle_questions: false,
        shuffle_answers: false,
        time_limit: 0,
        passing_score: 70,
        feedback_mode: 'end'
      },
      created_by: req.user?.username || 'api_user',
      is_public: is_public !== undefined ? is_public : true
    };
    
    const result = await quizService.createQuizSet(quizData);
    res.status(201).json(quizData);
  } catch (error) {
    console.error('Error creating quiz set:', error);
    res.status(500).json({ error: 'Failed to create quiz set' });
  }
};

// Update a quiz set
export const updateQuizSet = async (req, res) => {
  try {
    const { title, description, tags, question_sets, settings, is_public } = req.body;
    
    // Prepare update data
    const updateData = {};
    
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (tags !== undefined) updateData.tags = tags;
    if (question_sets !== undefined) updateData.question_sets = question_sets;
    if (settings !== undefined) updateData.settings = settings;
    if (is_public !== undefined) updateData.is_public = is_public;
    
    const result = await quizService.updateQuizSet(req.params.id, updateData);
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Quiz set not found' });
    }
    
    res.json({ _id: req.params.id, ...updateData });
  } catch (error) {
    console.error('Error updating quiz set:', error);
    res.status(500).json({ error: 'Failed to update quiz set' });
  }
};

// Delete a quiz set
export const deleteQuizSet = async (req, res) => {
  try {
    const result = await quizService.deleteQuizSet(req.params.id);
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Quiz set not found' });
    }
    
    res.json({ message: 'Quiz set deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz set:', error);
    res.status(500).json({ error: 'Failed to delete quiz set' });
  }
};

// Add a question set to a quiz
export const addQuestionSetToQuiz = async (req, res) => {
  try {
    const { question_set_id, weight } = req.body;
    
    if (!question_set_id) {
      return res.status(400).json({ error: 'Missing required field: question_set_id' });
    }
    
    await quizService.addQuestionSetToQuiz(
      req.params.id, 
      question_set_id, 
      weight || 1
    );
    
    res.json({ message: 'Question set added to quiz successfully' });
  } catch (error) {
    console.error('Error adding question set to quiz:', error);
    res.status(500).json({ error: 'Failed to add question set to quiz' });
  }
};

// Remove a question set from a quiz
export const removeQuestionSetFromQuiz = async (req, res) => {
  try {
    const { question_set_id } = req.params;
    
    if (!question_set_id) {
      return res.status(400).json({ error: 'Missing required parameter: question_set_id' });
    }
    
    await quizService.removeQuestionSetFromQuiz(req.params.id, question_set_id);
    
    res.json({ message: 'Question set removed from quiz successfully' });
  } catch (error) {
    console.error('Error removing question set from quiz:', error);
    res.status(500).json({ error: 'Failed to remove question set from quiz' });
  }
};

export default {
  getQuizSets,
  getQuizSetById,
  createQuizSet,
  updateQuizSet,
  deleteQuizSet,
  addQuestionSetToQuiz,
  removeQuestionSetFromQuiz
};

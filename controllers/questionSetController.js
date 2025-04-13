import questionService from '../services/questionService.js';

// Get all question sets
export const getQuestionSets = async (req, res) => {
  try {
    const { tags, created_by, fuzzyTags } = req.query;
    
    const filters = {};
    if (fuzzyTags) {
      // Use the fuzzy tag search
      filters.fuzzyTags = fuzzyTags;
    } else if (tags) {
      // Regular exact match on tags
      filters.tags = tags.split(',');
    }
    if (created_by) {
      filters.created_by = created_by;
    }
    
    const questionSets = await questionService.getQuestionSets(filters);
    res.json(questionSets);
  } catch (error) {
    console.error('Error fetching question sets:', error);
    res.status(500).json({ error: 'Failed to fetch question sets' });
  }
};

// Get a single question set by ID
export const getQuestionSetById = async (req, res) => {
  try {
    const questionSet = await questionService.getQuestionSetById(req.params.id);
    
    if (!questionSet) {
      return res.status(404).json({ error: 'Question set not found' });
    }
    
    res.json(questionSet);
  } catch (error) {
    console.error('Error fetching question set:', error);
    res.status(500).json({ error: 'Failed to fetch question set' });
  }
};

// Create a new question set
export const createQuestionSet = async (req, res) => {
  try {
    const { _id, title, description, tags } = req.body;
        
    // Create question set document
    const setData = {
      _id: _id || new Date().getTime().toString(),
      title,
      description: description || '',
      tags: tags || [],
      created_by: req.user?.username || 'api_user',
      question_count: 0
    };
    
    const result = await questionService.createQuestionSet(setData);
    res.status(201).json(setData);
  } catch (error) {
    console.error('Error creating question set:', error);
    res.status(500).json({ error: 'Failed to create question set' });
  }
};

// Update a question set
export const updateQuestionSet = async (req, res) => {
  try {
    const { title, description, tags, question_count } = req.body;
    
    // Prepare update data
    const updateData = {};
    
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (tags !== undefined) updateData.tags = tags;
    if (question_count !== undefined) updateData.question_count = question_count;
    
    const result = await questionService.updateQuestionSet(req.params.id, updateData);
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Question set not found' });
    }
    
    res.json({ _id: req.params.id, ...updateData });
  } catch (error) {
    console.error('Error updating question set:', error);
    res.status(500).json({ error: 'Failed to update question set' });
  }
};

// Delete a question set
export const deleteQuestionSet = async (req, res) => {
  try {
    const result = await questionService.deleteQuestionSet(req.params.id);
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Question set not found' });
    }
    
    res.json({ message: 'Question set deleted successfully' });
  } catch (error) {
    console.error('Error deleting question set:', error);
    res.status(500).json({ error: 'Failed to delete question set' });
  }
};

export default {
  getQuestionSets,
  getQuestionSetById,
  createQuestionSet,
  updateQuestionSet,
  deleteQuestionSet
};

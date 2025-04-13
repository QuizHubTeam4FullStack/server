import database from '../config/db.js';
import { ObjectId } from 'mongodb';
import Question from '../models/Question.js';
import QuestionSet from '../models/QuestionSet.js';

class QuestionService {
  // Get all questions (with optional filtering)
  async getQuestions(filters = {}) {
    const query = {};
    
    // Apply filters if provided
    if (filters.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }
    
    if (filters.difficulty) {
      query.difficulty = filters.difficulty;
    }
    
    if (filters.set_id) {
      query.set_id = filters.set_id;
    }
    
    const options = {
      sort: { created_at: -1 }
    };
    
    if (filters.limit) {
      options.limit = parseInt(filters.limit);
    }
    
    return database.getQuestions(query, options);
  }
  
  // Get a single question by ID
  async getQuestionById(id) {
    return database.getQuestionById(this.createObjectId(id));
  }
  
  // Get questions for a specific set
  async getQuestionsBySetId(setId) {
    return database.getQuestionsBySetId(setId);
  }
  
  // Create a new question
  async createQuestion(questionData) {
    // Create a Question model instance
    const question = new Question(questionData);
    
    // Validate the question
    const validation = question.validate();
    if (!validation.isValid) {
      throw new Error(`Invalid question data: ${JSON.stringify(validation.errors)}`);
    }
    
    // Convert to document format and save
    const documentToSave = question.toDocument();
    const result = await database.createQuestion(documentToSave);
    
    // Return the created question with the new ID
    return { _id: result.insertedId, ...documentToSave };
  }
  
  // Update an existing question
  async updateQuestion(id, updateData) {
    // First get the existing question
    const existingQuestion = await this.getQuestionById(id);
    if (!existingQuestion) {
      throw new Error(`Question with ID ${id} not found`);
    }
    
    // Merge existing data with updates
    const mergedData = { ...existingQuestion, ...updateData, _id: this.createObjectId(id) };
    
    // Create a Question model instance
    const question = new Question(mergedData);
    
    // Validate the question
    const validation = question.validate();
    if (!validation.isValid) {
      throw new Error(`Invalid question data: ${JSON.stringify(validation.errors)}`);
    }
    
    // Convert to document format and update
    const documentToUpdate = question.toDocument();
    const result = await database.updateQuestion(this.createObjectId(id), documentToUpdate);
    
    return { _id: id, ...documentToUpdate };
  }
  
  // Delete a question
  async deleteQuestion(id) {
    return database.deleteQuestion(this.createObjectId(id));
  }
  
  // Get all question sets
  async getQuestionSets(filters = {}) {
    const query = {};
    const options = {
      sort: { created_at: -1 }
    };
    
    // For fuzzy tag search
    if (filters.fuzzyTags) {
      return database.getQuestionSetsByFuzzyTags(filters.fuzzyTags, options);
    }
    
    // Regular exact match filtering
    if (filters.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }
    
    if (filters.created_by) {
      query.created_by = filters.created_by;
    }
    
    return database.getQuestionSets(query, options);
  }
  
  // Get a single question set by ID
  async getQuestionSetById(id) {
    return database.getQuestionSetById(id);
  }
  
  // Create a new question set
  async createQuestionSet(setData) {
    // Create a QuestionSet model instance
    const questionSet = new QuestionSet(setData);
    
    // Validate the question set
    const validation = questionSet.validate();
    if (!validation.isValid) {
      throw new Error(`Invalid question set data: ${JSON.stringify(validation.errors)}`);
    }
    
    // Convert to document format and save
    const documentToSave = questionSet.toDocument();
    const result = await database.createQuestionSet(documentToSave);
    
    return documentToSave;
  }
  
  // Update an existing question set
  async updateQuestionSet(id, updateData) {
    // First get the existing question set
    const existingSet = await this.getQuestionSetById(id);
    if (!existingSet) {
      throw new Error(`Question set with ID ${id} not found`);
    }
    
    // Merge existing data with updates
    const mergedData = { ...existingSet, ...updateData, _id: id };
    
    // Create a QuestionSet model instance
    const questionSet = new QuestionSet(mergedData);
    
    // Validate the question set
    const validation = questionSet.validate();
    if (!validation.isValid) {
      throw new Error(`Invalid question set data: ${JSON.stringify(validation.errors)}`);
    }
    
    // Convert to document format and update
    const documentToUpdate = questionSet.toDocument();
    const result = await database.updateQuestionSet(id, documentToUpdate);
    
    return { _id: id, ...documentToUpdate };
  }
  
  // Delete a question set
  async deleteQuestionSet(id) {
    return database.deleteQuestionSet(id);
  }
  
  // Get all unique tags used in questions
  async getAllTags() {
    return database.getAllTags();
  }
  
  // Helper to create MongoDB ObjectId
  createObjectId(id) {
    try {
      return new ObjectId(id);
    } catch (error) {
      console.error('Invalid ObjectId:', error);
      return id; // Return original ID if conversion fails
    }
  }
}

// Export a singleton instance
const questionService = new QuestionService();
export default questionService;

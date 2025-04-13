import database from '../config/db.js';
import { ObjectId } from 'mongodb';
import Quiz from '../models/Quiz.js';

class QuizService {
  // Get all quiz sets (with optional filtering)
  async getQuizSets(filters = {}) {
    const query = {};
    
    // Apply filters if provided
    if (filters.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }
    
    if (filters.created_by) {
      query.created_by = filters.created_by;
    }
    
    if (filters.is_public !== undefined) {
      query.is_public = filters.is_public;
    }
    
    // For searching by question sets
    if (filters.question_set_id) {
      query['question_sets.set_id'] = filters.question_set_id;
    }
    
    const options = {
      sort: { created_at: -1 }
    };
    
    if (filters.limit) {
      options.limit = parseInt(filters.limit);
    }
    
    return database.getQuizSets(query, options);
  }
  
  // Get a single quiz set by ID
  async getQuizSetById(id) {
    return database.getQuizSetById(id);
  }
  
  // Create a new quiz set
  async createQuizSet(quizData) {
    // Create a Quiz model instance
    const quiz = new Quiz(quizData);
    
    // Validate the quiz
    const validation = quiz.validate();
    if (!validation.isValid) {
      throw new Error(`Invalid quiz data: ${JSON.stringify(validation.errors)}`);
    }
    
    // Convert to document format and save
    const documentToSave = quiz.toDocument();
    const result = await database.createQuizSet(documentToSave);
    
    return documentToSave;
  }
  
  // Update an existing quiz set
  async updateQuizSet(id, updateData) {
    // First get the existing quiz set
    const existingQuiz = await this.getQuizSetById(id);
    if (!existingQuiz) {
      throw new Error(`Quiz set with ID ${id} not found`);
    }
    
    // Merge existing data with updates
    const mergedData = { ...existingQuiz, ...updateData, _id: id };
    
    // Create a Quiz model instance
    const quiz = new Quiz(mergedData);
    
    // Validate the quiz
    const validation = quiz.validate();
    if (!validation.isValid) {
      throw new Error(`Invalid quiz data: ${JSON.stringify(validation.errors)}`);
    }
    
    // Convert to document format and update
    const documentToUpdate = quiz.toDocument();
    const result = await database.updateQuizSet(id, documentToUpdate);
    
    return { _id: id, ...documentToUpdate };
  }
  
  // Delete a quiz set
  async deleteQuizSet(id) {
    return database.deleteQuizSet(id);
  }
  
  // Add a question set to a quiz
  async addQuestionSetToQuiz(quizId, questionSetId, weight = 1) {
    // Get the existing quiz
    const existingQuiz = await this.getQuizSetById(quizId);
    if (!existingQuiz) {
      throw new Error(`Quiz set with ID ${quizId} not found`);
    }
    
    // Create a Quiz model instance
    const quiz = new Quiz(existingQuiz);
    
    // Use the model's method to add the question set
    quiz.addQuestionSet(questionSetId, weight);
    
    // Save the updated quiz
    const documentToUpdate = quiz.toDocument();
    await database.updateQuizSet(quizId, documentToUpdate);
    
    return { message: 'Question set added successfully', quiz: documentToUpdate };
  }
  
  // Remove a question set from a quiz
  async removeQuestionSetFromQuiz(quizId, questionSetId) {
    // Get the existing quiz
    const existingQuiz = await this.getQuizSetById(quizId);
    if (!existingQuiz) {
      throw new Error(`Quiz set with ID ${quizId} not found`);
    }
    
    // Create a Quiz model instance
    const quiz = new Quiz(existingQuiz);
    
    // Use the model's method to remove the question set
    quiz.removeQuestionSet(questionSetId);
    
    // Save the updated quiz
    const documentToUpdate = quiz.toDocument();
    await database.updateQuizSet(quizId, documentToUpdate);
    
    return { message: 'Question set removed successfully', quiz: documentToUpdate };
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
const quizService = new QuizService();
export default quizService;

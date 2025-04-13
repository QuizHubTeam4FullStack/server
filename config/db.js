import { MongoClient } from 'mongodb';
import config from './env.js';

// Database connection class
class Database {
  constructor() {
    this.client = null;
    this.db = null;
    this.connectionOptions = config.db.options;
  }

  /**
   * Connect to MongoDB database
   * @returns {Promise<Db>} MongoDB database instance
   */
  async connect() {
    // If already connected, return existing connection
    if (this.db) return this.db;
    
    try {
      // Create new client with connection options
      this.client = new MongoClient(config.db.url, this.connectionOptions);
      
      // Establish connection
      await this.client.connect();
      this.db = this.client.db(config.db.name);
      
      console.log(`Connected to MongoDB: ${config.db.name}`);
      return this.db;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  /**
   * Close the MongoDB connection
   */
  async close() {
    if (this.client) {
      await this.client.close();
      console.log('MongoDB connection closed');
      this.client = null;
      this.db = null;
    }
  }

  /**
   * Get database instance (connect if needed)
   * @returns {Promise<Db>} MongoDB database instance
   */
  async getDb() {
    return this.connect();
  }

  // Questions Collection Methods

  /**
   * Get questions with optional filtering
   * @param {Object} query - Query filter
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of question documents
   */
  async getQuestions(query = {}, options = {}) {
    await this.connect();
    return this.db.collection('questions').find(query, options).toArray();
  }

  /**
   * Get a question by ID
   * @param {ObjectId} id - Question ID
   * @returns {Promise<Object>} Question document
   */
  async getQuestionById(id) {
    await this.connect();
    return this.db.collection('questions').findOne({ _id: id });
  }

  /**
   * Get questions by set ID
   * @param {string} setId - Set ID
   * @returns {Promise<Array>} Array of question documents
   */
  async getQuestionsBySetId(setId) {
    await this.connect();
    return this.db.collection('questions').find({ set_id: setId }).toArray();
  }

  /**
   * Get questions by tags
   * @param {string|Array} tags - Tag or array of tags
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of question documents
   */
  async getQuestionsByTags(tags, options = {}) {
    await this.connect();
    return this.db.collection('questions').find({ 
      tags: { $in: Array.isArray(tags) ? tags : [tags] } 
    }, options).toArray();
  }

  /**
   * Create a new question
   * @param {Object} questionData - Question data
   * @returns {Promise<Object>} Insertion result
   */
  async createQuestion(questionData) {
    await this.connect();
    return this.db.collection('questions').insertOne(questionData);
  }

  /**
   * Update a question
   * @param {ObjectId} id - Question ID
   * @param {Object} updateData - Update data
   * @returns {Promise<Object>} Update result
   */
  async updateQuestion(id, updateData) {
    await this.connect();
    return this.db.collection('questions').updateOne(
      { _id: id },
      { $set: { ...updateData, updated_at: new Date() } }
    );
  }

  /**
   * Delete a question
   * @param {ObjectId} id - Question ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteQuestion(id) {
    await this.connect();
    return this.db.collection('questions').deleteOne({ _id: id });
  }

  // Question Sets Collection Methods

  /**
   * Get question sets with optional filtering
   * @param {Object} query - Query filter
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of question set documents
   */
  async getQuestionSets(query = {}, options = {}) {
    await this.connect();
    return this.db.collection('question_sets').find(query, options).toArray();
  }

  /**
   * Get question sets by fuzzy tag matching
   * @param {string} tagQuery - Comma-separated tag query
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of question set documents
   */
  async getQuestionSetsByFuzzyTags(tagQuery, options = {}) {
    await this.connect();
    // Create a regex pattern for each tag to perform fuzzy matching
    const regexPatterns = tagQuery.split(',').map(tag => 
      new RegExp(tag.trim(), 'i')
    );
    
    // Find sets where any tag matches any of the regex patterns
    return this.db.collection('question_sets').find({
      tags: { $in: regexPatterns }
    }, options).toArray();
  }

  /**
   * Get a question set by ID
   * @param {string} id - Question set ID
   * @returns {Promise<Object>} Question set document
   */
  async getQuestionSetById(id) {
    await this.connect();
    return this.db.collection('question_sets').findOne({ _id: id });
  }

  /**
   * Create a new question set
   * @param {Object} setData - Question set data
   * @returns {Promise<Object>} Insertion result
   */
  async createQuestionSet(setData) {
    await this.connect();
    return this.db.collection('question_sets').insertOne(setData);
  }

  /**
   * Update a question set
   * @param {string} id - Question set ID
   * @param {Object} updateData - Update data
   * @returns {Promise<Object>} Update result
   */
  async updateQuestionSet(id, updateData) {
    await this.connect();
    return this.db.collection('question_sets').updateOne(
      { _id: id },
      { $set: { ...updateData, updated_at: new Date() } }
    );
  }

  /**
   * Delete a question set
   * @param {string} id - Question set ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteQuestionSet(id) {
    await this.connect();
    return this.db.collection('question_sets').deleteOne({ _id: id });
  }

  /**
   * Get all unique tags
   * @returns {Promise<Array>} Array of unique tags
   */
  async getAllTags() {
    await this.connect();
    return this.db.collection('questions').distinct('tags');
  }

  // Quiz Sets Collection Methods

  /**
   * Get quiz sets with optional filtering
   * @param {Object} query - Query filter
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of quiz set documents
   */
  async getQuizSets(query = {}, options = {}) {
    await this.connect();
    return this.db.collection('quiz_sets').find(query, options).toArray();
  }

  /**
   * Get a quiz set by ID
   * @param {string} id - Quiz set ID
   * @returns {Promise<Object>} Quiz set document
   */
  async getQuizSetById(id) {
    await this.connect();
    return this.db.collection('quiz_sets').findOne({ _id: id });
  }

  /**
   * Create a new quiz set
   * @param {Object} setData - Quiz set data
   * @returns {Promise<Object>} Insertion result
   */
  async createQuizSet(setData) {
    await this.connect();
    return this.db.collection('quiz_sets').insertOne(setData);
  }

  /**
   * Update a quiz set
   * @param {string} id - Quiz set ID
   * @param {Object} updateData - Update data
   * @returns {Promise<Object>} Update result
   */
  async updateQuizSet(id, updateData) {
    await this.connect();
    return this.db.collection('quiz_sets').updateOne(
      { _id: id },
      { $set: { ...updateData, updated_at: new Date() } }
    );
  }

  /**
   * Delete a quiz set
   * @param {string} id - Quiz set ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteQuizSet(id) {
    await this.connect();
    return this.db.collection('quiz_sets').deleteOne({ _id: id });
  }
}

// Export a singleton instance
const database = new Database();
export default database;
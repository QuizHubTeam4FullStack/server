import { ObjectId } from 'mongodb';

/**
 * Question Model
 * Represents a question in the database
 */
class Question {
  /**
   * Create a new Question instance
   * @param {Object} questionData - The question data
   */
  constructor(questionData) {
    this._id = questionData._id || null;
    this.question_text = questionData.question_text || '';
    this.image_url = questionData.image_url || '';
    this.answers = questionData.answers || [];
    this.correct_answer = questionData.correct_answer || null;
    this.set_id = questionData.set_id || null;
    this.tags = questionData.tags || [];
    this.difficulty = questionData.difficulty || 'medium';
    this.created_by = questionData.created_by || 'system';
    this.created_at = questionData.created_at || new Date();
    this.updated_at = questionData.updated_at || new Date();
    this.explanation = questionData.explanation || '';
  }

  /**
   * Validate the question data
   * @returns {Object} - Validation result with isValid and errors
   */
  validate() {
    const errors = {};

    if (!this.question_text || this.question_text.trim() === '') {
      errors.question_text = 'Question text is required';
    }

    if (!this.answers || !Array.isArray(this.answers) || this.answers.length === 0) {
      errors.answers = 'At least one answer option is required';
    } else {
      const hasEmptyAnswer = this.answers.some(a => !a.content || a.content.trim() === '');
      if (hasEmptyAnswer) {
        errors.answers = 'All answer options must have content';
      }
    }

    if (this.correct_answer === null || this.correct_answer === undefined) {
      errors.correct_answer = 'A correct answer must be selected';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Format the question data for database operations
   * @returns {Object} - Formatted question data
   */
  toDocument() {
    // Ensure correct data types for database
    const document = {
      question_text: this.question_text,
      image_url: this.image_url,
      answers: this.answers.map(a => ({
        index: parseInt(a.index),
        content: a.content
      })),
      correct_answer: parseInt(this.correct_answer),
      set_id: this.set_id,
      tags: this.tags,
      difficulty: this.difficulty,
      created_by: this.created_by,
      created_at: this.created_at,
      updated_at: new Date(), // Always update the updated_at timestamp
      explanation: this.explanation
    };

    // Include _id if it exists (for updates)
    if (this._id) {
      document._id = this._id instanceof ObjectId ? this._id : new ObjectId(this._id);
    }

    return document;
  }

  /**
   * Create a Question instance from a database document
   * @param {Object} document - The database document
   * @returns {Question} - A new Question instance
   */
  static fromDocument(document) {
    return new Question(document);
  }
}

export default Question;

/**
 * QuestionSet Model
 * Represents a set of questions in the database
 */
class QuestionSet {
  /**
   * Create a new QuestionSet instance
   * @param {Object} setData - The question set data
   */
  constructor(setData) {
    this._id = setData._id || new Date().getTime().toString();
    this.title = setData.title || '';
    this.description = setData.description || '';
    this.tags = setData.tags || [];
    this.created_by = setData.created_by || 'system';
    this.created_at = setData.created_at || new Date();
    this.updated_at = setData.updated_at || new Date();
    this.question_count = setData.question_count || 0;
  }

  /**
   * Validate the question set data
   * @returns {Object} - Validation result with isValid and errors
   */
  validate() {
    const errors = {};

    if (!this.title || this.title.trim() === '') {
      errors.title = 'Title is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Format the question set data for database operations
   * @returns {Object} - Formatted question set data
   */
  toDocument() {
    return {
      _id: this._id,
      title: this.title,
      description: this.description,
      tags: this.tags,
      created_by: this.created_by,
      created_at: this.created_at,
      updated_at: new Date(), // Always update the updated_at timestamp
      question_count: this.question_count
    };
  }

  /**
   * Create a QuestionSet instance from a database document
   * @param {Object} document - The database document
   * @returns {QuestionSet} - A new QuestionSet instance
   */
  static fromDocument(document) {
    return new QuestionSet(document);
  }
}

export default QuestionSet;

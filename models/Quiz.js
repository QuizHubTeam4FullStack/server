/**
 * Quiz Model
 * Represents a quiz in the database
 */
class Quiz {
  /**
   * Create a new Quiz instance
   * @param {Object} quizData - The quiz data
   */
  constructor(quizData) {
    this._id = quizData._id || new Date().getTime().toString();
    this.title = quizData.title || '';
    this.description = quizData.description || '';
    this.tags = quizData.tags || [];
    this.question_sets = quizData.question_sets || [];
    this.settings = quizData.settings || {
      shuffle_questions: false,
      shuffle_answers: false,
      time_limit: 0,
      passing_score: 70,
      feedback_mode: 'end'
    };
    this.created_by = quizData.created_by || 'system';
    this.created_at = quizData.created_at || new Date();
    this.updated_at = quizData.updated_at || new Date();
    this.is_public = quizData.is_public !== undefined ? quizData.is_public : true;
  }

  /**
   * Validate the quiz data
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
   * Format the quiz data for database operations
   * @returns {Object} - Formatted quiz data
   */
  toDocument() {
    return {
      _id: this._id,
      title: this.title,
      description: this.description,
      tags: this.tags,
      question_sets: this.question_sets,
      settings: this.settings,
      created_by: this.created_by,
      created_at: this.created_at,
      updated_at: new Date(), // Always update the updated_at timestamp
      is_public: this.is_public
    };
  }

  /**
   * Create a Quiz instance from a database document
   * @param {Object} document - The database document
   * @returns {Quiz} - A new Quiz instance
   */
  static fromDocument(document) {
    return new Quiz(document);
  }

  /**
   * Add a question set to the quiz
   * @param {string} setId - The question set ID
   * @param {number} weight - The weight of the question set (1-5)
   */
  addQuestionSet(setId, weight = 1) {
    // Check if the question set already exists
    const existingIndex = this.question_sets.findIndex(set => set.set_id === setId);

    if (existingIndex !== -1) {
      // Update the weight if it already exists
      this.question_sets[existingIndex].weight = weight;
    } else {
      // Add the new question set
      this.question_sets.push({
        set_id: setId,
        weight: weight
      });
    }

    this.updated_at = new Date();
  }

  /**
   * Remove a question set from the quiz
   * @param {string} setId - The question set ID
   */
  removeQuestionSet(setId) {
    this.question_sets = this.question_sets.filter(set => set.set_id !== setId);
    this.updated_at = new Date();
  }
}

export default Quiz;

# QuizMK Server Documentation

This directory contains documentation for the QuizMK server API.

## API Routes

### Questions

- `GET /api/questions` - Get all questions (with optional filtering)
- `GET /api/questions/:id` - Get a single question by ID
- `POST /api/questions` - Create a new question
- `PUT /api/questions/:id` - Update a question
- `DELETE /api/questions/:id` - Delete a question

### Question Sets

- `GET /api/question-sets` - Get all question sets
- `GET /api/question-sets/:id` - Get a single question set by ID
- `POST /api/question-sets` - Create a new question set
- `PUT /api/question-sets/:id` - Update a question set
- `DELETE /api/question-sets/:id` - Delete a question set

### Quiz Sets

- `GET /api/quiz-sets` - Get all quiz sets
- `GET /api/quiz-sets/:id` - Get a single quiz set by ID
- `POST /api/quiz-sets` - Create a new quiz set
- `PUT /api/quiz-sets/:id` - Update a quiz set
- `DELETE /api/quiz-sets/:id` - Delete a quiz set
- `POST /api/quiz-sets/:id/question-sets` - Add a question set to a quiz
- `DELETE /api/quiz-sets/:id/question-sets/:question_set_id` - Remove a question set from a quiz

### Tags

- `GET /api/tags` - Get all tags

## Database Schema

### Questions Collection

```javascript
{
  _id: ObjectId,
  question_text: String,
  image_url: String,
  answers: [
    {
      index: Number,
      content: String
    }
  ],
  correct_answer: Number,
  set_id: String,
  tags: [String],
  difficulty: String,
  created_by: String,
  created_at: Date,
  updated_at: Date,
  explanation: String
}
```

### Question Sets Collection

```javascript
{
  _id: String,
  title: String,
  description: String,
  tags: [String],
  created_by: String,
  created_at: Date,
  updated_at: Date,
  question_count: Number
}
```

### Quiz Sets Collection

```javascript
{
  _id: String,
  title: String,
  description: String,
  tags: [String],
  question_sets: [
    {
      set_id: String,
      weight: Number
    }
  ],
  settings: {
    shuffle_questions: Boolean,
    shuffle_answers: Boolean,
    time_limit: Number,
    passing_score: Number,
    feedback_mode: String
  },
  created_by: String,
  created_at: Date,
  updated_at: Date,
  is_public: Boolean
}
```

## How to Run

1. Make sure MongoDB is running locally on port 27017
2. Set up the database: `npm run db-setup`
3. Start the server: `npm run server`
4. For development with auto-restart: `npm run dev-server`

## Environment Variables

- `PORT` - The port to run the server on (default: 5000)

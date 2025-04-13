# QuizMK - Server

This is the backend server for the QuizMK application, providing APIs for creating and managing multiple-choice quizzes, question sets, and individual questions.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Setup the database:
```bash
npm run db-setup
```

3. Start the server:
```bash
npm run dev
```

## Project Structure

```
server/
├── config/               # Configuration files
│   └── db.js             # Database connection config
├── controllers/          # Route handlers
│   ├── questionController.js
│   ├── questionSetController.js
│   └── quizController.js
├── docs/                 # Documentation
│   └── MONGODB-USAGE.md
├── middleware/           # Express middleware
├── models/               # (Optional) Mongoose models
├── routes/               # API route definitions
│   ├── api.js            # Main API router
│   ├── questionRoutes.js
│   ├── questionSetRoutes.js
│   └── quizRoutes.js
├── scripts/              # Utility scripts
│   └── db-setup.mjs      # Database initialization script
├── services/             # Business logic
│   ├── mongoService.js   # MongoDB database service
│   ├── questionService.js
│   └── quizService.js
├── utils/                # Utility functions
├── server.js             # Main application entry point
└── package.json
```

## API Endpoints

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

### Miscellaneous

- `GET /api/tags` - Get all unique tags used in questions

## Database Structure

- `questions` - Individual multiple-choice questions
- `question_sets` - Collections of related questions
- `quiz_sets` - Quizzes that use one or more question sets

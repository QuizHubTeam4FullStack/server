# QuizMK Server - Optimized Architecture

This document describes the optimized architecture for the QuizMK server application.

## Key Improvements

1. **Centralized Error Handling**: Standardized error responses with proper HTTP status codes
2. **Input Validation**: Robust validation middleware for API endpoints
3. **Environment Configuration**: Centralized config with environment variables support
4. **Database Connection**: Improved connection management with proper error handling
5. **Sanitization**: Input sanitization for security
6. **Logging**: Centralized logging utility for consistent log messages
7. **Code Documentation**: Comprehensive JSDoc comments for better code readability

## Project Structure

```
server/
├── config/               # Configuration files
│   ├── db.js             # Database connection manager
│   └── env.js            # Environment configuration
├── controllers/          # Route handlers
│   ├── questionController.js
│   ├── questionSetController.js
│   └── quizController.js
├── docs/                 # Documentation
├── middleware/           # Express middleware
│   ├── auth.js           # Authentication middleware
│   ├── errorHandler.js   # Centralized error handling
│   └── validation/       # Input validation middleware
│       └── validators.js
├── models/               # Data models
│   ├── Question.js
│   ├── QuestionSet.js
│   └── Quiz.js
├── routes/               # API route definitions
│   ├── api.js            # Main API router
│   ├── questionRoutes.js
│   ├── questionSetRoutes.js
│   └── quizRoutes.js
├── scripts/              # Utility scripts
│   └── db-setup.mjs      # Database initialization script
├── services/             # Business logic
│   ├── questionService.js
│   └── quizService.js
├── utils/                # Utility functions
│   ├── logger.js         # Centralized logging utility
│   └── sanitizer.js      # Input sanitization utility
├── .env.example          # Example environment variables
├── package.json
└── server.js             # Application entry point
```

## Error Handling

The optimized codebase now uses a centralized error handling system:

- `AppError` class for custom errors with status codes
- `asyncHandler` utility to wrap async route handlers
- Global error handling middleware for consistent error responses

Example:

```javascript
// Before
try {
  // ... code
} catch (error) {
  console.error('Error:', error);
  res.status(500).json({ error: 'Something went wrong' });
}

// After
asyncHandler(async (req, res) => {
  // ... code
  if (!item) {
    throw new AppError('Item not found', 404, 'RESOURCE_NOT_FOUND');
  }
});
```

## Input Validation

Dedicated validation middleware for each resource:

- `validateQuestion`
- `validateQuestionSet`
- `validateQuizSet`

Applied in route definitions:

```javascript
router.post('/', requireAuth, validateQuestion, questionController.createQuestion);
```

## Environment Configuration

Environment variables support with sensible defaults:

```javascript
// config/env.js
export default {
  db: {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    name: process.env.DB_NAME || 'quizmk',
    // ...
  },
  // ...
}
```

## Database Connection

Enhanced database connection management:

- Connection pooling
- Proper error handling
- Graceful shutdown
- Documented methods with JSDoc

## API Documentation

### Authentication

All routes that modify data require authentication. The `requireAuth` middleware is applied to these routes.

### Available Endpoints

#### Questions

- `GET /api/questions` - Get all questions (with optional filtering)
- `GET /api/questions/:id` - Get a single question by ID
- `POST /api/questions` - Create a new question (auth required)
- `PUT /api/questions/:id` - Update a question (auth required)
- `DELETE /api/questions/:id` - Delete a question (auth required)

#### Question Sets

- `GET /api/question-sets` - Get all question sets
- `GET /api/question-sets/:id` - Get a single question set by ID
- `POST /api/question-sets` - Create a new question set (auth required)
- `PUT /api/question-sets/:id` - Update a question set (auth required)
- `DELETE /api/question-sets/:id` - Delete a question set (auth required)

#### Quiz Sets

- `GET /api/quiz-sets` - Get all quiz sets
- `GET /api/quiz-sets/:id` - Get a single quiz set by ID
- `POST /api/quiz-sets` - Create a new quiz set (auth required)
- `PUT /api/quiz-sets/:id` - Update a quiz set (auth required)
- `DELETE /api/quiz-sets/:id` - Delete a quiz set (auth required)
- `POST /api/quiz-sets/:id/question-sets` - Add a question set to a quiz (auth required)
- `DELETE /api/quiz-sets/:id/question-sets/:question_set_id` - Remove a question set from a quiz (auth required)

#### Miscellaneous

- `GET /api/tags` - Get all unique tags used in questions

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Set up the database:
```bash
npm run db-setup
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm run prod
```

## Future Improvements

1. **Real Authentication**: Implement JWT-based authentication
2. **Rate Limiting**: Add rate limiting to prevent abuse
3. **API Documentation**: Add Swagger/OpenAPI documentation
4. **Unit Tests**: Add comprehensive test suite
5. **Pagination**: Add pagination support for all list endpoints
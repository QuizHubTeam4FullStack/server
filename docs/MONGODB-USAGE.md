# MongoDB Usage Guide for QuizMK

This guide explains how to use the MongoDB setup in the QuizMK application.

## Getting Started

### 1. Set Up MongoDB

First, make sure MongoDB is installed and running on your system. Then:

```bash
# Initialize the database with sample data
npm run db-setup
```

### 2. Start the Server

```bash
# Start the API server
npm run server

# Or with automatic restart on changes:
npm run dev-server
```

The server will be available at http://localhost:5000.

## API Endpoints

### Questions

#### Get all questions
```
GET /api/questions
```

Query parameters:
- `tags`: Comma-separated list of tags (e.g., `?tags=driving,safety`)
- `difficulty`: Filter by difficulty (`easy`, `medium`, `hard`)
- `set_id`: Filter by question set ID
- `limit`: Maximum number of questions to return

#### Get a single question
```
GET /api/questions/:id
```

#### Create a new question
```
POST /api/questions
```

Request body:
```json
{
  "question_text": "What is the capital of France?",
  "answers": [
    { "index": 1, "content": "Berlin" },
    { "index": 2, "content": "London" },
    { "index": 3, "content": "Paris" },
    { "index": 4, "content": "Madrid" }
  ],
  "correct_answer": 3,
  "set_id": "geography_set",
  "tags": ["geography", "capitals", "europe"],
  "difficulty": "easy",
  "explanation": "Paris is the capital and most populous city of France."
}
```

#### Update a question
```
PUT /api/questions/:id
```

Request body: Same as POST, but fields are optional.

#### Delete a question
```
DELETE /api/questions/:id
```

### Question Sets

#### Get all question sets
```
GET /api/question-sets
```

Query parameters:
- `tags`: Comma-separated list of tags
- `created_by`: Filter by creator

#### Get a single question set
```
GET /api/question-sets/:id
```

#### Create a new question set
```
POST /api/question-sets
```

Request body:
```json
{
  "_id": "geography_set",
  "title": "Geography Quiz",
  "description": "Test your knowledge of world geography",
  "tags": ["geography", "quiz", "countries"]
}
```

#### Update a question set
```
PUT /api/question-sets/:id
```

Request body: Same as POST, but fields are optional.

#### Delete a question set
```
DELETE /api/question-sets/:id
```

### Tags

#### Get all tags
```
GET /api/tags
```

## Client-Side Integration

### Setup Axios

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### Fetch Questions

```javascript
// Get all questions
const getQuestions = async () => {
  try {
    const response = await api.get('/questions');
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};

// Get questions with specific tags
const getQuestionsByTags = async (tags) => {
  try {
    const tagsString = tags.join(',');
    const response = await api.get(`/questions?tags=${tagsString}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions by tags:', error);
    return [];
  }
};

// Get questions from a specific set
const getQuestionsBySet = async (setId) => {
  try {
    const response = await api.get(`/questions?set_id=${setId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions by set:', error);
    return [];
  }
};
```

### Create a Question

```javascript
const createQuestion = async (questionData) => {
  try {
    const response = await api.post('/questions', questionData);
    return response.data;
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
};
```

### Fetch Question Sets

```javascript
// Get all question sets
const getQuestionSets = async () => {
  try {
    const response = await api.get('/question-sets');
    return response.data;
  } catch (error) {
    console.error('Error fetching question sets:', error);
    return [];
  }
};

// Get question set by ID
const getQuestionSetById = async (id) => {
  try {
    const response = await api.get(`/question-sets/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching question set:', error);
    return null;
  }
};
```

## Example Usage

### Creating a Quiz from Question Sets

```javascript
const createQuiz = async (title, description, setIds) => {
  try {
    // 1. Get all questions from the selected sets
    let allQuestions = [];
    for (const setId of setIds) {
      const questions = await api.get(`/questions?set_id=${setId}`);
      allQuestions = [...allQuestions, ...questions.data];
    }
    
    // 2. Randomly select 10 questions
    const selectedQuestions = [];
    const totalQuestions = allQuestions.length;
    const questionsNeeded = Math.min(10, totalQuestions);
    
    const usedIndices = new Set();
    while (selectedQuestions.length < questionsNeeded) {
      const randomIndex = Math.floor(Math.random() * totalQuestions);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        selectedQuestions.push(allQuestions[randomIndex]);
      }
    }
    
    // 3. Create quiz object (store in your app state)
    const quiz = {
      title,
      description,
      questions: selectedQuestions,
      source_sets: setIds
    };
    
    return quiz;
  } catch (error) {
    console.error('Error creating quiz:', error);
    throw error;
  }
};
```

### Filtering Questions by Tags

```jsx
import { useState, useEffect } from 'react';
import api from './api';

const QuestionBrowser = () => {
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  
  useEffect(() => {
    // Fetch all available tags
    const fetchTags = async () => {
      const response = await api.get('/tags');
      setTags(response.data);
    };
    
    fetchTags();
  }, []);
  
  useEffect(() => {
    // Fetch questions when selected tags change
    const fetchQuestions = async () => {
      if (selectedTags.length === 0) {
        const response = await api.get('/questions');
        setQuestions(response.data);
      } else {
        const tagsString = selectedTags.join(',');
        const response = await api.get(`/questions?tags=${tagsString}`);
        setQuestions(response.data);
      }
    };
    
    fetchQuestions();
  }, [selectedTags]);
  
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  return (
    <div>
      <h2>Browse Questions</h2>
      
      <div className="tags-container">
        <h3>Filter by Tags</h3>
        <div className="tags-list">
          {tags.map(tag => (
            <button
              key={tag}
              className={`tag-button ${selectedTags.includes(tag) ? 'selected' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      <div className="questions-list">
        <h3>Questions ({questions.length})</h3>
        {questions.map(question => (
          <div key={question._id} className="question-card">
            <h4>{question.question_text}</h4>
            <div className="question-tags">
              {question.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <div className="difficulty">
              Difficulty: <span className={question.difficulty}>{question.difficulty}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionBrowser;
```

## Integration with Quiz Creator

Here's how to integrate MongoDB with your Quiz Creator component:

```jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const QuizCreator = () => {
  const [questionSets, setQuestionSets] = useState([]);
  const [selectedSets, setSelectedSets] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  useEffect(() => {
    // Fetch available question sets
    const fetchQuestionSets = async () => {
      try {
        const response = await api.get('/question-sets');
        setQuestionSets(response.data);
      } catch (error) {
        console.error('Error fetching question sets:', error);
      }
    };
    
    fetchQuestionSets();
  }, []);
  
  const toggleSelectSet = (setId) => {
    if (selectedSets.includes(setId)) {
      setSelectedSets(selectedSets.filter(id => id !== setId));
    } else {
      setSelectedSets([...selectedSets, setId]);
    }
  };
  
  const handleCreateQuiz = async () => {
    try {
      if (!title || selectedSets.length === 0) {
        alert('Please provide a title and select at least one question set');
        return;
      }
      
      // Gather all questions from selected sets
      const quizQuestions = [];
      for (const setId of selectedSets) {
        const response = await api.get(`/questions?set_id=${setId}`);
        quizQuestions.push(...response.data);
      }
      
      // Create quiz object
      const quiz = {
        title,
        description,
        questions: quizQuestions,
        source_sets: selectedSets
      };
      
      // Here you would typically save this to a quizzes collection
      console.log('Quiz created:', quiz);
      
      // Redirect to quiz view or reset form
      setTitle('');
      setDescription('');
      setSelectedSets([]);
      
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };
  
  return (
    <div className="quiz-creator">
      <h2>Create New Quiz</h2>
      
      <div className="form-group">
        <label>Quiz Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter quiz title"
        />
      </div>
      
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter quiz description"
        />
      </div>
      
      <div className="question-sets-selector">
        <h3>Select Question Sets</h3>
        {questionSets.map(set => (
          <div key={set._id} className="set-card">
            <input
              type="checkbox"
              checked={selectedSets.includes(set._id)}
              onChange={() => toggleSelectSet(set._id)}
            />
            <div className="set-info">
              <h4>{set.title}</h4>
              <p>{set.description}</p>
              <div className="set-meta">
                <span>Questions: {set.question_count}</span>
                <div className="tags">
                  {set.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        className="create-quiz-btn"
        onClick={handleCreateQuiz}
        disabled={!title || selectedSets.length === 0}
      >
        Create Quiz
      </button>
    </div>
  );
};

export default QuizCreator;
```

## MongoDB Query Examples

### Advanced Queries for Analysis

Here are some examples of MongoDB queries you can run directly in the mongo shell:

#### Find questions with multiple specific tags

```js
db.questions.find({
  tags: { $all: ["driving", "safety"] }
})
```

#### Find questions by difficulty level and with a specific word in the text

```js
db.questions.find({
  difficulty: "easy",
  question_text: { $regex: "sign", $options: "i" }
})
```

#### Find question sets with the most questions

```js
db.question_sets.aggregate([
  {
    $project: {
      title: 1,
      question_count: 1
    }
  },
  { $sort: { question_count: -1 } },
  { $limit: 5 }
])
```

#### Find the most commonly used tags

```js
db.questions.aggregate([
  { $unwind: "$tags" },
  { $group: { _id: "$tags", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 10 }
])
```

#### Find questions with images

```js
db.questions.find({
  image_url: { $exists: true, $ne: "" }
})
```

## Maintenance Tasks

### Keeping Tag Consistency

Since tags are embedded directly in the questions, it's important to maintain consistency. Consider implementing a helper function to normalize tags:

```javascript
const normalizeTags = (tags) => {
  if (!tags || !Array.isArray(tags)) return [];
  
  return tags
    .map(tag => tag.trim().toLowerCase())
    .filter(tag => tag.length > 0)
    .filter((tag, index, self) => self.indexOf(tag) === index); // Remove duplicates
};

// Usage when creating/updating questions
const createQuestion = async (questionData) => {
  questionData.tags = normalizeTags(questionData.tags);
  const response = await api.post('/questions', questionData);
  return response.data;
};
```

### Updating Question Counts in Sets

When questions are added or removed, you should update the question count in the associated set:

```javascript
const updateQuestionCount = async (setId) => {
  try {
    // Count questions in this set
    const response = await api.get(`/questions?set_id=${setId}`);
    const count = response.data.length;
    
    // Update the set
    await api.put(`/question-sets/${setId}`, {
      question_count: count
    });
    
    console.log(`Updated question count for set ${setId}: ${count}`);
  } catch (error) {
    console.error('Error updating question count:', error);
  }
};

// Call this after adding/removing questions
const deleteQuestion = async (questionId, setId) => {
  await api.delete(`/questions/${questionId}`);
  await updateQuestionCount(setId);
};
```

## Best Practices

1. **Always validate user input** before sending it to the MongoDB server
2. **Use appropriate indexes** for frequently queried fields
3. **Normalize tags** to maintain consistency
4. **Keep question sets and questions in sync** by updating counts
5. **Use projection** to limit the fields returned in large queries
6. **Implement proper error handling** for all database operations
7. **Consider pagination** for large result sets
8. **Use appropriate data types** (e.g., integers for numeric fields)
9. **Regularly back up your database** to prevent data loss

By following these practices, you can build a robust and efficient quiz application with MongoDB.

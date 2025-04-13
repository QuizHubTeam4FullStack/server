import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { generateMockQuestions, generateMockQuestionSets, generateMockQuizSets } from './mock-data.js';

// Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Database connection config from environment
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'quizmk';
const options = {
  maxPoolSize: 10,
  connectTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

/**
 * Database setup function - initializes collections, indexes, and sample data
 */
async function setupDatabase() {
  let client;
  
  try {
    // Connect to MongoDB
    console.log(`Connecting to MongoDB at ${url}...`);
    client = new MongoClient(url, options);
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    
    // Check if collections exist already
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    // Create collections if they don't exist
    if (!collectionNames.includes('question_sets')) {
      await db.createCollection('question_sets');
      console.log('Created question_sets collection');
    }
    
    if (!collectionNames.includes('questions')) {
      await db.createCollection('questions');
      console.log('Created questions collection');
    }
    
    if (!collectionNames.includes('quiz_sets')) {
      await db.createCollection('quiz_sets');
      console.log('Created quiz_sets collection');
    }
    
    // Create indexes for performance optimization
    console.log('Setting up indexes...');
    
    // Indexes for questions collection
    await db.collection('questions').createIndex({ set_id: 1 }, 
      { name: 'idx_questions_set_id' });
    await db.collection('questions').createIndex({ tags: 1 }, 
      { name: 'idx_questions_tags' });
    await db.collection('questions').createIndex({ difficulty: 1 }, 
      { name: 'idx_questions_difficulty' });
    await db.collection('questions').createIndex({ created_at: -1 }, 
      { name: 'idx_questions_created_at' });
    
    // Indexes for question_sets collection
    await db.collection('question_sets').createIndex({ tags: 1 }, 
      { name: 'idx_question_sets_tags' });
    await db.collection('question_sets').createIndex({ created_by: 1 }, 
      { name: 'idx_question_sets_created_by' });
    await db.collection('question_sets').createIndex({ created_at: -1 }, 
      { name: 'idx_question_sets_created_at' });
    
    // Indexes for quiz_sets collection
    await db.collection('quiz_sets').createIndex({ tags: 1 }, 
      { name: 'idx_quiz_sets_tags' });
    await db.collection('quiz_sets').createIndex({ 'question_sets.set_id': 1 }, 
      { name: 'idx_quiz_sets_question_set_id' });
    await db.collection('quiz_sets').createIndex({ created_by: 1 }, 
      { name: 'idx_quiz_sets_created_by' });
    await db.collection('quiz_sets').createIndex({ is_public: 1 }, 
      { name: 'idx_quiz_sets_is_public' });
    await db.collection('quiz_sets').createIndex({ created_at: -1 }, 
      { name: 'idx_quiz_sets_created_at' });
    
    console.log('Database indexes created successfully');
    
    // Add sample data
    console.log('Checking for existing data...');
    
    // Check if we already have data
    const questionCount = await db.collection('questions').countDocuments();
    const questionSetCount = await db.collection('question_sets').countDocuments();
    const quizSetCount = await db.collection('quiz_sets').countDocuments();
    
    if (questionCount === 0 && questionSetCount === 0 && quizSetCount === 0) {
      console.log('No data found. Inserting sample data...');
      
      // Get mock data
      const questionSets = generateMockQuestionSets();
      const questions = generateMockQuestions();
      const quizSets = generateMockQuizSets();
      
      // Insert the data
      console.log(`Inserting ${questionSets.length} question sets...`);
      await db.collection('question_sets').insertMany(questionSets);
      
      console.log(`Inserting ${questions.length} questions...`);
      await db.collection('questions').insertMany(questions);
      
      console.log(`Inserting ${quizSets.length} quiz sets...`);
      await db.collection('quiz_sets').insertMany(quizSets);
      
      console.log('Sample data inserted successfully');
    } else {
      console.log(`Database already contains data: ${questionCount} questions, ${questionSetCount} question sets, ${quizSetCount} quiz sets`);
      console.log('Skipping sample data insertion.');
    }
    
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  } finally {
    // Close the connection
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}

// Run the setup
setupDatabase().catch(error => {
  console.error('Unhandled error during database setup:', error);
  process.exit(1);
});

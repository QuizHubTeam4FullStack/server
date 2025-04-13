import { ObjectId } from 'mongodb';

/**
 * Generates mock questions for the questions collection
 * @returns {Array} Array of question objects
 */
export function generateMockQuestions() {
  const questions = [
    // Driving Questions
    {
      question_text: "What does a yellow diamond-shaped sign generally indicate?",
      answers: [
        { index: 1, content: "Stop" },
        { index: 2, content: "Warning or caution" },
        { index: 3, content: "Route marker" },
        { index: 4, content: "Regulation" }
      ],
      correct_answer: 2,
      set_id: "driving_basics",
      tags: ["driving", "road-signs", "safety"],
      difficulty: "easy",
      explanation: "Yellow diamond-shaped signs are warning signs that alert drivers to potential hazards ahead."
    },
    {
      question_text: "When driving in fog, you should use:",
      answers: [
        { index: 1, content: "High beam headlights" },
        { index: 2, content: "Regular headlights" },
        { index: 3, content: "Fog lights or low beam headlights" },
        { index: 4, content: "Emergency flashers only" }
      ],
      correct_answer: 3,
      set_id: "driving_basics",
      tags: ["driving", "safety", "weather-conditions"],
      difficulty: "medium",
      explanation: "In fog, high beams reflect off the fog and reduce visibility. Low beams or fog lights direct light down onto the road."
    },
    {
      question_text: "What is the primary purpose of an airbag in a vehicle?",
      answers: [
        { index: 1, content: "To prevent the vehicle from rolling over" },
        { index: 2, content: "To cushion impact and reduce injuries during a collision" },
        { index: 3, content: "To prevent the car from skidding" },
        { index: 4, content: "To extinguish fires after an accident" }
      ],
      correct_answer: 2,
      set_id: "driving_basics",
      tags: ["driving", "safety", "vehicle-features"],
      difficulty: "easy",
      explanation: "Airbags are designed to cushion the impact and reduce injuries during a collision by preventing occupants from hitting hard surfaces inside the vehicle."
    },
    
    // Programming Questions
    {
      question_text: "What is the purpose of the 'const' keyword in JavaScript?",
      answers: [
        { index: 1, content: "To declare a variable that can be reassigned" },
        { index: 2, content: "To declare a variable that cannot be reassigned" },
        { index: 3, content: "To declare a function" },
        { index: 4, content: "To create a loop" }
      ],
      correct_answer: 2,
      set_id: "programming_fundamentals",
      tags: ["programming", "javascript", "variables"],
      difficulty: "easy",
      explanation: "The 'const' keyword is used to declare variables that cannot be reassigned after initialization, though the contents of objects and arrays can still be modified."
    },
    {
      question_text: "What does CSS stand for?",
      answers: [
        { index: 1, content: "Computer Style Sheets" },
        { index: 2, content: "Creative Style System" },
        { index: 3, content: "Cascading Style Sheets" },
        { index: 4, content: "Content Styling Service" }
      ],
      correct_answer: 3,
      set_id: "web_development",
      tags: ["web-development", "css", "programming"],
      difficulty: "easy",
      explanation: "CSS stands for Cascading Style Sheets, which is used to style and layout web pages."
    },
    {
      question_text: "What is the time complexity of a binary search algorithm?",
      answers: [
        { index: 1, content: "O(1)" },
        { index: 2, content: "O(n)" },
        { index: 3, content: "O(log n)" },
        { index: 4, content: "O(n²)" }
      ],
      correct_answer: 3,
      set_id: "programming_fundamentals",
      tags: ["programming", "algorithms", "complexity"],
      difficulty: "hard",
      explanation: "Binary search has a time complexity of O(log n) because it repeatedly divides the search interval in half."
    },
    
    // Database Questions
    {
      question_text: "What is a primary key in a database?",
      answers: [
        { index: 1, content: "A key that is used for encryption" },
        { index: 2, content: "A unique identifier for each record in a table" },
        { index: 3, content: "The first column in any table" },
        { index: 4, content: "A password used to access the database" }
      ],
      correct_answer: 2,
      set_id: "database_concepts",
      tags: ["database", "sql", "data-modeling"],
      difficulty: "easy",
      explanation: "A primary key is a column or group of columns that uniquely identifies each record in a database table."
    },
    {
      question_text: "What type of database is MongoDB?",
      answers: [
        { index: 1, content: "Relational database" },
        { index: 2, content: "NoSQL document database" },
        { index: 3, content: "Graph database" },
        { index: 4, content: "Time-series database" }
      ],
      correct_answer: 2,
      set_id: "database_concepts",
      tags: ["database", "mongodb", "nosql"],
      difficulty: "medium",
      explanation: "MongoDB is a NoSQL document database that stores data in JSON-like documents with dynamic schemas."
    },
    
    // Security Questions
    {
      question_text: "What is a DDoS attack?",
      answers: [
        { index: 1, content: "A virus that damages files" },
        { index: 2, content: "An attack that steals user passwords" },
        { index: 3, content: "An attempt to make a service unavailable by overwhelming it with traffic" },
        { index: 4, content: "A method to decrypt secure communications" }
      ],
      correct_answer: 3,
      set_id: "security_essentials",
      tags: ["security", "network", "threats"],
      difficulty: "medium",
      explanation: "A Distributed Denial of Service (DDoS) attack attempts to make a service unavailable by overwhelming it with traffic from multiple sources."
    },
    {
      question_text: "What is two-factor authentication?",
      answers: [
        { index: 1, content: "Using two different passwords" },
        { index: 2, content: "Requiring two people to approve access" },
        { index: 3, content: "Using something you know and something you have for authentication" },
        { index: 4, content: "Logging in from two different devices" }
      ],
      correct_answer: 3,
      set_id: "security_essentials",
      tags: ["security", "authentication", "identity"],
      difficulty: "easy",
      explanation: "Two-factor authentication adds a layer of security by requiring two different types of identification: typically something you know (password) and something you have (like a phone)."
    },
    
    // Network Questions
    {
      question_text: "What does HTTP stand for?",
      answers: [
        { index: 1, content: "Hypertext Transfer Protocol" },
        { index: 2, content: "High-Tech Transfer Process" },
        { index: 3, content: "Hyperlink Text Transfer Protocol" },
        { index: 4, content: "Home Transfer Technical Process" }
      ],
      correct_answer: 1,
      set_id: "network_basics",
      tags: ["network", "web", "protocols"],
      difficulty: "easy",
      explanation: "HTTP stands for Hypertext Transfer Protocol, which is the foundation of data communication on the World Wide Web."
    },
    {
      question_text: "What is the purpose of DNS?",
      answers: [
        { index: 1, content: "To provide security certificates" },
        { index: 2, content: "To translate domain names to IP addresses" },
        { index: 3, content: "To encrypt web traffic" },
        { index: 4, content: "To compress data for transfer" }
      ],
      correct_answer: 2,
      set_id: "network_basics",
      tags: ["network", "dns", "internet"],
      difficulty: "medium",
      explanation: "The Domain Name System (DNS) converts human-readable domain names (like example.com) to machine-readable IP addresses (like 192.0.2.1)."
    },
    
    // Math Questions
    {
      question_text: "What is the value of π (pi) to two decimal places?",
      answers: [
        { index: 1, content: "3.12" },
        { index: 2, content: "3.14" },
        { index: 3, content: "3.16" },
        { index: 4, content: "3.18" }
      ],
      correct_answer: 2,
      set_id: "math_quiz",
      tags: ["math", "constants", "geometry"],
      difficulty: "easy",
      explanation: "The value of π (pi) to two decimal places is 3.14, which is the ratio of a circle's circumference to its diameter."
    },
    {
      question_text: "What is the derivative of x²?",
      answers: [
        { index: 1, content: "x" },
        { index: 2, content: "2x" },
        { index: 3, content: "x²" },
        { index: 4, content: "2x²" }
      ],
      correct_answer: 2,
      set_id: "math_quiz",
      tags: ["math", "calculus", "derivatives"],
      difficulty: "medium",
      explanation: "The derivative of x² with respect to x is 2x, following the power rule of differentiation."
    },
    
    // Science Questions
    {
      question_text: "What is the chemical symbol for gold?",
      answers: [
        { index: 1, content: "Go" },
        { index: 2, content: "Gl" },
        { index: 3, content: "Au" },
        { index: 4, content: "Ag" }
      ],
      correct_answer: 3,
      set_id: "science_quiz",
      tags: ["science", "chemistry", "elements"],
      difficulty: "easy",
      explanation: "The chemical symbol for gold is Au, derived from the Latin word 'aurum'."
    },
    {
      question_text: "What force keeps planets in orbit around the sun?",
      answers: [
        { index: 1, content: "Magnetic force" },
        { index: 2, content: "Nuclear force" },
        { index: 3, content: "Gravitational force" },
        { index: 4, content: "Centrifugal force" }
      ],
      correct_answer: 3,
      set_id: "science_quiz",
      tags: ["science", "physics", "astronomy"],
      difficulty: "medium",
      explanation: "Gravitational force is responsible for keeping planets in orbit around the sun. It's a force of attraction between any two objects with mass."
    },
    
    // History Questions
    {
      question_text: "In what year did World War II end?",
      answers: [
        { index: 1, content: "1943" },
        { index: 2, content: "1945" },
        { index: 3, content: "1947" },
        { index: 4, content: "1950" }
      ],
      correct_answer: 2,
      set_id: "history_quiz",
      tags: ["history", "world-war", "20th-century"],
      difficulty: "easy",
      explanation: "World War II ended in 1945, with Germany surrendering in May and Japan in September following the atomic bombings of Hiroshima and Nagasaki."
    },
    {
      question_text: "Who was the first President of the United States?",
      answers: [
        { index: 1, content: "Thomas Jefferson" },
        { index: 2, content: "John Adams" },
        { index: 3, content: "George Washington" },
        { index: 4, content: "Benjamin Franklin" }
      ],
      correct_answer: 3,
      set_id: "history_quiz",
      tags: ["history", "us-presidents", "american-history"],
      difficulty: "easy",
      explanation: "George Washington was the first President of the United States, serving from 1789 to 1797."
    },
    
    // Geography Questions
    {
      question_text: "What is the capital of Canada?",
      answers: [
        { index: 1, content: "Toronto" },
        { index: 2, content: "Montreal" },
        { index: 3, content: "Vancouver" },
        { index: 4, content: "Ottawa" }
      ],
      correct_answer: 4,
      set_id: "geography_quiz",
      tags: ["geography", "capitals", "north-america"],
      difficulty: "easy",
      explanation: "Ottawa is the capital city of Canada, located in the eastern province of Ontario."
    },
    {
      question_text: "Which continent is the largest by land area?",
      answers: [
        { index: 1, content: "Africa" },
        { index: 2, content: "North America" },
        { index: 3, content: "Asia" },
        { index: 4, content: "Europe" }
      ],
      correct_answer: 3,
      set_id: "geography_quiz",
      tags: ["geography", "continents", "world"],
      difficulty: "easy",
      explanation: "Asia is the largest continent by land area, covering approximately 44.58 million square kilometers (17.2 million square miles)."
    },
    
    // Mobile Development Questions
    {
      question_text: "Which of the following is NOT a mobile operating system?",
      answers: [
        { index: 1, content: "iOS" },
        { index: 2, content: "Android" },
        { index: 3, content: "Windows Mobile" },
        { index: 4, content: "Linux" }
      ],
      correct_answer: 4,
      set_id: "mobile_development",
      tags: ["mobile", "operating-systems", "development"],
      difficulty: "easy",
      explanation: "Linux is primarily a desktop/server operating system, not a mobile OS. iOS, Android, and Windows Mobile are mobile operating systems."
    },
    {
      question_text: "What programming language is primarily used for iOS app development?",
      answers: [
        { index: 1, content: "Java" },
        { index: 2, content: "Swift" },
        { index: 3, content: "C#" },
        { index: 4, content: "Python" }
      ],
      correct_answer: 2,
      set_id: "mobile_development",
      tags: ["mobile", "ios", "programming", "swift"],
      difficulty: "medium",
      explanation: "Swift is Apple's programming language specifically designed for iOS, macOS, watchOS, and tvOS app development."
    }
  ];

  // Add timestamps to all questions
  const now = new Date();
  return questions.map(q => ({
    ...q,
    _id: new ObjectId(),
    created_by: "system",
    created_at: now,
    updated_at: now,
    explanation: q.explanation || ""
  }));
}

/**
 * Generates mock question sets for the question_sets collection
 * @returns {Array} Array of question set objects
 */
export function generateMockQuestionSets() {
  const sets = [
    {
      _id: "driving_basics",
      title: "Basic Driving Knowledge",
      description: "Essential knowledge for beginner drivers",
      tags: ["driving", "road-signs", "safety", "beginner"],
      question_count: 3
    },
    {
      _id: "programming_fundamentals",
      title: "Programming Fundamentals",
      description: "Basic concepts in programming across various languages",
      tags: ["programming", "computer-science", "basics"],
      question_count: 2
    },
    {
      _id: "web_development",
      title: "Web Development Essentials",
      description: "HTML, CSS, and JavaScript basics for web development",
      tags: ["web-development", "html", "css", "javascript"],
      question_count: 1
    },
    {
      _id: "security_essentials",
      title: "Security Essentials",
      description: "Basic concepts in cybersecurity and data protection",
      tags: ["security", "cybersecurity", "data-protection"],
      question_count: 2
    },
    {
      _id: "database_concepts",
      title: "Database Concepts",
      description: "Relational and NoSQL database fundamentals",
      tags: ["database", "sql", "nosql", "data-management"],
      question_count: 2
    },
    {
      _id: "network_basics",
      title: "Networking Basics",
      description: "Fundamental concepts in computer networking",
      tags: ["network", "protocols", "internet", "connectivity"],
      question_count: 2
    },
    {
      _id: "math_quiz",
      title: "Mathematics Fundamentals",
      description: "Basic and advanced mathematics concepts",
      tags: ["math", "algebra", "calculus", "geometry"],
      question_count: 2
    },
    {
      _id: "science_quiz",
      title: "Science Quiz",
      description: "Quiz covering various science disciplines",
      tags: ["science", "physics", "chemistry", "biology"],
      question_count: 2
    },
    {
      _id: "history_quiz",
      title: "History Knowledge Test",
      description: "Test your knowledge of world and national history",
      tags: ["history", "world-history", "events", "people"],
      question_count: 2
    },
    {
      _id: "geography_quiz",
      title: "Geography Challenge",
      description: "Test your knowledge of world geography",
      tags: ["geography", "countries", "capitals", "world"],
      question_count: 2
    },
    {
      _id: "mobile_development",
      title: "Mobile App Development",
      description: "Fundamentals of mobile application development",
      tags: ["mobile", "app-development", "ios", "android"],
      question_count: 2
    }
  ];

  // Add timestamps to all sets
  const now = new Date();
  return sets.map(set => ({
    ...set,
    created_by: "system",
    created_at: now,
    updated_at: now
  }));
}

/**
 * Generates mock quiz sets for the quiz_sets collection
 * @returns {Array} Array of quiz set objects
 */
export function generateMockQuizSets() {
  const quizSets = [
    {
      _id: "driving_quiz_1",
      title: "Beginner Driving Quiz",
      description: "A quiz covering basic driving concepts for beginners",
      tags: ["driving", "beginner", "practice"],
      question_sets: [
        { set_id: "driving_basics", weight: 1 }
      ],
      settings: {
        shuffle_questions: true,
        shuffle_answers: false,
        time_limit: 15,
        passing_score: 70,
        feedback_mode: "end"
      },
      is_public: true
    },
    {
      _id: "programming_basics_quiz",
      title: "Programming Basics Quiz",
      description: "Test your knowledge of fundamental programming concepts",
      tags: ["programming", "basics", "computer-science"],
      question_sets: [
        { set_id: "programming_fundamentals", weight: 2 },
        { set_id: "web_development", weight: 1 }
      ],
      settings: {
        shuffle_questions: true,
        shuffle_answers: true,
        time_limit: 20,
        passing_score: 65,
        feedback_mode: "immediate"
      },
      is_public: true
    },
    {
      _id: "web_dev_challenge",
      title: "Web Development Challenge",
      description: "Test your web development skills with this challenging quiz",
      tags: ["web-development", "html", "css", "javascript"],
      question_sets: [
        { set_id: "web_development", weight: 1 },
        { set_id: "programming_fundamentals", weight: 1 }
      ],
      settings: {
        shuffle_questions: false,
        shuffle_answers: false,
        time_limit: 25,
        passing_score: 75,
        feedback_mode: "end"
      },
      is_public: true
    },
    {
      _id: "security_awareness",
      title: "Security Awareness Quiz",
      description: "Test your knowledge of basic security concepts",
      tags: ["security", "awareness", "cybersecurity"],
      question_sets: [
        { set_id: "security_essentials", weight: 1 }
      ],
      settings: {
        shuffle_questions: true,
        shuffle_answers: true,
        time_limit: 10,
        passing_score: 80,
        feedback_mode: "immediate"
      },
      is_public: true
    },
    {
      _id: "database_mastery",
      title: "Database Mastery Quiz",
      description: "Test your knowledge of database concepts and practices",
      tags: ["database", "sql", "nosql", "data-management"],
      question_sets: [
        { set_id: "database_concepts", weight: 1 }
      ],
      settings: {
        shuffle_questions: true,
        shuffle_answers: true,
        time_limit: 30,
        passing_score: 70,
        feedback_mode: "end"
      },
      is_public: true
    },
    {
      _id: "network_challenge",
      title: "Networking Challenge",
      description: "Test your knowledge of computer networking",
      tags: ["network", "protocols", "internet", "connectivity"],
      question_sets: [
        { set_id: "network_basics", weight: 1 }
      ],
      settings: {
        shuffle_questions: true,
        shuffle_answers: false,
        time_limit: 15,
        passing_score: 60,
        feedback_mode: "immediate"
      },
      is_public: true
    },
    {
      _id: "math_challenge",
      title: "Mathematics Challenge",
      description: "Challenge your math skills with this comprehensive quiz",
      tags: ["math", "challenge", "problem-solving"],
      question_sets: [
        { set_id: "math_quiz", weight: 1 }
      ],
      settings: {
        shuffle_questions: false,
        shuffle_answers: false,
        time_limit: 20,
        passing_score: 70,
        feedback_mode: "end"
      },
      is_public: true
    },
    {
      _id: "science_explorer",
      title: "Science Explorer Quiz",
      description: "Explore various scientific concepts with this engaging quiz",
      tags: ["science", "exploration", "knowledge"],
      question_sets: [
        { set_id: "science_quiz", weight: 1 }
      ],
      settings: {
        shuffle_questions: true,
        shuffle_answers: true,
        time_limit: 15,
        passing_score: 65,
        feedback_mode: "immediate"
      },
      is_public: true
    },
    {
      _id: "history_buff",
      title: "History Buff Challenge",
      description: "Test your history knowledge with this challenging quiz",
      tags: ["history", "challenge", "knowledge"],
      question_sets: [
        { set_id: "history_quiz", weight: 1 }
      ],
      settings: {
        shuffle_questions: true,
        shuffle_answers: false,
        time_limit: 15,
        passing_score: 70,
        feedback_mode: "end"
      },
      is_public: true
    },
    {
      _id: "geography_master",
      title: "Geography Master Challenge",
      description: "Prove your geography knowledge with this comprehensive quiz",
      tags: ["geography", "challenge", "world"],
      question_sets: [
        { set_id: "geography_quiz", weight: 1 }
      ],
      settings: {
        shuffle_questions: true,
        shuffle_answers: true,
        time_limit: 10,
        passing_score: 75,
        feedback_mode: "immediate"
      },
      is_public: true
    },
    {
      _id: "mobile_app_quiz",
      title: "Mobile App Development Quiz",
      description: "Test your knowledge of mobile application development",
      tags: ["mobile", "development", "ios", "android"],
      question_sets: [
        { set_id: "mobile_development", weight: 1 }
      ],
      settings: {
        shuffle_questions: true,
        shuffle_answers: true,
        time_limit: 15,
        passing_score: 70,
        feedback_mode: "end"
      },
      is_public: true
    }
  ];

  // Add timestamps to all quiz sets
  const now = new Date();
  return quizSets.map(quiz => ({
    ...quiz,
    created_by: "system",
    created_at: now,
    updated_at: now
  }));
}

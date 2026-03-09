const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Question = require('./models/Question');
const Test = require('./models/Test');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4
    });

    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Question.deleteMany();
    await Test.deleteMany();

    console.log('Cleared existing data.');

    // Create Users
    const admin = await User.create({
      name: 'Super Admin',
      email: 'superadmin@test.com',
      password: 'admin123',
      role: 'ADMIN',
      verified: true
    });

    const setter = await User.create({
      name: 'Senior Paper Setter',
      email: 'setter@test.com',
      password: 'setter123',
      role: 'PAPER_SETTER',
      verified: true
    });

    const student = await User.create({
      name: 'Sample Student',
      email: 'student@test.com',
      password: 'student123',
      role: 'STUDENT',
      category: 'NEET',
      verified: true
    });

    console.log('Users created successfully.');

    // Create Sample Questions
    const q1 = await Question.create({
      question_text: 'What is the capital of India?',
      question_type: 'MCQ',
      options: ['Mumbai', 'New Delhi', 'Kolkata', 'Chennai'],
      correct_answer: 'New Delhi',
      subject: 'Biology',
      chapter: 'General Knowledge',
      difficulty: 'EASY',
      explanation: 'New Delhi is the capital of India.',
      creator: admin._id
    });

    const q2 = await Question.create({
      question_text: 'The value of gravitational acceleration (g) on Earth is approx?',
      question_type: 'MCQ',
      options: ['5.8 m/s²', '9.8 m/s²', '12.8 m/s²', '2.8 m/s²'],
      correct_answer: '9.8 m/s²',
      subject: 'Physics',
      chapter: 'Gravitation',
      difficulty: 'EASY',
      explanation: 'The standard acceleration due to gravity is 9.80665 m/s².',
      creator: admin._id
    });

    console.log('Sample questions created.');

    // Create a Sample Test
    await Test.create({
      title: 'Full Length NEET Mock Test - 1',
      category: 'NEET',
      type: 'MOCK',
      duration: 180,
      questions: [q1._id, q2._id],
      creator: admin._id,
      isPublished: true
    });

    console.log('Sample test created.');
    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

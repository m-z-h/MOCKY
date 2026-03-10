const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
// Database connection (only if URI exists)
if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.warn('MONGO_URI is not defined. Database connection skipped.');
}

// Route files
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const testRoutes = require('./routes/testRoutes');
const noteRoutes = require('./routes/noteRoutes');
const resultRoutes = require('./routes/resultRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: ['https://mzhmocky.vercel.app', 'http://localhost:5173'],
  credentials: true
}));

// Basic Route
app.get('/', (req, res) => {
  res.send('NEET/JEE Mock Test API is running...');
});

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/admin', adminRoutes);

// Export the app for Vercel
module.exports = app;

// Only listen if not on Vercel
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

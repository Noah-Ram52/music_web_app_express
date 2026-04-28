const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const authRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const User = require('./models/User');

// Load .env
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// MIDDLEWARE 
app.use(cors({ 
  origin: ['https://noah-ram52.github.io', 'http://localhost:3000']  
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // ✅ FORM DATA

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth/users', usersRoutes);

app.get('/api/test-db', async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      connected: true,
      count: users.length,
      users
    });
  } catch (err) {
    res.status(500).json({
      connected: false,
      error: err.message
    });
  }
});

// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'Music App Backend API - Ready!' });
});

// ERROR HANDLER 
app.use((err, req, res) => {
  console.error('ERROR:', err);
  
  // Handle your custom errors (BadRequestError, UnauthorizedRequestError)
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.name || 'Error',
      message: err.message
    });
  }
  
  // Generic server errors
 
  return res.status(500).json({ 
    message: 'Internal server error' 
  });
});

const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log(`🚀 Server: http://localhost:${PORT}`);
// });
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server: http://0.0.0.0:${PORT}`);
});
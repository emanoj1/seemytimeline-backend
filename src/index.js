const express = require('express');
const { connectDB } = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const timelineRoutes = require('./routes/timelineRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

connectDB();

const app = express();

// Enable CORS for all origins
app.use(cors());

// OR restrict it to specific origins
// app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

// Set up routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Handles vanity URL check, profile, and upload profile pic
app.use('/api/timeline', timelineRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


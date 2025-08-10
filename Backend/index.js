const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const adviceRoutes = require('./routes/adviceRoutes');
const cors = require('cors');

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/api', adviceRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
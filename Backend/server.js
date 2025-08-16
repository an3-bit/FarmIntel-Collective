require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/db');

const app = express();
const port = process.env.PORT || 3000;

// ✅ Add your frontend's origin here
const corsOptions = {
  origin: [
    'http://localhost:8080', 
    'http://localhost:3000',
    'http://localhost:8000',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// ✅ Enable CORS for all routes
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MySQL using Sequelize
connectDB();

// Import API routes
const apiRoutes = require('./src/routes/adviceRoutes');

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running and connected to MySQL via Sequelize');
});

// Use API routes
app.use('/api', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

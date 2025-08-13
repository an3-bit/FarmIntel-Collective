require('dotenv').config();
const express = require('express');
<<<<<<< HEAD
const cors = require('cors');
const { connectDB } = require('./src/config/db');
=======
const mysql = require('mysql2');
const cors = require('cors');
>>>>>>> d42d0ca22c2eba08a4c6e649b4eba4779ff886a4

const app = express();
const port = process.env.PORT || 3000;

// ✅ Add your frontend's origin here
const corsOptions = {
  origin: [
    'http://localhost:8084', 
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

<<<<<<< HEAD
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
=======
// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL database');
});

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running and connected to MySQL');
});

// Profile route
app.get('/api/profile/:userId', (req, res) => {
  const userId = req.params.userId;

  db.query(
    'SELECT * FROM users WHERE username = ? LIMIT 1',
    [userId],
    (err, results) => {
      if (err) {
        console.error(' DB query error:', err);
        return res.status(500).json({ error: 'Database query error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(results[0]);
    }
  );
});
>>>>>>> d42d0ca22c2eba08a4c6e649b4eba4779ff886a4

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});

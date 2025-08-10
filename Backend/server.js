require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

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
        console.error('❌ DB query error:', err);
        return res.status(500).json({ error: 'Database query error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(results[0]);
    }
  );
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});

require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// MySQL connection using .env variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    process.exit(1);
  }
  console.log(`✅ Connected to MySQL database: ${process.env.DB_NAME}`);
});

// Example route
app.get('/', (req, res) => {
  res.send('Backend is running and connected to MySQL');
});

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});

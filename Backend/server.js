require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306 
});

// Connect to MSQL
db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    process.exit(1); // Stop the server if DB fails
  }
  console.log('✅ Connected to MySQL database');
});


app.get('/', (req, res) => {
  res.send('Backend is running and connected to MySQL');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
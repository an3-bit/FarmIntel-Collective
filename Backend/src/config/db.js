require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

<<<<<<< HEAD
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MySQL...');
    console.log(`Host: ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}`);
    console.log(`Database: ${process.env.DB_NAME}`);
    console.log(`User: ${process.env.DB_USER}`);
    
    await sequelize.authenticate();
    console.log('✅ MySQL Connected successfully!');
    
    console.log('Syncing database models...');
    await sequelize.sync();
    console.log('✅ Database models synced successfully!');
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(`Error: ${error.message}`);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('💡 Make sure MySQL is running on your system');
    } else if (error.message.includes('ER_BAD_DB_ERROR')) {
      console.error('💡 Make sure the database exists. Create it with: CREATE DATABASE GeoSoilData;');
    } else if (error.message.includes('ER_ACCESS_DENIED_ERROR')) {
      console.error('💡 Check your database username and password');
    }
    
    console.error('\nPlease check your .env file and MySQL connection');
=======
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
>>>>>>> d42d0ca22c2eba08a4c6e649b4eba4779ff886a4
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

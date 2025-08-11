const { Sequelize } = require('sequelize');

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
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
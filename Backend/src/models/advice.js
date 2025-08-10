const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Advice = sequelize.define('Advice', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  county: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  soilData_ph: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  soilData_n: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  soilData_p: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  soilData_k: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recommendations_crop: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recommendations_soil: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recommendations_weather: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalRain: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  weatherData_kakamega: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  weatherData_siaya: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  weatherData_nairobi: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false,
});

module.exports = Advice;
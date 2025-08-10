const { sequelize } = require('../config/db');

const Advice = sequelize.define('advice', {
  userId: { type: Sequelize.STRING, allowNull: false },
  county: { type: Sequelize.STRING, allowNull: false },
  latitude: { type: Sequelize.FLOAT, allowNull: false },
  longitude: { type: Sequelize.FLOAT, allowNull: false },
  soilData_ph: { type: Sequelize.FLOAT, allowNull: false },
  soilData_n: { type: Sequelize.INTEGER, allowNull: false },
  soilData_p: { type: Sequelize.INTEGER, allowNull: false },
  soilData_k: { type: Sequelize.INTEGER, allowNull: false },
  recommendations_crop: { type: Sequelize.STRING, allowNull: false },
  recommendations_soil: { type: Sequelize.TEXT, allowNull: false },
  recommendations_weather: { type: Sequelize.STRING, allowNull: false },
  totalRain: { type: Sequelize.FLOAT, allowNull: false },
  weatherData_kakamega: { type: Sequelize.JSON, allowNull: true },
  weatherData_siaya: { type: Sequelize.JSON, allowNull: true },
  weatherData_nairobi: { type: Sequelize.JSON, allowNull: true },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

module.exports = Advice;
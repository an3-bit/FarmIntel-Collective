const { SoilDataModel, WeatherDataModel, RecommendationModel, SearchHistoryModel } = require('../models/KnnModel');

// Controller for POST /api/advice
const getAdvice = async (req, res) => {
  const { lat, lon, crop, userId } = req.body;

  try {
    // Validate input
    if (!lat || !lon || !crop || !userId) {
      return res.status(400).json({ message: 'Missing required fields: lat, lon, crop, or userId' });
    }

    // Get soil data (with KNN if needed)
    const { county, soilData } = await SoilDataModel.getSoilData(lat, lon, crop);

    // Get weather data from OpenWeather
    const weatherData = await WeatherDataModel.getWeatherData(lat, lon);

    // Generate recommendations
    const recommendations = await RecommendationModel.getRecommendations(soilData, crop, weatherData);

    // Save to search history
    await SearchHistoryModel.saveSearch(userId, county, soilData, recommendations, weatherData.totalRain, crop);

    // Return response in the format expected by the dashboard
    res.json({
      county,
      soilData,
      recommendations,
      totalRain: weatherData.totalRain,
      weatherData: {
        kakamega: weatherData.kakamega || null,
        siaya: weatherData.siaya || null,
        nairobi: weatherData.nairobi || null
      }
    });
  } catch (err) {
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
};

// Controller for GET /api/profile/:userId
const getProfile = async (req, res) => {
  try {
    const history = await SearchHistoryModel.getHistory(req.params.userId);
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
};

module.exports = {
  getAdvice,
  getProfile
};
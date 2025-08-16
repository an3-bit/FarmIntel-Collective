const axios = require('axios');
const Advice = require('../models/advice');
const KNN = require('ml-knn');

// Mock dataset from Excel
const dataset = [
  { lat: 0.06797222222222223, lon: 34.43441666666666, ph: 6, n: 5, p: 9, k: 18, cluster: 2 },
  { lat: 0.2943611111111111, lon: 34.39463888888889, ph: 6, n: 29, p: 40, k: 82, cluster: 1 },
  { lat: 0.06688888888888889, lon: 34.43027777777777, ph: 5.7, n: 2, p: 3, k: 7, cluster: 2 },
  { lat: 0.06869444444444445, lon: 34.42855555555555, ph: 6, n: 29, p: 40, k: 82, cluster: 2 },
  { lat: 0.0675, lon: 34.44027777777777, ph: 6, n: 15, p: 21, k: 43, cluster: 4 },
  { lat: 0.2908333333333333, lon: 34.40408333333333, ph: 5.86, n: 22, p: 30, k: 63, cluster: 1 },
  { lat: 0.07030555555555555, lon: 34.44211111111111, ph: 6.12, n: 11, p: 16, k: 32, cluster: 4 },
  { lat: 0.06830555555555555, lon: 34.44219444444444, ph: 6, n: 8, p: 12, k: 26, cluster: 4 },
  { lat: 0.06383333333333334, lon: 34.44380555555555, ph: 5, n: 4, p: 6, k: 13, cluster: 4 },
  { lat: 0.06436111111111112, lon: 34.44183333333333, ph: 5, n: 9, p: 13, k: 26, cluster: 4 },
  { lat: 0.06947222222222223, lon: 34.44033333333333, ph: 7, n: 19, p: 29, k: 56, cluster: 4 },
  { lat: 0.1241388888888889, lon: 34.20166666666667, ph: 6.21, n: 53, p: 75, k: 152, cluster: 0 },
  { lat: 0.1233611111111111, lon: 34.20105555555556, ph: 6.28, n: 39, p: 58, k: 112, cluster: 0 },
  { lat: 0.1223333333333333, lon: 34.20397222222223, ph: 6.3, n: 48, p: 68, k: 138, cluster: 0 },
  { lat: 0.1239166666666667, lon: 34.20705555555556, ph: 6.42, n: 8, p: 12, k: 25, cluster: 0 },
  { lat: 0.1241111111111111, lon: 34.20666666666667, ph: 6.4, n: 17, p: 30, k: 42, cluster: 0 },
  { lat: 0.08733333333333333, lon: 34.33000000000001, ph: 6, n: 72, p: 100, k: 203, cluster: 3 },
  { lat: 0.08311111111111111, lon: 34.33450000000001, ph: 6, n: 25, p: 36, k: 73, cluster: 3 },
  { lat: 0.2948055555555555, lon: 34.39172222222222, ph: 6, n: 6, p: 10, k: 20, cluster: 1 },
  { lat: 0.2938888888888889, lon: 34.39027777777778, ph: 6, n: 10, p: 15, k: 30, cluster: 1 },
  { lat: 0.2985555555555556, lon: 34.39555555555555, ph: 6.89, n: 9, p: 13, k: 29, cluster: 1 },
  { lat: 0.2943611111111111, lon: 34.39463888888889, ph: 6.16, n: 10, p: 16, k: 32, cluster: 1 },
  { lat: 0.2943611111111111, lon: 34.39463888888889, ph: 6.06, n: 3, p: 6, k: 13, cluster: 1 },
  { lat: 0.2943611111111111, lon: 34.39463888888889, ph: 6.8, n: 12, p: 17, k: 35, cluster: 1 },
  { lat: 0.2855833333333333, lon: 34.39422222222222, ph: 7, n: 4, p: 6, k: 13, cluster: 1 },
  { lat: 0.2967777777777778, lon: 34.39827777777778, ph: 5.86, n: 6, p: 13, k: 20, cluster: 1 },
];

exports.getAdvice = async (req, res) => {
  try {
    const { lat, lon, crop, userId } = req.body;

    // KNN model for interpolation
    const knn = new KNN(dataset.map(d => [d.lat, d.lon]), dataset.map(d => [d.ph, d.n, d.p, d.k]), {
      k: 3,
    });

    // Predict soil characteristics for given lat/lon
    const [predictedPh, predictedN, predictedP, predictedK] = knn.predict([lat, lon]);

    // Determine county (mocked for Nairobi or dataset regions)
    const county = lat > -1.5 && lat < -1.0 && lon > 36.5 && lon < 37.0 ? 'Nairobi' : lat > 0 ? 'Kakamega' : 'Siaya';

    // Generate recommendations
    const recommendations = {
      crop: crop || 'maize',
      soil: predictedPh < 7 ? `Apply 200 kg/ha of lime to neutralize acidic soil for ${crop || 'maize'}. ` : 'Soil pH is suitable for maize. ',
      weather: 'Expect moderate rainfall this week',
    };

    if (predictedN < 60) recommendations.soil += 'Use YaraMila Power (high nitrogen) to address nitrogen deficiency. ';
    if (predictedP < 50) recommendations.soil += 'Use DAP (high phosphorus) to address phosphorus deficiency. ';
    if (predictedK < 30) recommendations.soil += 'Use Muriate of Potash (high potassium) to address potassium deficiency. ';

    // Fetch weather data from OpenWeatherMap (if API key is available)
    const weatherApiKey = process.env.OPENWEATHER_API_KEY || '5d918c233b784255aab124619251608';
    const weatherData = {};

    console.log(weatherApiKey ? 'Fetching weather data...' : 'No OpenWeather API key provided, skipping weather data fetch.');
    
    if (weatherApiKey) {
      const cities = [
        { name: 'Kakamega', lat: 0.2827, lon: 34.7519 },
        { name: 'Siaya', lat: 0.0636, lon: 34.2874 },
        { name: 'Nairobi', lat: -1.2833, lon: 36.8167 },
      ];

      for (const city of cities) {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city.lat},${city.lon}`
    );
    weatherData[city.name.toLowerCase()] = {
      temperature: `${response.data.current.temp_c}°C`,
      rainfall: response.data.current.precip_mm !== undefined ? `${response.data.current.precip_mm} mm` : '0 mm',
      humidity: `${response.data.current.humidity}%`,
      forecast: response.data.current.condition.text,
    };
  } catch (error) {
    console.log(`Error fetching weather for ${city.name}:`, error.message);
    weatherData[city.name.toLowerCase()] = {
      temperature: 'N/A',
      rainfall: 'N/A',
      humidity: 'N/A',
      forecast: 'Weather data unavailable',
    };
  }
}
    }

    const adviceData = {
      county,
      latitude: lat,
      longitude: lon,
      soilData: {
        ph: predictedPh.toFixed(1),
        n: predictedN.toFixed(0),
        p: predictedP.toFixed(0),
        k: predictedK.toFixed(0),
      },
      recommendations,
      totalRain: weatherData[county.toLowerCase()]?.rainfall?.split(' ')[0] || '0',
      weatherData,
    };

    // Save to MySQL
    await Advice.create({
      userId: userId || 'default_user',
      county,
      latitude: lat,
      longitude: lon,
      soilData_ph: adviceData.soilData.ph,
      soilData_n: adviceData.soilData.n,
      soilData_p: adviceData.soilData.p,
      soilData_k: adviceData.soilData.k,
      recommendations_crop: adviceData.recommendations.crop,
      recommendations_soil: adviceData.recommendations.soil,
      recommendations_weather: adviceData.recommendations.weather,
      totalRain: adviceData.totalRain,
      weatherData_kakamega: adviceData.weatherData.kakamega,
      weatherData_siaya: adviceData.weatherData.siaya,
      weatherData_nairobi: adviceData.weatherData.nairobi,
    });

    res.status(200).json(adviceData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await Advice.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Simplified agricultural advice endpoint
exports.getAgriAdvice = async (req, res) => {
  try {
    const { location } = req.body || {};

    if (!location || typeof location !== 'string' || !location.trim()) {
      return res.status(400).json({ error: 'Please provide a valid location string in the request body.' });
    }

    // Mock response for now - can be enhanced later
    const response = {
      location: { name: location, latitude: 0, longitude: 0 },
      weather: { message: 'Weather data will be available soon' },
      soil: { message: 'Soil data will be available soon' }
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
};
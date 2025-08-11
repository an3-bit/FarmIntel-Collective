const mysql = require('mysql2/promise');
const axios = require('axios');

// MySQL connection configuration
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Rhodea123.,',
  database: 'GeoSoilData',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// OpenWeather API configuration
const OPENWEATHER_API_KEY = 'your_openweathermap_api_key'; // Replace with your actual key

// Custom KNN implementation
class KNN {
  constructor(k = 3) {
    this.k = k;
  }

  // Calculate Euclidean distance between two points (lat, lon)
  distance(point1, point2) {
    const [lat1, lon1] = point1;
    const [lat2, lon2] = point2;
    return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
  }

  // Predict soil data for a new point
  predict(dataPoints, newPoint, outputFields) {
    // Sort data points by distance to newPoint
    const sortedPoints = dataPoints
      .map(point => ({
        ...point,
        distance: this.distance([newPoint.latitude, newPoint.longitude], [point.latitude, point.longitude])
      }))
      .sort((a, b) => a.distance - b.distance);

    // Get k nearest neighbors
    const neighbors = sortedPoints.slice(0, this.k);

    // Aggregate output fields (average for numeric, mode for strings)
    const result = {};
    outputFields.forEach(field => {
      const values = neighbors.map(n => n[field]);
      if (typeof values[0] === 'number' || !isNaN(parseFloat(values[0]))) {
        // Average numeric values
        result[field] = values.reduce((sum, val) => sum + (parseFloat(val) || 0), 0) / values.length;
      } else {
        // Mode for strings (most frequent value)
        const frequency = {};
        let maxFreq = 0;
        let mode = values[0];
        values.forEach(val => {
          frequency[val] = (frequency[val] || 0) + 1;
          if (frequency[val] > maxFreq) {
            maxFreq = frequency[val];
            mode = val;
          }
        });
        result[field] = mode;
      }
    });

    return result;
  }
}

// SoilData model with KNN prediction
const SoilDataModel = {
  async getAllSoilData() {
    const [rows] = await pool.query(`
      SELECT Region AS county, Latitude_dd AS latitude, Longitude_dd AS longitude, pH AS ph, N_kg_ha AS n, P_kg_ha AS p, K_kg_ha AS k
      FROM GeoSoilData
      WHERE Latitude_dd IS NOT NULL AND Longitude_dd IS NOT NULL
    `);
    return rows;
  },

  async getSoilData(lat, lon, crop) {
    // Try to find exact or close match in the database
    const [rows] = await pool.query(`
      SELECT Region AS county, pH AS ph, N_kg_ha AS n, P_kg_ha AS p, K_kg_ha AS k
      FROM GeoSoilData
      WHERE ABS(Latitude_dd - ?) < 0.1 AND ABS(Longitude_dd - ?) < 0.1
      LIMIT 1
    `, [lat, lon]);

    if (rows.length > 0) {
      return {
        county: rows[0].county,
        soilData: { ph: rows[0].ph.toString(), n: rows[0].n.toString(), p: rows[0].p.toString(), k: rows[0].k.toString() }
      };
    }

    // If no close match, use KNN to predict soil data
    const soilDataPoints = await this.getAllSoilData();
    if (soilDataPoints.length === 0) {
      throw new Error('No soil data available for prediction');
    }

    const knn = new KNN(3); // Use 3 nearest neighbors
    const predicted = knn.predict(
      soilDataPoints,
      { latitude: lat, longitude: lon },
      ['county', 'ph', 'n', 'p', 'k']
    );

    return {
      county: predicted.county,
      soilData: {
        ph: predicted.ph.toFixed(1).toString(),
        n: predicted.n.toFixed(1).toString(),
        p: predicted.p.toFixed(1).toString(),
        k: predicted.k.toFixed(1).toString()
      }
    };
  }
};

// WeatherData model with OpenWeather API
const WeatherDataModel = {
  async getWeatherData(lat, lon) {
    try {
      // Fetch weather data for Kakamega, Siaya, Nairobi (approximate coordinates)
      const counties = [
        { name: 'Kakamega', lat: 0.2827, lon: 34.7519 },
        { name: 'Siaya', lat: 0.0636, lon: 34.2875 },
        { name: 'Nairobi', lat: -1.2864, lon: 36.8172 }
      ];

      const weatherData = { kakamega: null, siaya: null, nairobi: null, totalRain: 0 };
      let totalRain = 0;

      for (const county of counties) {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${county.lat}&lon=${county.lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
        );
        const data = response.data;
        const rainfall = data.rain ? (data.rain['1h'] || 0) : 0; // Rainfall in last hour (mm)
        totalRain += rainfall;
        weatherData[county.name.toLowerCase()] = {
          temperature: data.main.temp.toString(),
          rainfall: rainfall.toString(),
          humidity: data.main.humidity.toString(),
          forecast: data.weather[0].description
        };
      }

      weatherData.totalRain = totalRain.toFixed(1);
      return weatherData;
    } catch (err) {
      throw new Error(`Failed to fetch weather data: ${err.message}`);
    }
  }
};

// Recommendation model (rule-based, can extend with KNN)
const RecommendationModel = {
  async getRecommendations(soilData, crop, weatherData) {
    let cropRecommendation = crop;
    let soilRecommendation = 'Maintain current soil conditions';
    let weatherRecommendation = 'Plant soon due to favorable conditions';

    const ph = parseFloat(soilData.ph);
    const n = parseFloat(soilData.n);
    const p = parseFloat(soilData.p);
    const k = parseFloat(soilData.k);

    if (ph < 6.0) {
      soilRecommendation = 'Add lime to increase soil pH';
    } else if (ph > 7.5) {
      soilRecommendation = 'Add sulfur to decrease soil pH';
    }

    if (n < 20) {
      soilRecommendation += '; Apply nitrogen fertilizer';
    }
    if (p < 15) {
      soilRecommendation += '; Apply phosphorus fertilizer';
    }
    if (k < 30) {
      soilRecommendation += '; Apply potassium fertilizer';
    }

    // Weather-based recommendation
    const totalRain = parseFloat(weatherData.totalRain);
    if (totalRain > 10) {
      weatherRecommendation = 'Delay planting due to excessive rain';
    } else if (totalRain < 2) {
      weatherRecommendation = 'Ensure irrigation due to low rainfall';
    }

    return {
      crop: cropRecommendation,
      soil: soilRecommendation,
      weather: weatherRecommendation
    };
  }
};

// SearchHistory model
const SearchHistoryModel = {
  async saveSearch(userId, county, soilData, recommendations, totalRain, crop) {
    await pool.query(`
      INSERT INTO SearchHistory (
        userId, county, soilData_ph, soilData_n, soilData_p, soilData_k,
        recommendations_crop, recommendations_soil, recommendations_weather, totalRain, crop
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      userId,
      county,
      soilData.ph,
      soilData.n,
      soilData.p,
      soilData.k,
      recommendations.crop,
      recommendations.soil,
      recommendations.weather,
      totalRain,
      crop
    ]);
  },

  async getHistory(userId) {
    const [rows] = await pool.query(`
      SELECT county, soilData_ph, soilData_n, soilData_p, soilData_k,
             recommendations_crop, recommendations_soil, recommendations_weather,
             totalRain, crop, createdAt
      FROM SearchHistory
      WHERE userId = ?
      ORDER BY createdAt DESC
    `, [userId]);
    return rows.map(row => ({
      county: row.county,
      soilData: {
        ph: row.soilData_ph,
        n: row.soilData_n,
        p: row.soilData_p,
        k: row.soilData_k
      },
      recommendations: {
        crop: row.recommendations_crop,
        soil: row.recommendations_soil,
        weather: row.recommendations_weather
      },
      totalRain: row.totalRain,
      crop: row.crop,
      createdAt: row.createdAt
    }));
  }
};

module.exports = {
  SoilDataModel,
  WeatherDataModel,
  RecommendationModel,
  SearchHistoryModel
};
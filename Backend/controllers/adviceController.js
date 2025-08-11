const GeocoderMissingMsg = 'Location not found. Please try a different name.';

exports.getAgriAdvice = async (req, res) => {
  try {
    const { location } = req.body || {};

    if (!location || typeof location !== 'string' || !location.trim()) {
      return res.status(400).json({ error: 'Please provide a valid location string in the request body.' });
    }

    // Lazy-load dependency to avoid crashing if not installed yet
    let GeocoderClient, WeatherClient, SoilClient;
    try {
      ({ GeocoderClient, WeatherClient, SoilClient } = require('openepi-client'));
    } catch (e) {
      return res.status(500).json({ error: 'Dependency missing: openepi-client is not installed in Backend. Please add it to proceed.' });
    }

    // 1) Geocode
    const geocoder = new GeocoderClient();
    let geoResult;
    try {
      // Try common signatures
      if (typeof geocoder.geocode === 'function') {
        geoResult = await geocoder.geocode(location);
      } else if (typeof geocoder.forward === 'function') {
        geoResult = await geocoder.forward({ query: location });
      } else {
        throw new Error('GeocoderClient missing geocode/forward method');
      }
    } catch (e) {
      return res.status(404).json({ error: GeocoderMissingMsg });
    }

    const first = Array.isArray(geoResult?.results) ? geoResult.results[0] : (geoResult?.results || geoResult);
    const name = first?.name || first?.label || first?.formatted || String(location);
    const latitude = first?.latitude ?? first?.lat ?? first?.coordinates?.lat ?? first?.geometry?.lat ?? first?.geometry?.lat;
    const longitude = first?.longitude ?? first?.lon ?? first?.coordinates?.lon ?? first?.geometry?.lng ?? first?.geometry?.lon;

    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(404).json({ error: GeocoderMissingMsg });
    }

    // 2) Fetch Weather + Soil concurrently
    const weatherClient = new WeatherClient();
    const soilClient = new SoilClient();

    const [weatherRes, soilRes] = await Promise.allSettled([
      typeof weatherClient.getLocationForecast === 'function'
        ? weatherClient.getLocationForecast({ latitude, longitude, days: 7 })
        : Promise.reject(new Error('WeatherClient.getLocationForecast not available')),
      typeof soilClient.getSoilType === 'function'
        ? soilClient.getSoilType({ latitude, longitude })
        : Promise.reject(new Error('SoilClient.getSoilType not available')),
    ]);

    const response = {
      location: { name, latitude, longitude },
    };

    if (weatherRes.status === 'fulfilled') {
      response.weather = weatherRes.value;
    } else {
      response.weather = { error: 'Weather data not available for this location currently.' };
    }

    if (soilRes.status === 'fulfilled') {
      response.soil = soilRes.value;
    } else {
      response.soil = { error: 'Soil data not available for this specific location.' };
    }

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
};

module.exports = { getAgriAdvice: exports.getAgriAdvice };
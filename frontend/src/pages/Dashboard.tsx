import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Settings,
  CheckCircle,
  AlertTriangle,
  Wrench,
  History,
  Menu,
  X
} from "lucide-react";

import { useApi } from "../hooks/useApi";

// Types for our API responses
interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organic_carbon?: number;
}

interface WeatherData {
  date: string | number | Date;
  temperature: number;
  rainfall: number;
  humidity: number;
  forecast: string;
}

interface Recommendations {
  crop: string;
  soil: string;
  weather: string;
  alternativeCrops?: string[];
}


const Dashboard = () => {
  const navigate = useNavigate();
  const [county, setCounty] = useState("");

  const [soilData, setSoilData] = useState<SoilData>({ 
    ph: 0, 
    nitrogen: 0, 
    phosphorus: 0, 
    potassium: 0 
  });
  const [recommendations, setRecommendations] = useState<Recommendations>({ 
    crop: "", 
    soil: "", 
    weather: "",
    alternativeCrops: []
  });
  const [weatherForecast, setWeatherForecast] = useState<WeatherData[]>([]);
  const [selectedCrop, setSelectedCrop] = useState("maize");
  const [history, setHistory] = useState<any[]>([]);
  const [userId] = useState("default_user");

  const [soilData, setSoilData] = useState({ ph: "", n: "", p: "", k: "" });
  const [recommendations, setRecommendations] = useState({ crop: "", soil: "", weather: "" });
  const [totalRain, setTotalRain] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("maize");
  const [weatherData, setWeatherData] = useState({ kakamega: null, siaya: null, nairobi: null });
  const [history, setHistory] = useState([]);
  const [userId] = useState("default_user"); // Mock userId, replace with auth system

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // API hooks
  const soilApi = useApi<SoilData>();
  const weatherApi = useApi<WeatherData[]>();
  const recommendationsApi = useApi<Recommendations>();

  const crops = [
    "Maize",
    "Sorghum",
    "Millet",
    "Wheat",
    "Beans",
    "Peas",
    "Lentils",
    "Groundnuts",
  ];

  // Crop requirements (simplified)
  const cropRequirements = {
    maize: { minPh: 6.0, maxPh: 7.0, nutrients: { nitrogen: 150, phosphorus: 50, potassium: 100 } },
    beans: { minPh: 5.5, maxPh: 7.0, nutrients: { nitrogen: 50, phosphorus: 40, potassium: 60 } },
    wheat: { minPh: 6.0, maxPh: 7.5, nutrients: { nitrogen: 120, phosphorus: 60, potassium: 80 } },
    // Add other crops...
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSignOut = () => {
    navigate("/");
  };

  const getLocationAndAdvice = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          setLoading(true);
          setError("");

          try {

            // Fetch soil data from SoilGrids API
            const soilResponse = await fetchSoilData(lat, lon);
            setSoilData(soilResponse);
            
            // Fetch weather data from Open-Meteo
            const weatherResponse = await fetchWeatherData(lat, lon);
            setWeatherForecast(weatherResponse);
            
            // Generate recommendations based on soil and weather
            const recommendations = generateRecommendations(soilResponse, weatherResponse, selectedCrop);
            setRecommendations(recommendations);
            
            // For demo purposes, set a mock county
            setCounty(detectCounty(lat, lon));
            
            // Save to history
            addToHistory(lat, lon, selectedCrop, soilResponse, weatherResponse, recommendations);
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            console.error('Error fetching data:', errorMessage);
            soilApi.setError(errorMessage);
          }
        },
        (error) => {
          console.error('Geolocation error:', error.message);
          soilApi.setError(error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      soilApi.setError("Geolocation is not supported by your browser");
    }
  };
  const fetchSoilData = async (lat: number, lon: number): Promise<SoilData> => {
    // 1. First try SoilGrids with retry logic
    try {
      const soilGridsResponse = await fetchWithRetry(
        `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}&property=phh2o,nitrogen,phosphorus,potassium&depth=0-5cm&value=mean`,
        3 // retry 3 times
      );
      
      if (soilGridsResponse.ok) {
        const data = await soilGridsResponse.json();
        if (data.properties?.layers?.length >= 4) {
          return {
            ph: data.properties.layers[0].depths[0].values.mean / 10,
            nitrogen: data.properties.layers[1].depths[0].values.mean,
            phosphorus: data.properties.layers[2].depths[0].values.mean,
            potassium: data.properties.layers[3].depths[0].values.mean,
            
          };
        }
      }
    } catch (error) {
      console.warn("SoilGrids API failed:", error);
    }
  
    // 2. Try OpenLandMap with correct endpoint
    try {
      // Correct OpenLandMap endpoint format
      const openLandMapResponse = await fetch(
        `https://openlandmap.org/api/v1/query?lat=${lat}&lon=${lon}&variables=ph.nitrogen,phosphorus,potassium`
      );
      
      if (openLandMapResponse.ok) {
        const data = await openLandMapResponse.json();
        return {
          ph: data.properties?.ph?.mean || 6.0,
          nitrogen: data.properties?.nitrogen?.mean || 40,
          phosphorus: data.properties?.phosphorus?.mean || 25,
          potassium: data.properties?.potassium?.mean || 60,
          
        };
      }
    } catch (error) {
      console.warn("OpenLandMap API failed:", error);
    }
  
    // 3. Try alternative soil APIs (HTTPS only)
    try {
      // Using a proxy for FAO to avoid mixed content issues
      const faoResponse = await fetch(
        `https://cors-anywhere.herokuapp.com/https://www.fao.org/soils-portal/api/v1/soil?lat=${lat}&lon=${lon}`,
        {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }
      );
      
      if (faoResponse.ok) {
        const data = await faoResponse.json();
        return {
          ph: data.ph || 6.0,
          nitrogen: data.nitrogen || 40,
          phosphorus: data.phosphorus || 25,
          potassium: data.potassium || 60,
      
        };
      }
    } catch (error) {
      console.warn("FAO API failed:", error);
    }
  
    // Fallback data with warning
    console.warn("All soil APIs failed, using fallback data");
    return {
      ph: 5.8 + Math.random() * 1.4,
      nitrogen: 30 + Math.random() * 40,
      phosphorus: 20 + Math.random() * 30,
      potassium: 50 + Math.random() * 50,
     
    };
  };
  
  // Helper function for retry logic
  const fetchWithRetry = async (url: string, retries: number): Promise<Response> => {
    try {
      const response = await fetch(url);
      if (response.ok || retries === 0) return response;
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchWithRetry(url, retries - 1);
    } catch (error) {
      if (retries === 0) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchWithRetry(url, retries - 1);

            const response = await fetch("http://localhost:3000/api/advice", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ lat, lon, crop: selectedCrop, userId }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || "Failed to fetch advice from server");
            }

            const data = await response.json();
            // Defensive checks for API response
            setCounty(data.county || "");
            setSoilData(data.soilData || { ph: "", n: "", p: "", k: "" });
            setRecommendations(data.recommendations || { crop: "", soil: "", weather: "" });
            setTotalRain(data.totalRain || 0);
            setWeatherData(data.weatherData || { kakamega: null, siaya: null, nairobi: null });
          } catch (err) {
            setError(`Error fetching advice: ${err.message}. Please try again.`);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError(`Error getting location: ${error.message}. Please try again or enter a county manually.`);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser. Please enter a county manually.");

    }
  };

  const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData[]> => {
    try {

      // Using Open-Meteo API
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,precipitation_sum&past_days=7`
      );
      
      if (!response.ok) throw new Error("Failed to fetch weather data");
      
      const data = await response.json();
      
      // Format 7-day forecast
      return data.daily.time.map((date: string, index: number) => ({
        date,
        temperature: data.daily.temperature_2m_max[index],
        rainfall: data.daily.precipitation_sum[index],
        humidity: 0, // Not provided in this API
        forecast: getWeatherDescription(data.daily.weathercode[index])
      }));
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };

  const getWeatherDescription = (code: number): string => {
    // Simplified weather code interpretation
    if (code <= 3) return "Clear";
    if (code <= 48) return "Fog";
    if (code <= 67 || code <= 80) return "Rain";
    if (code <= 99) return "Thunderstorm";
    return "Unknown";
  };

  const detectCounty = (lat: number, lon: number): string => {
    // Simplified - in a real app you'd use a geocoding API
    if (lat < -1.0) return "Nairobi";
    if (lon > 36.8) return "Machakos";
    return "Kakamega";
  };

  const generateRecommendations = (
    soil: SoilData,
    weather: WeatherData[],
    crop: string
  ): Recommendations => {
    const requirements = cropRequirements[crop as keyof typeof cropRequirements];
    const recommendations: Recommendations = {
      crop: "",
      soil: "",
      weather: "",
      alternativeCrops: []
    };

    // Soil pH recommendations
    if (soil.ph < requirements.minPh) {
      recommendations.soil = `Soil is too acidic (pH ${soil.ph.toFixed(1)}). Recommended to add lime.`;
      recommendations.alternativeCrops = getCropsTolerantToLowPh();
    } else if (soil.ph > requirements.maxPh) {
      recommendations.soil = `Soil is too alkaline (pH ${soil.ph.toFixed(1)}). Recommended to add sulfur.`;
    } else {
      recommendations.soil = `Soil pH (${soil.ph.toFixed(1)}) is optimal for ${crop}.`;
    }

    // Nutrient recommendations
    const nutrientAdvice = [];
    if (soil.nitrogen < requirements.nutrients.nitrogen) {
      nutrientAdvice.push(`add nitrogen fertilizer (${requirements.nutrients.nitrogen - soil.nitrogen} kg/ha needed)`);
    }
    if (soil.phosphorus < requirements.nutrients.phosphorus) {
      nutrientAdvice.push(`add phosphorus fertilizer (${requirements.nutrients.phosphorus - soil.phosphorus} kg/ha needed)`);
    }
    if (soil.potassium < requirements.nutrients.potassium) {
      nutrientAdvice.push(`add potassium fertilizer (${requirements.nutrients.potassium - soil.potassium} kg/ha needed)`);
    }

    if (nutrientAdvice.length > 0) {
      recommendations.soil += ` Also ${nutrientAdvice.join(", ")}.`;
    }

    // Weather recommendations
    const totalRain = weather.reduce((sum, day) => sum + day.rainfall, 0);
    const avgTemp = weather.reduce((sum, day) => sum + day.temperature, 0) / weather.length;
    
    if (totalRain < 20) {
      recommendations.weather = "Low rainfall expected. Consider irrigation.";
    } else if (totalRain > 100) {
      recommendations.weather = "Heavy rainfall expected. Ensure proper drainage.";
    } else {
      recommendations.weather = "Rainfall conditions are favorable for planting.";
    }

    recommendations.crop = `${crop} can be planted with these conditions.`;

    return recommendations;
  };

  const getCropsTolerantToLowPh = (): string[] => {
    return ["Beans", "Peas", "Potatoes"];
  };

  const addToHistory = (
    lat: number,
    lon: number,
    crop: string,
    soil: SoilData,
    weather: WeatherData[],
    recommendations: Recommendations
  ) => {
    const newEntry = {
      id: Date.now(),
      lat,
      lon,
      county: detectCounty(lat, lon),
      crop,
      soilData: soil,
      weatherData: weather,
      recommendations,
      createdAt: new Date().toISOString()
    };
    
    setHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
  };

      const response = await fetch(`http://localhost:3000/api/profile/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch history from server");
      }
      const data = await response.json();
      setHistory(data || []);
    } catch (err) {
      setError(`Error fetching history: ${err.message}. Please try again.`);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);


  return (
    <div className="flex h-screen bg-white relative">
      {/* Mobile Sidebar Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-slate-800 text-white"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Dark Sidebar */}
      <div 
        className={`w-64 bg-slate-800 text-white flex flex-col fixed md:relative h-full transition-all duration-300 z-40
          ${sidebarOpen ? 'left-0' : '-left-64 md:left-0'}`}
      >
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-sm font-semibold tracking-wide">
            CLIMATE-SMART SOIL ADVISOR
          </h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button className="w-full flex items-center gap-3 px-3 py-2 bg-slate-700 rounded-lg text-white">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                <BarChart3 size={18} />
                <span>Analysis</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                <FileText size={18} />
                <span>Data</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                <History size={18} />
                <span>Profile</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                <Settings size={18} />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleSignOut}
            className="w-full text-slate-300 hover:text-white text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarOpen && isMobile ? 'ml-64' : ''}`}>
        <div className="p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">Dashboard</h1>

          {/* Location and Crop Selection Section */}
          <div className="mb-6 md:mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location:
            </label>
            <Button
              onClick={getLocationAndAdvice}
              className="bg-blue-600 hover:bg-blue-700"

              disabled={soilApi.loading || weatherApi.loading}
            >
              {soilApi.loading || weatherApi.loading ? "Loading..." : "Get My Location and Advice"}
            </Button>
            {soilApi.error && (

              disabled={loading}
            >
              {loading ? "Loading..." : "Get My Location and Advice"}
            </Button>
            {error && (

              <div className="mt-2 flex items-center gap-2">
                <p className="text-red-600">{soilApi.error.message}</p>
                <Button

                  onClick={soilApi.clearError}

                  onClick={() => setError("")}

                  className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Clear Error
                </Button>
              </div>
            )}
            {county && <p className="mt-2 text-gray-700">Detected County: {county}</p>}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Crop:
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full md:w-auto"
              >
                {crops.map((crop) => (
                  <option key={crop} value={crop.toLowerCase()}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {soilData.ph > 0 && (
            <>
              {/* Soil Data Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Soil Data</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="bg-white border border-gray-200">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-600">pH</div>
                      <div className="text-2xl font-bold text-gray-900">{soilData.ph.toFixed(1)}</div>
                      <div className="text-sm text-gray-500">
                        {soilData.ph < 5.5 ? "Very acidic" : soilData.ph < 6.5 ? "Acidic" : soilData.ph < 7.5 ? "Neutral" : "Alkaline"}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border border-gray-200">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-600">Nitrogen (N)</div>
                      <div className="text-2xl font-bold text-gray-900">{soilData.nitrogen.toFixed(1)}</div>
                      <div className="text-sm text-gray-500">mg/kg</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border border-gray-200">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-600">Phosphorus (P)</div>
                      <div className="text-2xl font-bold text-gray-900">{soilData.phosphorus.toFixed(1)}</div>
                      <div className="text-sm text-gray-500">mg/kg</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border border-gray-200">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-600">Potassium (K)</div>
                      <div className="text-2xl font-bold text-gray-900">{soilData.potassium.toFixed(1)}</div>
                      <div className="text-sm text-gray-500">mg/kg</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Crop to Plant Section */}
              <div className="mt-6 md:mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Crop Recommendations</h2>
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-600" size={20} />
                      <div>
                        <div className="font-medium text-gray-900">{recommendations.crop}</div>
                        <div className="text-gray-600 mt-1">{recommendations.soil}</div>
                        {recommendations.alternativeCrops && recommendations.alternativeCrops.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium">Alternative crops that tolerate these conditions:</p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {recommendations.alternativeCrops.map((crop, index) => (
                                <li key={index}>{crop}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Weather Summary Section */}
              <div className="mt-6 md:mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">7-Day Weather Forecast</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weatherForecast.slice(0, 7).map((day, index) => (
                    <Card key={index} className="bg-white border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="text-blue-600" size={20} />
                          <div>
                            <div className="font-medium text-gray-900">
                              Day {index + 1}: {new Date(day.date).toLocaleDateString()}
                            </div>
                            <div className="text-gray-600">Temperature: {day.temperature}°C</div>
                            <div className="text-gray-600">Rainfall: {day.rainfall} mm</div>
                            <div className="text-gray-600">Conditions: {day.forecast}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card className="bg-white border border-gray-200 mt-4">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="text-red-600" size={20} />
                      <div>
                        <div className="font-medium text-gray-900">Weather Advisory</div>
                        <div className="text-gray-600">{recommendations.weather}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search History Section */}
              {history.length > 0 && (
                <div className="mt-6 md:mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Search History</h2>
                  <div className="space-y-4">
                    {history.map((item, index) => (
                      <Card key={index} className="bg-white border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <History className="text-blue-600" size={20} />
                            <div>
                              <div className="font-medium text-gray-900">
                                {item.county} - {item.crop} - {new Date(item.createdAt).toLocaleString()}
                              </div>
                              <div className="text-gray-600 text-sm mt-1">
                                pH: {item.soilData.ph.toFixed(1)}, N: {item.soilData.nitrogen.toFixed(1)}, 
                                P: {item.soilData.phosphorus.toFixed(1)}, K: {item.soilData.potassium.toFixed(1)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
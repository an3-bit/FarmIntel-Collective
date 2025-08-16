import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Settings,
  CheckCircle,
  AlertTriangle,
  History,
  Menu,
  X
} from "lucide-react";

// Types for our API responses
interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  [key: string]: any;
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

const crops = ["Maize", "Beans", "Peas", "Potatoes"];

const Dashboard = () => {
  const [county, setCounty] = useState("");
  const [soilData, setSoilData] = useState<SoilData>({
    ph: 0,
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0
  });
  const [weatherForecast, setWeatherForecast] = useState<WeatherData[]>([]);
  const [selectedCrop, setSelectedCrop] = useState("maize");
  const [history, setHistory] = useState<any[]>([]);
  const [userId] = useState("default_user");
  const [recommendations, setRecommendations] = useState<Recommendations>({
    crop: "",
    soil: "",
    weather: "",
    alternativeCrops: [],
  });
  const [totalRain, setTotalRain] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Fetch advice from backend using geolocation
  const getLocationAndAdvice = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const response = await fetch("http://localhost:3000/api/advice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              lat,
              lon,
              crop: selectedCrop,
              userId
            }),
          });
          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.message || "Failed to fetch advice from server");
          }
          const data = await response.json();
          setCounty(data.county || "");
          const parsedSoilData = {
            ph: Number(data.soilData?.ph) || 0,
            nitrogen: Number(data.soilData?.nitrogen ?? data.soilData?.n) || 0,
            phosphorus: Number(data.soilData?.phosphorus ?? data.soilData?.p) || 0,
            potassium: Number(data.soilData?.potassium ?? data.soilData?.k) || 0,
          };
          setSoilData(parsedSoilData);
          setRecommendations({
          crop: data.recommendations?.crop || "",
          soil: data.recommendations?.soil || "",
          weather: data.recommendations?.weather || "",
          alternativeCrops: data.recommendations?.alternativeCrops || [],
        });
        setTotalRain(Number(data.totalRain) || 0);
        // If you want to show weatherData for the detected county, you can extract it here:
        // Example: setWeatherData(data.weatherData || {});
        setWeatherForecast([]); // Not provided in your sample, so leave empty or map if available
        // Parse history if present and convert soil values for each item
        setHistory(
          Array.isArray(data.history)
            ? data.history.map((item) => ({
                ...item,
                soilData: {
                  ph: Number(item.soilData?.ph) || 0,
                  nitrogen: Number(item.soilData?.nitrogen ?? item.soilData?.n) || 0,
                  phosphorus: Number(item.soilData?.phosphorus ?? item.soilData?.p) || 0,
                  potassium: Number(item.soilData?.potassium ?? item.soilData?.k) || 0,
                },
              }))
            : []
        );
      } catch (err: any) {
        setError(`Error fetching advice: ${err.message}. Please try again.`);
      } finally {
        setLoading(false);
      }
    },
    (geoError) => {
      setError(`Error getting location: ${geoError.message}. Please try again or enter a county manually.`);
      setLoading(false);
    }
  );
};

  // Dummy sign out handler
  const handleSignOut = () => {
    // Implement sign out logic if needed
  };

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
              disabled={loading}
            >
              {loading ? "Loading..." : "Get My Location and Advice"}
            </Button>
            {error && (
              <div className="mt-2 flex items-center gap-2">
                <p className="text-red-600">{error}</p>
                <Button
                  onClick={() => setError("")}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Clear Error
                </Button>
              </div>
            )}
            {/* Weather data for county is not available directly; handled in weatherForecast section below */}
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
  );
};

export default Dashboard;
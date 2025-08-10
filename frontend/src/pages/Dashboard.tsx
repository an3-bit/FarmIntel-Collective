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
  History
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [county, setCounty] = useState("");
  const [soilData, setSoilData] = useState({ ph: "", n: "", p: "", k: "" });
  const [recommendations, setRecommendations] = useState({ crop: "", soil: "", weather: "" });
  const [totalRain, setTotalRain] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("maize");
  const [weatherData, setWeatherData] = useState({ kakamega: null, siaya: null, nairobi: null });
  const [history, setHistory] = useState([]);
  const [userId] = useState("default_user"); // Mock userId, replace with auth system

  const crops = [
    "Maize",
    "Sorghum",
    "Millet",
    "Wheat",
    "Beans",
    "Peas",
    "Lentils",
    "Groundnuts"
  ];

  const handleSignOut = () => {
    navigate("/");
  };

  const getLocationAndAdvice = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLoading(true);
        setError("");

        try {
          const response = await fetch('http://localhost:5000/api/advice', { // Adjust URL to match backend
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lat, lon, crop: selectedCrop, userId }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch advice');
          }

          const data = await response.json();
          setCounty(data.county);
          setSoilData(data.soilData);
          setRecommendations(data.recommendations);
          setTotalRain(data.totalRain);
          setWeatherData(data.weatherData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }, (error) => {
        setError("Error getting location: " + error.message);
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/profile/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
      const data = await response.json();
      setHistory(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="flex h-screen bg-white">
      {/* Dark Sidebar */}
      <div className="w-64 bg-slate-800 text-white flex flex-col">
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
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

          {/* Location and Crop Selection Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location:
            </label>
            <Button onClick={getLocationAndAdvice} className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? 'Loading...' : 'Get My Location and Advice'}
            </Button>
            {error && <p className="mt-2 text-red-600">{error}</p>}
            {county && <p className="mt-2 text-gray-700">Detected County: {county}</p>}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Crop:
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                {crops.map((crop) => (
                  <option key={crop} value={crop.toLowerCase()}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {soilData.ph && (
            <>
              {/* Soil Data Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Soil Data</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-white border border-gray-200">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-600">pH</div>
                      <div className="text-2xl font-bold text-gray-900">{soilData.ph}</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border border-gray-200">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-600">Nitrogen (N)</div>
                      <div className="text-2xl font-bold text-gray-900">{soilData.n}</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border border-gray-200">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-600">Phosphorus (P)</div>
                      <div className="text-2xl font-bold text-gray-900">{soilData.p}</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border border-gray-200">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-600">Potassium (K)</div>
                      <div className="text-2xl font-bold text-gray-900">{soilData.k}</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Crop to Plant Section */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Crop Recommendations</h2>
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-600" size={20} />
                      <div>
                        <div className="font-medium text-gray-900">Recommended crop: {recommendations.crop}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Weather Summary Section */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Weather Summary (Last 7 Days)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weatherData.kakamega && (
                    <Card className="bg-white border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="text-red-600" size={20} />
                          <div>
                            <div className="font-medium text-gray-900">Kakamega</div>
                            <div className="text-gray-600">Temperature: {weatherData.kakamega.temperature}</div>
                            <div className="text-gray-600">Rainfall: {weatherData.kakamega.rainfall}</div>
                            <div className="text-gray-600">Humidity: {weatherData.kakamega.humidity}</div>
                            <div className="text-gray-600">Forecast: {weatherData.kakamega.forecast}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  {weatherData.siaya && (
                    <Card className="bg-white border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="text-red-600" size={20} />
                          <div>
                            <div className="font-medium text-gray-900">Siaya</div>
                            <div className="text-gray-600">Temperature: {weatherData.siaya.temperature}</div>
                            <div className="text-gray-600">Rainfall: {weatherData.siaya.rainfall}</div>
                            <div className="text-gray-600">Humidity: {weatherData.siaya.humidity}</div>
                            <div className="text-gray-600">Forecast: {weatherData.siaya.forecast}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  {weatherData.nairobi && (
                    <Card className="bg-white border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="text-red-600" size={20} />
                          <div>
                            <div className="font-medium text-gray-900">Nairobi</div>
                            <div className="text-gray-600">Temperature: {weatherData.nairobi.temperature}</div>
                            <div className="text-gray-600">Rainfall: {weatherData.nairobi.rainfall}</div>
                            <div className="text-gray-600">Humidity: {weatherData.nairobi.humidity}</div>
                            <div className="text-gray-600">Forecast: {weatherData.nairobi.forecast}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
                <Card className="bg-white border border-gray-200 mt-4">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="text-red-600" size={20} />
                      <div>
                        <div className="font-medium text-gray-900">Total Rainfall: {totalRain} mm</div>
                        <div className="text-gray-600">{recommendations.weather}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Soil Improvement Section */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Soil Improvement</h2>
                <Card className="bg-white border border-gray-200 max-w-md">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Wrench className="text-orange-600" size={20} />
                      <div>
                        <div className="font-medium text-gray-900">{recommendations.soil}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search History Section */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Search History</h2>
                <div className="space-y-4">
                  {history.map((item, index) => (
                    <Card key={index} className="bg-white border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <History className="text-blue-600" size={20} />
                          <div>
                            <div className="font-medium text-gray-900">County: {item.county}</div>
                            <div className="text-gray-600">Crop: {item.recommendations_crop}</div>
                            <div className="text-gray-600">Soil: pH {item.soilData_ph}, N {item.soilData_n}, P {item.soilData_p}, K {item.soilData_k}</div>
                            <div className="text-gray-600">Recommendation: {item.recommendations_soil}</div>
                            <div className="text-gray-600">Date: {new Date(item.createdAt).toLocaleString()}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
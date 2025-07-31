import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Droplets, 
  Thermometer, 
  Sprout, 
  MapPin, 
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface DashboardProps {
  farmData?: {
    location: string;
    size: number;
    crops: string[];
  };
  weatherData?: {
    temperature: number;
    humidity: number;
    rainfall: number;
    forecast: string;
  };
  soilData?: {
    ph: number;
    nitrogen: string;
    phosphorus: string;
    potassium: string;
  };
}

const Dashboard = ({ farmData, weatherData, soilData }: DashboardProps) => {
  const defaultFarmData = {
    location: "Kigali, Rwanda",
    size: 2.5,
    crops: ["Maize", "Beans", "Sweet Potato"]
  };

  const defaultWeatherData = {
    temperature: 24,
    humidity: 65,
    rainfall: 85,
    forecast: "Partly cloudy with light rain expected"
  };

  const defaultSoilData = {
    ph: 6.5,
    nitrogen: "Medium",
    phosphorus: "Low",
    potassium: "High"
  };

  const farm = farmData || defaultFarmData;
  const weather = weatherData || defaultWeatherData;
  const soil = soilData || defaultSoilData;

  const getStatusColor = (value: string) => {
    switch (value.toLowerCase()) {
      case 'high': return 'success';
      case 'medium': return 'warning';
      case 'low': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Farm Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your farm overview.</p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={16} />
            <span>{farm.location}</span>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Farm Overview */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Farm Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{farm.size} hectares</div>
              <div className="text-sm text-muted-foreground mt-1">
                {farm.crops.length} active crops
              </div>
            </CardContent>
          </Card>

          {/* Weather */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Thermometer size={16} />
                Temperature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{weather.temperature}°C</div>
              <div className="text-sm text-muted-foreground mt-1">
                {weather.humidity}% humidity
              </div>
            </CardContent>
          </Card>

          {/* Rainfall */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Droplets size={16} />
                Rainfall
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{weather.rainfall}mm</div>
              <div className="text-sm text-muted-foreground mt-1">
                This month
              </div>
            </CardContent>
          </Card>

          {/* Soil pH */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Sprout size={16} />
                Soil pH
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{soil.ph}</div>
              <div className="text-sm text-success mt-1 flex items-center gap-1">
                <CheckCircle size={12} />
                Optimal range
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Crops */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="text-success" />
                My Crops
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {farm.crops.map((crop, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span className="font-medium">{crop}</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
              ))}
              <button className="w-full p-3 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                + Add New Crop
              </button>
            </CardContent>
          </Card>

          {/* Soil Analysis */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Soil Nutrients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Nitrogen (N)</span>
                <Badge variant={getStatusColor(soil.nitrogen)}>{soil.nitrogen}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Phosphorus (P)</span>
                <Badge variant={getStatusColor(soil.phosphorus)}>{soil.phosphorus}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Potassium (K)</span>
                <Badge variant={getStatusColor(soil.potassium)}>{soil.potassium}</Badge>
              </div>
              {soil.phosphorus === "Low" && (
                <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-center gap-2 text-warning">
                    <AlertTriangle size={16} />
                    <span className="font-medium">Low Phosphorus Detected</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Consider adding phosphorus-rich fertilizer
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Weather Forecast */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="text-accent" />
              7-Day Weather Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-sky/10 p-4 rounded-lg">
              <p className="text-foreground font-medium">{weather.forecast}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {['Today', 'Tomorrow', 'Day 3', 'Day 4'].map((day, index) => (
                  <div key={day} className="text-center p-3 bg-card/50 rounded-lg">
                    <div className="text-sm text-muted-foreground">{day}</div>
                    <div className="text-lg font-bold text-primary">{24 + index}°C</div>
                    <div className="text-xs text-accent">{30 + index * 10}% rain</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-success" />
              Today's Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-success/10 border border-success/20 rounded-lg">
              <CheckCircle className="text-success mt-0.5" size={16} />
              <div>
                <p className="font-medium text-success">Perfect Planting Weather</p>
                <p className="text-sm text-muted-foreground">Great conditions for sowing maize today</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <AlertTriangle className="text-warning mt-0.5" size={16} />
              <div>
                <p className="font-medium text-warning">Fertilizer Needed</p>
                <p className="text-sm text-muted-foreground">Apply phosphorus fertilizer to boost crop growth</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
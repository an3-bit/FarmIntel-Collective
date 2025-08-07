import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  BarChart3, 
  FileText, 
  Settings,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Wrench,
  Menu,
  X,
  Home,
  Cloud,
  Droplets,
  Sprout
} from "lucide-react";

const Dashboard = () => {
  const [location, setLocation] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, active: true },
    { name: "Analysis", icon: BarChart3, active: false },
    { name: "Data", icon: FileText, active: false },
    { name: "Settings", icon: Settings, active: false },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-card border-r transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h1 className="text-sm font-semibold text-foreground">
            CLIMATE-SMART SOIL ADVISOR
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="p-2"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Desktop App Title */}
        <div className="hidden lg:block p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-sm font-semibold text-foreground">
              CLIMATE-SMART SOIL ADVISOR
            </h1>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left
                  ${item.active 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                `}>
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Sign Out */}
        <div className="p-4 border-t border-border">
          <button 
            onClick={handleSignOut}
            className="w-full text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="p-2"
          >
            <Menu size={20} />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
          <div className="w-8" /> {/* Spacer for center alignment */}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Desktop Page Title */}
            <h1 className="hidden lg:block text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Dashboard</h1>

            {/* Location Section */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-sm font-medium text-foreground mb-2">
                Location:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 sm:max-w-md"
                />
                <Button className="w-full sm:w-auto">
                  Submit
                </Button>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Card className="bg-gradient-primary text-primary-foreground">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 sm:w-5 sm:h-5" />
                    <div>
                      <div className="text-xs text-primary-foreground/80">Weather</div>
                      <div className="text-sm sm:text-base font-semibold">Sunny</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-earth text-white">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 sm:w-5 sm:h-5" />
                    <div>
                      <div className="text-xs text-white/80">Soil</div>
                      <div className="text-sm sm:text-base font-semibold">Good</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-sky text-white">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2">
                    <Sprout className="w-4 h-4 sm:w-5 sm:h-5" />
                    <div>
                      <div className="text-xs text-white/80">Crops</div>
                      <div className="text-sm sm:text-base font-semibold">3 Active</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-accent text-accent-foreground">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <div>
                      <div className="text-xs opacity-80">Yield</div>
                      <div className="text-sm sm:text-base font-semibold">+15%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {/* Soil Data Section */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Soil Data</h2>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <Card className="shadow-card">
                    <CardContent className="p-3 sm:p-4">
                      <div className="text-xs sm:text-sm text-muted-foreground">pH</div>
                      <div className="text-xl sm:text-2xl font-bold text-foreground">6.1</div>
                      <Badge variant="secondary" className="mt-1 text-xs">Optimal</Badge>
                    </CardContent>
                  </Card>
                  <Card className="shadow-card">
                    <CardContent className="p-3 sm:p-4">
                      <div className="text-xs sm:text-sm text-muted-foreground">Nitrogen (N)</div>
                      <div className="text-xl sm:text-2xl font-bold text-foreground">11</div>
                      <Badge variant="outline" className="mt-1 text-xs">Low</Badge>
                    </CardContent>
                  </Card>
                  <Card className="shadow-card">
                    <CardContent className="p-3 sm:p-4">
                      <div className="text-xs sm:text-sm text-muted-foreground">Phosphorus (P)</div>
                      <div className="text-xl sm:text-2xl font-bold text-foreground">18</div>
                      <Badge variant="secondary" className="mt-1 text-xs">Good</Badge>
                    </CardContent>
                  </Card>
                  <Card className="shadow-card">
                    <CardContent className="p-3 sm:p-4">
                      <div className="text-xs sm:text-sm text-muted-foreground">Potassium (K)</div>
                      <div className="text-xl sm:text-2xl font-bold text-foreground">25</div>
                      <Badge variant="secondary" className="mt-1 text-xs">Good</Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Crop to Plant Section */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Crop Recommendations</h2>
                <div className="space-y-3 sm:space-y-4">
                  <Card className="shadow-card">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-success flex-shrink-0 mt-0.5" size={20} />
                        <div className="flex-1">
                          <div className="font-medium text-foreground">Recommended crop: Maize</div>
                          <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                            High suitability for current soil conditions
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="shadow-card">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="text-warning flex-shrink-0 mt-0.5" size={20} />
                        <div className="flex-1">
                          <div className="font-medium text-foreground">Weather Alert</div>
                          <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Rain expected in 3 days - prepare for planting
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="shadow-card">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start gap-3">
                        <Sprout className="text-primary flex-shrink-0 mt-0.5" size={20} />
                        <div className="flex-1">
                          <div className="font-medium text-foreground">Alternative: Sorghum</div>
                          <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Drought-resistant option for dry season
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Soil Improvement Section */}
            <div className="mt-6 sm:mt-8">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Soil Improvement</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <Card className="shadow-card">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      <Wrench className="text-accent flex-shrink-0 mt-0.5" size={20} />
                      <div className="flex-1">
                        <div className="font-medium text-foreground">Apply Compost</div>
                        <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                          Increase nitrogen levels
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-card">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      <Droplets className="text-primary flex-shrink-0 mt-0.5" size={20} />
                      <div className="flex-1">
                        <div className="font-medium text-foreground">Improve Drainage</div>
                        <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                          Add organic matter
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-card">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="text-success flex-shrink-0 mt-0.5" size={20} />
                      <div className="flex-1">
                        <div className="font-medium text-foreground">Test Again</div>
                        <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                          In 3 months
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
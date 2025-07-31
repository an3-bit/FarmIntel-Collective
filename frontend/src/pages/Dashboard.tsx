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
  Wrench
} from "lucide-react";

const Dashboard = () => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Dark Sidebar */}
      <div className="w-64 bg-slate-800 text-white flex flex-col">
        {/* App Title */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-sm font-semibold tracking-wide">
            CLIMATE-SMART SOIL ADVISOR
          </h1>
        </div>
        
        {/* Navigation */}
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
                <Settings size={18} />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
        
        {/* Sign Out */}
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
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

          {/* Location Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location:
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="max-w-md"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                Submit
              </Button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Soil Data Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Soil Data</h2>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">pH</div>
                    <div className="text-2xl font-bold text-gray-900">6.1</div>
                  </CardContent>
                </Card>
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">Nitrogen (N)</div>
                    <div className="text-2xl font-bold text-gray-900">11</div>
                  </CardContent>
                </Card>
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">Phosphorus (P)</div>
                    <div className="text-2xl font-bold text-gray-900">18</div>
                  </CardContent>
                </Card>
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">Potassium (K)</div>
                    <div className="text-2xl font-bold text-gray-900">25</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Crop to Plant Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Crop to Plant</h2>
              <div className="space-y-4">
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-600" size={20} />
                      <div>
                        <div className="font-medium text-gray-900">Recommended crop: Maize</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="text-red-600" size={20} />
                      <div>
                        <div className="font-medium text-gray-900">Weather Alert</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Soil Improvement Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Soil Improvement</h2>
            <Card className="bg-white border border-gray-200 max-w-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Wrench className="text-orange-600" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Suggestion: Apply compost</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
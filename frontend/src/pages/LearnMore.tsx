import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  TrendingUp, 
  Cloud, 
  Droplets, 
  Sprout, 
  Users, 
  Smartphone, 
  BarChart3,
  CheckCircle,
  Star,
  Quote,
  ArrowRight,
  MapPin,
  Thermometer,
  Leaf
} from "lucide-react";
import AuthModal from "@/components/AuthModal";

const LearnMore = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "AI-Powered Crop Recommendations",
      description: "Get intelligent suggestions for the best crops to plant based on your soil composition, local climate, and market trends.",
      image: "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      benefits: ["Increase yield by 25%", "Reduce crop failure", "Optimize planting times"]
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Advanced Soil Analysis",
      description: "Upload soil test results or get AI predictions for NPK levels, pH balance, and soil health indicators.",
      image: "https://images.pexels.com/photos/29288253/pexels-photo-29288253.jpeg",
      benefits: ["Precise nutrient management", "Soil health monitoring", "Fertilizer optimization"]
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Weather Forecasting & Alerts",
      description: "Get 7-day weather predictions with rainfall alerts, temperature forecasts, and planting recommendations.",
      image: "https://images.pexels.com/photos/8890451/pexels-photo-8890451.jpeg",
      benefits: ["Real-time weather updates", "Storm alerts", "Optimal planting windows"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Yield Analytics & Insights",
      description: "Track your farm's performance with detailed analytics, yield predictions, and actionable insights.",
      image: "https://images.pexels.com/photos/9374827/pexels-photo-9374827.jpeg",
      benefits: ["Performance tracking", "Yield optimization", "Data-driven decisions"]
    }
  ];

  const testimonials = [
    {
      name: "John Mwangi",
      role: "Maize Farmer",
      location: "Nakuru, Kenya",
      rating: 5,
      content: "This app has transformed my farming. I've seen a 30% increase in my maize yield since using the AI recommendations. The weather alerts are incredibly accurate!",
      avatar: "https://images.pexels.com/photos/20371811/pexels-photo-20371811/free-photo-of-smiling-farmer-standing-on-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      name: "Sarah Ochieng",
      role: "Coffee Farmer",
      location: "Kiambu, Kenya",
      rating: 5,
      content: "The soil analysis feature helped me understand exactly what my coffee plants needed. My harvest quality has improved significantly, and I'm getting better prices at the market.",
      avatar: "https://images.pexels.com/photos/1719669/pexels-photo-1719669.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      name: "David Kamau",
      role: "Mixed Crop Farmer",
      location: "Eldoret, Kenya",
      rating: 5,
      content: "As a small-scale farmer, I was skeptical about technology, but this app is so easy to use. The yield predictions are spot-on, and I've reduced my fertilizer costs by 40%.",
      avatar: "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Farmers Using Our Platform" },
    { number: "25%", label: "Average Yield Increase" },
    { number: "95%", label: "Weather Forecast Accuracy" },
    { number: "24/7", label: "AI Support Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center gap-2">
              <Sprout className="w-6 h-6 text-green-600" />
              <span className="text-xl font-bold text-gray-900">Climate-Smart Soil Advisor</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover How Smart Farming
            <span className="block text-green-200">Transforms Agriculture</span>
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Learn how our AI-powered platform helps farmers increase yields, reduce costs, 
            and make data-driven decisions for better farming outcomes.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Farming
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of tools combines cutting-edge AI technology with 
              practical farming knowledge to deliver real results.
            </p>
          </div>

          <div className="space-y-20">
            {features.map((feature, index) => (
              <div key={index} className={`flex flex-col lg:flex-row gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className="lg:w-1/2">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                          {feature.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                      <div className="space-y-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                      <Leaf className="w-4 h-4" />
                      Feature #{index + 1}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">{feature.description}</p>
                    <div className="grid grid-cols-1 gap-4">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="font-medium text-gray-900">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Farmers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied farmers who have transformed their agricultural practices 
              with our smart farming platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-green-200 mb-4" />
                  <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using our platform to increase their yields 
            and make smarter farming decisions. Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-green-700 hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-lg"
              onClick={handleGetStarted}
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="default" 
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
              onClick={handleBackToHome}
            >
              Back to Home
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-green-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm">No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm">14-Day Free Trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm">Cancel Anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default LearnMore; 
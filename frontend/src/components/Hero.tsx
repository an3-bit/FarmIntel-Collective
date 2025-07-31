import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Users, TrendingUp, CheckCircle, Sprout, Cloud, Droplets } from "lucide-react";
import AuthModal from "./AuthModal";

const Hero = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const backgroundImages = [
    "https://images.pexels.com/photos/7728016/pexels-photo-7728016.jpeg",
    "https://images.pexels.com/photos/20371811/pexels-photo-20371811/free-photo-of-smiling-farmer-standing-on-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1719669/pexels-photo-1719669.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  ];

  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  const handleLearnMore = () => {
    navigate("/learn-more");
  };

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="h-screen">
      {/* Hero Section */}
      <section className="relative h-full bg-gradient-earth overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <img 
              key={index}
              src={image}
              alt={`Farming background ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-80' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-4xl mx-auto px-6 w-full text-center">
            {/* Welcome Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sprout className="w-4 h-4 text-green-300" />
              <span className="text-white text-sm font-medium">Welcome to Your Climate-Smart Soil Advisor</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Smart Farming for
              <span className="block text-accent drop-shadow-lg"> Better Yields</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Get personalized crop recommendations, soil analysis, and weather forecasts 
              to maximize your harvest and optimize your farming decisions.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-white/90">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-sm">AI-Powered Insights</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/90">
                <Cloud className="w-5 h-5 text-blue-300" />
                <span className="text-sm">Weather Forecasts</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/90">
                <Droplets className="w-5 h-5 text-cyan-300" />
                <span className="text-sm">Soil Analysis</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-lg"
                onClick={handleGetStarted}
              >
                Get Started Free
              </Button>
              {/* <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                onClick={handleGetStarted}
              >
                Sign Up Now
              </Button> */}
              <Button 
                size="lg" 
                variant="default" 
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                onClick={handleLearnMore}
              >
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">50,000+ Farmers Trust Us</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">95% Weather Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">24/7 AI Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
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

export default Hero;
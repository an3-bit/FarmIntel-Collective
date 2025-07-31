import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Users, TrendingUp, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-farming.jpg";
import appMockup from "@/assets/app-mockup.jpg";

const Hero = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-earth overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Agricultural landscape" 
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Smart Farming for
                <span className="block text-accent"> Better Yields</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
                Get personalized crop recommendations, soil analysis, and weather forecasts 
                to maximize your harvest and optimize your farming decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={appMockup} 
                alt="Climate-Smart Soil & Crop Advisor App" 
                className="w-full max-w-md mx-auto rounded-3xl shadow-elevated"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Smart Farming
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform combines local weather data, soil analysis, and expert 
              agricultural knowledge to give you actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="shadow-card hover:shadow-elevated transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Crop Recommendations</h3>
                <p className="text-muted-foreground">
                  Get AI-powered suggestions for the best crops to plant based on your soil and climate.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-sky rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Soil Analysis</h3>
                <p className="text-muted-foreground">
                  Upload soil test results or get AI predictions for NPK levels and pH balance.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-earth rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Smartphone className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Weather Forecasts</h3>
                <p className="text-muted-foreground">
                  Get 7-day weather predictions with rainfall alerts and planting recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
                <p className="text-muted-foreground">
                  Connect with agricultural experts and access a library of farming best practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-xl text-muted-foreground">Farmers Helped</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-success mb-2">25%</div>
              <div className="text-xl text-muted-foreground">Average Yield Increase</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">95%</div>
              <div className="text-xl text-muted-foreground">Weather Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of farmers who are already using our platform to increase their yields 
            and make smarter farming decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
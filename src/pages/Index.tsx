import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {currentView === 'home' ? (
        <div>
          <Hero />
          <div className="py-20 bg-muted/30">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                See Your Dashboard in Action
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Take a look at what your farming dashboard could look like with real data and insights.
              </p>
              <button
                onClick={() => setCurrentView('dashboard')}
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium"
              >
                View Demo Dashboard
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-16">
          <div className="bg-primary/5 border-b border-primary/10 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-primary">Demo Dashboard</h2>
                <p className="text-sm text-muted-foreground">
                  This is a preview of your personalized farming dashboard
                </p>
              </div>
              <button
                onClick={() => setCurrentView('home')}
                className="text-sm text-primary hover:text-primary/80 underline"
              >
                ← Back to Home
              </button>
            </div>
          </div>
          <Dashboard />
        </div>
      )}
    </div>
  );
};

export default Index;

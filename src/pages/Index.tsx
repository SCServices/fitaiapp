
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import WorkoutList from '@/components/workouts/WorkoutList';
import { Button } from "@/components/ui/button";
import { Sparkles } from 'lucide-react';
import { mockWorkouts } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import OnboardingForm from '@/components/onboarding/OnboardingForm';

const Index = () => {
  const navigate = useNavigate();
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has completed onboarding
    const userPrefs = localStorage.getItem('fitai_user_preferences');
    
    if (userPrefs) {
      setIsOnboarded(true);
    }
    
    setLoading(false);
  }, []);

  const generateNewWorkout = () => {
    // In a real app, this would call the AI to generate a new workout
    // For now, we'll just display a success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-10 bg-primary/30 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-24 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (!isOnboarded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Welcome to FitAI</h1>
          <p className="text-gray-600">Your personalized fitness coach</p>
        </div>
        <OnboardingForm />
      </div>
    );
  }

  return (
    <Layout>
      <div className="py-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Workouts</h2>
          <Button 
            onClick={generateNewWorkout}
            className="bg-primary text-white hover:bg-primary/90 flex items-center gap-1"
            size="sm"
          >
            <Sparkles className="h-4 w-4" />
            Generate New
          </Button>
        </div>
        
        <WorkoutList workouts={mockWorkouts} />
      </div>
    </Layout>
  );
};

export default Index;

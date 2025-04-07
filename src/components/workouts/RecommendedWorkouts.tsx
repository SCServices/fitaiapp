
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw } from 'lucide-react';
import WorkoutList from './WorkoutList';
import { WorkoutType } from '@/types/workout';
import { mockWorkouts } from '@/data/mockData';

const RecommendedWorkouts: React.FC = () => {
  const [recommendations, setRecommendations] = useState<WorkoutType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would call an API endpoint with user preferences
    // For now, we'll simulate a recommendation algorithm using localStorage data
    generateRecommendations();
  }, []);

  const generateRecommendations = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Get user preferences
      const userPrefs = JSON.parse(localStorage.getItem('fitai_user_preferences') || '{}');
      const userFeedback = JSON.parse(localStorage.getItem('fitai_workout_feedback') || '[]');
      
      let filteredWorkouts = [...mockWorkouts];
      
      // Filter by difficulty if preference exists
      if (userPrefs.preferredDifficulty) {
        filteredWorkouts = filteredWorkouts.filter(
          workout => workout.difficulty === userPrefs.preferredDifficulty
        );
      }
      
      // If no workouts match the preference, include all workouts
      if (filteredWorkouts.length === 0) {
        filteredWorkouts = [...mockWorkouts];
      }
      
      // If there's feedback, prioritize workouts similar to liked ones
      if (userFeedback.length > 0) {
        // Find workouts that were liked
        const likedWorkoutIds = userFeedback
          .filter((feedback: any) => feedback.rating === 'like')
          .map((feedback: any) => feedback.workoutId);
        
        // Get the categories of liked workouts
        const likedCategories = mockWorkouts
          .filter(workout => likedWorkoutIds.includes(workout.id))
          .map(workout => workout.category);
        
        // Prioritize workouts in similar categories
        if (likedCategories.length > 0) {
          filteredWorkouts.sort((a, b) => {
            const aInPreferredCategory = likedCategories.includes(a.category) ? 1 : 0;
            const bInPreferredCategory = likedCategories.includes(b.category) ? 1 : 0;
            return bInPreferredCategory - aInPreferredCategory;
          });
        }
      }
      
      // Take top 2 recommendations
      setRecommendations(filteredWorkouts.slice(0, 2));
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Recommended For You</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-32 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-32 bg-gray-100 animate-pulse rounded-md"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Sparkles className="h-4 w-4 text-primary mr-2" />
            Recommended For You
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={generateRecommendations}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <WorkoutList workouts={recommendations} />
      </CardContent>
    </Card>
  );
};

export default RecommendedWorkouts;

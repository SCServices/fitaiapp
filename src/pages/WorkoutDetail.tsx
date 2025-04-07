
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import { Clock, PlayCircle, ChevronLeft, Dumbbell, Share2 } from 'lucide-react';
import { toast } from "sonner";
import { mockWorkouts } from '@/data/mockData';
import { WorkoutType } from '@/types/workout';

const WorkoutDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<WorkoutType | undefined>(
    mockWorkouts.find(w => w.id === id)
  );

  if (!workout) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-medium mb-2">Workout not found</h2>
          <p className="text-gray-500 mb-4">The workout you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>Back to Workouts</Button>
        </div>
      </Layout>
    );
  }

  const handleStartWorkout = () => {
    navigate(`/workout-execution/${workout.id}`);
  };
  
  const handleShare = () => {
    toast.success("Workout shared successfully!");
  };

  return (
    <Layout>
      <div className="py-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-4"
          size="sm"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">{workout.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                {workout.category}
              </Badge>
              <div className="flex items-center text-gray-600 text-sm">
                <Clock className="h-3 w-3 mr-1" />
                {workout.duration} min
              </div>
            </div>
          </div>
          <Badge 
            variant={workout.difficulty === 'Easy' ? "outline" : 
                    workout.difficulty === 'Medium' ? "secondary" : 
                    "default"}
            className={workout.difficulty === 'Easy' ? "bg-green-50 text-green-700 border-green-200" :
                      workout.difficulty === 'Medium' ? "bg-orange-50 text-orange-700 border-orange-200" :
                      "bg-red-50 text-red-700 border-red-200"}
          >
            {workout.difficulty}
          </Badge>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="font-medium mb-2">About this workout</h2>
            <p className="text-gray-600">{workout.description}</p>
          </CardContent>
        </Card>
        
        <div className="mb-6">
          <h2 className="font-medium mb-4">Exercises</h2>
          <div className="space-y-3">
            {workout.exercises.map((exercise, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-md mr-3">
                        <Dumbbell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{exercise.name}</h3>
                        <p className="text-sm text-gray-500">
                          {exercise.sets} × {exercise.reps}
                        </p>
                      </div>
                    </div>
                    {exercise.restTime && (
                      <div className="text-sm text-gray-500">
                        Rest: {exercise.restTime}s
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t">
          <div className="container mx-auto max-w-lg flex justify-between">
            <Button
              variant="outline"
              onClick={handleShare}
              className="w-[30%]"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button 
              onClick={handleStartWorkout} 
              className="bg-primary text-white w-[65%]"
            >
              <PlayCircle className="h-5 w-5 mr-2" />
              Start Workout
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkoutDetail;

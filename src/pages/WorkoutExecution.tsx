
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CircleX, ChevronLeft, ChevronRight, Play, Pause, CheckCircle2 } from 'lucide-react';
import { toast } from "sonner";
import { mockWorkouts } from '@/data/mockData';
import { WorkoutType, Exercise } from '@/types/workout';

const WorkoutExecution = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<WorkoutType | undefined>(
    mockWorkouts.find(w => w.id === id)
  );
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const currentExercise = workout?.exercises[currentExerciseIndex];
  const progress = workout ? ((currentExerciseIndex + (isResting ? 0.5 : 0)) / workout.exercises.length) * 100 : 0;
  
  // Setup timer
  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerRunning]);
  
  // Handle navigation if workout not found
  useEffect(() => {
    if (!workout) {
      toast.error("Workout not found");
      navigate('/');
    }
  }, [workout, navigate]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };
  
  const handleNextExercise = () => {
    if (!workout) return;
    
    if (isResting) {
      setIsResting(false);
    } else {
      const nextExerciseIndex = currentExerciseIndex + 1;
      
      if (nextExerciseIndex < workout.exercises.length) {
        // Check if there's a rest period between exercises
        const currentEx = workout.exercises[currentExerciseIndex];
        if (currentEx.restTime && currentEx.restTime > 0) {
          setIsResting(true);
        } else {
          setCurrentExerciseIndex(nextExerciseIndex);
        }
      } else {
        // Workout completed
        completeWorkout();
      }
    }
  };
  
  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setIsResting(false);
    }
  };
  
  const completeWorkout = () => {
    setWorkoutCompleted(true);
    setIsTimerRunning(false);
    
    // In a real app, save the workout completion to user's history
    const userData = JSON.parse(localStorage.getItem('fitai_user_stats') || '{}');
    const updatedStats = {
      ...userData,
      totalWorkouts: (userData.totalWorkouts || 0) + 1,
      totalMinutes: (userData.totalMinutes || 0) + Math.round(timer / 60),
      currentStreak: (userData.currentStreak || 0) + 1,
      bestStreak: Math.max((userData.bestStreak || 0), (userData.currentStreak || 0) + 1),
      completionRate: 100, // Simplified for demo
      lastWorkoutDate: new Date().toISOString()
    };
    
    localStorage.setItem('fitai_user_stats', JSON.stringify(updatedStats));
    toast.success("Workout completed! Great job!");
  };
  
  const handleExit = () => {
    if (!workoutCompleted && timer > 30) {
      // Ask for confirmation before exiting
      if (window.confirm("Are you sure you want to exit? Your progress will not be saved.")) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };
  
  if (!workout || !currentExercise) return null;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 border-b flex items-center justify-between">
        <Button variant="ghost" onClick={handleExit} size="sm">
          <CircleX className="h-5 w-5 text-gray-500" />
        </Button>
        <div className="text-center">
          <h1 className="text-lg font-medium">{workout.name}</h1>
          <p className="text-sm text-gray-500">
            {currentExerciseIndex + 1} of {workout.exercises.length} exercises
          </p>
        </div>
        <div className="w-8"></div> {/* Empty div for flex alignment */}
      </header>
      
      {/* Progress bar */}
      <Progress value={progress} className="h-1 rounded-none" />
      
      {/* Main content */}
      <main className="flex-1 p-4 container mx-auto max-w-lg flex flex-col">
        {workoutCompleted ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="mb-6 bg-primary/10 p-6 rounded-full">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Workout Complete!</h2>
            <p className="text-gray-600 mb-4">Great job! You've finished your workout.</p>
            <p className="text-xl font-medium mb-6">Total time: {formatTime(timer)}</p>
            <Button onClick={() => navigate('/')} className="w-full">
              Back to Home
            </Button>
          </div>
        ) : (
          <>
            {/* Timer */}
            <Card className="mb-6">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h2 className="text-sm font-medium text-gray-500">Elapsed Time</h2>
                  <p className="text-2xl font-bold">{formatTime(timer)}</p>
                </div>
                <Button 
                  onClick={toggleTimer} 
                  variant="outline" 
                  size="icon"
                  className={isTimerRunning ? "bg-primary/10" : ""}
                >
                  {isTimerRunning ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
              </CardContent>
            </Card>
            
            {/* Current exercise */}
            <Card className="mb-6 flex-1 flex flex-col">
              <CardContent className="p-4 flex-1 flex flex-col">
                {isResting ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <h2 className="text-xl font-bold mb-4">Rest Time</h2>
                    <p className="text-gray-600 mb-4">Take a brief rest before the next exercise</p>
                    <p className="text-3xl font-bold text-primary mb-6">
                      {workout.exercises[currentExerciseIndex].restTime || 30} seconds
                    </p>
                    <p className="text-sm text-gray-500">Next: {currentExerciseIndex + 1 < workout.exercises.length ? 
                      workout.exercises[currentExerciseIndex + 1].name : "Workout Complete"}</p>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-xl font-bold mb-2">{currentExercise.name}</h2>
                    <div className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full self-start mb-4">
                      {currentExercise.sets} × {currentExercise.reps}
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center justify-center">
                      {/* In a real app, we would show exercise images/videos here */}
                      <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                        <p className="text-gray-500">Exercise demonstration</p>
                      </div>
                      
                      <ul className="text-gray-600 self-start">
                        <li className="mb-1">• Keep your back straight</li>
                        <li className="mb-1">• Breathe evenly throughout</li>
                        <li>• Maintain proper form</li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </main>
      
      {/* Navigation buttons */}
      {!workoutCompleted && (
        <div className="p-4 bg-white border-t">
          <div className="container mx-auto max-w-lg flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePreviousExercise}
              disabled={currentExerciseIndex === 0}
              className="w-[30%]"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Previous
            </Button>
            <Button 
              onClick={handleNextExercise}
              className="bg-primary text-white w-[65%]"
            >
              {isResting || currentExerciseIndex < workout.exercises.length - 1 ? (
                <>
                  Next
                  <ChevronRight className="h-5 w-5 ml-1" />
                </>
              ) : (
                <>
                  Complete
                  <CheckCircle2 className="h-5 w-5 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutExecution;


import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

const OnboardingForm = () => {
  const navigate = useNavigate();
  const [goal, setGoal] = useState('');
  const [timePerDay, setTimePerDay] = useState('');
  const [equipment, setEquipment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!goal || !timePerDay || !equipment) {
      toast.error("Please fill out all fields");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Save preferences to localStorage for now
      localStorage.setItem('fitai_user_preferences', JSON.stringify({
        goal,
        timePerDay,
        equipment,
        createdAt: new Date().toISOString()
      }));
      
      toast.success("Your personalized plan is ready!");
      setIsLoading(false);
      navigate('/');
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Get Started with FitAI</CardTitle>
        <CardDescription className="text-center">
          Answer 3 quick questions for your personalized plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">What's your primary goal?</label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose_weight">Lose Weight</SelectItem>
                <SelectItem value="build_muscle">Build Muscle</SelectItem>
                <SelectItem value="get_fit">Get Fit & Healthy</SelectItem>
                <SelectItem value="increase_endurance">Increase Endurance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">How much time do you have daily?</label>
            <Select value={timePerDay} onValueChange={setTimePerDay}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select available time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15min">15 minutes</SelectItem>
                <SelectItem value="30min">30 minutes</SelectItem>
                <SelectItem value="45min">45 minutes</SelectItem>
                <SelectItem value="60min">60+ minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">What equipment do you have access to?</label>
            <Select value={equipment} onValueChange={setEquipment}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select equipment access" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None (Bodyweight Only)</SelectItem>
                <SelectItem value="minimal">Minimal (Bands/Dumbbells)</SelectItem>
                <SelectItem value="home_gym">Home Gym Setup</SelectItem>
                <SelectItem value="full_gym">Full Gym Membership</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
              Generating Your Plan...
            </div>
          ) : (
            "Generate My Plan"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OnboardingForm;

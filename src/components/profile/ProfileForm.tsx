
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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

const ProfileForm = () => {
  // Get stored preferences or set defaults
  const storedPrefs = JSON.parse(localStorage.getItem('fitai_user_preferences') || '{}');
  
  const [goal, setGoal] = useState(storedPrefs.goal || '');
  const [timePerDay, setTimePerDay] = useState(storedPrefs.timePerDay || '');
  const [equipment, setEquipment] = useState(storedPrefs.equipment || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!goal || !timePerDay || !equipment) {
      toast.error("Please fill out all fields");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Save preferences to localStorage
      localStorage.setItem('fitai_user_preferences', JSON.stringify({
        ...storedPrefs,
        goal,
        timePerDay,
        equipment,
        updatedAt: new Date().toISOString()
      }));
      
      toast.success("Your preferences have been updated!");
      setIsLoading(false);
    }, 500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Your Fitness Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Fitness Goal</label>
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
            <label className="text-sm font-medium">Available Time</label>
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
            <label className="text-sm font-medium">Equipment Access</label>
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
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Save Preferences"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileForm;

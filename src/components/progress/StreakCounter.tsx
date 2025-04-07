
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Award } from 'lucide-react';

interface StreakCounterProps {
  currentStreak: number;
  bestStreak: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ currentStreak, bestStreak }) => {
  return (
    <Card className="bg-gradient-to-br from-primary/95 to-primary shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-lg">Your Workout Streak</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <div className="bg-white/20 p-3 rounded-full">
              <Flame className="h-6 w-6 text-white animate-pulse-light" />
            </div>
            <div className="mt-2 text-center">
              <p className="text-xl font-bold text-white">{currentStreak}</p>
              <p className="text-xs text-white/80">Current</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-white/20 p-3 rounded-full">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="mt-2 text-center">
              <p className="text-xl font-bold text-white">{bestStreak}</p>
              <p className="text-xs text-white/80">Best</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCounter;

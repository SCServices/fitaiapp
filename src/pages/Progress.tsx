
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StreakCounter from '@/components/progress/StreakCounter';
import ActivityChart from '@/components/progress/ActivityChart';
import PerformanceMetrics from '@/components/progress/PerformanceMetrics';
import AchievementBadges from '@/components/progress/AchievementBadges';
import { mockActivityData, mockUserStats } from '@/data/mockData';
import { Timer, CalendarDays, BarChartIcon, Flame } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const ProgressPage = () => {
  return (
    <Layout>
      <div className="py-4">
        <h2 className="text-2xl font-bold mb-6">Your Progress</h2>
        
        <div className="space-y-4">
          <StreakCounter 
            currentStreak={mockUserStats.currentStreak} 
            bestStreak={mockUserStats.bestStreak} 
          />
          
          <ActivityChart activityData={mockActivityData} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Workouts</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 text-primary mr-2" />
                  <span className="text-2xl font-bold">{mockUserStats.totalWorkouts}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Time</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center">
                  <Timer className="h-5 w-5 text-primary mr-2" />
                  <span className="text-2xl font-bold">{mockUserStats.totalMinutes} min</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <BarChartIcon className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl font-bold">{mockUserStats.completionRate}%</span>
              </div>
              <Progress value={mockUserStats.completionRate} className="h-2 mb-2" />
              <p className="text-sm text-gray-500 mt-2">
                You've completed {mockUserStats.completionRate}% of your planned workouts. Keep it up!
              </p>
            </CardContent>
          </Card>
          
          <PerformanceMetrics stats={mockUserStats} />
          
          <AchievementBadges achievements={mockUserStats.achievements} />
        </div>
      </div>
    </Layout>
  );
};

export default ProgressPage;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityDay {
  date: string;
  count: number;
}

interface ActivityChartProps {
  activityData: ActivityDay[];
}

// Simple activity chart showing workout consistency
const ActivityChart: React.FC<ActivityChartProps> = ({ activityData }) => {
  const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          {activityData.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-md flex items-center justify-center mb-1 ${day.count > 0 ? 'bg-primary text-white' : 'bg-gray-100'}`}
              >
                {day.count > 0 ? '✓' : ''}
              </div>
              <span className="text-xs text-gray-500">{dayNames[index]}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;

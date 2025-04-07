
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PerformanceMetricsProps {
  stats: {
    performanceTrend: Array<{ date: string; intensity: number }>;
    intensityChange: number;
    [key: string]: any;
  };
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ stats }) => {
  // If no performance trend data is available, use default data
  const performanceData = stats.performanceTrend || [
    { date: 'Week 1', intensity: 60 },
    { date: 'Week 2', intensity: 65 },
    { date: 'Week 3', intensity: 68 },
    { date: 'Week 4', intensity: 72 },
  ];
  
  const intensityChange = stats.intensityChange || 5;
  const isPositiveTrend = intensityChange >= 0;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Workout Intensity</CardTitle>
          <div className={`flex items-center ${isPositiveTrend ? 'text-green-500' : 'text-red-500'}`}>
            {isPositiveTrend ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span className="text-sm font-medium">{isPositiveTrend ? '+' : ''}{intensityChange}%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ChartContainer 
            config={{
              intensity: {
                label: "Intensity",
                color: "#FF715B",
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  fontSize={12}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  fontSize={12}
                  domain={[0, 100]}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          active={active}
                          payload={payload}
                          label={`${payload[0].payload.date}`}
                          labelClassName="font-medium text-primary"
                        />
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="intensity" 
                  stroke="#FF715B" 
                  strokeWidth={2}
                  dot={{ fill: '#FF715B', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="intensity"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <p className="text-sm text-gray-500 mt-3">
          {isPositiveTrend 
            ? "Your workout intensity is steadily increasing, showing improvement in fitness level."
            : "Your workout intensity has decreased. Consider increasing your effort levels."}
        </p>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;

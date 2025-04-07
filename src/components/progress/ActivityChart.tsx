
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface ActivityDay {
  date: string;
  count: number;
}

interface ActivityChartProps {
  activityData: ActivityDay[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ activityData }) => {
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Format data for the chart
  const chartData = activityData.map((day, index) => ({
    name: dayNames[index],
    value: day.count,
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ChartContainer 
            config={{
              workouts: {
                label: "Workouts",
                color: "#00D084",
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 20 }}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  fontSize={12}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          active={active}
                          payload={payload}
                          label={`${payload[0].payload.name}`}
                          labelClassName="font-medium text-primary"
                        />
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#00D084" 
                  radius={[4, 4, 0, 0]} 
                  name="workouts"
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;

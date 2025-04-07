
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from '@/hooks/use-mobile';

interface ActivityDay {
  date: string;
  count: number;
  minutes?: number;
  intensity?: number;
}

interface ActivityChartProps {
  activityData: ActivityDay[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ activityData }) => {
  const [viewMode, setViewMode] = useState<'count' | 'minutes' | 'intensity'>('count');
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const isMobile = useIsMobile();
  
  // Format data for the chart with additional metrics
  const chartData = activityData.map((day, index) => ({
    name: dayNames[index],
    value: viewMode === 'count' ? day.count 
         : viewMode === 'minutes' ? (day.minutes || 0) 
         : (day.intensity || 0),
    count: day.count,
    minutes: day.minutes || 0,
    intensity: day.intensity || 0,
  }));

  const getChartColor = () => {
    switch(viewMode) {
      case 'count': return "#00D084"; // Green for workouts
      case 'minutes': return "#0096FF"; // Blue for minutes
      case 'intensity': return "#FF715B"; // Orange-red for intensity
      default: return "#00D084";
    }
  };

  const getViewTitle = () => {
    switch(viewMode) {
      case 'count': return "Workouts";
      case 'minutes': return "Minutes";
      case 'intensity': return "Intensity";
      default: return "Workouts";
    }
  };

  const getYAxisLabel = () => {
    switch(viewMode) {
      case 'count': return "Count";
      case 'minutes': return "Minutes";
      case 'intensity': return "Level (1-10)";
      default: return "";
    }
  };

  const getMaxValue = () => {
    if (viewMode === 'count') return Math.max(...chartData.map(d => d.count)) + 1;
    if (viewMode === 'minutes') return Math.max(...chartData.map(d => d.minutes)) + 10;
    return 10; // Max intensity is 10
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Weekly Activity</CardTitle>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View your activity patterns across the week</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          <div className="flex space-x-1 overflow-x-auto max-w-full">
            <Button 
              variant={viewMode === 'count' ? "default" : "outline"} 
              size="sm" 
              onClick={() => setViewMode('count')}
              className="h-7 text-xs whitespace-nowrap"
            >
              Workouts
            </Button>
            <Button 
              variant={viewMode === 'minutes' ? "default" : "outline"} 
              size="sm" 
              onClick={() => setViewMode('minutes')}
              className="h-7 text-xs whitespace-nowrap"
            >
              Minutes
            </Button>
            <Button 
              variant={viewMode === 'intensity' ? "default" : "outline"} 
              size="sm" 
              onClick={() => setViewMode('intensity')}
              className="h-7 text-xs whitespace-nowrap"
            >
              Intensity
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ChartContainer 
            config={{
              [viewMode]: {
                label: getViewTitle(),
                color: getChartColor(),
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData} 
                margin={isMobile ? { top: 10, right: 5, left: 0, bottom: 20 } : { top: 10, right: 10, left: 10, bottom: 20 }}
                barCategoryGap={isMobile ? "10%" : "20%"}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  fontSize={10}
                  interval={0}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickCount={5}
                  fontSize={10}
                  width={isMobile ? 25 : 30}
                  domain={[0, getMaxValue()]}
                  label={isMobile ? undefined : { 
                    value: getYAxisLabel(), 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fontSize: 10, fill: '#888' },
                    dy: 40
                  }}
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
                          formatter={(value, name) => {
                            if (name === 'minutes') return `${value} min`;
                            if (name === 'intensity') return `Level ${value}/10`;
                            return value;
                          }}
                        />
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill={getChartColor()}
                  radius={[4, 4, 0, 0]} 
                  name={viewMode}
                  barSize={isMobile ? 20 : 28}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  animationDuration={800}
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

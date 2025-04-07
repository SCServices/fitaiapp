
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Zap } from 'lucide-react';

const Schedule = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Mock scheduled workouts
  const scheduledDates = [
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 2)),
    new Date(new Date().setDate(new Date().getDate() + 4))
  ];
  
  const mockSchedule = [
    {
      id: "s1",
      name: "Morning HIIT",
      time: "07:30 AM",
      duration: 20,
      category: "HIIT"
    },
    {
      id: "s2",
      name: "Evening Stretch",
      time: "06:00 PM",
      duration: 15,
      category: "Flexibility"
    }
  ];
  
  // Check if a date has a scheduled workout
  const isScheduled = (date: Date) => {
    return scheduledDates.some(scheduledDate => 
      scheduledDate.toDateString() === date.toDateString()
    );
  };

  return (
    <Layout>
      <div className="py-4">
        <h2 className="text-2xl font-bold mb-6">Your Schedule</h2>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2" />
              Workout Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiersClassNames={{
                selected: "bg-primary text-primary-foreground",
              }}
              modifiers={{
                scheduled: scheduledDates
              }}
              modifiersStyles={{
                scheduled: {
                  fontWeight: 'bold',
                  borderBottom: '2px solid #00D084'
                }
              }}
            />
          </CardContent>
        </Card>
        
        {date && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">{date.toDateString()}</h3>
            
            {isScheduled(date) ? (
              <div className="space-y-3">
                {mockSchedule.map(workout => (
                  <Card key={workout.id} className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium flex items-center">
                            <Zap className="h-4 w-4 text-primary mr-1" />
                            {workout.name}
                          </h4>
                          <div className="text-sm text-gray-500">{workout.time} • {workout.duration} min</div>
                        </div>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                          {workout.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-gray-50">
                <CardContent className="p-4 flex items-center justify-center">
                  <p className="text-gray-500">No workouts scheduled for this day</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Schedule;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Calendar, Flame, Clock, Zap, TrendingUp } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
}

interface AchievementBadgesProps {
  achievements: Achievement[];
}

const AchievementBadges: React.FC<AchievementBadgesProps> = ({ achievements = [] }) => {
  // If no achievements provided, use these default achievements
  const defaultAchievements = [
    {
      id: '1',
      name: 'First Workout',
      description: 'Complete your first workout',
      icon: 'Award',
      unlockedAt: '2024-04-01T12:00:00Z'
    },
    {
      id: '2',
      name: '3-Day Streak',
      description: 'Work out for 3 days in a row',
      icon: 'Flame',
      unlockedAt: '2024-04-03T12:00:00Z'
    },
    {
      id: '3',
      name: '7-Day Streak',
      description: 'Work out for 7 days in a row',
      icon: 'Zap',
      progress: 4
    },
    {
      id: '4',
      name: '10 Workouts',
      description: 'Complete 10 total workouts',
      icon: 'Calendar',
      progress: 7
    }
  ];
  
  const badgesToDisplay = achievements.length > 0 ? achievements : defaultAchievements;
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award />;
      case 'Calendar': return <Calendar />;
      case 'Flame': return <Flame />;
      case 'Clock': return <Clock />;
      case 'Zap': return <Zap />;
      case 'TrendingUp': return <TrendingUp />;
      default: return <Award />;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Your Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {badgesToDisplay.map((badge) => (
            <div key={badge.id} className="flex items-center p-3 rounded-lg border">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${badge.unlockedAt ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                {getIconComponent(badge.icon)}
              </div>
              <div>
                <h4 className="text-sm font-medium">{badge.name}</h4>
                <p className="text-xs text-gray-500">{badge.description}</p>
                {!badge.unlockedAt && badge.progress !== undefined && (
                  <div className="flex items-center mt-1">
                    <div className="h-1.5 w-16 bg-gray-100 rounded-full mr-2">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${(badge.progress / (badge.id === '3' ? 7 : 10)) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {badge.progress}/{badge.id === '3' ? 7 : 10}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementBadges;

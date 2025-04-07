
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProfileForm from '@/components/profile/ProfileForm';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { mockUserStats } from '@/data/mockData';
import { toast } from "sonner";
import { Share2, Bell } from 'lucide-react';

const Profile = () => {
  const [notifications, setNotifications] = React.useState(true);
  
  const handleShare = () => {
    toast.success("Generated share link for your profile!");
  };
  
  const toggleNotifications = () => {
    setNotifications(!notifications);
    toast.success(`Notifications ${!notifications ? 'enabled' : 'disabled'}`);
  };

  return (
    <Layout>
      <div className="py-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Profile</h2>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
        
        <div className="mb-6">
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Workout Stats</h3>
                  <p className="text-sm text-gray-500">
                    {mockUserStats.totalWorkouts} workouts • {mockUserStats.totalMinutes} minutes
                  </p>
                </div>
                <div className="bg-primary text-white text-xs font-medium px-2 py-1 rounded">
                  Level 2
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <ProfileForm />
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Workout Reminders</h3>
                  <p className="text-sm text-gray-500">Receive daily workout notifications</p>
                </div>
                <Switch checked={notifications} onCheckedChange={toggleNotifications} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Notification Time</span>
                </div>
                <span className="text-gray-500">8:00 AM</span>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <Button variant="link" className="text-gray-500 text-sm">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Clock, Share2 } from 'lucide-react';
import { toast } from "sonner";
import { WorkoutType } from '@/types/workout';

interface WorkoutCardProps {
  workout: WorkoutType;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const navigate = useNavigate();
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Thanks for your feedback! We'll improve your recommendations.");
  };
  
  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("We'll adjust your recommendations based on this feedback.");
  };
  
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Share card generated! (would open share dialog)");
  };
  
  const handleCardClick = () => {
    navigate(`/workout/${workout.id}`);
  };
  
  return (
    <Card className="workout-card mb-4 animate-fade-in cursor-pointer" onClick={handleCardClick}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{workout.name}</CardTitle>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">{workout.category}</Badge>
              <div className="flex items-center text-gray-600 text-sm">
                <Clock className="h-3 w-3 mr-1" />
                {workout.duration} min
              </div>
            </div>
          </div>
          <Badge variant={workout.difficulty === 'Easy' ? "outline" : 
                         workout.difficulty === 'Medium' ? "secondary" : 
                         "default"}
                 className={workout.difficulty === 'Easy' ? "bg-green-50 text-green-700 border-green-200" :
                            workout.difficulty === 'Medium' ? "bg-orange-50 text-orange-700 border-orange-200" :
                            "bg-red-50 text-red-700 border-red-200"}>
            {workout.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-gray-600 mb-3">{workout.description}</div>
        <div className="space-y-2">
          {workout.exercises.slice(0, 3).map((exercise, index) => (
            <div key={index} className="flex justify-between items-center p-2 rounded-md bg-gray-50">
              <span className="font-medium">{exercise.name}</span>
              <span className="text-gray-600">{exercise.sets} × {exercise.reps}</span>
            </div>
          ))}
          {workout.exercises.length > 3 && (
            <div className="text-sm text-gray-500 pt-1">
              +{workout.exercises.length - 3} more exercises
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleLike}>
            <ThumbsUp className="h-4 w-4 mr-1" />
            Like
          </Button>
          <Button variant="outline" size="sm" onClick={handleDislike}>
            <ThumbsDown className="h-4 w-4 mr-1" />
            Dislike
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;

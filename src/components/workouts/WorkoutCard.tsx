
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ThumbsUp, 
  ThumbsDown, 
  Clock, 
  Share2, 
  Twitter, 
  Facebook, 
  Copy, 
  MessageSquare
} from 'lucide-react';
import { toast } from "sonner";
import { WorkoutType } from '@/types/workout';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger
} from "@/components/ui/popover";
import WorkoutFeedbackModal from './WorkoutFeedbackModal';
import { useIsMobile } from '@/hooks/use-mobile';

interface WorkoutCardProps {
  workout: WorkoutType;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const navigate = useNavigate();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const isMobile = useIsMobile();
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Quick feedback
    const feedbackData = {
      workoutId: workout.id,
      rating: 'like',
      difficulty: 'just-right', // Default to just right for quick feedback
      comment: '',
      timestamp: new Date().toISOString(),
    };

    // Store feedback
    const existingFeedback = JSON.parse(localStorage.getItem('fitai_workout_feedback') || '[]');
    localStorage.setItem('fitai_workout_feedback', JSON.stringify([...existingFeedback, feedbackData]));
    
    toast.success("Thanks for your feedback! We'll improve your recommendations.");
  };
  
  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFeedbackModal(true);
  };
  
  const handleDetailedFeedback = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFeedbackModal(true);
  };
  
  const handleShare = (platform: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Generate share text
    const shareText = `Check out this ${workout.duration}-minute ${workout.category} workout on FitAI: ${workout.name}`;
    const shareUrl = `https://fitai.app/shared/workout/${workout.id}`;
    
    // In a real app, this would open the appropriate share dialog
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        toast.success("Link copied to clipboard!");
        break;
      default:
        toast.success(`Sharing via ${platform}...`);
    }
  };
  
  const handleCardClick = () => {
    navigate(`/workout/${workout.id}`);
  };
  
  return (
    <>
      <Card className="workout-card mb-4 animate-fade-in cursor-pointer" onClick={handleCardClick}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <CardTitle className="text-xl font-bold">{workout.name}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-1">
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
          <div className="text-gray-600 mb-3 text-sm sm:text-base">{workout.description}</div>
          <div className="space-y-2">
            {workout.exercises.slice(0, 3).map((exercise, index) => (
              <div key={index} className="flex justify-between items-center p-2 rounded-md bg-gray-50 text-sm">
                <span className="font-medium truncate mr-2">{exercise.name}</span>
                <span className="text-gray-600 whitespace-nowrap">{exercise.sets} × {exercise.reps}</span>
              </div>
            ))}
            {workout.exercises.length > 3 && (
              <div className="text-sm text-gray-500 pt-1">
                +{workout.exercises.length - 3} more exercises
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2 flex-wrap gap-2">
          <div className="flex gap-1 sm:gap-2">
            <Button variant="outline" size={isMobile ? "sm" : "sm"} onClick={handleLike} className="px-2 sm:px-3">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Like</span>
            </Button>
            <Button variant="outline" size={isMobile ? "sm" : "sm"} onClick={handleDislike} className="px-2 sm:px-3">
              <ThumbsDown className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Dislike</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDetailedFeedback} className="px-2">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()} className="px-2 sm:px-3">
                <Share2 className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48" onClick={(e) => e.stopPropagation()}>
              <div className="grid gap-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={(e) => handleShare('twitter', e)}
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={(e) => handleShare('facebook', e)}
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={(e) => handleShare('copy', e)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </CardFooter>
      </Card>
      
      <WorkoutFeedbackModal 
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        workoutId={workout.id}
        workoutName={workout.name}
      />
    </>
  );
};

export default WorkoutCard;


import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface WorkoutFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutId: string;
  workoutName: string;
}

const WorkoutFeedbackModal: React.FC<WorkoutFeedbackModalProps> = ({
  isOpen,
  onClose,
  workoutId,
  workoutName,
}) => {
  const [rating, setRating] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('');

  const handleSubmit = () => {
    // In a real app, this would send data to backend
    // For now, we'll just save to localStorage for demo purposes
    const feedbackData = {
      workoutId,
      rating,
      difficulty,
      comment,
      timestamp: new Date().toISOString(),
    };

    // Store feedback in localStorage
    const existingFeedback = JSON.parse(localStorage.getItem('fitai_workout_feedback') || '[]');
    localStorage.setItem('fitai_workout_feedback', JSON.stringify([...existingFeedback, feedbackData]));
    
    toast.success("Thank you for your feedback!");
    onClose();

    // Update user preferences based on feedback
    updateUserPreferences(rating, difficulty);
  };

  const updateUserPreferences = (rating: string, difficulty: string) => {
    const userPrefs = JSON.parse(localStorage.getItem('fitai_user_preferences') || '{}');
    
    // Simple logic to adjust preferences based on feedback
    if (rating === 'like' && difficulty === 'just-right') {
      // User liked it and found it appropriately challenging
      userPrefs.preferredDifficulty = userPrefs.preferredDifficulty || 'Medium';
    } else if (rating === 'like' && difficulty === 'too-easy') {
      // User liked it but found it too easy - increase difficulty preference
      userPrefs.preferredDifficulty = 'Hard';
    } else if (rating === 'dislike' && difficulty === 'too-hard') {
      // User disliked it and found it too hard - decrease difficulty preference
      userPrefs.preferredDifficulty = 'Easy';
    }
    
    localStorage.setItem('fitai_user_preferences', JSON.stringify(userPrefs));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How was your workout?</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Did you enjoy "{workoutName}"?</h3>
            <RadioGroup value={rating} onValueChange={setRating} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="like" id="like" />
                <Label htmlFor="like">Liked it</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral">Neutral</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dislike" id="dislike" />
                <Label htmlFor="dislike">Disliked it</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">How was the difficulty?</h3>
            <RadioGroup value={difficulty} onValueChange={setDifficulty} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="too-easy" id="too-easy" />
                <Label htmlFor="too-easy">Too Easy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="just-right" id="just-right" />
                <Label htmlFor="just-right">Just Right</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="too-hard" id="too-hard" />
                <Label htmlFor="too-hard">Too Hard</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment" className="text-sm font-medium">Any additional comments?</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like or dislike about this workout?"
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="w-full sm:w-auto"
            disabled={!rating || !difficulty}
          >
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutFeedbackModal;

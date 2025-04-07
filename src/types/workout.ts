
export interface Exercise {
  name: string;
  sets: number;
  reps: string; // could be "10" or "30 seconds"
  restTime?: number; // in seconds
  instructions?: string[];
}

export interface WorkoutType {
  id: string;
  name: string;
  description: string;
  category: 'Strength' | 'Cardio' | 'HIIT' | 'Flexibility' | 'Recovery';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number; // in minutes
  exercises: Exercise[];
  createdAt: string;
}

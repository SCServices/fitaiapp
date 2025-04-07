
import { WorkoutType } from "@/types/workout";

export const mockWorkouts: WorkoutType[] = [
  {
    id: "1",
    name: "Quick Morning Energizer",
    description: "A fast, effective workout to kickstart your day with energy!",
    category: "HIIT",
    difficulty: "Medium",
    duration: 15,
    exercises: [
      { name: "Jumping Jacks", sets: 1, reps: "60 seconds" },
      { name: "Push-ups", sets: 3, reps: "10" },
      { name: "Mountain Climbers", sets: 3, reps: "30 seconds" },
      { name: "Bodyweight Squats", sets: 3, reps: "15" },
      { name: "Plank", sets: 2, reps: "30 seconds" }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Lunchtime Strength Builder",
    description: "Build muscle and strength during your lunch break with minimal equipment.",
    category: "Strength",
    difficulty: "Medium",
    duration: 30,
    exercises: [
      { name: "Dumbbell Lunges", sets: 3, reps: "12 each leg" },
      { name: "Dumbbell Shoulder Press", sets: 3, reps: "10" },
      { name: "Bent Over Rows", sets: 3, reps: "12" },
      { name: "Dumbbell Curls", sets: 3, reps: "12" },
      { name: "Russian Twists", sets: 3, reps: "20 total" }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "Evening De-stress Flow",
    description: "Relax your body and mind with this calming flow to end your day.",
    category: "Flexibility",
    difficulty: "Easy",
    duration: 20,
    exercises: [
      { name: "Cat-Cow Stretch", sets: 1, reps: "1 minute" },
      { name: "Downward Dog", sets: 1, reps: "30 seconds" },
      { name: "Child's Pose", sets: 1, reps: "45 seconds" },
      { name: "Standing Forward Fold", sets: 1, reps: "45 seconds" },
      { name: "Seated Twist", sets: 2, reps: "30 seconds each side" }
    ],
    createdAt: new Date().toISOString()
  }
];

export const mockActivityData = [
  { date: "2023-04-01", count: 1 },
  { date: "2023-04-02", count: 1 },
  { date: "2023-04-03", count: 0 },
  { date: "2023-04-04", count: 1 },
  { date: "2023-04-05", count: 1 },
  { date: "2023-04-06", count: 0 },
  { date: "2023-04-07", count: 1 }
];

export const mockUserStats = {
  currentStreak: 2,
  bestStreak: 5,
  totalWorkouts: 12,
  totalMinutes: 285,
  completionRate: 85
};

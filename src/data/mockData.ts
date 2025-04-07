
import { WorkoutType } from "@/types/workout";

export const mockWorkouts: WorkoutType[] = [
  {
    id: "1",
    name: "Quick Morning Energizer",
    description: "A fast, effective workout to kickstart your day with energy! Perfect for busy mornings when you need a quick boost.",
    category: "HIIT",
    difficulty: "Medium",
    duration: 15,
    exercises: [
      { 
        name: "Jumping Jacks", 
        sets: 1, 
        reps: "60 seconds",
        restTime: 30,
        instructions: ["Keep your core engaged", "Land softly with bent knees"]
      },
      { 
        name: "Push-ups", 
        sets: 3, 
        reps: "10",
        restTime: 45,
        instructions: ["Keep your body in a straight line", "Go as low as you can"]
      },
      { 
        name: "Mountain Climbers", 
        sets: 3, 
        reps: "30 seconds",
        restTime: 30,
        instructions: ["Keep your hips down", "Move at a steady pace"]
      },
      { 
        name: "Bodyweight Squats", 
        sets: 3, 
        reps: "15",
        restTime: 45,
        instructions: ["Keep your weight in your heels", "Knees should track over toes"]
      },
      { 
        name: "Plank", 
        sets: 2, 
        reps: "30 seconds",
        restTime: 30,
        instructions: ["Keep your back flat", "Engage your core"]
      }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Lunchtime Strength Builder",
    description: "Build muscle and strength during your lunch break with minimal equipment. This workout targets all major muscle groups.",
    category: "Strength",
    difficulty: "Medium",
    duration: 30,
    exercises: [
      { 
        name: "Dumbbell Lunges", 
        sets: 3, 
        reps: "12 each leg",
        restTime: 60,
        instructions: ["Keep your front knee over your ankle", "Step far enough forward"]
      },
      { 
        name: "Dumbbell Shoulder Press", 
        sets: 3, 
        reps: "10",
        restTime: 60,
        instructions: ["Keep your core engaged", "Don't arch your back"]
      },
      { 
        name: "Bent Over Rows", 
        sets: 3, 
        reps: "12",
        restTime: 60,
        instructions: ["Keep your back flat", "Pull elbows close to body"]
      },
      { 
        name: "Dumbbell Curls", 
        sets: 3, 
        reps: "12",
        restTime: 45,
        instructions: ["Keep elbows close to sides", "Control the movement"]
      },
      { 
        name: "Russian Twists", 
        sets: 3, 
        reps: "20 total",
        restTime: 45,
        instructions: ["Keep your back straight", "Twist from your core"]
      }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "Evening De-stress Flow",
    description: "Relax your body and mind with this calming flow to end your day. Focus on breathing and releasing tension throughout your body.",
    category: "Flexibility",
    difficulty: "Easy",
    duration: 20,
    exercises: [
      { 
        name: "Cat-Cow Stretch", 
        sets: 1, 
        reps: "1 minute",
        restTime: 15,
        instructions: ["Synchronize breath with movement", "Move slowly and mindfully"]
      },
      { 
        name: "Downward Dog", 
        sets: 1, 
        reps: "30 seconds",
        restTime: 15,
        instructions: ["Push through your hands", "Heels toward the floor"]
      },
      { 
        name: "Child's Pose", 
        sets: 1, 
        reps: "45 seconds",
        restTime: 0,
        instructions: ["Breathe deeply", "Relax your shoulders"]
      },
      { 
        name: "Standing Forward Fold", 
        sets: 1, 
        reps: "45 seconds",
        restTime: 15,
        instructions: ["Bend knees if needed", "Let your head hang heavy"]
      },
      { 
        name: "Seated Twist", 
        sets: 2, 
        reps: "30 seconds each side",
        restTime: 15,
        instructions: ["Keep your sit bones grounded", "Twist from your core"]
      }
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

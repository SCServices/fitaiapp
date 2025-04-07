
import React from 'react';
import WorkoutCard from './WorkoutCard';
import { WorkoutType } from '@/types/workout';

interface WorkoutListProps {
  workouts: WorkoutType[];
}

const WorkoutList: React.FC<WorkoutListProps> = ({ workouts }) => {
  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
};

export default WorkoutList;

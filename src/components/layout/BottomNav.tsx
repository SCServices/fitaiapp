
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ZapIcon, BarChartIcon, CalendarDaysIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Workouts', icon: ZapIcon },
    { path: '/progress', label: 'Progress', icon: BarChartIcon },
    { path: '/schedule', label: 'Schedule', icon: CalendarDaysIcon },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white z-10 border-t">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center p-2 rounded-full transition-colors",
                isActive ? "text-primary" : "text-gray-500"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;


import React from 'react';
import { Button } from "@/components/ui/button";
import { ZapIcon, UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-10 border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <ZapIcon className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-xl font-bold text-gray-900">FitAI</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/profile')}
          className="text-gray-700"
        >
          <UserIcon className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;

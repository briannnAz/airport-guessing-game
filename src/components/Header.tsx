
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  onHomeClick?: () => void;
}

const Header = ({ onHomeClick }: HeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    }
    
    toast({
      title: "Game Ended",
      description: "Your game session has been ended.",
    });
    
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-10">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <button 
          onClick={handleHomeClick}
          className="flex items-center gap-2 text-[#1B1F8C] font-semibold text-lg transition-all duration-300 hover:opacity-70"
        >
          <Home size={20} />
          <span>Airport Guessr</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { LogOut } from 'lucide-react';
import { User, UserProgress } from '../App';

interface ProgressTrackerProps {
  user: User;
  progress: UserProgress;
  onLogout: () => void;
}

export function ProgressTracker({ user, progress, onLogout }: ProgressTrackerProps) {
  const allLevels = [
    'C1.1', 'C1.2', 'C2.1', 'C2.2', 
    'B1.1', 'B1.2', 'B2.1', 'B2.2', 
    'A1.1', 'A1.2', 'A2.1', 'A2.2'
  ];
  
  const completedCount = progress.completedLevels.length;
  const totalLevels = allLevels.length;

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇩🇪</span>
            <span className="text-xl">Learn German</span>
          </div>
          <Badge variant="outline">{progress.currentLevel}</Badge>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-sm text-gray-600">Progress</div>
            <div className="font-medium">{completedCount}/{totalLevels}</div>
          </div>
          
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-600">{user.email}</div>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { User } from '../App';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const handleGoogleSignIn = () => {
    // Mock Google sign-in - in a real app, this would use Google OAuth
    const mockUser: User = {
      id: 'user123',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    };
    
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mb-8">
          <div className="text-4xl mb-4">🇩🇪</div>
          <h1 className="text-3xl mb-2">Learn German</h1>
          <p className="text-gray-600">
            Master German with interactive lessons and exercises
          </p>
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>
          
          <div className="text-sm text-gray-500">
            Sign in to track your progress and sync across devices
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl">📚</div>
            <div className="text-sm mt-2">6 Levels</div>
            <div className="text-xs text-gray-500">C1 to A2</div>
          </div>
          <div>
            <div className="text-2xl">🎯</div>
            <div className="text-sm mt-2">Interactive</div>
            <div className="text-xs text-gray-500">Exercises</div>
          </div>
          <div>
            <div className="text-2xl">📈</div>
            <div className="text-sm mt-2">Track</div>
            <div className="text-xs text-gray-500">Progress</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
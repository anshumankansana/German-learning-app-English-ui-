import React, { useState, useEffect } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './components/Dashboard';
import { LevelSelection } from './components/LevelSelection';
import { StudyScreen } from './components/StudyScreen';
import { ExerciseScreen } from './components/ExerciseScreen';
import { ProgressTracker } from './components/ProgressTracker';

export type Level = 'C1' | 'C2' | 'B1' | 'B2' | 'A1' | 'A2';
export type SubLevel = '1' | '2';

export interface UserProgress {
  completedLevels: string[];
  completedStudyNotes: string[];
  currentLevel: string;
  exerciseProgress: Record<string, number>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<'auth' | 'dashboard' | 'levels' | 'study' | 'exercise'>('auth');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedLevels: [],
    completedStudyNotes: [],
    currentLevel: 'C1.1', // Changed from A1.1 to C1.1 (easiest)
    exerciseProgress: {}
  });

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('germanLearningUser');
    const storedProgress = localStorage.getItem('germanLearningProgress');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCurrentScreen('dashboard');
    }
    
    if (storedProgress) {
      const progress = JSON.parse(storedProgress);
      // Ensure completedStudyNotes exists for backward compatibility
      if (!progress.completedStudyNotes) {
        progress.completedStudyNotes = [];
      }
      setUserProgress(progress);
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('germanLearningUser', JSON.stringify(userData));
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('germanLearningUser');
    setCurrentScreen('auth');
  };

  const updateProgress = (progress: UserProgress) => {
    setUserProgress(progress);
    localStorage.setItem('germanLearningProgress', JSON.stringify(progress));
  };

  const navigateToLevels = () => {
    setCurrentScreen('levels');
  };

  const navigateToStudy = (level: string) => {
    setSelectedLevel(level);
    setCurrentScreen('study');
  };

  const navigateToExercise = (level: string) => {
    setSelectedLevel(level);
    setCurrentScreen('exercise');
  };

  const navigateToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  if (!user && currentScreen === 'auth') {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressTracker 
        user={user!} 
        progress={userProgress} 
        onLogout={handleLogout}
      />
      
      {currentScreen === 'dashboard' && (
        <Dashboard 
          user={user!}
          progress={userProgress}
          onNavigateToLevels={navigateToLevels}
        />
      )}
      
      {currentScreen === 'levels' && (
        <LevelSelection 
          progress={userProgress}
          onSelectLevel={navigateToStudy}
          onBack={navigateToDashboard}
        />
      )}
      
      {currentScreen === 'study' && (
        <StudyScreen 
          level={selectedLevel}
          progress={userProgress}
          onUpdateProgress={updateProgress}
          onBack={navigateToLevels}
          onComplete={navigateToExercise}
        />
      )}
      
      {currentScreen === 'exercise' && (
        <ExerciseScreen 
          level={selectedLevel}
          progress={userProgress}
          onUpdateProgress={updateProgress}
          onBack={navigateToLevels}
          onComplete={navigateToDashboard}
        />
      )}
    </div>
  );
}

export default App;
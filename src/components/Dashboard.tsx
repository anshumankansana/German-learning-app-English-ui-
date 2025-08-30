import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { User, UserProgress } from '../App';

interface DashboardProps {
  user: User;
  progress: UserProgress;
  onNavigateToLevels: () => void;
}

export function Dashboard({ user, progress, onNavigateToLevels }: DashboardProps) {
  const allLevels = [
    'C1.1', 'C1.2', 'C2.1', 'C2.2', 
    'B1.1', 'B1.2', 'B2.1', 'B2.2', 
    'A1.1', 'A1.2', 'A2.1', 'A2.2'
  ];
  
  const completedCount = progress.completedLevels.length;
  const completedStudyCount = progress.completedStudyNotes?.length || 0;
  const totalLevels = allLevels.length;
  const progressPercentage = (completedCount / totalLevels) * 100;
  const studyProgressPercentage = (completedStudyCount / totalLevels) * 100;
  
  const getCurrentLevelInfo = () => {
    const level = progress.currentLevel;
    const mainLevel = level.split('.')[0];
    const subLevel = level.split('.')[1];
    return { mainLevel, subLevel, level };
  };
  
  const { mainLevel, subLevel, level } = getCurrentLevelInfo();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl mb-2">Welcome back, {user.name}!</h1>
        <p className="text-gray-600">Continue your German learning journey</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl mb-4">Your Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span>Overall Progress</span>
                <span className="text-sm text-gray-600">{completedCount}/{totalLevels}</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span>Study Notes Progress</span>
                <span className="text-sm text-gray-600">{completedStudyCount}/{totalLevels}</span>
              </div>
              <Progress value={studyProgressPercentage} className="h-3 bg-blue-100" />
            </div>
            
            <div className="flex items-center gap-3">
              <span>Current Level:</span>
              <Badge variant="default" className="text-lg px-3 py-1">
                {level}
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-xl">{completedCount}</div>
                <div className="text-xs text-gray-600">Levels Completed</div>
              </div>
              <div className="text-center">
                <div className="text-xl">{completedStudyCount}</div>
                <div className="text-xs text-gray-600">Study Notes Done</div>
              </div>
              <div className="text-center">
                <div className="text-xl">{totalLevels - completedCount}</div>
                <div className="text-xs text-gray-600">Levels Remaining</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl mb-4">Current Level: {mainLevel}</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm">🇩🇪</span>
              </div>
              <div>
                <div className="font-medium">Level {level}</div>
                <div className="text-sm text-gray-600">
                  {mainLevel === 'C1' && 'Beginner - Basic phrases and vocabulary'}
                  {mainLevel === 'C2' && 'Elementary - Simple conversations'}
                  {mainLevel === 'B1' && 'Intermediate - Complex topics'}
                  {mainLevel === 'B2' && 'Upper Intermediate - Fluent discussions'}
                  {mainLevel === 'A1' && 'Advanced - Professional German'}
                  {mainLevel === 'A2' && 'Expert - Native-like fluency'}
                </div>
              </div>
            </div>
            
            <Button 
              onClick={onNavigateToLevels}
              className="w-full"
              size="lg"
            >
              Continue Learning
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl mb-4">CEFR Level Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {['C1', 'C2', 'B1', 'B2', 'A1', 'A2'].map((levelName) => {
            const isCompleted = progress.completedLevels.some(l => l.startsWith(levelName));
            const isCurrent = progress.currentLevel.startsWith(levelName);
            
            return (
              <div
                key={levelName}
                className={`p-4 rounded-lg text-center border-2 ${
                  isCompleted 
                    ? 'border-green-200 bg-green-50' 
                    : isCurrent 
                    ? 'border-blue-200 bg-blue-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="text-lg font-bold">{levelName}</div>
                <div className="text-xs mt-1">
                  {levelName === 'C1' && 'Beginner'}
                  {levelName === 'C2' && 'Elementary'}
                  {levelName === 'B1' && 'Intermediate'}
                  {levelName === 'B2' && 'Upper Int.'}
                  {levelName === 'A1' && 'Advanced'}
                  {levelName === 'A2' && 'Expert'}
                </div>
                {isCompleted && <div className="text-green-600 mt-1">✓</div>}
                {isCurrent && !isCompleted && <div className="text-blue-600 mt-1">●</div>}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl mb-2">📝</div>
          <h3 className="font-medium">Fill in the Blanks</h3>
          <p className="text-sm text-gray-600 mt-1">Complete missing words in sentences</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl mb-2">🔗</div>
          <h3 className="font-medium">Match the Following</h3>
          <p className="text-sm text-gray-600 mt-1">Connect German words with meanings</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl mb-2">📖</div>
          <h3 className="font-medium">Complete Sentences</h3>
          <p className="text-sm text-gray-600 mt-1">Finish German sentences correctly</p>
        </Card>
      </div>
    </div>
  );
}
import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Lock, CheckCircle, PlayCircle } from 'lucide-react';
import { UserProgress } from '../App';

interface LevelSelectionProps {
  progress: UserProgress;
  onSelectLevel: (level: string) => void;
  onBack: () => void;
}

export function LevelSelection({ progress, onSelectLevel, onBack }: LevelSelectionProps) {
  const levels = [
    {
      main: 'C1',
      title: 'Beginner',
      description: 'Basic German - Everyday expressions and basic phrases',
      subLevels: ['C1.1', 'C1.2'],
      color: 'bg-green-50 border-green-200'
    },
    {
      main: 'C2',
      title: 'Elementary',
      description: 'Elementary German - Simple conversations and topics',
      subLevels: ['C2.1', 'C2.2'],
      color: 'bg-blue-50 border-blue-200'
    },
    {
      main: 'B1',
      title: 'Intermediate',
      description: 'Intermediate German - Complex topics and situations',
      subLevels: ['B1.1', 'B1.2'],
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      main: 'B2',
      title: 'Upper Intermediate',
      description: 'Upper Intermediate - Fluent discussions on various topics',
      subLevels: ['B2.1', 'B2.2'],
      color: 'bg-orange-50 border-orange-200'
    },
    {
      main: 'A1',
      title: 'Advanced',
      description: 'Advanced German - Professional and academic contexts',
      subLevels: ['A1.1', 'A1.2'],
      color: 'bg-purple-50 border-purple-200'
    },
    {
      main: 'A2',
      title: 'Expert',
      description: 'Expert German - Native-like fluency and understanding',
      subLevels: ['A2.1', 'A2.2'],
      color: 'bg-red-50 border-red-200'
    }
  ];

  const isLevelUnlocked = (level: string) => {
    const allLevels = [
      'C1.1', 'C1.2', 'C2.1', 'C2.2', 
      'B1.1', 'B1.2', 'B2.1', 'B2.2', 
      'A1.1', 'A1.2', 'A2.1', 'A2.2'
    ];
    
    const currentIndex = allLevels.indexOf(progress.currentLevel);
    const levelIndex = allLevels.indexOf(level);
    
    return levelIndex <= currentIndex || progress.completedLevels.includes(level);
  };

  const isLevelCompleted = (level: string) => {
    return progress.completedLevels.includes(level);
  };

  const isStudyCompleted = (level: string) => {
    return progress.completedStudyNotes?.includes(level) || false;
  };

  const isCurrentLevel = (level: string) => {
    return progress.currentLevel === level;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl">Choose Your Level</h1>
      </div>

      <div className="space-y-6">
        {levels.map((level) => (
          <Card key={level.main} className={`p-6 ${level.color}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {level.main}
                  </Badge>
                  <h2 className="text-xl">{level.title}</h2>
                </div>
                <p className="text-gray-600">{level.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {level.subLevels.map((subLevel) => {
                const unlocked = isLevelUnlocked(subLevel);
                const completed = isLevelCompleted(subLevel);
                const studyCompleted = isStudyCompleted(subLevel);
                const current = isCurrentLevel(subLevel);

                return (
                  <div
                    key={subLevel}
                    className={`p-4 rounded-lg border-2 ${
                      completed 
                        ? 'border-green-300 bg-green-100' 
                        : current 
                        ? 'border-blue-300 bg-blue-100' 
                        : unlocked
                        ? 'border-gray-200 bg-white'
                        : 'border-gray-100 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center">
                          {completed ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : current ? (
                            <PlayCircle className="w-6 h-6 text-blue-600" />
                          ) : unlocked ? (
                            <PlayCircle className="w-6 h-6 text-gray-400" />
                          ) : (
                            <Lock className="w-6 h-6 text-gray-300" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{subLevel}</div>
                          <div className="text-sm text-gray-600">
                            {completed && 'Completed'}
                            {current && !completed && studyCompleted && 'Ready for Exercises'}
                            {current && !completed && !studyCompleted && 'Study Notes Available'}
                            {!current && !completed && unlocked && 'Available'}
                            {!unlocked && 'Locked'}
                          </div>
                          {studyCompleted && !completed && (
                            <div className="text-xs text-green-600 mt-1">✓ Study Notes Complete</div>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => onSelectLevel(subLevel)}
                        disabled={!unlocked}
                        variant={current ? 'default' : completed ? 'secondary' : 'outline'}
                        size="sm"
                      >
                        {completed ? 'Review' : studyCompleted ? 'Exercises' : current ? 'Study' : 'Start'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
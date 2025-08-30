import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, BookOpen, Users, Volume2, PenTool, RotateCcw, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { FillInBlanks } from './exercises/FillInBlanks';
import { MatchFollowing } from './exercises/MatchFollowing';
import { CompleteSentences } from './exercises/CompleteSentences';
import { FlashcardReview } from './exercises/FlashcardReview';
import { WritingExercise } from './exercises/WritingExercise';
import { ListeningComprehension } from './exercises/ListeningComprehension';
import { CulturalQuiz } from './exercises/CulturalQuiz';
import { UserProgress } from '../App';

interface ExerciseScreenProps {
  level: string;
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
  onBack: () => void;
  onComplete: (level: string) => void;
}

export function ExerciseScreen({ level, progress, onUpdateProgress, onBack, onComplete }: ExerciseScreenProps) {
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState('fill-blanks');
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  const exerciseTypes = [
    { id: 'fill-blanks', name: 'Fill in Blanks', icon: PenTool, component: FillInBlanks },
    { id: 'match-following', name: 'Match Following', icon: Target, component: MatchFollowing },
    { id: 'complete-sentences', name: 'Complete Sentences', icon: BookOpen, component: CompleteSentences },
    { id: 'flashcards', name: 'Flashcard Review', icon: RotateCcw, component: FlashcardReview },
    { id: 'writing', name: 'Writing Practice', icon: PenTool, component: WritingExercise },
    { id: 'listening', name: 'Listening', icon: Volume2, component: ListeningComprehension },
    { id: 'cultural', name: 'Cultural Quiz', icon: Users, component: CulturalQuiz }
  ];

  const handleExerciseComplete = (exerciseId: string, score: number) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises(prev => [...prev, exerciseId]);
    }
    setScores(prev => ({ ...prev, [exerciseId]: score }));

    // Save completion to localStorage
    const saved = JSON.parse(localStorage.getItem(`exercises-${level}-completed`) || '[]');
    if (!saved.includes(exerciseId)) {
      saved.push(exerciseId);
      localStorage.setItem(`exercises-${level}-completed`, JSON.stringify(saved));
    }

    // Save score
    const savedScores = JSON.parse(localStorage.getItem(`exercises-${level}-scores`) || '{}');
    savedScores[exerciseId] = score;
    localStorage.setItem(`exercises-${level}-scores`, JSON.stringify(savedScores));
  };

  // Load saved progress
  React.useEffect(() => {
    const savedCompleted = JSON.parse(localStorage.getItem(`exercises-${level}-completed`) || '[]');
    const savedScores = JSON.parse(localStorage.getItem(`exercises-${level}-scores`) || '{}');
    setCompletedExercises(savedCompleted);
    setScores(savedScores);
  }, [level]);

  const allExercisesCompleted = completedExercises.length === exerciseTypes.length;
  const completionProgress = (completedExercises.length / exerciseTypes.length) * 100;
  const averageScore = completedExercises.length > 0 
    ? Math.round(completedExercises.reduce((sum, exerciseId) => sum + (scores[exerciseId] || 0), 0) / completedExercises.length)
    : 0;

  const handleCompleteLevel = () => {
    if (allExercisesCompleted) {
      // Update progress
      const allLevels = [
        'C1.1', 'C1.2', 'C2.1', 'C2.2', 
        'B1.1', 'B1.2', 'B2.1', 'B2.2', 
        'A1.1', 'A1.2', 'A2.1', 'A2.2'
      ];
      
      const currentIndex = allLevels.indexOf(level);
      const nextLevel = currentIndex < allLevels.length - 1 ? allLevels[currentIndex + 1] : null;

      const updatedProgress = {
        ...progress,
        completedLevels: [...progress.completedLevels, level],
        currentLevel: nextLevel || level,
        exerciseProgress: {
          ...progress.exerciseProgress,
          [level]: averageScore
        }
      };

      onUpdateProgress(updatedProgress);
      onComplete(level);
    }
  };

  const getTabIcon = (exerciseType: any) => {
    const IconComponent = exerciseType.icon;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-purple-600" />
                <h1>Exercises - Level {level}</h1>
                <Badge variant="secondary">{level}</Badge>
              </div>
              <div className="flex items-center gap-4">
                <Progress value={completionProgress} className="flex-1" />
                <span className="text-sm text-gray-600">
                  {completedExercises.length}/{exerciseTypes.length} completed
                </span>
                {completedExercises.length > 0 && (
                  <span className="text-sm text-blue-600">
                    Avg: {averageScore}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Instructions Card */}
        <Card className="p-6 mb-8 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <BookOpen className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="text-blue-800 mb-2">Exercise Instructions</h3>
              <p className="text-blue-700 mb-3">
                Complete all 7 exercise types to master this level. Each exercise focuses on different aspects of German:
              </p>
              <div className="grid md:grid-cols-2 gap-2 text-sm text-blue-600">
                <div>• Fill in Blanks - Grammar & vocabulary</div>
                <div>• Writing Practice - Expression & composition</div>
                <div>• Match Following - Vocabulary recognition</div>
                <div>• Listening - Comprehension skills</div>
                <div>• Complete Sentences - Grammar application</div>
                <div>• Flashcard Review - Memory reinforcement</div>
                <div>• Cultural Quiz - Cultural knowledge</div>
              </div>
              <p className="text-blue-700 mt-3 font-medium">
                You need to complete all exercises before advancing to the next level.
              </p>
            </div>
          </div>
        </Card>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-7 gap-4 mb-8">
          {exerciseTypes.map((exerciseType) => (
            <Card 
              key={exerciseType.id} 
              className={`p-4 text-center cursor-pointer transition-colors ${
                completedExercises.includes(exerciseType.id) 
                  ? 'bg-green-50 border-green-200' 
                  : currentTab === exerciseType.id 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setCurrentTab(exerciseType.id)}
            >
              <div className="flex justify-center mb-2">
                {getTabIcon(exerciseType)}
              </div>
              <div className="text-sm font-medium mb-1">{exerciseType.name}</div>
              {completedExercises.includes(exerciseType.id) ? (
                <div className="flex items-center justify-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600">{scores[exerciseType.id] || 0}%</span>
                </div>
              ) : (
                <div className="text-xs text-gray-500">Not started</div>
              )}
            </Card>
          ))}
        </div>

        {/* Exercise Tabs */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            {exerciseTypes.map((exerciseType) => (
              <TabsTrigger 
                key={exerciseType.id} 
                value={exerciseType.id} 
                className="flex items-center gap-2 text-xs"
              >
                {getTabIcon(exerciseType)}
                <span className="hidden sm:inline">{exerciseType.name}</span>
                {completedExercises.includes(exerciseType.id) && (
                  <CheckCircle className="w-3 h-3 text-green-500" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {exerciseTypes.map((exerciseType) => (
            <TabsContent key={exerciseType.id} value={exerciseType.id}>
              <Card className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  {getTabIcon(exerciseType)}
                  <h2>{exerciseType.name}</h2>
                  {completedExercises.includes(exerciseType.id) && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Completed: {scores[exerciseType.id] || 0}%
                    </Badge>
                  )}
                </div>
                
                <exerciseType.component
                  level={level}
                  onComplete={(score: number) => handleExerciseComplete(exerciseType.id, score)}
                />
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Completion Section */}
        {allExercisesCompleted && (
          <Card className="mt-8 p-8 bg-green-50 border-green-200 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-green-800 mb-4">Level {level} Complete!</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded">
                <div className="text-2xl font-bold text-green-600">{exerciseTypes.length}</div>
                <div className="text-sm text-green-800">Exercises Completed</div>
              </div>
              <div className="bg-white p-4 rounded">
                <div className="text-2xl font-bold text-blue-600">{averageScore}%</div>
                <div className="text-sm text-blue-800">Average Score</div>
              </div>
              <div className="bg-white p-4 rounded">
                <div className="text-2xl font-bold text-purple-600">
                  {completedExercises.reduce((sum, exerciseId) => sum + (scores[exerciseId] || 0), 0)}
                </div>
                <div className="text-sm text-purple-800">Total Points</div>
              </div>
            </div>

            <p className="text-green-700 mb-6">
              Excellent work! You've successfully completed all exercises for this level. 
              You're ready to advance to the next level in your German learning journey.
            </p>
            
            <Button 
              onClick={handleCompleteLevel}
              className="bg-green-600 hover:bg-green-700"
              size="lg"
            >
              Complete Level & Continue →
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
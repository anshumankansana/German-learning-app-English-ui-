import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { CheckCircle, PenTool, RefreshCw } from 'lucide-react';
import { Badge } from '../ui/badge';

interface WritingExerciseProps {
  level: string;
  onComplete: (score: number) => void;
}

export function WritingExercise({ level, onComplete }: WritingExerciseProps) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const writingPrompts = {
    'C1.1': [
      {
        prompt: 'Write a short introduction about yourself (4-5 sentences)',
        hints: ['Include your name', 'Where you come from', 'A greeting', 'Something about yourself'],
        sampleAnswer: 'Hallo! Ich heiße Maria Schmidt. Ich komme aus München und wohne jetzt in Berlin. Ich bin 25 Jahre alt und arbeite als Lehrerin. Freut mich, Sie kennenzulernen!',
        wordCount: [30, 50]
      },
      {
        prompt: 'Write a simple conversation between two people meeting for the first time (6-8 lines)',
        hints: ['Use greetings', 'Exchange names', 'Ask where they come from', 'Be polite'],
        sampleAnswer: 'Person A: Hallo! Ich heiße Thomas. Wie heißen Sie?\nPerson B: Guten Tag! Mein Name ist Anna Weber.\nPerson A: Freut mich! Wo kommen Sie her?\nPerson B: Ich komme aus Hamburg. Und Sie?\nPerson A: Ich bin aus München. Wie geht es Ihnen?\nPerson B: Mir geht es gut, danke! Und Ihnen?\nPerson A: Auch gut, vielen Dank!',
        wordCount: [40, 60]
      },
      {
        prompt: 'Describe your daily morning routine using basic German (4-6 sentences)',
        hints: ['Use "ich" + verb', 'Include time expressions', 'Mention breakfast', 'Be simple and clear'],
        sampleAnswer: 'Ich stehe um sieben Uhr auf. Dann gehe ich ins Badezimmer und dusche. Um acht Uhr frühstücke ich. Ich trinke Kaffee und esse Brot. Dann gehe ich zur Arbeit.',
        wordCount: [25, 40]
      }
    ],
    'C1.2': [
      {
        prompt: 'Write about your family and home (5-7 sentences)',
        hints: ['Describe family members', 'Talk about your house/apartment', 'Use possessive pronouns', 'Include rooms'],
        sampleAnswer: 'Meine Familie ist nicht sehr groß. Ich habe einen Vater, eine Mutter und eine Schwester. Wir wohnen in einem schönen Haus mit einem Garten. Unser Haus hat vier Zimmer: ein Wohnzimmer, eine Küche, zwei Schlafzimmer und ein Badezimmer. Mein Zimmer ist klein aber gemütlich. Am Wochenende kochen wir zusammen in der Küche.',
        wordCount: [40, 70]
      },
      {
        prompt: 'Describe a typical room in your house in detail (6-8 sentences)',
        hints: ['Choose one room', 'Describe what\'s in it', 'Use articles correctly', 'Include colors or sizes'],
        sampleAnswer: 'Mein Wohnzimmer ist sehr gemütlich. Es ist groß und hat zwei Fenster. In der Mitte steht ein weißer Tisch. Vor dem Fenster stehen zwei bequeme Sessel. An der Wand hängt ein schöner Fernseher. Die Wände sind gelb und sehr freundlich. Abends sitzen wir hier und sehen fern.',
        wordCount: [50, 80]
      }
    ],
    'A2.2': [
      {
        prompt: 'Write a sophisticated analysis of a contemporary philosophical issue (200-250 words)',
        hints: ['Use complex sentence structures', 'Include abstract concepts', 'Demonstrate deep vocabulary', 'Show critical thinking'],
        sampleAnswer: 'Die Kontroverse um die künstliche Intelligenz stellt unsere Gesellschaft vor fundamentale epistemologische Fragen, die eine umfassende Neubetrachtung unserer anthropologischen Grundannahmen erfordern. Während Befürworter argumentieren, dass die Digitalisierung eine Paradigmaverschiebung hin zu größerer Effizienz und Innovation ermöglicht, warnen Kritiker vor den unabsehbaren Konsequenzen einer unregulierten technologischen Entwicklung...',
        wordCount: [180, 250]
      }
    ]
  };

  const currentPrompts = writingPrompts[level as keyof typeof writingPrompts] || writingPrompts['C1.1'];
  const current = currentPrompts[currentExercise];
  const progress = ((currentExercise + 1) / currentPrompts.length) * 100;

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentExercise] = value;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentExercise < currentPrompts.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setShowFeedback(false);
    } else {
      setIsComplete(true);
      // Calculate a basic score based on completion
      const completedAnswers = userAnswers.filter(answer => answer && answer.trim().length > 10).length;
      const score = Math.round((completedAnswers / currentPrompts.length) * 100);
      onComplete(score);
    }
  };

  const handlePrevious = () => {
    if (currentExercise > 0) {
      setCurrentExercise(prev => prev - 1);
      setShowFeedback(false);
    }
  };

  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const currentAnswer = userAnswers[currentExercise] || '';
  const wordCount = getWordCount(currentAnswer);
  const [minWords, maxWords] = current.wordCount;
  const isValidLength = wordCount >= minWords && wordCount <= maxWords;

  if (isComplete) {
    return (
      <Card className="p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="mb-4">Writing Exercise Complete!</h2>
        
        <div className="mb-6">
          <div className="bg-blue-50 p-4 rounded">
            <div className="text-2xl font-bold text-blue-600">{currentPrompts.length}</div>
            <div className="text-sm text-blue-800">Writing Prompts Completed</div>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          Great job! You've completed all writing exercises for this level. 
          Writing practice is essential for developing fluency in German.
        </p>

        <div className="space-y-4">
          <h3>Review Your Writing:</h3>
          {currentPrompts.map((prompt, index) => (
            <div key={index} className="text-left bg-gray-50 p-4 rounded">
              <div className="font-medium mb-2">Prompt {index + 1}:</div>
              <div className="text-sm text-gray-600 mb-2">{prompt.prompt}</div>
              <div className="text-sm bg-white p-3 rounded border">
                {userAnswers[index] || 'No answer provided'}
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Exercise {currentExercise + 1} of {currentPrompts.length}
          </span>
          <Badge variant="outline">
            <PenTool className="w-3 h-3 mr-1" />
            Writing Practice
          </Badge>
        </div>
        <Progress value={progress} className="mb-4" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-4">Writing Prompt</h3>
          <div className="bg-blue-50 p-4 rounded mb-4">
            <p className="text-blue-800">{current.prompt}</p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Hints:</h4>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              {current.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </div>

          <div className="text-sm text-gray-600">
            Target: {minWords}-{maxWords} words
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3>Your Answer</h3>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${isValidLength ? 'text-green-600' : 'text-orange-600'}`}>
                {wordCount} words
              </span>
              {isValidLength && <CheckCircle className="w-4 h-4 text-green-500" />}
            </div>
          </div>

          <Textarea
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Write your answer in German..."
            className="min-h-[200px] mb-4"
          />

          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={toggleFeedback}
              disabled={!currentAnswer.trim()}
            >
              {showFeedback ? 'Hide' : 'Show'} Sample Answer
            </Button>
            
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentExercise === 0}
              >
                Previous
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!currentAnswer.trim() || wordCount < minWords}
              >
                {currentExercise === currentPrompts.length - 1 ? 'Complete' : 'Next'}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {showFeedback && (
        <Card className="mt-6 p-6">
          <h3 className="mb-4">Sample Answer</h3>
          <div className="bg-green-50 p-4 rounded">
            <p className="text-green-800 whitespace-pre-line">{current.sampleAnswer}</p>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            This is just one example. Your answer can be different as long as it addresses the prompt!
          </p>
        </Card>
      )}
    </div>
  );
}
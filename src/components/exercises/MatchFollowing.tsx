import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface MatchFollowingProps {
  level: string;
  onComplete: (isCorrect: boolean) => void;
}

export function MatchFollowing({ level, onComplete }: MatchFollowingProps) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matches, setMatches] = useState<{[key: number]: number}>({});
  const [submitted, setSubmitted] = useState(false);

  const exercises = {
    'C1.1': {
      left: ['Hallo', 'Danke', 'Bitte', 'Auf Wiedersehen'],
      right: ['Please/You\'re welcome', 'Hello', 'Goodbye', 'Thank you'],
      correct: { 0: 1, 1: 3, 2: 0, 3: 2 }
    },
    'C1.2': {
      left: ['Das Haus', 'Der Baum', 'Die Katze', 'Das Auto'],
      right: ['The car', 'The house', 'The tree', 'The cat'],
      correct: { 0: 1, 1: 2, 2: 3, 3: 0 }
    },
    'C2.1': {
      left: ['arbeiten', 'essen', 'schlafen', 'lernen'],
      right: ['to learn', 'to work', 'to sleep', 'to eat'],
      correct: { 0: 1, 1: 3, 2: 2, 3: 0 }
    },
    'C2.2': {
      left: ['der Arzt', 'der Lehrer', 'der Koch', 'der Student'],
      right: ['the cook', 'the doctor', 'the student', 'the teacher'],
      correct: { 0: 1, 1: 3, 2: 0, 3: 2 }
    },
    'B1.1': {
      left: ['die Umwelt', 'die Bildung', 'die Gesundheit', 'die Politik'],
      right: ['politics', 'environment', 'health', 'education'],
      correct: { 0: 1, 1: 3, 2: 2, 3: 0 }
    },
    'B1.2': {
      left: ['erfolgreich', 'zuverlässig', 'kreativ', 'verantwortlich'],
      right: ['reliable', 'successful', 'responsible', 'creative'],
      correct: { 0: 1, 1: 0, 2: 3, 3: 2 }
    },
    'B2.1': {
      left: ['die Forschung', 'die Entwicklung', 'die Wissenschaft', 'die Technologie'],
      right: ['technology', 'research', 'science', 'development'],
      correct: { 0: 1, 1: 3, 2: 2, 3: 0 }
    },
    'B2.2': {
      left: ['beeinflussen', 'ermöglichen', 'verhindern', 'verbessern'],
      right: ['to improve', 'to influence', 'to prevent', 'to enable'],
      correct: { 0: 1, 1: 3, 2: 2, 3: 0 }
    },
    'A1.1': {
      left: ['die Nachhaltigkeit', 'die Globalisierung', 'die Digitalisierung', 'die Innovation'],
      right: ['innovation', 'sustainability', 'digitalization', 'globalization'],
      correct: { 0: 1, 1: 3, 2: 2, 3: 0 }
    },
    'A1.2': {
      left: ['analysieren', 'interpretieren', 'implementieren', 'evaluieren'],
      right: ['to evaluate', 'to analyze', 'to implement', 'to interpret'],
      correct: { 0: 1, 1: 3, 2: 2, 3: 0 }
    },
    'A2.1': {
      left: ['die Kontroverse', 'die Hypothese', 'die Methodologie', 'die Implikation'],
      right: ['implication', 'controversy', 'methodology', 'hypothesis'],
      correct: { 0: 1, 1: 3, 2: 2, 3: 0 }
    },
    'A2.2': {
      left: ['konzeptualisieren', 'differenzieren', 'synthetisieren', 'kategorisieren'],
      right: ['to categorize', 'to conceptualize', 'to synthesize', 'to differentiate'],
      correct: { 0: 1, 1: 3, 2: 2, 3: 0 }
    }
  };

  const currentExercise = exercises[level as keyof typeof exercises] || exercises['C1.1'];

  const handleLeftClick = (index: number) => {
    if (submitted) return;
    setSelectedLeft(index);
    if (selectedRight !== null) {
      createMatch(index, selectedRight);
    }
  };

  const handleRightClick = (index: number) => {
    if (submitted) return;
    setSelectedRight(index);
    if (selectedLeft !== null) {
      createMatch(selectedLeft, index);
    }
  };

  const createMatch = (leftIndex: number, rightIndex: number) => {
    const newMatches = { ...matches };
    
    // Remove any existing matches for these items
    Object.keys(newMatches).forEach(key => {
      if (newMatches[parseInt(key)] === rightIndex) {
        delete newMatches[parseInt(key)];
      }
    });
    
    newMatches[leftIndex] = rightIndex;
    setMatches(newMatches);
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const handleSubmit = () => {
    let correctMatches = 0;
    Object.keys(matches).forEach(leftIndex => {
      const rightIndex = matches[parseInt(leftIndex)];
      if (currentExercise.correct[parseInt(leftIndex)] === rightIndex) {
        correctMatches++;
      }
    });
    
    setSubmitted(true);
    
    setTimeout(() => {
      onComplete(correctMatches >= 3); // Need at least 3/4 correct
    }, 2000);
  };

  const isMatched = (leftIndex: number, rightIndex: number) => {
    return matches[leftIndex] === rightIndex;
  };

  const isCorrectMatch = (leftIndex: number, rightIndex: number) => {
    return submitted && currentExercise.correct[leftIndex] === rightIndex;
  };

  const isIncorrectMatch = (leftIndex: number, rightIndex: number) => {
    return submitted && matches[leftIndex] === rightIndex && currentExercise.correct[leftIndex] !== rightIndex;
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <h3 className="text-lg">Match the German words with their English meanings:</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h4 className="font-medium text-center mb-4">German</h4>
            {currentExercise.left.map((item, index) => (
              <button
                key={index}
                onClick={() => handleLeftClick(index)}
                disabled={submitted}
                className={`w-full p-3 text-left rounded border-2 transition-colors ${
                  selectedLeft === index 
                    ? 'border-blue-500 bg-blue-50' 
                    : matches[index] !== undefined
                    ? submitted && isCorrectMatch(index, matches[index])
                      ? 'border-green-500 bg-green-50'
                      : submitted && isIncorrectMatch(index, matches[index])
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-center mb-4">English</h4>
            {currentExercise.right.map((item, index) => (
              <button
                key={index}
                onClick={() => handleRightClick(index)}
                disabled={submitted}
                className={`w-full p-3 text-left rounded border-2 transition-colors ${
                  selectedRight === index 
                    ? 'border-blue-500 bg-blue-50' 
                    : Object.values(matches).includes(index)
                    ? submitted 
                      ? Object.keys(matches).some(leftIdx => 
                          matches[parseInt(leftIdx)] === index && 
                          isCorrectMatch(parseInt(leftIdx), index)
                        )
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-gray-300 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {submitted && (
          <div className="space-y-2">
            <h4 className="font-medium">Correct matches:</h4>
            <div className="space-y-1">
              {currentExercise.left.map((leftItem, leftIndex) => (
                <div key={leftIndex} className="text-sm">
                  <span className="font-medium">{leftItem}</span> → {currentExercise.right[currentExercise.correct[leftIndex]]}
                </div>
              ))}
            </div>
          </div>
        )}

        <Button 
          onClick={handleSubmit} 
          disabled={submitted || Object.keys(matches).length < 4}
          className="w-full"
        >
          {submitted ? 'Checking...' : 'Submit Matches'}
        </Button>
      </div>
    </Card>
  );
}
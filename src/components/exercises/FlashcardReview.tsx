import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { RotateCcw, CheckCircle, X, Volume2 } from 'lucide-react';

interface FlashcardReviewProps {
  level: string;
  onComplete: (score: number) => void;
}

export function FlashcardReview({ level, onComplete }: FlashcardReviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const flashcards = {
    'C1.1': [
      { german: 'Hallo', english: 'Hello', category: 'Greetings' },
      { german: 'Danke', english: 'Thank you', category: 'Politeness' },
      { german: 'Bitte', english: 'Please / You\'re welcome', category: 'Politeness' },
      { german: 'Entschuldigung', english: 'Excuse me / Sorry', category: 'Politeness' },
      { german: 'Wie heißt du?', english: 'What is your name?', category: 'Introductions' },
      { german: 'Ich heiße...', english: 'My name is...', category: 'Introductions' },
      { german: 'Wo kommst du her?', english: 'Where do you come from?', category: 'Introductions' },
      { german: 'Ich komme aus...', english: 'I come from...', category: 'Introductions' },
      { german: 'Wie geht es dir?', english: 'How are you?', category: 'Greetings' },
      { german: 'Mir geht es gut', english: 'I am fine', category: 'Greetings' },
      { german: 'Auf Wiedersehen', english: 'Goodbye', category: 'Farewells' },
      { german: 'Tschüss', english: 'Bye', category: 'Farewells' },
      { german: 'Guten Morgen', english: 'Good morning', category: 'Greetings' },
      { german: 'Guten Tag', english: 'Good day', category: 'Greetings' },
      { german: 'Guten Abend', english: 'Good evening', category: 'Greetings' },
      { german: 'eins', english: 'one', category: 'Numbers' },
      { german: 'zwei', english: 'two', category: 'Numbers' },
      { german: 'drei', english: 'three', category: 'Numbers' },
      { german: 'vier', english: 'four', category: 'Numbers' },
      { german: 'fünf', english: 'five', category: 'Numbers' },
    ],
    'C1.2': [
      { german: 'die Familie', english: 'family', category: 'Family' },
      { german: 'der Vater', english: 'father', category: 'Family' },
      { german: 'die Mutter', english: 'mother', category: 'Family' },
      { german: 'der Sohn', english: 'son', category: 'Family' },
      { german: 'die Tochter', english: 'daughter', category: 'Family' },
      { german: 'der Bruder', english: 'brother', category: 'Family' },
      { german: 'die Schwester', english: 'sister', category: 'Family' },
      { german: 'die Großmutter', english: 'grandmother', category: 'Family' },
      { german: 'der Großvater', english: 'grandfather', category: 'Family' },
      { german: 'das Haus', english: 'house', category: 'Home' },
      { german: 'die Wohnung', english: 'apartment', category: 'Home' },
      { german: 'das Zimmer', english: 'room', category: 'Home' },
      { german: 'die Küche', english: 'kitchen', category: 'Home' },
      { german: 'das Wohnzimmer', english: 'living room', category: 'Home' },
      { german: 'das Schlafzimmer', english: 'bedroom', category: 'Home' },
      { german: 'das Badezimmer', english: 'bathroom', category: 'Home' },
      { german: 'der Garten', english: 'garden', category: 'Home' },
      { german: 'die Tür', english: 'door', category: 'Home' },
      { german: 'das Fenster', english: 'window', category: 'Home' },
      { german: 'mein', english: 'my', category: 'Possessive' },
    ],
    // Add more levels...
    'A2.2': [
      { german: 'die Abhandlung', english: 'treatise', category: 'Academic' },
      { german: 'die Kontroverse', english: 'controversy', category: 'Academic' },
      { german: 'die Hypothese', english: 'hypothesis', category: 'Academic' },
      { german: 'die Methodologie', english: 'methodology', category: 'Academic' },
      { german: 'konzeptualisieren', english: 'to conceptualize', category: 'Verbs' },
      { german: 'differenzieren', english: 'to differentiate', category: 'Verbs' },
      { german: 'synthetisieren', english: 'to synthesize', category: 'Verbs' },
      { german: 'kategorisieren', english: 'to categorize', category: 'Verbs' },
      { german: 'die Paradigmaverschiebung', english: 'paradigm shift', category: 'Academic' },
      { german: 'die Epistemologie', english: 'epistemology', category: 'Academic' },
      { german: 'die Dialektik', english: 'dialectics', category: 'Academic' },
      { german: 'die Hermeneutik', english: 'hermeneutics', category: 'Academic' },
    ]
  };

  const currentCards = flashcards[level as keyof typeof flashcards] || flashcards['C1.1'];
  const currentCard = currentCards[currentIndex];
  const progress = ((currentIndex + 1) / currentCards.length) * 100;

  const handleCorrect = () => {
    setCorrectCount(prev => prev + 1);
    nextCard();
  };

  const handleIncorrect = () => {
    setIncorrectCount(prev => prev + 1);
    nextCard();
  };

  const nextCard = () => {
    setShowAnswer(false);
    if (currentIndex < currentCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
      const totalCards = currentCards.length;
      const score = Math.round((correctCount / totalCards) * 100);
      onComplete(score);
    }
  };

  const resetReview = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setIsComplete(false);
  };

  if (isComplete) {
    const totalCards = currentCards.length;
    const accuracy = Math.round((correctCount / totalCards) * 100);
    
    return (
      <Card className="p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="mb-4">Flashcard Review Complete!</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded">
            <div className="text-2xl font-bold text-green-600">{correctCount}</div>
            <div className="text-sm text-green-800">Correct</div>
          </div>
          <div className="bg-red-50 p-4 rounded">
            <div className="text-2xl font-bold text-red-600">{incorrectCount}</div>
            <div className="text-sm text-red-800">Incorrect</div>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <div className="text-2xl font-bold text-blue-600">{accuracy}%</div>
            <div className="text-sm text-blue-800">Accuracy</div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-gray-600">
            You reviewed {totalCards} flashcards with {accuracy}% accuracy.
          </p>
          <Button onClick={resetReview} variant="outline" className="mr-4">
            <RotateCcw className="w-4 h-4 mr-2" />
            Review Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Card {currentIndex + 1} of {currentCards.length}
          </span>
          <span className="text-sm text-gray-600">
            Category: {currentCard.category}
          </span>
        </div>
        <Progress value={progress} className="mb-4" />
        
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>{correctCount} correct</span>
          </div>
          <div className="flex items-center gap-1">
            <X className="w-4 h-4 text-red-500" />
            <span>{incorrectCount} incorrect</span>
          </div>
        </div>
      </div>

      <Card className="p-8 min-h-[400px] flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold mb-4 text-blue-600">
            {showAnswer ? currentCard.english : currentCard.german}
          </div>
          
          {!showAnswer ? (
            <div>
              <p className="text-gray-600 mb-6">
                What does this mean in English?
              </p>
              <Button onClick={() => setShowAnswer(true)} variant="outline">
                Show Answer
              </Button>
            </div>
          ) : (
            <div>
              <div className="text-lg text-gray-700 mb-2">
                German: {currentCard.german}
              </div>
              <div className="text-lg text-gray-700 mb-6">
                English: {currentCard.english}
              </div>
              
              <p className="text-gray-600 mb-6">
                Did you get it right?
              </p>
              
              <div className="space-x-4">
                <Button 
                  onClick={handleIncorrect} 
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Incorrect
                </Button>
                <Button 
                  onClick={handleCorrect}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Correct
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
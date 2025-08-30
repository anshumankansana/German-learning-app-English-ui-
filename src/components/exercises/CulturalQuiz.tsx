import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Globe, CheckCircle, X, Award } from 'lucide-react';
import { Badge } from '../ui/badge';

interface CulturalQuizProps {
  level: string;
  onComplete: (score: number) => void;
}

export function CulturalQuiz({ level, onComplete }: CulturalQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const quizData = {
    'C1.1': [
      {
        question: 'Which greeting is most appropriate for a business meeting in Germany?',
        options: ['Hallo', 'Guten Tag', 'Hi', 'Servus'],
        correct: 1,
        explanation: '"Guten Tag" is the most formal and appropriate greeting for business situations.'
      },
      {
        question: 'What does "pünktlich" mean in German culture?',
        options: ['Being fashionably late', 'Arriving exactly on time', 'Being early', 'Time is flexible'],
        correct: 1,
        explanation: 'Punctuality is highly valued in German culture. Being exactly on time shows respect.'
      },
      {
        question: 'In which German-speaking country would you hear "Grüß Gott" most commonly?',
        options: ['Northern Germany', 'Austria and Bavaria', 'Berlin', 'Switzerland'],
        correct: 1,
        explanation: '"Grüß Gott" is a traditional greeting used primarily in Austria and southern Germany (Bavaria).'
      },
      {
        question: 'What is the appropriate response when someone says "Danke" to you?',
        options: ['Danke auch', 'Bitte schön', 'Gern geschehen', 'Both B and C'],
        correct: 3,
        explanation: 'Both "Bitte schön" and "Gern geschehen" are appropriate responses meaning "You\'re welcome".'
      },
      {
        question: 'How many German-speaking countries are there in Europe?',
        options: ['3', '4', '5', '6'],
        correct: 3,
        explanation: 'Germany, Austria, Switzerland, Liechtenstein, and parts of Belgium and Luxembourg make 5+ regions.'
      }
    ],
    'C1.2': [
      {
        question: 'What is a typical German family structure like today?',
        options: ['Always large families', 'Mostly single-parent households', 'Mix of traditional and modern families', 'Only nuclear families'],
        correct: 2,
        explanation: 'Modern German families are diverse, including traditional nuclear families, single parents, and blended families.'
      },
      {
        question: 'What is "Gemütlichkeit"?',
        options: ['German efficiency', 'Cozy comfort and warmth', 'Formal politeness', 'Time management'],
        correct: 1,
        explanation: '"Gemütlichkeit" refers to a feeling of warmth, coziness, and belonging - very important in German culture.'
      },
      {
        question: 'Which room is considered the heart of a German home?',
        options: ['Das Wohnzimmer', 'Die Küche', 'Das Schlafzimmer', 'Der Keller'],
        correct: 1,
        explanation: 'The kitchen (die Küche) is traditionally the center of family life where meals and conversations happen.'
      },
      {
        question: 'What is "Kehrwoche" in German apartment buildings?',
        options: ['Weekly rent payment', 'Cleaning duty rotation', 'Noise restrictions', 'Building meetings'],
        correct: 1,
        explanation: '"Kehrwoche" is a system where residents take turns cleaning common areas of apartment buildings.'
      }
    ],
    'A2.2': [
      {
        question: 'What philosophical movement significantly influenced German academic culture?',
        options: ['Positivism', 'German Idealism', 'Pragmatism', 'Existentialism'],
        correct: 1,
        explanation: 'German Idealism, including philosophers like Kant, Hegel, and Fichte, profoundly shaped German intellectual culture.'
      },
      {
        question: 'What does "Bildung" represent in German educational philosophy?',
        options: ['Technical training', 'Holistic personal development', 'Professional qualification', 'Academic credentials'],
        correct: 1,
        explanation: '"Bildung" encompasses intellectual, cultural, and moral development of the individual - a core German educational concept.'
      },
      {
        question: 'Which concept is central to German academic discourse methodology?',
        options: ['Empirical verification', 'Hermeneutic understanding', 'Statistical analysis', 'Experimental validation'],
        correct: 1,
        explanation: 'Hermeneutics, the theory of interpretation, is fundamental to German academic and philosophical methodology.'
      }
    ]
  };

  const currentQuiz = quizData[level as keyof typeof quizData] || quizData['C1.1'];
  const progress = ((currentQuestion + 1) / currentQuiz.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < currentQuiz.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
      const correctCount = selectedAnswers.reduce((count, answer, index) => {
        return count + (answer === currentQuiz[index].correct ? 1 : 0);
      }, 0);
      const score = Math.round((correctCount / currentQuiz.length) * 100);
      onComplete(score);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  if (showResults) {
    const correctCount = selectedAnswers.reduce((count, answer, index) => {
      return count + (answer === currentQuiz[index].correct ? 1 : 0);
    }, 0);
    const score = Math.round((correctCount / currentQuiz.length) * 100);

    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 text-center">
          <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="mb-4">Cultural Quiz Complete!</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 p-4 rounded">
              <div className="text-2xl font-bold text-green-600">{correctCount}</div>
              <div className="text-sm text-green-800">Correct</div>
            </div>
            <div className="bg-red-50 p-4 rounded">
              <div className="text-2xl font-bold text-red-600">{currentQuiz.length - correctCount}</div>
              <div className="text-sm text-red-800">Incorrect</div>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <div className="text-2xl font-bold text-blue-600">{score}%</div>
              <div className="text-sm text-blue-800">Score</div>
            </div>
          </div>

          <div className="text-left">
            <h3 className="mb-4">Review Your Answers:</h3>
            <div className="space-y-4">
              {currentQuiz.map((q, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start gap-2 mb-2">
                    {selectedAnswers[index] === q.correct ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium mb-2">{q.question}</div>
                      <div className="text-sm text-gray-600 mb-1">
                        Your answer: {q.options[selectedAnswers[index]]}
                      </div>
                      <div className="text-sm text-green-600 mb-2">
                        Correct answer: {q.options[q.correct]}
                      </div>
                      <div className="text-sm text-blue-600 italic">
                        {q.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const current = currentQuiz[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {currentQuiz.length}
          </span>
          <Badge variant="outline">
            <Globe className="w-3 h-3 mr-1" />
            Cultural Knowledge
          </Badge>
        </div>
        <Progress value={progress} />
      </div>

      <Card className="p-8">
        <div className="mb-8">
          <h3 className="mb-6 text-center">{current.question}</h3>
          
          <div className="space-y-3">
            {current.options.map((option, index) => (
              <label 
                key={index} 
                className={`flex items-center space-x-3 p-4 rounded border cursor-pointer transition-colors ${
                  selectedAnswers[currentQuestion] === index 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={index}
                  checked={selectedAnswers[currentQuestion] === index}
                  onChange={() => handleAnswerSelect(index)}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="flex-1">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
          >
            {currentQuestion === currentQuiz.length - 1 ? 'Complete Quiz' : 'Next Question'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
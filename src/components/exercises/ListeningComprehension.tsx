import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Volume2, CheckCircle, Play, Pause } from 'lucide-react';
import { Badge } from '../ui/badge';

interface ListeningComprehensionProps {
  level: string;
  onComplete: (score: number) => void;
}

export function ListeningComprehension({ level, onComplete }: ListeningComprehensionProps) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const listeningExercises = {
    'C1.1': [
      {
        title: 'Basic Greeting Conversation',
        description: 'Listen to two people meeting for the first time.',
        transcript: `Person A: Guten Tag! Ich heiße Maria Weber.
Person B: Hallo! Mein Name ist Thomas Schmidt. Freut mich!
Person A: Freut mich auch. Wo kommen Sie her?
Person B: Ich komme aus München. Und Sie?
Person A: Ich bin aus Berlin. Wie geht es Ihnen?
Person B: Mir geht es sehr gut, danke. Und Ihnen?
Person A: Auch gut, vielen Dank!`,
        questions: [
          {
            question: 'Wie heißt die erste Person?',
            options: ['Maria Weber', 'Thomas Schmidt', 'Anna Miller', 'Klaus Wagner'],
            correct: 0
          },
          {
            question: 'Wo kommt Thomas her?',
            options: ['Berlin', 'Hamburg', 'München', 'Frankfurt'],
            correct: 2
          },
          {
            question: 'Wie geht es beiden Personen?',
            options: ['Schlecht', 'Okay', 'Gut', 'Sehr schlecht'],
            correct: 2
          }
        ]
      },
      {
        title: 'Numbers and Time',
        description: 'Listen to someone talking about their daily schedule.',
        transcript: `Ich stehe jeden Tag um sieben Uhr auf. Um acht Uhr frühstücke ich. Dann fahre ich um neun Uhr zur Arbeit. Ich arbeite bis fünf Uhr nachmittags. Abends um acht Uhr esse ich zu Abend.`,
        questions: [
          {
            question: 'Um wie viel Uhr steht die Person auf?',
            options: ['6 Uhr', '7 Uhr', '8 Uhr', '9 Uhr'],
            correct: 1
          },
          {
            question: 'Wann frühstückt die Person?',
            options: ['7 Uhr', '8 Uhr', '9 Uhr', '10 Uhr'],
            correct: 1
          },
          {
            question: 'Bis wann arbeitet die Person?',
            options: ['4 Uhr', '5 Uhr', '6 Uhr', '7 Uhr'],
            correct: 1
          }
        ]
      }
    ],
    'C1.2': [
      {
        title: 'Family Description',
        description: 'Listen to someone describing their family.',
        transcript: `Meine Familie ist sehr wichtig für mich. Mein Vater ist Arzt und arbeitet im Krankenhaus. Meine Mutter ist Lehrerin in einer Grundschule. Ich habe zwei Geschwister: einen älteren Bruder und eine jüngere Schwester. Mein Bruder studiert Informatik an der Universität. Meine Schwester geht noch zur Schule. Wir wohnen alle zusammen in einem großen Haus mit einem schönen Garten.`,
        questions: [
          {
            question: 'Was ist der Vater von Beruf?',
            options: ['Lehrer', 'Arzt', 'Ingenieur', 'Koch'],
            correct: 1
          },
          {
            question: 'Wie viele Geschwister hat die Person?',
            options: ['Eins', 'Zwei', 'Drei', 'Vier'],
            correct: 1
          },
          {
            question: 'Was studiert der Bruder?',
            options: ['Medizin', 'Informatik', 'Mathematik', 'Geschichte'],
            correct: 1
          }
        ]
      }
    ],
    'A2.2': [
      {
        title: 'Academic Lecture Extract',
        description: 'Listen to a complex academic discussion about epistemology.',
        transcript: `Die Epistemologie, auch Erkenntnistheorie genannt, beschäftigt sich mit grundlegenden Fragen der Erkenntnis. Wie können wir Wissen erlangen? Was unterscheidet wahres Wissen von bloßen Meinungen? Diese Fragen haben Philosophen seit der Antike beschäftigt. Die moderne Epistemologie hat verschiedene Ansätze entwickelt: den Empirismus, der die Erfahrung als Erkenntnisquelle betont, und den Rationalismus, der die Vernunft in den Vordergrund stellt.`,
        questions: [
          {
            question: 'Was ist ein anderer Name für Epistemologie?',
            options: ['Metaphysik', 'Erkenntnistheorie', 'Ontologie', 'Phänomenologie'],
            correct: 1
          },
          {
            question: 'Welche zwei Hauptansätze werden erwähnt?',
            options: ['Idealismus und Materialismus', 'Empirismus und Rationalismus', 'Positivismus und Hermeneutik', 'Strukturalismus und Dekonstruktion'],
            correct: 1
          }
        ]
      }
    ]
  };

  const currentExercises = listeningExercises[level as keyof typeof listeningExercises] || listeningExercises['C1.1'];
  const current = currentExercises[currentExercise];
  const progress = ((currentExercise + 1) / currentExercises.length) * 100;

  // Simulate audio playback
  const playAudio = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000); // Simulate 3 second audio
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentExercise < currentExercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setShowTranscript(false);
    } else {
      // Calculate score
      let correct = 0;
      let total = 0;
      
      currentExercises.forEach((exercise, exerciseIndex) => {
        exercise.questions.forEach((question, questionIndex) => {
          total++;
          const userAnswer = selectedAnswers[exerciseIndex * 10 + questionIndex];
          if (userAnswer === question.correct) {
            correct++;
          }
        });
      });
      
      const score = Math.round((correct / total) * 100);
      setIsComplete(true);
      onComplete(score);
    }
  };

  if (isComplete) {
    let correct = 0;
    let total = 0;
    
    currentExercises.forEach((exercise, exerciseIndex) => {
      exercise.questions.forEach((question, questionIndex) => {
        total++;
        const userAnswer = selectedAnswers[exerciseIndex * 10 + questionIndex];
        if (userAnswer === question.correct) {
          correct++;
        }
      });
    });

    const accuracy = Math.round((correct / total) * 100);

    return (
      <Card className="p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="mb-4">Listening Comprehension Complete!</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded">
            <div className="text-2xl font-bold text-green-600">{correct}</div>
            <div className="text-sm text-green-800">Correct</div>
          </div>
          <div className="bg-red-50 p-4 rounded">
            <div className="text-2xl font-bold text-red-600">{total - correct}</div>
            <div className="text-sm text-red-800">Incorrect</div>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <div className="text-2xl font-bold text-blue-600">{accuracy}%</div>
            <div className="text-sm text-blue-800">Accuracy</div>
          </div>
        </div>

        <p className="text-gray-600">
          You completed {currentExercises.length} listening exercises with {accuracy}% accuracy.
          Listening comprehension is crucial for real-world German communication!
        </p>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Exercise {currentExercise + 1} of {currentExercises.length}
          </span>
          <Badge variant="outline">
            <Volume2 className="w-3 h-3 mr-1" />
            Listening
          </Badge>
        </div>
        <Progress value={progress} className="mb-4" />
      </div>

      <Card className="p-6 mb-6">
        <h3 className="mb-4">{current.title}</h3>
        <p className="text-gray-600 mb-4">{current.description}</p>
        
        <div className="bg-blue-50 p-4 rounded mb-4">
          <div className="flex items-center justify-center">
            <Button 
              onClick={playAudio} 
              disabled={isPlaying}
              className="flex items-center gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  Playing Audio...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Play Audio (Simulated)
                </>
              )}
            </Button>
          </div>
          <div className="text-center mt-2">
            <Button 
              variant="outline" 
              onClick={() => setShowTranscript(!showTranscript)}
              className="text-xs"
            >
              {showTranscript ? 'Hide' : 'Show'} Transcript
            </Button>
          </div>
        </div>

        {showTranscript && (
          <div className="bg-gray-50 p-4 rounded mb-4">
            <h4 className="text-sm font-medium mb-2">Transcript:</h4>
            <div className="text-sm whitespace-pre-line">{current.transcript}</div>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="mb-4">Questions</h3>
        <div className="space-y-6">
          {current.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <h4 className="mb-3">{question.question}</h4>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${currentExercise}-${questionIndex}`}
                      value={optionIndex}
                      checked={selectedAnswers[currentExercise * 10 + questionIndex] === optionIndex}
                      onChange={() => handleAnswerSelect(currentExercise * 10 + questionIndex, optionIndex)}
                      className="form-radio"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-right">
          <Button 
            onClick={handleNext}
            disabled={current.questions.some((_, questionIndex) => 
              selectedAnswers[currentExercise * 10 + questionIndex] === undefined
            )}
          >
            {currentExercise === currentExercises.length - 1 ? 'Complete' : 'Next Exercise'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
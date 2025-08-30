import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';

interface FillInBlanksProps {
  level: string;
  onComplete: (isCorrect: boolean) => void;
}

export function FillInBlanks({ level, onComplete }: FillInBlanksProps) {
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [submitted, setSubmitted] = useState(false);

  const exercises = {
    'C1.1': {
      text: "Hallo! Ich _____ Maria. Ich _____ aus Deutschland. Ich _____ Deutsch.",
      blanks: ['heiße', 'komme', 'spreche'],
      translation: "Hello! I am Maria. I come from Germany. I speak German."
    },
    'C1.2': {
      text: "Das _____ mein Haus. Es _____ sehr schön. Ich _____ gerne hier.",
      blanks: ['ist', 'ist', 'wohne'],
      translation: "This is my house. It is very beautiful. I like living here."
    },
    'C2.1': {
      text: "Gestern _____ ich ins Kino gegangen. Der Film _____ sehr interessant. Ich _____ ihn empfehlen.",
      blanks: ['bin', 'war', 'kann'],
      translation: "Yesterday I went to the cinema. The film was very interesting. I can recommend it."
    },
    'C2.2': {
      text: "Wenn ich Zeit _____, _____ ich gerne ein Buch. Lesen _____ mein Hobby.",
      blanks: ['habe', 'lese', 'ist'],
      translation: "When I have time, I like to read a book. Reading is my hobby."
    },
    'B1.1': {
      text: "Obwohl es geregnet _____, _____ wir spazieren gegangen. Das Wetter _____ uns nicht gestört.",
      blanks: ['hat', 'sind', 'hat'],
      translation: "Although it rained, we went for a walk. The weather didn't bother us."
    },
    'B1.2': {
      text: "Der Student, _____ fleißig studiert, _____ gute Noten bekommen. Er _____ sich sehr gefreut.",
      blanks: ['der', 'wird', 'hat'],
      translation: "The student who studies diligently will get good grades. He was very happy."
    },
    'B2.1': {
      text: "Nachdem er das Projekt _____ hatte, _____ er endlich entspannen. Die Arbeit _____ sehr anspruchsvoll gewesen.",
      blanks: ['abgeschlossen', 'konnte', 'war'],
      translation: "After he had completed the project, he could finally relax. The work had been very demanding."
    },
    'B2.2': {
      text: "Falls Sie weitere Informationen _____, _____ Sie sich gerne an uns. Wir _____ Ihnen gerne helfen.",
      blanks: ['benötigen', 'wenden', 'werden'],
      translation: "If you need further information, please feel free to contact us. We will be happy to help you."
    },
    'A1.1': {
      text: "Die Regierung _____ angekündigt, dass sie die Steuern erhöhen _____. Diese Entscheidung _____ auf Kritik gestoßen.",
      blanks: ['hat', 'wird', 'ist'],
      translation: "The government has announced that it will raise taxes. This decision has met with criticism."
    },
    'A1.2': {
      text: "Vorausgesetzt, dass alle Teilnehmer _____, _____ das Meeting wie geplant stattfinden. Andernfalls _____ es verschoben werden.",
      blanks: ['erscheinen', 'kann', 'müsste'],
      translation: "Provided that all participants show up, the meeting can take place as planned. Otherwise it would have to be postponed."
    },
    'A2.1': {
      text: "Die Wissenschaftler _____ zu dem Schluss gekommen, dass die Hypothese _____ werden müsse. Ihre Forschung _____ neue Erkenntnisse gebracht.",
      blanks: ['sind', 'revidiert', 'hat'],
      translation: "The scientists have come to the conclusion that the hypothesis must be revised. Their research has brought new insights."
    },
    'A2.2': {
      text: "Ungeachtet der Tatsache, dass die Verhandlungen _____ verliefen, _____ beide Parteien eine Einigung erzielen. Dies _____ ein großer Erfolg.",
      blanks: ['schwierig', 'konnten', 'war'],
      translation: "Despite the fact that the negotiations were difficult, both parties were able to reach an agreement. This was a great success."
    }
  };

  const currentExercise = exercises[level as keyof typeof exercises] || exercises['C1.1'];

  const handleSubmit = () => {
    const correctAnswers = answers.filter((answer, index) => 
      answer.toLowerCase().trim() === currentExercise.blanks[index].toLowerCase()
    ).length;
    
    setSubmitted(true);
    
    setTimeout(() => {
      onComplete(correctAnswers >= 2); // Need at least 2/3 correct
    }, 2000);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const renderTextWithBlanks = () => {
    const parts = currentExercise.text.split('_____');
    const result = [];
    
    for (let i = 0; i < parts.length; i++) {
      result.push(parts[i]);
      if (i < parts.length - 1) {
        const isCorrect = submitted && answers[i].toLowerCase().trim() === currentExercise.blanks[i].toLowerCase();
        const isWrong = submitted && answers[i].toLowerCase().trim() !== currentExercise.blanks[i].toLowerCase();
        
        result.push(
          <Input
            key={i}
            value={answers[i]}
            onChange={(e) => handleAnswerChange(i, e.target.value)}
            disabled={submitted}
            className={`inline-block w-32 mx-1 ${
              submitted 
                ? isCorrect 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-red-500 bg-red-50'
                : ''
            }`}
            placeholder={`Blank ${i + 1}`}
          />
        );
      }
    }
    
    return result;
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg mb-4">Fill in the blanks with the correct German words:</h3>
          <div className="text-lg leading-relaxed p-4 bg-gray-50 rounded-lg">
            {renderTextWithBlanks()}
          </div>
        </div>

        <div className="text-sm text-gray-600 p-3 bg-blue-50 rounded">
          <strong>Translation:</strong> {currentExercise.translation}
        </div>

        {submitted && (
          <div className="space-y-2">
            <h4 className="font-medium">Correct answers:</h4>
            <div className="flex gap-2">
              {currentExercise.blanks.map((blank, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded">
                  {blank}
                </span>
              ))}
            </div>
          </div>
        )}

        <Button 
          onClick={handleSubmit} 
          disabled={submitted || answers.some(answer => !answer.trim())}
          className="w-full"
        >
          {submitted ? 'Checking...' : 'Submit Answers'}
        </Button>
      </div>
    </Card>
  );
}
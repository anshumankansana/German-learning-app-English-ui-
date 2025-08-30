import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface CompleteSentencesProps {
  level: string;
  onComplete: (isCorrect: boolean) => void;
}

export function CompleteSentences({ level, onComplete }: CompleteSentencesProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([null, null, null]);
  const [submitted, setSubmitted] = useState(false);

  const exercises = {
    'C1.1': {
      questions: [
        {
          sentence: "Ich _____ jeden Tag zur Schule.",
          options: ["gehe", "gehst", "geht", "gehen"],
          correct: 0
        },
        {
          sentence: "Meine Schwester _____ sehr gerne Musik.",
          options: ["höre", "hörst", "hört", "hören"],
          correct: 2
        },
        {
          sentence: "Wir _____ heute Abend ins Kino.",
          options: ["fahre", "fährst", "fährt", "fahren"],
          correct: 3
        }
      ]
    },
    'C1.2': {
      questions: [
        {
          sentence: "Das Buch liegt _____ dem Tisch.",
          options: ["in", "auf", "unter", "neben"],
          correct: 1
        },
        {
          sentence: "Ich kaufe _____ Brot für das Frühstück.",
          options: ["ein", "eine", "einen", "eines"],
          correct: 0
        },
        {
          sentence: "_____ kommst du? - Aus Deutschland.",
          options: ["Was", "Wer", "Woher", "Wohin"],
          correct: 2
        }
      ]
    },
    'C2.1': {
      questions: [
        {
          sentence: "Gestern _____ ich ein interessantes Buch gelesen.",
          options: ["bin", "habe", "war", "hatte"],
          correct: 1
        },
        {
          sentence: "Wenn ich Zeit _____, besuche ich meine Großmutter.",
          options: ["habe", "haben", "hat", "hatte"],
          correct: 0
        },
        {
          sentence: "Der Film war _____ interessant, als ich erwartet hatte.",
          options: ["mehr", "viel", "sehr", "noch"],
          correct: 0
        }
      ]
    },
    'C2.2': {
      questions: [
        {
          sentence: "Ich freue _____ auf die Ferien.",
          options: ["sich", "mich", "uns", "euch"],
          correct: 1
        },
        {
          sentence: "Das Auto, _____ dort steht, gehört meinem Vater.",
          options: ["der", "die", "das", "dem"],
          correct: 2
        },
        {
          sentence: "Sie hat mir gesagt, _____ sie morgen kommt.",
          options: ["dass", "das", "wenn", "ob"],
          correct: 0
        }
      ]
    },
    'B1.1': {
      questions: [
        {
          sentence: "Obwohl es regnete, _____ wir spazieren gegangen.",
          options: ["haben", "sind", "waren", "hatten"],
          correct: 1
        },
        {
          sentence: "Je mehr du übst, _____ besser wirst du.",
          options: ["umso", "als", "wie", "so"],
          correct: 0
        },
        {
          sentence: "Er behauptet, das Buch _____ gelesen zu haben.",
          options: ["schon", "bereits", "noch", "nie"],
          correct: 1
        }
      ]
    },
    'B1.2': {
      questions: [
        {
          sentence: "Das Projekt _____ bis nächste Woche abgeschlossen werden.",
          options: ["muss", "soll", "kann", "darf"],
          correct: 1
        },
        {
          sentence: "Nachdem er _____ hatte, ging er nach Hause.",
          options: ["gearbeitet", "arbeiten", "arbeitete", "gearbeiten"],
          correct: 0
        },
        {
          sentence: "Die Lösung des Problems _____ schwieriger als gedacht.",
          options: ["erwies sich", "zeigte sich", "stellte sich", "ergab sich"],
          correct: 0
        }
      ]
    },
    'B2.1': {
      questions: [
        {
          sentence: "Die Regierung _____ neue Maßnahmen zur Bekämpfung der Arbeitslosigkeit.",
          options: ["ergriff", "ergreift", "ergriffen", "ergreifen"],
          correct: 0
        },
        {
          sentence: "_____ aller Schwierigkeiten haben wir das Ziel erreicht.",
          options: ["Trotz", "Wegen", "Aufgrund", "Infolge"],
          correct: 0
        },
        {
          sentence: "Es ist wichtig, dass die Entscheidung _____ getroffen wird.",
          options: ["rechtzeitig", "rechtmäßig", "rechtskräftig", "rechtsgültig"],
          correct: 0
        }
      ]
    },
    'B2.2': {
      questions: [
        {
          sentence: "Die Diskussion _____ sich hauptsächlich um Umweltfragen.",
          options: ["drehte", "wendete", "bezog", "richtete"],
          correct: 0
        },
        {
          sentence: "_____ Sie weitere Fragen haben, stehe ich Ihnen gerne zur Verfügung.",
          options: ["Falls", "Wenn", "Sollten", "Würden"],
          correct: 2
        },
        {
          sentence: "Das Unternehmen _____ seine Produktion um 20% steigern.",
          options: ["vermochte", "konnte", "durfte", "mochte"],
          correct: 1
        }
      ]
    },
    'A1.1': {
      questions: [
        {
          sentence: "Die Forschungsergebnisse _____ unsere Hypothese.",
          options: ["bestätigen", "bekräftigen", "verifizieren", "validieren"],
          correct: 0
        },
        {
          sentence: "_____ der steigenden Nachfrage müssen wir die Produktion ausweiten.",
          options: ["Angesichts", "Bezüglich", "Hinsichtlich", "Aufgrund"],
          correct: 0
        },
        {
          sentence: "Seine Argumentation _____ jeden Zweifel aus.",
          options: ["schließt", "schließt", "ausschließt", "verschließt"],
          correct: 0
        }
      ]
    },
    'A1.2': {
      questions: [
        {
          sentence: "Die Maßnahmen _____ sich als völlig unzureichend.",
          options: ["erwiesen", "zeigten", "stellten", "ergaben"],
          correct: 0
        },
        {
          sentence: "_____ strengen Kontrollen konnten Fehler nicht vermieden werden.",
          options: ["Ungeachtet", "Trotz", "Entgegen", "Wider"],
          correct: 1
        },
        {
          sentence: "Die Theorie _____ einer grundlegenden Überarbeitung.",
          options: ["bedarf", "benötigt", "erfordert", "verlangt"],
          correct: 0
        }
      ]
    },
    'A2.1': {
      questions: [
        {
          sentence: "Die Komplexität des Problems _____ eine interdisziplinäre Herangehensweise.",
          options: ["erfordert", "bedingt", "impliziert", "necessitiert"],
          correct: 0
        },
        {
          sentence: "Seine Ausführungen _____ von profunder Sachkenntnis.",
          options: ["zeugen", "sprechen", "verraten", "bekunden"],
          correct: 0
        },
        {
          sentence: "Die Studie _____ methodische Mängel auf.",
          options: ["weist", "zeigt", "offenbart", "enthüllt"],
          correct: 0
        }
      ]
    },
    'A2.2': {
      questions: [
        {
          sentence: "Die Innovation _____ das Potenzial, die Branche zu revolutionieren.",
          options: ["birgt", "trägt", "besitzt", "enthält"],
          correct: 0
        },
        {
          sentence: "Seine Kritik _____ den Kern des Problems.",
          options: ["trifft", "erfasst", "ergreift", "betrifft"],
          correct: 0
        },
        {
          sentence: "Die Analyse _____ tiefgreifende Einsichten in die Materie.",
          options: ["gewährt", "ermöglicht", "eröffnet", "verschafft"],
          correct: 0
        }
      ]
    }
  };

  const currentExercise = exercises[level as keyof typeof exercises] || exercises['C1.1'];

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const correctAnswers = selectedAnswers.filter((answer, index) => 
      answer === currentExercise.questions[index].correct
    ).length;
    
    setSubmitted(true);
    
    setTimeout(() => {
      onComplete(correctAnswers >= 2); // Need at least 2/3 correct
    }, 2000);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <h3 className="text-lg">Complete the sentences by choosing the correct option:</h3>
        
        {currentExercise.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="space-y-3">
            <p className="font-medium">
              {questionIndex + 1}. {question.sentence}
            </p>
            
            <div className="grid grid-cols-2 gap-2">
              {question.options.map((option, optionIndex) => {
                const isSelected = selectedAnswers[questionIndex] === optionIndex;
                const isCorrect = submitted && optionIndex === question.correct;
                const isWrong = submitted && isSelected && optionIndex !== question.correct;
                
                return (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                    disabled={submitted}
                    className={`p-3 text-left rounded border-2 transition-colors ${
                      isCorrect 
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : isWrong 
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : isSelected 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <Button 
          onClick={handleSubmit} 
          disabled={submitted || selectedAnswers.some(answer => answer === null)}
          className="w-full"
        >
          {submitted ? 'Checking...' : 'Submit Answers'}
        </Button>
      </div>
    </Card>
  );
}
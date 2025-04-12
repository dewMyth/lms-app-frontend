"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

interface QuizComponentProps {
  quiz: Quiz;
}

export function QuizComponent({ quiz }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswers(false);
      setSelectedOption(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowAnswers(false);
      setSelectedOption(null);
    }
  };

  const question = quiz.questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{quiz.title}</h3>
        <div className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {totalQuestions}
        </div>
      </div>

      <Progress value={progress} className="h-2 w-full" />

      <div className="space-y-4">
        <h4 className="text-xl font-medium">{question.question}</h4>

        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedOption === index ? "default" : "outline"}
              className={`justify-between h-auto py-3 px-4 text-left ${
                showAnswers && option.isCorrect
                  ? "border-green-500 border-2"
                  : ""
              }`}
              onClick={() => handleOptionClick(index)}
              disabled={showAnswers}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-primary text-xs">
                  {String.fromCharCode(97 + index)}
                </div>
                <span>{option.text}</span>
              </div>
              {showAnswers && option.isCorrect && (
                <Check className="h-5 w-5 text-green-500" />
              )}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <Button
          onClick={handleNextQuestion}
          disabled={currentQuestion === totalQuestions - 1 || !showAnswers}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

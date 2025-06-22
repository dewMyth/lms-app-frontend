"use client";

import { useState, useEffect } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Star,
  Target,
  Award,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

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
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [animateScore, setAnimateScore] = useState(false);

  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Initialize answers array
  useEffect(() => {
    setAnswers(new Array(totalQuestions).fill(null));
  }, [totalQuestions]);

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    setShowAnswers(true);

    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswers(false);
      setSelectedOption(answers[currentQuestion + 1]);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowAnswers(false);
      setSelectedOption(answers[currentQuestion - 1]);
    }
  };

  const handleFinishQuiz = () => {
    // Calculate score
    let correctAnswers = 0;
    answers.forEach((answer, index) => {
      if (answer !== null && quiz.questions[index].options[answer].isCorrect) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);
    setShowResults(true);

    // Trigger animation after a short delay
    setTimeout(() => {
      setAnimateScore(true);
    }, 500);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setShowAnswers(false);
    setSelectedOption(null);
    setAnswers(new Array(totalQuestions).fill(null));
    setShowResults(false);
    setScore(0);
    setAnimateScore(false);
  };

  const getScoreMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return "Excellent! You're a master! 🏆";
    if (percentage >= 80) return "Great job! You really know your stuff! ⭐";
    if (percentage >= 70) return "Good work! Keep learning! 📚";
    if (percentage >= 60) return "Not bad! Room for improvement! 💪";
    if (percentage >= 50) return "You're getting there! Keep practicing! 📖";
    return "Keep digging knowledge! You'll get better! 📖";
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return <Trophy className="h-8 w-8 text-yellow-500" />;
    if (percentage >= 80) return <Star className="h-8 w-8 text-blue-500" />;
    if (percentage >= 70) return <Target className="h-8 w-8 text-green-500" />;
    return <Award className="h-8 w-8 text-orange-500" />;
  };

  if (showResults) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div
            className={`flex justify-center ${
              animateScore ? "animate-bounce" : ""
            }`}
          >
            {getScoreIcon(score, totalQuestions)}
          </div>

          <h3 className="text-2xl font-bold">Quiz Complete!</h3>

          <div className="space-y-2">
            <div
              className={`text-4xl font-bold ${getScoreColor(
                score,
                totalQuestions
              )} transition-all duration-1000 ${
                animateScore ? "scale-110" : "scale-100"
              }`}
            >
              {score}/{totalQuestions}
            </div>
            <div className="text-lg text-muted-foreground">
              {Math.round((score / totalQuestions) * 100)}%
            </div>
          </div>

          <div className="text-lg font-medium text-center">
            {getScoreMessage(score, totalQuestions)}
          </div>
        </div>

        {/* <div className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {quiz.questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect =
                userAnswer !== null && question.options[userAnswer].isCorrect;

              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    isCorrect
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {isCorrect ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <div className="h-4 w-4 text-red-600">✗</div>
                    )}
                    <span className="text-sm font-medium">
                      Question {index + 1}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {question.question}
                  </p>
                  {!isCorrect && userAnswer !== null && (
                    <p className="text-xs text-red-600 mt-1">
                      Your answer: {question.options[userAnswer].text}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div> */}

        <div className="flex justify-center pt-4">
          <Button onClick={handleRestartQuiz} className="px-8">
            Restart Quiz
          </Button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions - 1;

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
              className={`justify-between h-auto py-3 px-4 text-left transition-all duration-200 ${
                showAnswers && option.isCorrect
                  ? "border-green-500 border-2 bg-green-50"
                  : showAnswers && selectedOption === index && !option.isCorrect
                  ? "border-red-500 border-2 bg-red-50"
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

        {isLastQuestion ? (
          <Button
            onClick={handleFinishQuiz}
            disabled={!showAnswers}
            className="bg-green-600 hover:bg-green-700"
          >
            Finish Quiz
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} disabled={!showAnswers}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

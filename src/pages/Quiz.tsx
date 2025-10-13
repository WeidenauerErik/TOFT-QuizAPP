import { useState } from 'react';
import { MaterialCard } from '../components/MaterialCard';
import { MaterialButton } from '../components/MaterialButton';
import { ChevronLeft, CheckCircle2, XCircle } from 'lucide-react';
import { quizData } from '../data/quizData';
import { getUserId, markQuizCompleted } from '../lib/storage';
import { supabase } from '../lib/supabase';

interface QuizProps {
  quizId: string;
  userName: string;
  onBack: () => void;
}

export function Quiz({ quizId, userName, onBack }: QuizProps) {
  const quiz = quizData[quizId];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <MaterialCard className="p-8 text-center">
          <p className="text-red-600 mb-4">Quiz nicht gefunden</p>
          <MaterialButton onClick={onBack}>Zurück</MaterialButton>
        </MaterialCard>
      </div>
    );
  }

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);

    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);

    try {
      const userId = getUserId();

      const { error } = await supabase.from('quiz_results').insert({
        user_id: userId,
        user_name: userName,
        quiz_id: quiz.id,
        quiz_tag: quiz.tag,
        score: score
      });

      if (error) {
        console.error('Error submitting quiz:', error);
      } else {
        markQuizCompleted(quiz.id);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setIsSubmitting(false);
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / quiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <MaterialCard className="w-full max-w-2xl p-8">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
              percentage >= 80 ? 'bg-green-100' : percentage >= 60 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <span className={`text-4xl font-bold ${
                percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {score}/{quiz.questions.length}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz abgeschlossen!</h2>
            <p className="text-gray-600 text-lg">
              Du hast {score} von {quiz.questions.length} Fragen richtig beantwortet
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {quiz.questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <MaterialCard key={index} className="p-4" elevated={false}>
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                      <p className="text-sm text-gray-600">
                        Deine Antwort: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {question.options[userAnswer]}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600 mt-1">
                          Richtig: {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </MaterialCard>
              );
            })}
          </div>

          <MaterialButton onClick={onBack} fullWidth>
            Zurück zur Übersicht
          </MaterialButton>
        </MaterialCard>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto pt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Zurück
        </button>

        <MaterialCard className="p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-900">{quiz.title}</h2>
              <span className="text-sm font-medium text-gray-600">
                Frage {currentQuestion + 1} von {quiz.questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-8">{question.question}</h3>

          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="font-medium text-gray-900">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <MaterialButton
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined || isSubmitting}
            fullWidth
          >
            {isSubmitting
              ? 'Wird gesendet...'
              : currentQuestion === quiz.questions.length - 1
              ? 'Quiz abschließen'
              : 'Weiter'}
          </MaterialButton>
        </MaterialCard>
      </div>
    </div>
  );
}

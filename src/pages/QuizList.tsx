import { useState, useEffect } from 'react';
import { MaterialCard } from '../components/MaterialCard';
import { MaterialButton } from '../components/MaterialButton';
import { QRScanner } from '../components/QRScanner';
import { QrCode, Trophy } from 'lucide-react';
import { getUserId } from '../lib/storage';
import { supabase } from '../lib/supabase';
import { quizzes, getQuizById } from '../lib/quizHelpers';

interface QuizListProps {
  onSelectQuiz: (quizId: string) => void;
  onShowLeaderboard: () => void;
  userName: string;
}

interface CompletedQuiz {
  quiz_id: string;
  score: number;
  created_at: string;
}

export function QuizList({ onSelectQuiz, onShowLeaderboard, userName }: QuizListProps) {
  const [showScanner, setShowScanner] = useState(false);
  const [completedQuizzes, setCompletedQuizzes] = useState<CompletedQuiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompletedQuizzes();
  }, []);

  const loadCompletedQuizzes = async () => {
    const userId = getUserId();

    const { data, error } = await supabase
      .from('quiz_results')
      .select('quiz_id, score, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setCompletedQuizzes(data);
    }
    setLoading(false);
  };

  const handleQRScan = (quizId: string) => {
    setShowScanner(false);

    const quiz = getQuizById(quizId);
    if (quiz) {
      onSelectQuiz(quizId);
    } else {
      alert('Ungültiger QR-Code');
    }
  };

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 pt-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hallo, {userName}!</h1>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <MaterialButton onClick={() => setShowScanner(true)} variant="filled">
            <QrCode className="w-5 h-5 mr-2" />
            QR-Code scannen
          </MaterialButton>
          <MaterialButton onClick={onShowLeaderboard} variant="outlined">
            <Trophy className="w-5 h-5 mr-2" />
            Bestenliste
          </MaterialButton>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Absolvierte Quizes</h2>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Lade Ergebnisse...</p>
          </div>
        ) : completedQuizzes.length === 0 ? (
          <MaterialCard className="p-8 text-center">
            <p className="text-gray-600">Du hast noch keine Quizes absolviert.</p>
            <p className="text-gray-500 text-sm mt-2">Scanne einen QR-Code, um zu beginnen!</p>
          </MaterialCard>
        ) : (
          <div className="space-y-3">
            {completedQuizzes.map((result, index) => {
              const quiz = getQuizById(result.quiz_id);
              if (!quiz) return null;

              const Icon = quiz.icon;
              const percentage = (result.score / 5) * 100;

              return (
                <MaterialCard key={`${result.quiz_id}-${index}`} className="p-5">
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${colorClasses[quiz.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(result.created_at).toLocaleDateString('de-DE', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        percentage >= 80 ? 'text-green-600' :
                        percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {result.score}/5
                      </div>
                      <p className="text-xs text-gray-500">{Math.round(percentage)}%</p>
                    </div>
                  </div>
                </MaterialCard>
              );
            })}
          </div>
        )}
      </div>

      {showScanner && (
        <QRScanner
          onScan={handleQRScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
}

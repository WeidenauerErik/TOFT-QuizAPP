import { useState, useEffect } from 'react';
import { MaterialCard } from '../components/MaterialCard';
import { ChevronLeft, Trophy, Medal, Award } from 'lucide-react';
import { getQuizById } from '../lib/quizHelpers';

interface LeaderboardProps {
  onBack: () => void;
}

interface LeaderboardEntry {
  user_name: string;
  total_score: number;
  quiz_count: number;
  avg_score: number;
}

export function Leaderboard({ onBack }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | string>('all');

  useEffect(() => {
    loadLeaderboard();
  }, [filter]);

  const loadLeaderboard = async () => {
    setLoading(true);

    try {
      let query = supabase
        .from('quiz_results')
        .select('user_name, score, quiz_id');

      if (filter !== 'all') {
        query = query.eq('quiz_id', filter);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error loading leaderboard:', error);
        setLoading(false);
        return;
      }

      if (!data) {
        setLoading(false);
        return;
      }

      const userScores = new Map<string, { total: number; count: number }>();

      data.forEach((result) => {
        const current = userScores.get(result.user_name) || { total: 0, count: 0 };
        userScores.set(result.user_name, {
          total: current.total + result.score,
          count: current.count + 1
        });
      });

      const leaderboardData: LeaderboardEntry[] = Array.from(userScores.entries())
        .map(([name, scores]) => ({
          user_name: name,
          total_score: scores.total,
          quiz_count: scores.count,
          avg_score: scores.total / scores.count
        }))
        .sort((a, b) => b.total_score - a.total_score);

      setLeaderboard(leaderboardData);
    } catch (err) {
      console.error('Error loading leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (index === 1) return <Medal className="w-6 h-6 text-gray-400" />;
    if (index === 2) return <Award className="w-6 h-6 text-orange-600" />;
    return null;
  };

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

        <MaterialCard className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bestenliste</h1>
              <p className="text-sm text-gray-600">Alle Spieler nach Gesamtpunktzahl</p>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Alle Quizes
            </button>
            {['general-knowledge', 'logic', 'creativity', 'sports'].map((quizId) => {
              const quiz = getQuizById(quizId);
              if (!quiz) return null;

              return (
                <button
                  key={quizId}
                  onClick={() => setFilter(quizId)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    filter === quizId
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {quiz.title}
                </button>
              );
            })}
          </div>
        </MaterialCard>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Lade Bestenliste...</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <MaterialCard className="p-8 text-center">
            <p className="text-gray-600">Noch keine Ergebnisse vorhanden.</p>
          </MaterialCard>
        ) : (
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <MaterialCard key={`${entry.user_name}-${index}`} className="p-5">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 flex items-center justify-center">
                    {getRankIcon(index) || (
                      <span className="text-xl font-bold text-gray-400">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {entry.user_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {entry.quiz_count} {entry.quiz_count === 1 ? 'Quiz' : 'Quizes'} absolviert
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {entry.total_score}
                    </div>
                    <p className="text-xs text-gray-500">
                      Ø {entry.avg_score.toFixed(1)}/5
                    </p>
                  </div>
                </div>
              </MaterialCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

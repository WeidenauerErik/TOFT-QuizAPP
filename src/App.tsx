import { useState, useEffect } from 'react';
import { NameSetup } from './pages/NameSetup';
import { QuizList } from './pages/QuizList';
import { Quiz } from './pages/Quiz';
import { Leaderboard } from './pages/Leaderboard';
import { getUserName, setUserName, getUserId } from './lib/storage';

type View = 'name-setup' | 'quiz-list' | 'quiz' | 'leaderboard';

function App() {
  const [currentView, setCurrentView] = useState<View>('name-setup');
  const [userName, setUserNameState] = useState<string>('');
  const [selectedQuizId, setSelectedQuizId] = useState<string>('');

  useEffect(() => {
    getUserId();

    const storedName = getUserName();
    if (storedName) {
      setUserNameState(storedName);
      setCurrentView('quiz-list');
    }
  }, []);

  const handleNameSet = (name: string) => {
    setUserName(name);
    setUserNameState(name);
    setCurrentView('quiz-list');
  };

  const handleSelectQuiz = (quizId: string) => {
    setSelectedQuizId(quizId);
    setCurrentView('quiz');
  };

  const handleBackToList = () => {
    setCurrentView('quiz-list');
    setSelectedQuizId('');
  };

  const handleShowLeaderboard = () => {
    setCurrentView('leaderboard');
  };

  const handleBackFromLeaderboard = () => {
    setCurrentView('quiz-list');
  };

  if (currentView === 'name-setup') {
    return <NameSetup onNameSet={handleNameSet} />;
  }

  if (currentView === 'leaderboard') {
    return <Leaderboard onBack={handleBackFromLeaderboard} />;
  }

  if (currentView === 'quiz') {
    return (
      <Quiz
        quizId={selectedQuizId}
        userName={userName}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <QuizList
      onSelectQuiz={handleSelectQuiz}
      onShowLeaderboard={handleShowLeaderboard}
      userName={userName}
    />
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import QuizBuilder from './components/QuizBuilder';
import QuizPlayer from './components/QuizPlayer';
import QuizResults from './components/QuizResults';
import SavedQuizzes from './components/SavedQuizzes';
import FeaturedQuizzes from './components/FeaturedQuizzes';
import ShareModal from './components/ShareModal';
import { getSavedQuizzes, deleteSavedQuiz, decodeQuizFromUrl } from './utils/quizStorage';

export default function App() {
  const [activeTab, setActiveTab] = useState('builder'); // 'builder' | 'featured' | 'myQuizzes' | 'player' | 'results'
  const [savedQuizzes, setSavedQuizzes] = useState([]);
  
  // Active quiz object being taken or shared
  const [activeQuiz, setActiveQuiz] = useState(null);
  
  // User answers submitted for active quiz
  const [userAnswers, setUserAnswers] = useState({});

  // Share modal state
  const [shareModalQuiz, setShareModalQuiz] = useState(null);

  // Load saved quizzes on mount and check for shared URL hash
  useEffect(() => {
    const list = getSavedQuizzes();
    setSavedQuizzes(list);

    // Check URL hash for shared quiz payload (#quiz=...)
    const hash = window.location.hash;
    if (hash && hash.includes('#quiz=')) {
      const hashData = hash.split('#quiz=')[1];
      const decodedQuiz = decodeQuizFromUrl(hashData);
      if (decodedQuiz) {
        setActiveQuiz(decodedQuiz);
        setActiveTab('player');
      }
    }
  }, []);

  // When a quiz is created in builder
  const handleQuizCreated = (quizPayload) => {
    setSavedQuizzes(getSavedQuizzes());
    setShareModalQuiz(quizPayload);
  };

  // Start taking a quiz
  const handleStartQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setUserAnswers({});
    setShareModalQuiz(null);
    setActiveTab('player');
  };

  // Complete a quiz
  const handleCompleteQuiz = (quiz, answers) => {
    setActiveQuiz(quiz);
    setUserAnswers(answers);
    setActiveTab('results');
  };

  // Delete saved quiz
  const handleDeleteQuiz = (quizId) => {
    const updated = deleteSavedQuiz(quizId);
    setSavedQuizzes(updated);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#080c16] text-slate-800 dark:text-slate-100 flex flex-col font-['Inter',sans-serif] antialiased transition-colors duration-300">
      {/* Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        savedCount={savedQuizzes.length} 
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'builder' && (
          <QuizBuilder 
            onQuizCreated={handleQuizCreated}
            onTakeQuizDirectly={handleStartQuiz}
          />
        )}

        {activeTab === 'featured' && (
          <FeaturedQuizzes
            onPlayQuiz={handleStartQuiz}
            onShareQuiz={(quiz) => setShareModalQuiz(quiz)}
            onCreateNew={() => setActiveTab('builder')}
          />
        )}

        {activeTab === 'myQuizzes' && (
          <SavedQuizzes
            quizzes={savedQuizzes}
            onPlayQuiz={handleStartQuiz}
            onShareQuiz={(quiz) => setShareModalQuiz(quiz)}
            onDeleteQuiz={handleDeleteQuiz}
            onCreateNew={() => setActiveTab('builder')}
          />
        )}

        {activeTab === 'player' && activeQuiz && (
          <QuizPlayer
            quiz={activeQuiz}
            onCompleteQuiz={handleCompleteQuiz}
            onBackToBuilder={() => setActiveTab('builder')}
          />
        )}

        {activeTab === 'results' && activeQuiz && (
          <QuizResults
            quiz={activeQuiz}
            userAnswers={userAnswers}
            onRetake={() => handleStartQuiz(activeQuiz)}
            onCreateNew={() => setActiveTab('builder')}
          />
        )}
      </main>

      {/* Share Link Modal Popup */}
      {shareModalQuiz && (
        <ShareModal
          quiz={shareModalQuiz}
          onClose={() => setShareModalQuiz(null)}
          onStartQuiz={handleStartQuiz}
        />
      )}

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-400 dark:text-slate-500 border-t border-slate-200/60 dark:border-slate-800 mt-auto">
        <p>© IQ Test Quiz Builder • Created by <span className="font-semibold text-slate-600 dark:text-slate-300">Mahadeb Maity</span> (Freelance Developer)</p>
      </footer>
    </div>
  );
}

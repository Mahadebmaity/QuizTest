import React, { useState, useEffect } from 'react';
import { BookmarkCheck, Flame, Trophy, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import IqLogo from './IqLogo';
import LeaderboardModal from './LeaderboardModal';
import { sfx } from '../utils/audioSfx';

export default function Header({ activeTab, setActiveTab, savedCount = 0 }) {
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Toggle Dark Mode class on <html> element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleSound = () => {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-3 sm:px-8 py-3 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('builder')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <IqLogo size="md" />
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-['Plus_Jakarta_Sans',sans-serif]">
              IQ Test
            </span>
          </div>

          {/* Center / Right Nav links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('builder')}
              className={`text-xs sm:text-sm font-medium transition-colors px-2 sm:px-3 py-1.5 rounded-lg whitespace-nowrap ${
                activeTab === 'builder'
                  ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Create quiz
            </button>

            <button
              onClick={() => setActiveTab('featured')}
              className={`text-xs sm:text-sm font-medium transition-colors px-2 sm:px-3 py-1.5 rounded-lg flex items-center gap-1 whitespace-nowrap ${
                activeTab === 'featured'
                  ? 'text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Featured</span>
            </button>

            <button
              onClick={() => setActiveTab('myQuizzes')}
              className={`text-xs sm:text-sm font-medium transition-colors px-2 sm:px-3 py-1.5 rounded-lg flex items-center gap-1 sm:gap-1.5 whitespace-nowrap ${
                activeTab === 'myQuizzes'
                  ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">My Quizzes</span>
              {savedCount > 0 && (
                <span className="ml-0.5 text-[10px] sm:text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-1.5 py-0.5 rounded-full font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Leaderboard Trophy Modal Button */}
            <button
              onClick={() => setIsLeaderboardOpen(true)}
              title="View Leaderboard & Stats"
              className="p-2 rounded-xl text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 transition-colors shrink-0"
            >
              <Trophy className="w-4 h-4 fill-amber-400" />
            </button>

            {/* Sound SFX Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? "Unmute Sound" : "Mute Sound"}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 hidden sm:flex"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
            </button>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="p-2 rounded-xl text-slate-600 dark:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Leaderboard & Achievements Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />
    </>
  );
}

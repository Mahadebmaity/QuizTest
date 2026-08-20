import React, { useState, useEffect } from 'react';
import { BookmarkCheck, Flame, Trophy, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
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
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Text-Only Brand Logo */}
          <div 
            onClick={() => setActiveTab('builder')}
            className="flex items-center cursor-pointer group shrink-0 select-none mr-1 sm:mr-2"
          >
            <span className="text-lg sm:text-2xl font-black tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-extrabold">IQ</span>
              <span className="text-slate-900 dark:text-white ml-0.5 font-extrabold">Test</span>
            </span>
          </div>

          {/* Center & Right Navigation Menu */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 min-w-0">
            
            {/* Create Quiz Tab */}
            <button
              onClick={() => setActiveTab('builder')}
              className={`text-[11px] sm:text-sm font-semibold transition-all px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl whitespace-nowrap shrink-0 ${
                activeTab === 'builder'
                  ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/80 dark:text-indigo-300 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="sm:hidden">Create</span>
              <span className="hidden sm:inline">Create a quiz</span>
            </button>

            {/* Featured Quizzes Tab */}
            <button
              onClick={() => setActiveTab('featured')}
              className={`text-[11px] sm:text-sm font-semibold transition-all px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl flex items-center gap-1 whitespace-nowrap shrink-0 ${
                activeTab === 'featured'
                  ? 'text-purple-600 bg-purple-50 dark:bg-purple-950/80 dark:text-purple-300 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
              <span>Featured</span>
            </button>

            {/* My Quizzes Tab */}
            <button
              onClick={() => setActiveTab('myQuizzes')}
              className={`text-[11px] sm:text-sm font-semibold transition-all px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl flex items-center gap-1 sm:gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'myQuizzes'
                  ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/80 dark:text-indigo-300 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-indigo-500" />
              <span className="sm:hidden">My Quizzes</span>
              <span className="hidden sm:inline">My Quizzes</span>
              {savedCount > 0 && (
                <span className="ml-0.5 text-[9px] sm:text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-1.5 py-0.2 rounded-full font-extrabold">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Leaderboard Trophy Modal Button */}
            <button
              onClick={() => setIsLeaderboardOpen(true)}
              title="View Leaderboard & Player Stats"
              className="p-1.5 sm:p-2 rounded-xl text-amber-600 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200/80 dark:border-amber-700/50 transition-colors shrink-0 flex items-center gap-1 text-xs font-bold"
            >
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 shrink-0" />
              <span className="hidden lg:inline">Leaderboard</span>
            </button>

            {/* Sound SFX Mute/Unmute Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? "Unmute Sound" : "Mute Sound"}
              className="p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 hidden xs:flex"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 dark:text-indigo-400" />}
            </button>

            {/* Dark Mode Theme Switcher */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* Primary Action CTA Button */}
            <button
              onClick={() => setActiveTab('builder')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all border border-indigo-200 dark:border-indigo-800 shrink-0 ml-1"
            >
              <span>Start creating</span>
              <span className="text-base">→</span>
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

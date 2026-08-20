import React from 'react';
import { Trophy, Flame, Target, X, Award, CheckCircle2, History } from 'lucide-react';
import { getPlayerStats } from '../utils/leaderboard';

export default function LeaderboardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const stats = getPlayerStats();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 card-shadow border border-indigo-100 relative space-y-6 animate-scaleUp text-left max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Player Stats & Streaks</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 font-serif-heading">
            My Achievements & Leaderboard
          </h2>

          <p className="text-xs text-slate-500">
            Track your performance, win streaks, and recent quiz scores on this device.
          </p>
        </div>

        {/* 3 Stat Badges Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3 text-center space-y-0.5">
            <Target className="w-5 h-5 text-indigo-600 mx-auto" />
            <span className="text-xl font-extrabold text-indigo-950 block">{stats.totalQuizzesPlayed}</span>
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Played</span>
          </div>

          <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-3 text-center space-y-0.5">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500 mx-auto" />
            <span className="text-xl font-extrabold text-amber-950 block">{stats.currentStreak} 🔥</span>
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Streak</span>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3 text-center space-y-0.5">
            <Award className="w-5 h-5 text-emerald-600 mx-auto" />
            <span className="text-xl font-extrabold text-emerald-950 block">{stats.bestStreak}</span>
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Best Record</span>
          </div>
        </div>

        {/* Recent Score History List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <History className="w-4 h-4 text-slate-400" />
            <span>Recent Quiz Performance</span>
          </h3>

          {stats.history.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center text-xs text-slate-500">
              No completed quizzes recorded yet. Take a quiz to start building your streak!
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {stats.history.map((rec) => (
                <div 
                  key={rec.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5 min-w-0 flex-1 pr-2">
                    <span className="font-bold text-slate-800 block truncate">{rec.title}</span>
                    <span className="text-[10px] text-slate-400 block">{rec.date}</span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`font-extrabold text-sm block ${
                      rec.scorePercentage >= 70 ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      {rec.scorePercentage}%
                    </span>
                    <span className="text-[10px] text-slate-500 block">{rec.correctCount}/{rec.totalCount} Right</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
        >
          Close Stats
        </button>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Play, Share2, Sparkles, Brain, Rocket, Cpu, Flame, Copy, Check } from 'lucide-react';
import { FEATURED_QUIZZES } from '../utils/featuredQuizzesData';

export default function FeaturedQuizzes({ onPlayQuiz, onShareQuiz, onCreateNew }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'IQ & Logic', 'Space', 'Technology', 'Personality'];

  const filteredQuizzes = selectedCategory === 'All'
    ? FEATURED_QUIZZES
    : FEATURED_QUIZZES.filter(q => q.category === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 sm:py-12 space-y-6 sm:space-y-8 text-left">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl space-y-4">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider bg-purple-500/20 border border-purple-400/30 text-purple-200">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Ready-To-Play Library</span>
        </div>

        <div className="space-y-2 max-w-2xl">
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif-heading tracking-tight leading-tight">
            Featured In-Built Quizzes
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
            Test your knowledge right away, generate shareable links for your friends, or clone any quiz to customize it!
          </p>
        </div>

        {/* Category Pills */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-indigo-950 font-bold shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-indigo-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Featured Quizzes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredQuizzes.map((quiz) => {
          const qCount = quiz.questions?.length || 0;

          return (
            <div
              key={quiz.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 card-shadow hover:border-indigo-200 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold text-indigo-600 bg-indigo-50 uppercase tracking-wider">
                    {qCount} Questions
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/60">
                    {quiz.badge || quiz.category}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif-heading leading-snug">
                  {quiz.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {quiz.intro}
                </p>
              </div>

              {/* Card Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onPlayQuiz(quiz)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-100 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Play Quiz Now</span>
                </button>

                <button
                  onClick={() => onShareQuiz(quiz)}
                  title="Share Quiz Link"
                  className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors text-xs font-semibold flex items-center gap-1 shrink-0"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share Link</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

import React from 'react';
import { Play, Share2, Trash2, Plus, Sparkles, Brain, Clock } from 'lucide-react';
import { deleteSavedQuiz } from '../utils/quizStorage';

export default function SavedQuizzes({
  quizzes = [],
  onPlayQuiz,
  onShareQuiz,
  onDeleteQuiz,
  onCreateNew
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 text-left">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-heading">
            My Quizzes
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Quizzes you have created or saved in your browser.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm button-glow hover:opacity-95 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Quiz</span>
        </button>
      </div>

      {/* Grid of Quizzes */}
      {quizzes.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 card-shadow space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Brain className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">No Quizzes Saved Yet</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Build your first custom quiz now and share it with your friends!
          </p>
          <button
            onClick={onCreateNew}
            className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl text-sm"
          >
            Build your quiz
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => {
            const qCount = quiz.questions?.length || 0;
            const formattedDate = quiz.createdAt
              ? new Date(quiz.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
              : 'Recent';

            return (
              <div
                key={quiz.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow hover:border-indigo-200 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-indigo-600 bg-indigo-50 uppercase tracking-wider">
                      {qCount} {qCount === 1 ? 'Question' : 'Questions'}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formattedDate}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 font-serif-heading line-clamp-2">
                    {quiz.title}
                  </h3>

                  {quiz.intro && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {quiz.intro}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onPlayQuiz(quiz)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Play Quiz</span>
                  </button>

                  <button
                    onClick={() => onShareQuiz(quiz)}
                    title="Get Share Link"
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDeleteQuiz(quiz.id)}
                    title="Delete Saved Quiz"
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

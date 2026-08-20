import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, Share2, RefreshCw, PlusCircle, Brain, Download } from 'lucide-react';
import { getIQTier } from '../utils/quizStorage';
import { recordQuizCompletion } from '../utils/leaderboard';
import IqCertificateModal from './IqCertificateModal';

export default function QuizResults({ quiz, userAnswers, onRetake, onCreateNew }) {
  const [isCertOpen, setIsCertOpen] = useState(false);

  // Calculate results
  let correctCount = 0;
  const questions = quiz?.questions || [];
  const totalQuestions = questions.length;

  questions.forEach(q => {
    const selectedOptId = userAnswers[q.id];
    const correctOpt = q.options.find(o => o.isCorrect);
    if (correctOpt && selectedOptId === correctOpt.id) {
      correctCount++;
    }
  });

  const scorePercentage = Math.round((correctCount / (totalQuestions || 1)) * 100);
  const tier = getIQTier(scorePercentage);

  // Trigger confetti burst & save leaderboard stats on mount
  useEffect(() => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });

    if (quiz?.title) {
      recordQuizCompletion(quiz.title, scorePercentage, correctCount, totalQuestions);
    }
  }, [quiz, scorePercentage, correctCount, totalQuestions]);

  const handleShareResult = () => {
    const text = `🧠 I scored ${scorePercentage}% (${correctCount}/${totalQuestions}) on "${quiz?.title}"! Test your IQ here: ${window.location.href}`;
    navigator.clipboard.writeText(text);
    alert('Result copied to clipboard!');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 text-left animate-fadeIn">
      
      {/* Result Hero Header */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 card-shadow text-center space-y-6 relative overflow-hidden">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
          <Brain className="w-4 h-4 text-indigo-600" />
          <span>Official Score Report</span>
        </div>

        {/* Big Score Ring */}
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-indigo-600 opacity-20 blur-md animate-pulse" />
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex flex-col items-center justify-center shadow-lg shadow-indigo-200 z-10">
            <span className="text-4xl font-extrabold tracking-tight">{scorePercentage}%</span>
            <span className="text-xs font-medium text-indigo-100">{correctCount} of {totalQuestions} Right</span>
          </div>
        </div>

        {/* Tier Card */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-heading">
            {tier.title}
          </h1>
          <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider">
            {tier.grade}
          </p>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            {tier.description}
          </p>
        </div>

        {/* Action Buttons including Certificate Generator */}
        <div className="pt-4 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full">
          <button
            onClick={() => setIsCertOpen(true)}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-200 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <Award className="w-4 h-4 text-amber-100 shrink-0" />
            <span>Download Official Certificate</span>
          </button>

          <button
            onClick={handleShareResult}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4 shrink-0" />
            <span>Share My Score</span>
          </button>

          <button
            onClick={onRetake}
            className="w-full sm:w-auto px-5 py-3 sm:py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4 shrink-0" />
            <span>Try Again</span>
          </button>

          <button
            onClick={onCreateNew}
            className="w-full sm:w-auto px-5 py-3 sm:py-3.5 rounded-2xl border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-semibold text-xs sm:text-sm hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            <span>Build Quiz</span>
          </button>
        </div>

      </div>

      {/* Detailed Question Review List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 card-shadow space-y-6">
        <h2 className="text-xl font-bold text-slate-900 font-serif-heading">
          Answer Breakdown
        </h2>

        <div className="space-y-4">
          {questions.map((q, qIdx) => {
            const userOptId = userAnswers[q.id];
            const userOpt = q.options.find(o => o.id === userOptId);
            const correctOpt = q.options.find(o => o.isCorrect);
            const isUserRight = userOptId === correctOpt?.id;

            return (
              <div 
                key={q.id || qIdx}
                className={`p-5 rounded-2xl border transition-all ${
                  isUserRight
                    ? 'border-emerald-200 bg-emerald-50/40'
                    : 'border-rose-200 bg-rose-50/40'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      Question {qIdx + 1}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">
                      {q.text}
                    </h3>
                  </div>

                  <div className="shrink-0">
                    {isUserRight ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        Incorrect
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium">Your answer: </span>
                    <span className={`font-bold ${isUserRight ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {userOpt ? userOpt.text : 'Not answered'}
                    </span>
                  </div>

                  {!isUserRight && (
                    <div>
                      <span className="text-slate-500 font-medium">Correct answer: </span>
                      <span className="font-bold text-emerald-700">
                        {correctOpt ? correctOpt.text : ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Iq Certificate Modal */}
      <IqCertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        quizTitle={quiz?.title || 'IQ Assessment'}
        scorePercentage={scorePercentage}
        correctCount={correctCount}
        totalCount={totalQuestions}
      />

    </div>
  );
}

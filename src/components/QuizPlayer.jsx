import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, Timer, Volume2, VolumeX } from 'lucide-react';
import { sfx } from '../utils/audioSfx';

const QUESTION_TIMER_SECONDS = 30; // 30 seconds timer per question

export default function QuizPlayer({ quiz, onCompleteQuiz, onBackToBuilder }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIMER_SECONDS);
  const [isMuted, setIsMuted] = useState(false);

  const currentQ = quiz?.questions ? quiz.questions[currentIndex] : null;
  const totalQ = quiz?.questions ? quiz.questions.length : 0;

  // Question Timer Countdown Effect
  useEffect(() => {
    if (!currentQ) return;
    setTimeLeft(QUESTION_TIMER_SECONDS);

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          // Auto advance if time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [currentIndex, currentQ]);

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">No quiz questions found!</h2>
        <button
          onClick={onBackToBuilder}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold"
        >
          Create A Quiz
        </button>
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / totalQ) * 100);
  const selectedOptId = selectedAnswers[currentQ.id];

  const handleSelectOption = (optId) => {
    sfx.playClick();
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: optId
    });
  };

  const handleNext = () => {
    sfx.playClick();
    if (currentIndex < totalQ - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate score sound & finish
      sfx.playVictory();
      onCompleteQuiz(quiz, selectedAnswers);
    }
  };

  const handlePrev = () => {
    sfx.playClick();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleSound = () => {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
  };

  const optionLabels = ['A', 'B', 'C', 'D'];
  const timerPercent = Math.round((timeLeft / QUESTION_TIMER_SECONDS) * 100);

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-6 py-6 sm:py-12 space-y-4 sm:space-y-8 text-left">
      
      {/* Top navigation row with Sound toggle & Timer */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToBuilder}
          className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Quiz</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Mute/Unmute SFX Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Live Timer Badge */}
          <span className={`text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full flex items-center gap-1 border transition-colors ${
            timeLeft <= 5 
              ? 'bg-rose-50 text-rose-600 border-rose-200 animate-pulse'
              : 'bg-indigo-50 text-indigo-700 border-indigo-100'
          }`}>
            <Timer className="w-3.5 h-3.5" />
            <span>{timeLeft}s</span>
          </span>

          <span className="text-[10px] sm:text-xs font-bold text-slate-700 bg-slate-100 px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider">
            {currentIndex + 1} / {totalQ}
          </span>
        </div>
      </div>

      {/* Live Question Progress Bar & Countdown Timer Bar */}
      <div className="space-y-1">
        <div className="h-2 sm:h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Box */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-slate-100 card-shadow space-y-6 sm:space-y-8">
        
        {/* Quiz Title & Question statement */}
        <div className="space-y-3">
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 font-serif-heading leading-snug">
            {currentQ.text}
          </h1>

          {/* Optional Picture / Visual Question Image */}
          {currentQ.imageUrl && (
            <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-64 sm:max-h-80 w-full bg-slate-50 flex items-center justify-center">
              <img 
                src={currentQ.imageUrl} 
                alt="Visual Question" 
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        {/* Options List */}
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3.5">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = selectedOptId === opt.id;
            const label = optionLabels[optIdx] || String.fromCharCode(65 + optIdx);

            return (
              <button
                key={opt.id || optIdx}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left flex items-center justify-between gap-3 transition-all duration-200 group ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/80 shadow-md shadow-indigo-100 scale-[1.005]'
                    : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
                  <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                  }`}>
                    {label}
                  </span>
                  <span className={`text-xs sm:text-base font-semibold transition-colors truncate ${
                    isSelected ? 'text-indigo-950 font-bold' : 'text-slate-800'
                  }`}>
                    {opt.text}
                  </span>
                </div>

                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-600 text-white scale-110'
                    : 'border-slate-300 group-hover:border-indigo-400'
                }`}>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Next / Previous Controls */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-100 gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs transition-colors ${
              currentIndex === 0
                ? 'opacity-0 pointer-events-none'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            ← Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedOptId}
            className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 transition-all ${
              selectedOptId
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white button-glow hover:opacity-95'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>{currentIndex < totalQ - 1 ? 'Next Question' : 'Finish Quiz'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}

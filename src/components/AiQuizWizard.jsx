import React, { useState } from 'react';
import { Sparkles, X, Wand2, Compass, Layers, CheckCircle2 } from 'lucide-react';
import { SUBJECT_CATEGORIES, DIFFICULTY_LEVELS, generateAiQuiz } from '../utils/aiWizardEngine';

export default function AiQuizWizard({ isOpen, onClose, onQuizGenerated }) {
  const [selectedSubject, setSelectedSubject] = useState('geography');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(3);
  const [customTopic, setCustomTopic] = useState('');

  if (!isOpen) return null;

  const handleGenerate = () => {
    const quiz = generateAiQuiz({
      subjectId: selectedSubject,
      difficultyId: selectedDifficulty,
      count: questionCount,
      customTopic: customTopic
    });

    onQuizGenerated(quiz);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-8 card-shadow border border-purple-100 relative space-y-6 animate-scaleUp text-left max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wizard Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100/80 border border-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AI Quiz Generator</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif-heading">
            Customize & Generate Quiz
          </h2>

          <p className="text-xs sm:text-sm text-slate-500">
            Select your preferred subject, difficulty level, and number of questions. AI will create a complete quiz for you!
          </p>
        </div>

        {/* Step 1: Subject Selector */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            1. Select Subject / Topic
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {SUBJECT_CATEGORIES.map(sub => {
              const isSelected = selectedSubject === sub.id && !customTopic.trim();
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => {
                    setSelectedSubject(sub.id);
                    setCustomTopic('');
                  }}
                  className={`p-3 rounded-2xl border text-left flex flex-col items-start gap-1 transition-all ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50/80 ring-2 ring-purple-500/20 font-bold'
                      : 'border-slate-200 hover:border-purple-300 hover:bg-purple-50/40 text-slate-700'
                  }`}
                >
                  <span className="text-xl">{sub.icon}</span>
                  <span className="text-xs font-bold truncate w-full">{sub.name}</span>
                </button>
              );
            })}
          </div>

          {/* Custom Topic Input */}
          <div className="pt-1">
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Or type a custom topic (e.g. Cricket World Cup, Marvel Movies...)"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-medium"
            />
          </div>
        </div>

        {/* Step 2: Difficulty Level Selector */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            2. Choose Difficulty Level
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DIFFICULTY_LEVELS.map(lvl => {
              const isSelected = selectedDifficulty === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setSelectedDifficulty(lvl.id)}
                  className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50/80 ring-2 ring-purple-500/20'
                      : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-lg">{lvl.badge}</span>
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-xs font-bold block text-slate-900">{lvl.name}</span>
                    <span className="text-[10px] text-slate-500 block leading-tight">{lvl.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Question Count */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            3. Number of Questions
          </label>

          <div className="flex items-center gap-3">
            {[3, 5, 10].map(cnt => (
              <button
                key={cnt}
                type="button"
                onClick={() => setQuestionCount(cnt)}
                className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  questionCount === cnt
                    ? 'border-purple-600 bg-purple-600 text-white shadow-md shadow-purple-200'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cnt} Questions
              </button>
            ))}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm button-glow hover:opacity-95 transition-all flex items-center gap-2"
          >
            <Wand2 className="w-4 h-4 text-white" />
            <span>Generate AI Quiz Now</span>
          </button>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import SidebarTip from './SidebarTip';
import AiQuizWizard from './AiQuizWizard';
import { Plus, Sparkles, Wand2 } from 'lucide-react';
import { saveQuizLocally } from '../utils/quizStorage';

export default function QuizBuilder({ onQuizCreated }) {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizIntro, setQuizIntro] = useState('');
  const [quizType, setQuizType] = useState('standard');
  const [isAiWizardOpen, setIsAiWizardOpen] = useState(false);
  
  // Initial question state matching the screenshot
  const [questions, setQuestions] = useState([
    {
      id: 'q_' + Date.now() + '_1',
      text: '',
      options: [
        { id: 'a', text: '', isCorrect: true },
        { id: 'b', text: '', isCorrect: false },
        { id: 'c', text: '', isCorrect: false },
        { id: 'd', text: '', isCorrect: false }
      ]
    }
  ]);

  const [validationError, setValidationError] = useState('');

  // Handle AI Wizard generated quiz
  const handleAiQuizGenerated = (aiQuiz) => {
    if (aiQuiz) {
      setQuizTitle(aiQuiz.title || '');
      setQuizIntro(aiQuiz.intro || '');
      setQuizType(aiQuiz.type || 'standard');
      if (aiQuiz.questions && aiQuiz.questions.length > 0) {
        setQuestions(aiQuiz.questions);
      }
    }
  };

  // Add new question card
  const handleAddQuestion = () => {
    const newQ = {
      id: 'q_' + Date.now() + '_' + (questions.length + 1),
      text: '',
      options: [
        { id: 'a', text: '', isCorrect: true },
        { id: 'b', text: '', isCorrect: false },
        { id: 'c', text: '', isCorrect: false },
        { id: 'd', text: '', isCorrect: false }
      ]
    };
    setQuestions([...questions, newQ]);
    setValidationError('');
  };

  // Update question
  const handleUpdateQuestion = (index, updatedQ) => {
    const copy = [...questions];
    copy[index] = updatedQ;
    setQuestions(copy);
    setValidationError('');
  };

  // Delete question
  const handleDeleteQuestion = (index) => {
    if (questions.length <= 1) return;
    const copy = questions.filter((_, i) => i !== index);
    setQuestions(copy);
  };

  // Move question up or down
  const handleMoveQuestion = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= questions.length) return;
    const copy = [...questions];
    const [moved] = copy.splice(fromIdx, 1);
    copy.splice(toIdx, 0, moved);
    setQuestions(copy);
  };

  // Handle Form Submission / Share Link Creation
  const handleCreateShareLink = (e) => {
    e?.preventDefault();
    setValidationError('');

    if (!quizTitle.trim()) {
      setValidationError('Please enter a Quiz Title.');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) {
        setValidationError(`Question ${i + 1} needs a question statement.`);
        return;
      }
      const validOptions = q.options.filter(o => o.text.trim().length > 0);
      if (validOptions.length < 2) {
        setValidationError(`Question ${i + 1} needs at least 2 non-empty options.`);
        return;
      }
      const hasCorrect = q.options.some(o => o.isCorrect);
      if (!hasCorrect) {
        setValidationError(`Question ${i + 1} needs a right answer selected (click the green checkmark).`);
        return;
      }
    }

    const quizPayload = {
      id: 'quiz_' + Date.now(),
      title: quizTitle.trim(),
      intro: quizIntro.trim(),
      type: quizType,
      createdAt: new Date().toISOString(),
      questions: questions.map(q => ({
        id: q.id,
        text: q.text.trim(),
        options: q.options.map(o => ({
          id: o.id,
          text: o.text.trim(),
          isCorrect: o.isCorrect
        }))
      }))
    };

    saveQuizLocally(quizPayload);
    onQuizCreated(quizPayload);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-12">
      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-12">
        
        {/* Main Quiz Builder Content Column */}
        <div className="flex-1 w-full space-y-6 sm:space-y-8 text-left">
          
          {/* Header section matching screenshot + AI Wizard button */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 sm:space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold tracking-wider text-purple-600 bg-purple-100/70 uppercase">
                MAKE SOMETHING FUN
              </span>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-serif-heading tracking-tight leading-tight">
                Build your quiz
              </h1>

              <p className="text-slate-500 text-sm sm:text-lg font-normal">
                Add your questions and choose each right answer.
              </p>
            </div>

            {/* AI Generator Wizard CTA Trigger Button */}
            <button
              type="button"
              onClick={() => setIsAiWizardOpen(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm button-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0 border border-purple-400/30"
            >
              <Wand2 className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Generate Quiz with AI</span>
            </button>
          </div>

          {/* Top Quiz Meta Card matching screenshot */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-100 card-shadow space-y-4 sm:space-y-6">
            
            {/* Quiz title input */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                Quiz title
              </label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="e.g. Friday night trivia"
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm sm:text-base font-medium"
              />
            </div>

            {/* A little intro (optional) */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                A little intro <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea
                rows={3}
                value={quizIntro}
                onChange={(e) => setQuizIntro(e.target.value)}
                placeholder="What should your friends know before they start?"
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-xs sm:text-sm font-medium resize-none"
              />
            </div>

            {/* Quiz Type Selector */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-medium text-slate-600">
              <span className="font-semibold text-slate-800 shrink-0">Scoring Mode:</span>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="quizType"
                    value="standard"
                    checked={quizType === 'standard'}
                    onChange={() => setQuizType('standard')}
                    className="accent-indigo-600"
                  />
                  <span>Standard IQ / Test Score</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="quizType"
                    value="personality"
                    checked={quizType === 'personality'}
                    onChange={() => setQuizType('personality')}
                    className="accent-indigo-600"
                  />
                  <span>Fun Personality Test</span>
                </label>
              </div>
            </div>
          </div>

          {/* Validation Banner if any error */}
          {validationError && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium flex items-center justify-between animate-shake">
              <span>⚠️ {validationError}</span>
              <button 
                onClick={() => setValidationError('')}
                className="text-xs font-bold text-rose-500 hover:text-rose-800 shrink-0 ml-2"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Dynamic Question List */}
          <div className="space-y-4 sm:space-y-6">
            {questions.map((q, idx) => (
              <QuestionCard
                key={q.id}
                question={q}
                index={idx}
                totalQuestions={questions.length}
                onUpdateQuestion={handleUpdateQuestion}
                onDeleteQuestion={handleDeleteQuestion}
                onMoveQuestion={handleMoveQuestion}
              />
            ))}
          </div>

          {/* Add another question button matching screenshot */}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/30 hover:bg-indigo-50/80 text-indigo-600 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 group"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            <span>+ Add another question</span>
          </button>

          {/* Footer Action Row matching screenshot */}
          <div className="pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-medium text-center sm:text-left">
              Questions are saved in your browser until you share.
            </p>

            <button
              type="button"
              onClick={handleCreateShareLink}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-bold text-sm button-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>Create share link</span>
              <span className="text-base">→</span>
            </button>
          </div>

        </div>

        {/* Right Sticky Tip Sidebar matching screenshot */}
        <SidebarTip totalQuestions={questions.length} />

      </div>

      {/* AI Smart Quiz Generator Modal Wizard */}
      <AiQuizWizard
        isOpen={isAiWizardOpen}
        onClose={() => setIsAiWizardOpen(false)}
        onQuizGenerated={handleAiQuizGenerated}
      />
    </div>
  );
}

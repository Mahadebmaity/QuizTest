import React, { useState, useEffect, useRef } from 'react';
import { Check, Trash2, ArrowUp, ArrowDown, Sparkles, Lightbulb, ChevronDown, Info } from 'lucide-react';
import { getAiQuestionSuggestions, AI_SUGGESTION_DATABASE } from '../utils/aiSuggester';

const SAMPLE_QUESTIONS = [
  "e.g. What is the capital of India?",
  "e.g. Which planet is known as the Red Planet?",
  "e.g. What is the chemical symbol for Gold?",
  "e.g. How many continents are on Earth?",
  "e.g. Who painted the Mona Lisa?",
  "e.g. What is the highest mountain in the world?"
];

export default function QuestionCard({
  question,
  index,
  totalQuestions,
  onUpdateQuestion,
  onDeleteQuestion,
  onMoveQuestion
}) {
  const optionLabels = ['A', 'B', 'C', 'D'];
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState('');
  
  // AI Suggestions state
  const [showAiDropdown, setShowAiDropdown] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const dropdownRef = useRef(null);

  // Dynamic Typewriter animation for placeholder
  useEffect(() => {
    let sampleIndex = index % SAMPLE_QUESTIONS.length;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const typeEffect = () => {
      const currentText = SAMPLE_QUESTIONS[sampleIndex];

      if (isDeleting) {
        charIndex--;
        setAnimatedPlaceholder(currentText.substring(0, charIndex));
      } else {
        charIndex++;
        setAnimatedPlaceholder(currentText.substring(0, charIndex));
      }

      let speed = isDeleting ? 35 : 75;

      if (!isDeleting && charIndex === currentText.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        sampleIndex = (sampleIndex + 1) % SAMPLE_QUESTIONS.length;
        speed = 400;
      }

      timeoutId = setTimeout(typeEffect, speed);
    };

    typeEffect();

    return () => clearTimeout(timeoutId);
  }, [index]);

  // Update AI suggestions when typing
  useEffect(() => {
    const list = getAiQuestionSuggestions(question.text);
    setAiSuggestions(list);
  }, [question.text]);

  // Close AI dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowAiDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTextChange = (e) => {
    const val = e.target.value;
    onUpdateQuestion(index, { ...question, text: val });
    setShowAiDropdown(true);
  };

  const handleOptionTextChange = (optIdx, value) => {
    const updatedOptions = [...question.options];
    updatedOptions[optIdx] = { ...updatedOptions[optIdx], text: value };
    onUpdateQuestion(index, { ...question, options: updatedOptions });
  };

  const toggleCorrectOption = (optIdx) => {
    const updatedOptions = question.options.map((opt, i) => ({
      ...opt,
      isCorrect: i === optIdx
    }));
    onUpdateQuestion(index, { ...question, options: updatedOptions });
  };

  // Apply AI Suggestion (Auto-fills human-crafted question text + options A, B, C, D + explanation)
  const applyAiSuggestion = (suggestion) => {
    const formattedOptions = suggestion.options.map((o, idx) => ({
      id: optionLabels[idx].toLowerCase(),
      text: o.text,
      isCorrect: o.isCorrect
    }));

    onUpdateQuestion(index, {
      ...question,
      text: suggestion.question,
      explanation: suggestion.explanation || '',
      options: formattedOptions
    });

    setShowAiDropdown(false);
  };

  // Random AI Quick Prompt
  const handleRandomAiPrompt = () => {
    const randomIndex = Math.floor(Math.random() * AI_SUGGESTION_DATABASE.length);
    applyAiSuggestion(AI_SUGGESTION_DATABASE[randomIndex]);
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-indigo-100 shadow-sm relative space-y-4 sm:space-y-6 transition-all hover:border-indigo-200 min-w-0">
      
      {/* Top Header Row with Question Badge, AI Magic Button & Actions */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wider text-indigo-600 bg-indigo-50 uppercase">
            QUESTION {index + 1}
          </span>

          {/* AI Magic Prompt Button */}
          <button
            type="button"
            onClick={handleRandomAiPrompt}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200/80 transition-colors"
            title="Generate an authentic trivia question with options"
          >
            <Sparkles className="w-3 h-3 text-purple-600" />
            <span>AI Auto-Fill</span>
          </button>
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1 text-slate-400">
          {index > 0 && (
            <button
              type="button"
              onClick={() => onMoveQuestion(index, index - 1)}
              title="Move Up"
              className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
          {index < totalQuestions - 1 && (
            <button
              type="button"
              onClick={() => onMoveQuestion(index, index + 1)}
              title="Move Down"
              className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
          {totalQuestions > 1 && (
            <button
              type="button"
              onClick={() => onDeleteQuestion(index)}
              title="Delete Question"
              className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors ml-0.5"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Question Input with Real-time AI Suggestions */}
      <div className="space-y-1.5 sm:space-y-2 text-left relative" ref={dropdownRef}>
        <div className="flex items-center justify-between">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800">
            Your question
          </label>
          <span className="text-[10px] text-purple-600 font-medium flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-purple-500" />
            <span>Smart AI Autocomplete</span>
          </span>
        </div>

        <div className="relative">
          <input
            type="text"
            value={question.text}
            onChange={handleTextChange}
            onFocus={() => setShowAiDropdown(true)}
            placeholder={animatedPlaceholder || "e.g. What is the capital of India?"}
            className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-xs sm:text-sm font-medium pr-10"
          />
          <button
            type="button"
            onClick={() => setShowAiDropdown(!showAiDropdown)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-600 p-1"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* AI Fun Fact Note / Explanation Box if available */}
        {question.explanation && (
          <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 text-[11px] sm:text-xs text-purple-900 font-medium flex items-start gap-1.5 animate-fadeIn">
            <Info className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
            <span>{question.explanation}</span>
          </div>
        )}

        {/* AI Suggestions Dropdown Menu */}
        {showAiDropdown && aiSuggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-white rounded-2xl border border-purple-100 shadow-xl p-2 space-y-1 animate-fadeIn">
            <div className="px-3 py-1.5 text-[10px] font-extrabold text-purple-600 uppercase tracking-wider flex items-center gap-1 border-b border-purple-50">
              <Sparkles className="w-3 h-3 text-purple-600" />
              <span>Authentic Human-Crafted Trivia Questions</span>
            </div>

            <div className="max-h-56 overflow-y-auto space-y-1">
              {aiSuggestions.map((item, sugIdx) => (
                <button
                  key={sugIdx}
                  type="button"
                  onClick={() => applyAiSuggestion(item)}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/80 transition-colors flex flex-col space-y-1 group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-800 group-hover:text-purple-900">
                      {item.question}
                    </span>
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-100/70 px-2 py-0.5 rounded-full shrink-0">
                      {item.topic}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    Correct: <strong className="text-emerald-600">{item.options.find(o => o.isCorrect)?.text}</strong> • Distractors: {item.options.filter(o => !o.isCorrect).map(o => o.text).join(', ')}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Options Grid (A, B, C, D) matching screenshot layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {question.options.map((opt, optIdx) => {
          const isCorrect = opt.isCorrect;
          const label = optionLabels[optIdx] || String.fromCharCode(65 + optIdx);

          return (
            <div key={opt.id || optIdx} className="flex items-center gap-2 min-w-0">
              <div className="relative flex-1 flex items-center bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all min-w-0">
                <span className="w-7 sm:w-8 text-center text-xs font-bold text-slate-400 select-none shrink-0">
                  {label}
                </span>
                <input
                  type="text"
                  value={opt.text}
                  onChange={(e) => handleOptionTextChange(optIdx, e.target.value)}
                  placeholder={`Answer ${label}`}
                  className="w-full bg-transparent px-1.5 sm:px-2 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none font-medium min-w-0"
                />
              </div>

              {/* Checkmark button matching screenshot green circle toggle */}
              <button
                type="button"
                onClick={() => toggleCorrectOption(optIdx)}
                title={isCorrect ? "Correct answer" : "Mark as right answer"}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  isCorrect
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200 scale-105'
                    : 'border-2 border-slate-200 text-slate-300 hover:border-emerald-400 hover:text-emerald-500 hover:bg-emerald-50/50'
                }`}
              >
                <Check className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] ${isCorrect ? 'opacity-100' : 'opacity-60'}`} />
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}

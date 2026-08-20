import React from 'react';
import { Sparkles, Lightbulb, Compass, Award } from 'lucide-react';

export default function SidebarTip({ totalQuestions = 0 }) {
  return (
    <aside className="w-full lg:w-80 shrink-0 space-y-6">
      {/* Main playful box matching screenshot */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 card-shadow space-y-4 text-left">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif-heading tracking-wide">
          Keep it playful
        </h3>
        
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          The best quizzes have a dash of surprise and are quick enough to finish in one sitting.
        </p>

        {/* Yellow callout tip box matching screenshot */}
        <div className="bg-amber-50/90 dark:bg-amber-950/60 border border-amber-200/70 dark:border-amber-800 rounded-2xl p-4 text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-950 dark:text-amber-100">
            <span className="text-amber-600 dark:text-amber-400 font-serif text-sm">✦</span>
            <span>Quick tip</span>
          </div>
          <p className="text-amber-800 dark:text-amber-200">
            Make your title specific. &ldquo;Which snack are you?&rdquo; is more tempting than &ldquo;A quiz&rdquo;.
          </p>
        </div>
      </div>

      {/* Builder helper info box */}
      <div className="bg-gradient-to-br from-indigo-50/70 to-purple-50/70 dark:from-indigo-950/60 dark:to-purple-950/60 rounded-3xl p-6 border border-indigo-100 dark:border-indigo-900/60 text-left space-y-3">
        <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-semibold text-sm">
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Quiz Status</span>
        </div>
        
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 pt-1">
          <span>Questions added:</span>
          <span className="font-bold text-indigo-700 dark:text-indigo-300 text-sm bg-white dark:bg-slate-900 px-2.5 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-800">
            {totalQuestions}
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
          Each question needs 4 options and at least 1 designated right answer with the green checkmark button.
        </p>
      </div>
    </aside>
  );
}

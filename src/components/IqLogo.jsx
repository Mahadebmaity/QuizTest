import React from 'react';

export default function IqLogo({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-sm',
    lg: 'w-10 h-10 sm:w-12 sm:h-12 text-sm sm:text-base'
  }[size] || 'w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-sm';

  return (
    <div className={`relative flex items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-500 text-white shadow-md sm:shadow-lg shadow-indigo-500/25 border border-white/20 group-hover:scale-105 transition-transform duration-300 shrink-0 ${sizeClasses} ${className}`}>
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 blur-[3px] opacity-40 group-hover:opacity-70 transition-opacity" />
      
      {/* Icon vector graphics + IQ text */}
      <div className="relative z-10 flex items-center justify-center gap-0.5 font-black tracking-tighter font-['Plus_Jakarta_Sans',sans-serif]">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 stroke-[2.5]" 
          stroke="currentColor"
        >
          <path d="M12 2a8 8 0 0 1 8 8c0 3.5-2.5 6.5-6 7.5V20h-4v-2.5C6.5 16.5 4 13.5 4 10a8 8 0 0 1 8-8z" />
          <path d="M9 22h6" />
          <path d="M12 6v4" />
          <path d="M10 8h4" />
        </svg>
        <span className="text-white drop-shadow-sm font-extrabold">IQ</span>
      </div>
    </div>
  );
}

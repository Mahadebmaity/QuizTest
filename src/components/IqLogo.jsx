import React from 'react';

export default function IqLogo({ size = 'md', className = '' }) {
  const containerSizes = {
    sm: 'w-8 h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14'
  }[size] || 'w-9 h-9 sm:w-10 sm:h-10';

  return (
    <div className={`relative flex items-center justify-center shrink-0 group ${containerSizes} ${className}`}>
      {/* Outer Glowing Neon Aura */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 blur-[5px] opacity-60 group-hover:opacity-100 group-hover:blur-[8px] transition-all duration-300 animate-pulse-subtle" />

      {/* Main Glassmorphic Hex-Squircle Container */}
      <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 p-[1.5px] shadow-lg shadow-indigo-500/20">
        <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-indigo-600/90 via-purple-600/90 to-indigo-900/90 backdrop-blur-md flex items-center justify-center relative overflow-hidden border border-white/25">
          
          {/* Subtle Ambient Light Overlay */}
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-purple-300/30 rounded-full blur-sm" />

          {/* Futuristic Vector Logo: Brain Synapse + AI Spark + IQ Text */}
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-md"
          >
            {/* Neural Brain Circuit Synapses */}
            <path
              d="M14 12C14 9.79086 15.7909 8 18 8H22C24.2091 8 26 9.79086 26 12V14C26 16.2091 24.2091 18 22 18H18C15.7909 18 14 16.2091 14 14V12Z"
              stroke="url(#brainGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            
            {/* AI Node Connectors */}
            <circle cx="12" cy="13" r="2.5" fill="#38BDF8" />
            <circle cx="28" cy="13" r="2.5" fill="#F43F5E" />
            <circle cx="20" cy="27" r="2.5" fill="#FACC15" />
            
            <path d="M14.5 14L18 25" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2 2" />
            <path d="M25.5 14L22 25" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="2 2" />
            
            {/* Center Glowing Sparkle */}
            <path
              d="M20 11L20.8 12.7L22.5 13.5L20.8 14.3L20 16L19.2 14.3L17.5 13.5L19.2 12.7L20 11Z"
              fill="#FACC15"
            />

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="brainGrad" x1="14" y1="8" x2="26" y2="18" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F8FAFC" />
                <stop offset="1" stopColor="#E2E8F0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

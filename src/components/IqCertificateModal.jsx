import React, { useState, useRef } from 'react';
import { Award, Download, X, Sparkles, CheckCircle2, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { getIQTier } from '../utils/quizStorage';

export default function IqCertificateModal({ isOpen, onClose, quizTitle, scorePercentage, correctCount, totalCount }) {
  const [candidateName, setCandidateName] = useState('Quiz Master');
  const [isGenerating, setIsGenerating] = useState(false);
  const certRef = useRef(null);

  if (!isOpen) return null;

  const tier = getIQTier(scorePercentage);
  const formattedDate = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const serialId = `IQ-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleDownload = async () => {
    if (!certRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `IQ_Certificate_${candidateName.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate certificate PNG:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-8 card-shadow border border-indigo-100 relative space-y-6 animate-scaleUp text-left max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Official Certificate Generator</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-serif-heading">
            Your Achievement Certificate
          </h2>
          <p className="text-xs text-slate-500">
            Enter your name below to personalize your official IQ certificate and download it as an image!
          </p>
        </div>

        {/* Candidate Name Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Candidate Full Name
          </label>
          <input
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="e.g. Mahadeb Maity"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        {/* Certificate Render Target Box */}
        <div 
          ref={certRef}
          className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white rounded-3xl p-6 sm:p-10 border-4 border-amber-400/40 relative overflow-hidden shadow-2xl space-y-6"
        >
          {/* Certificate Watermark / BG Decor */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Seal Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-md">
                IQ
              </div>
              <div>
                <span className="font-extrabold text-sm tracking-wider text-amber-300 block font-serif-heading">
                  IQ TEST GLOBAL INSTITUTE
                </span>
                <span className="text-[10px] text-slate-400 block tracking-widest uppercase">
                  VERIFIED SCORE CERTIFICATE
                </span>
              </div>
            </div>

            <span className="text-[10px] font-mono text-amber-400/80 bg-amber-400/10 px-2 py-1 rounded-md border border-amber-400/20">
              ID: {serialId}
            </span>
          </div>

          {/* Body Statement */}
          <div className="text-center space-y-3 py-2">
            <p className="text-xs text-indigo-200 tracking-widest uppercase font-semibold">
              This Certificate is Proudly Awarded To
            </p>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-amber-300 font-serif-heading tracking-tight underline decoration-amber-400/30 underline-offset-8">
              {candidateName.trim() || 'Quiz Challenger'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed pt-1">
              For outstanding cognitive performance and achieving a score of <strong className="text-white font-bold">{scorePercentage}% ({correctCount}/{totalCount} Right)</strong> on the assessment:
            </p>

            <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-purple-200 border border-white/10">
              &ldquo;{quizTitle}&rdquo;
            </div>
          </div>

          {/* Tier Badge & Date Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="text-left space-y-0.5">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">IQ Classification</span>
              <span className="text-xs sm:text-sm font-extrabold text-amber-400 block">
                {tier.title}
              </span>
            </div>

            <div className="text-right space-y-0.5">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Date of Issue</span>
              <span className="text-xs font-mono text-slate-200 block">
                {formattedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 text-white font-bold text-sm shadow-md shadow-amber-200 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{isGenerating ? 'Generating Image...' : 'Download Image Certificate'}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3.5 px-6 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

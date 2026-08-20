import React, { useState } from 'react';
import { Copy, Check, X, Sparkles, Play, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { encodeQuizToUrl } from '../utils/quizStorage';

export default function ShareModal({ quiz, onClose, onStartQuiz }) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!quiz) return null;

  // Generate share URL
  const encodedHash = encodeQuizToUrl(quiz);
  const shareUrl = `${window.location.origin}${window.location.pathname}#quiz=${encodedHash}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 card-shadow border border-indigo-100 relative space-y-5 animate-scaleUp text-left max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-1">
            <Sparkles className="w-5 h-5" />
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-heading">
            Your quiz is ready!
          </h2>

          <p className="text-xs sm:text-sm text-slate-500">
            Share this link or QR code with your friends to challenge them!
          </p>
        </div>

        {/* Quiz Summary Box */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            {quiz.questions?.length || 0} Questions • {quiz.type === 'personality' ? 'Personality' : 'IQ Standard Score'}
          </p>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
            {quiz.title}
          </h3>
          {quiz.intro && (
            <p className="text-xs text-slate-600 line-clamp-2">
              {quiz.intro}
            </p>
          )}
        </div>

        {/* Share Link Input & Copy Button */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Shareable Link
            </label>

            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>{showQr ? 'Hide QR Code' : 'Scan QR Code'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-mono focus:outline-none select-all truncate"
            />
            <button
              onClick={handleCopy}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all ${
                copied
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scannable QR Code Render */}
        {showQr && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center space-y-2 animate-fadeIn text-center">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-200">
              <QRCodeSVG value={shareUrl} size={150} level="M" />
            </div>
            <p className="text-[11px] text-slate-500">
              Scan with your phone camera to play directly!
            </p>
          </div>
        )}

        {/* Modal Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={() => onStartQuiz(quiz)}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <Play className="w-4 h-4 fill-indigo-700" />
            <span>Test Run Quiz Now</span>
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useRef } from 'react';
import { Award, Download, X, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { getIQTier } from '../utils/quizStorage';

// Pure HTML5 Canvas HD Renderer fallback to guarantee PNG generation on all devices (bypassing CSS parser bugs)
function createCertificateCanvas(candidateName, quizTitle, scorePercentage, correctCount, totalCount, tierTitle, serialId, formattedDate) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  // Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1200, 800);
  bgGrad.addColorStop(0, '#090d16');
  bgGrad.addColorStop(0.5, '#1e1b4b');
  bgGrad.addColorStop(1, '#2e1065');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 800);

  // Decorative Ambient Light Orbs
  ctx.save();
  ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
  ctx.beginPath();
  ctx.arc(1050, 100, 250, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
  ctx.beginPath();
  ctx.arc(150, 700, 250, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Outer Border Frame
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
  ctx.lineWidth = 8;
  ctx.strokeRect(30, 30, 1140, 740);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 2;
  ctx.strokeRect(42, 42, 1116, 716);

  // Header Section
  // IQ Badge Box
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.roundRect(70, 70, 56, 56, 12);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.font = '900 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('IQ', 98, 106);

  // Institution Title
  ctx.textAlign = 'left';
  ctx.fillStyle = '#fde047';
  ctx.font = 'bold 20px Georgia, serif';
  ctx.fillText('IQ TEST GLOBAL INSTITUTE', 142, 94);

  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('VERIFIED SCORE CERTIFICATE', 142, 116);

  // Serial ID Badge Right
  ctx.fillStyle = 'rgba(251, 191, 36, 0.1)';
  ctx.beginPath();
  ctx.roundRect(970, 80, 160, 36, 8);
  ctx.fill();

  ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#fde047';
  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`ID: ${serialId}`, 1050, 103);

  // Divider Line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(70, 155);
  ctx.lineTo(1130, 155);
  ctx.stroke();

  // Certificate Statement
  ctx.textAlign = 'center';
  ctx.fillStyle = '#c7d2fe';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('THIS CERTIFICATE IS PROUDLY AWARDED TO', 600, 230);

  // Candidate Name
  const nameText = candidateName.trim() || 'Quiz Challenger';
  ctx.fillStyle = '#fde047';
  ctx.font = 'bold 44px Georgia, serif';
  ctx.fillText(nameText, 600, 310);

  // Name Underline Accent
  const nameWidth = ctx.measureText(nameText).width;
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.5)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(600 - nameWidth / 2, 325);
  ctx.lineTo(600 + nameWidth / 2, 325);
  ctx.stroke();

  // Score Statement
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '18px sans-serif';
  ctx.fillText(
    `For outstanding cognitive performance and achieving a score of ${scorePercentage}% (${correctCount}/${totalCount} Right) on:`,
    600,
    400
  );

  // Quiz Title Pill Card
  const titleText = `"${quizTitle}"`;
  ctx.font = 'bold 22px sans-serif';
  const titleWidth = ctx.measureText(titleText).width;
  const pillWidth = Math.min(titleWidth + 60, 1000);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.roundRect(600 - pillWidth / 2, 440, pillWidth, 54, 16);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#e9d5ff';
  ctx.fillText(titleText, 600, 474);

  // Bottom Divider
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(70, 640);
  ctx.lineTo(1130, 640);
  ctx.stroke();

  // IQ Classification Footer (Left)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('IQ CLASSIFICATION', 70, 680);

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText(tierTitle, 70, 712);

  // Date of Issue Footer (Right)
  ctx.textAlign = 'right';
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('DATE OF ISSUE', 1130, 680);

  ctx.fillStyle = '#f1f5f9';
  ctx.font = '16px monospace';
  ctx.fillText(formattedDate, 1130, 710);

  return canvas;
}

export default function IqCertificateModal({ isOpen, onClose, quizTitle, scorePercentage, correctCount, totalCount }) {
  const [candidateName, setCandidateName] = useState('Quiz Master');
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState('');
  const certRef = useRef(null);

  if (!isOpen) return null;

  const tier = getIQTier(scorePercentage);
  const formattedDate = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const serialId = `IQ-${Math.floor(100000 + Math.random() * 900000)}`;

  const triggerBlobDownload = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    setDownloadSuccessMsg('');
    const fileName = `IQ_Certificate_${(candidateName.trim() || 'Challenger').replace(/\s+/g, '_')}.png`;

    try {
      let canvasResult = null;

      // Attempt html2canvas first if element exists
      if (certRef.current) {
        try {
          canvasResult = await html2canvas(certRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#090d16',
            logging: false,
            onclone: (clonedDoc) => {
              // Strip backdrop-blur styles to prevent html2canvas crashes
              const clonedElement = clonedDoc.querySelector('[data-cert-box]');
              if (clonedElement) {
                clonedElement.style.backdropFilter = 'none';
              }
            }
          });
        } catch (h2cError) {
          console.warn('html2canvas failed, falling back to native Canvas generator:', h2cError);
          canvasResult = null;
        }
      }

      // If html2canvas fails or is not present, use native HD Canvas fallback
      if (!canvasResult) {
        canvasResult = createCertificateCanvas(
          candidateName,
          quizTitle,
          scorePercentage,
          correctCount,
          totalCount,
          tier.title,
          serialId,
          formattedDate
        );
      }

      // Convert Canvas to Blob (Mobile & Cross-browser safe)
      canvasResult.toBlob(async (blob) => {
        if (!blob) {
          throw new Error('Failed to generate image blob');
        }

        // Web Share API fallback for mobile devices if supported
        const file = new File([blob], fileName, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] }) && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
          try {
            await navigator.share({
              files: [file],
              title: 'My IQ Certificate',
              text: `Check out my IQ Certificate for ${quizTitle}!`
            });
            setDownloadSuccessMsg('Certificate shared/saved successfully!');
            setIsGenerating(false);
            return;
          } catch (shareErr) {
            // User cancelled share or fallback to direct download
            console.log('Native share skipped or cancelled, using direct file download', shareErr);
          }
        }

        // Standard direct Blob object URL download
        triggerBlobDownload(blob, fileName);
        setDownloadSuccessMsg('Certificate downloaded successfully!');
        setIsGenerating(false);
      }, 'image/png');

    } catch (err) {
      console.error('Failed to generate certificate:', err);
      alert('Could not download certificate directly. Please try entering your name again.');
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-4 sm:p-8 card-shadow border border-indigo-100 dark:border-slate-800 relative space-y-4 sm:space-y-6 animate-scaleUp text-left max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800">
            <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Official Certificate Generator</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-serif-heading">
            Your Achievement Certificate
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter your name below to personalize your official IQ certificate and download it as an image!
          </p>
        </div>

        {/* Candidate Name Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            Candidate Full Name
          </label>
          <input
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="e.g. Mahadeb Maity"
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        {/* Certificate Render Target Box */}
        <div 
          ref={certRef}
          data-cert-box="true"
          className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 sm:border-4 border-amber-400/40 relative overflow-hidden shadow-2xl space-y-4 sm:space-y-6"
        >
          {/* Certificate Watermark / BG Decor */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 sm:w-64 h-48 sm:h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Seal Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center font-black text-xs sm:text-sm shadow-md shrink-0">
                IQ
              </div>
              <div className="min-w-0">
                <span className="font-extrabold text-xs sm:text-sm tracking-wider text-amber-300 block font-serif-heading truncate">
                  IQ TEST GLOBAL INSTITUTE
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 block tracking-widest uppercase truncate">
                  VERIFIED SCORE CERTIFICATE
                </span>
              </div>
            </div>

            <span className="text-[9px] sm:text-[10px] font-mono text-amber-400/90 bg-amber-400/10 px-2 py-0.5 sm:py-1 rounded-md border border-amber-400/20 shrink-0">
              ID: {serialId}
            </span>
          </div>

          {/* Body Statement */}
          <div className="text-center space-y-2 sm:space-y-3 py-1 sm:py-2">
            <p className="text-[10px] sm:text-xs text-indigo-200 tracking-widest uppercase font-semibold">
              This Certificate is Proudly Awarded To
            </p>

            <h1 className="text-xl sm:text-3xl font-extrabold text-amber-300 font-serif-heading tracking-tight underline decoration-amber-400/30 underline-offset-4 sm:underline-offset-8 break-words">
              {candidateName.trim() || 'Quiz Challenger'}
            </h1>

            <p className="text-[11px] sm:text-xs text-slate-300 max-w-lg mx-auto leading-relaxed pt-1">
              For outstanding cognitive performance and achieving a score of <strong className="text-white font-bold">{scorePercentage}% ({correctCount}/{totalCount} Right)</strong> on:
            </p>

            <div className="inline-block bg-white/10 max-w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-purple-200 border border-white/10 truncate">
              &ldquo;{quizTitle}&rdquo;
            </div>
          </div>

          {/* Tier Badge & Date Footer */}
          <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between gap-2">
            <div className="text-left space-y-0.5 min-w-0">
              <span className="text-[9px] sm:text-[10px] text-slate-400 block uppercase tracking-wider">IQ Classification</span>
              <span className="text-xs sm:text-sm font-extrabold text-amber-400 block truncate">
                {tier.title}
              </span>
            </div>

            <div className="text-right space-y-0.5 shrink-0">
              <span className="text-[9px] sm:text-[10px] text-slate-400 block uppercase tracking-wider">Date of Issue</span>
              <span className="text-[11px] sm:text-xs font-mono text-slate-200 block">
                {formattedDate}
              </span>
            </div>
          </div>
        </div>

        {downloadSuccessMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{downloadSuccessMsg}</span>
          </div>
        )}

        {/* Modal Action Buttons */}
        <div className="pt-1 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full sm:flex-1 py-3 sm:py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-200 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{isGenerating ? 'Generating HD Image...' : 'Download Image Certificate'}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 sm:py-3.5 px-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}


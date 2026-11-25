import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function EvaluasiTimer({ endTime, onTimeUp }) {
  const calculateRemaining = () => {
    if (!endTime) return 3600;
    const diff = Math.floor((endTime - Date.now()) / 1000);
    return Math.max(0, diff);
  };

  const [timeLeft, setTimeLeft] = useState(calculateRemaining);

  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const remaining = calculateRemaining();
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        if (onTimeUp) onTimeUp();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, onTimeUp]);

  // Format ke HH:MM:SS atau MM:SS
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formatted = hours > 0
    ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isUrgent = timeLeft <= 120; // 2 menit
  const isWarning = timeLeft <= 600 && !isUrgent; // 10 menit

  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border-2 font-mono font-black text-sm tracking-wide transition-all shadow-2xs ${
        isUrgent
          ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse ring-2 ring-rose-400/30'
          : isWarning
          ? 'bg-amber-50 border-amber-300 text-amber-700'
          : 'bg-slate-50 border-slate-200 text-slate-700'
      }`}
    >
      <Clock
        className={`w-4 h-4 shrink-0 ${
          isUrgent ? 'text-rose-600' : isWarning ? 'text-amber-600' : 'text-blue-600'
        }`}
      />
      <div className="flex items-center gap-1">
        <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-slate-400 mr-1 hidden xs:inline">
          Sisa Waktu:
        </span>
        <span className="text-base font-black">
          {formatted}
        </span>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

export default function QuizTimer({
  timeLeft: propTimeLeft,
  totalSeconds = 900,
  onTimeUp,
  onTick,
}) {
  const [internalTime, setInternalTime] = useState(totalSeconds);

  const isControlled = propTimeLeft !== undefined;
  const currentTime = isControlled ? propTimeLeft : internalTime;

  useEffect(() => {
    if (isControlled) return;

    if (currentTime <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setInternalTime((prev) => {
        const next = Math.max(0, prev - 1);
        if (onTick) onTick(next);
        if (next === 0 && onTimeUp) onTimeUp();
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTime, isControlled, onTimeUp, onTick]);

  // Format detik ke format MM : SS
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  const isUrgent = currentTime <= 60;
  const isWarning = currentTime <= 180 && !isUrgent;

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
          Sisa Waktu
        </span>
        <span className="text-base font-black">
          {formattedMinutes}:{formattedSeconds}
        </span>
      </div>
    </div>
  );
}

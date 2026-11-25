import React from 'react';
import { TrendingUp, Sparkles, BookOpen } from 'lucide-react';

export default function EcoLogo({ size = 'md', className = '', showTagline = true }) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Gamified Economics Logo Icon Badge: Growth Chart + Education */}
      <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 shadow-md shadow-blue-500/25 text-white ${
        isSm ? 'w-9 h-9' : isLg ? 'w-14 h-14 rounded-3xl' : 'w-11 h-11'
      }`}>
        <TrendingUp className={`${isSm ? 'w-5 h-5' : isLg ? 'w-8 h-8' : 'w-6 h-6'} drop-shadow stroke-[2.5]`} />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400 border border-white"></span>
        </span>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1 leading-none">
          <span className={`font-black tracking-tight text-slate-900 ${
            isSm ? 'text-lg' : isLg ? 'text-3xl' : 'text-2xl'
          }`}>
            Eco<span className="text-blue-600">Learn</span>
          </span>
          <Sparkles className={`text-amber-500 fill-amber-400 ${isSm ? 'w-3 h-3' : isLg ? 'w-5 h-5' : 'w-4 h-4'}`} />
        </div>
        {showTagline && (
          <span className={`font-extrabold tracking-wider uppercase text-blue-700/80 ${
            isSm ? 'text-[8.5px]' : isLg ? 'text-xs' : 'text-[9.5px]'
          }`}>
            Play • Learn • Understand Economics
          </span>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import PadletEvaluasiCard from '../../components/evaluasi/PadletEvaluasiCard';
import EvaluasiTestPage from './EvaluasiTestPage';

export default function PosttestPage() {
  const [viewMode, setViewMode] = useState('padlet'); // 'padlet' | 'cbt'

  if (viewMode === 'cbt') {
    return (
      <div className="space-y-4">
        <div className="max-w-7xl mx-auto flex justify-end">
          <button
            onClick={() => setViewMode('padlet')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl transition-colors"
          >
            ← Kembali ke Tampilan Padlet
          </button>
        </div>
        <EvaluasiTestPage forcedType="posttest" />
      </div>
    );
  }

  return (
    <PadletEvaluasiCard 
      testType="posttest" 
      onSwitchToCBT={() => setViewMode('cbt')}
    />
  );
}

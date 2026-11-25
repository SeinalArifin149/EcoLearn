import React from 'react';
import { Check } from 'lucide-react';

export default function EvaluasiAnswerOption({
  option,
  index,
  isSelected,
  onSelect,
}) {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const optId = typeof option === 'object' && option.id ? option.id : letters[index] || `opt-${index}`;
  const optText = typeof option === 'object' && option.text ? option.text : option;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-start gap-3.5 group cursor-pointer ${
        isSelected
          ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-2 ring-blue-500/20'
          : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/70 text-slate-700'
      }`}
    >
      <span
        className={`shrink-0 w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center transition-colors duration-200 ${
          isSelected
            ? 'bg-blue-600 text-white shadow-xs'
            : 'bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700'
        }`}
      >
        {optId}
      </span>

      <span
        className={`flex-1 text-sm font-medium pt-1 leading-relaxed ${
          isSelected ? 'text-blue-950 font-bold' : 'text-slate-700'
        }`}
      >
        {optText}
      </span>

      {isSelected && (
        <span className="shrink-0 pt-1 text-blue-600">
          <Check className="w-5 h-5 stroke-[2.5]" />
        </span>
      )}
    </button>
  );
}

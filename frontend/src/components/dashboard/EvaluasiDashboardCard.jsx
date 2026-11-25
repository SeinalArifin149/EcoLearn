import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardCheck, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  Clock 
} from 'lucide-react';
import { evaluasiService } from '../../services/evaluasiService';
import { compareLearningGrowth } from '../../utils/evaluasiScoring';

export default function EvaluasiDashboardCard({ userId }) {
  const summary = useMemo(() => {
    return evaluasiService.getEvaluasiSummary(userId || 'guest_user');
  }, [userId]);

  const { pretest, posttest } = summary;
  const hasBoth = pretest && posttest;
  const comparison = useMemo(() => {
    return hasBoth ? compareLearningGrowth(pretest, posttest) : null;
  }, [hasBoth, pretest, posttest]);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Evaluasi Pembelajaran</h3>
            <p className="text-xs text-slate-400">Pretest & Posttest Ekonomi Kelas X</p>
          </div>
        </div>
      </div>

      {/* Status Badges Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {/* Pretest Status */}
        <Link 
          to="/pretest"
          className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200 transition-all flex items-center justify-between group cursor-pointer"
          title="Buka Lembar Kerja Pretest"
        >
          <div>
            <span className="text-[11px] font-bold text-slate-400 group-hover:text-blue-600 uppercase tracking-wider block mb-0.5 transition-colors">
              Pretest (Awal) →
            </span>
            {pretest ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-blue-600">{pretest.score}</span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
            ) : (
              <span className="text-xs font-semibold text-blue-600">Mulai Pretest</span>
            )}
          </div>

          <div>
            {pretest ? (
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            ) : (
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </div>
        </Link>

        {/* Posttest Status */}
        <Link 
          to="/posttest"
          className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-100 hover:border-emerald-200 transition-all flex items-center justify-between group cursor-pointer"
          title="Buka Lembar Kerja Posttest"
        >
          <div>
            <span className="text-[11px] font-bold text-slate-400 group-hover:text-emerald-600 uppercase tracking-wider block mb-0.5 transition-colors">
              Posttest (Akhir) →
            </span>
            {posttest ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-emerald-600">{posttest.score}</span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
            ) : (
              <span className="text-xs font-semibold text-emerald-600">Mulai Posttest</span>
            )}
          </div>

          <div>
            {posttest ? (
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            ) : (
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* Growth Highlight or Call To Action */}
      {hasBoth && comparison ? (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-emerald-900">
                Peningkatan: {comparison.absoluteGain > 0 ? `+${comparison.absoluteGain}` : comparison.absoluteGain} Poin ({comparison.growthCategory})
              </p>
              <p className="text-[11px] text-emerald-700">Kedua evaluasi telah selesai dikerjakan.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/pretest"
              className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5"
            >
              Pretest
            </Link>
            <Link
              to="/posttest"
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-2xs"
            >
              Posttest
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 pt-1">
          <p className="text-xs text-slate-500">
            {!pretest 
              ? 'Mulai perjalanan belajarmu dengan mengerjakan Pretest terlebih dahulu.' 
              : 'Pretest selesai! Pelajari materi lalu buktikan peningkatanmu di Posttest.'}
          </p>

          <Link
            to={!pretest ? '/pretest' : '/posttest'}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 shrink-0 shadow-2xs"
          >
            {!pretest ? 'Buka Pretest' : 'Buka Posttest'}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

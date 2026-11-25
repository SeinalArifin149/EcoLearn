import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Gamepad2,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

// Map topics to simulation routes if applicable
const TOPIC_SIMULATION_MAP = {
  3: { name: 'Simulasi Pasar', path: '/simulasi/pasar' },
  4: { name: 'Simulasi Keuangan', path: '/simulasi/keuangan' },
  5: { name: 'Simulasi Sirkulasi', path: '/simulasi/kegiatan-ekonomi' },
};

const TopicPerformanceAnalysis = ({ topicComparisons = [] }) => {
  if (!topicComparisons || topicComparisons.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-100 text-center text-slate-500">
        Belum ada data analisis topik pembelajaran.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Analisis Penguasaan Per Topik Pembelajaran
          </h3>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Lihat perkembangan pemahaman materi dari 10 bab ekonomi Kelas X beserta rekomendasi tindak lanjutnya.
          </p>
        </div>
      </div>

      {/* Grid of Topics */}
      <div className="space-y-4">
        {topicComparisons.map((item) => {
          const {
            topicId,
            topicName,
            pretestCorrect,
            pretestTotal,
            pretestRate,
            posttestCorrect,
            posttestTotal,
            posttestRate,
            rateDifference,
            status
          } = item;

          const isGain = rateDifference > 0;
          const isDrop = rateDifference < 0;
          const simOption = TOPIC_SIMULATION_MAP[topicId];

          return (
            <div 
              key={topicId}
              className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Topic Info */}
              <div className="lg:max-w-md">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                    Bab {topicId}
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    posttestRate >= 80 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : posttestRate >= 60 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-rose-100 text-rose-700'
                  }`}>
                    {status}
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm md:text-base">
                  {topicName}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pretest: {pretestCorrect}/{pretestTotal} ({pretestRate}%) → Posttest: {posttestCorrect}/{posttestTotal} ({posttestRate}%)
                </p>
              </div>

              {/* Progress Visual */}
              <div className="flex-1 max-w-xs space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Perkembangan</span>
                  <span className={`font-bold flex items-center gap-1 ${
                    isGain ? 'text-emerald-600' : isDrop ? 'text-rose-600' : 'text-slate-600'
                  }`}>
                    {isGain ? <TrendingUp className="w-3.5 h-3.5" /> : isDrop ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                    {rateDifference > 0 ? `+${rateDifference}%` : `${rateDifference}%`}
                  </span>
                </div>

                {/* Comparative bar */}
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-blue-400 h-full transition-all"
                    style={{ width: `${pretestRate}%` }}
                    title={`Pretest: ${pretestRate}%`}
                  />
                  <div 
                    className="bg-emerald-500 h-full transition-all"
                    style={{ width: `${Math.max(posttestRate - pretestRate, 0)}%` }}
                    title={`Peningkatan: ${Math.max(posttestRate - pretestRate, 0)}%`}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Awal: {pretestRate}%</span>
                  <span>Akhir: {posttestRate}%</span>
                </div>
              </div>

              {/* Action Recommendations */}
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to={`/materi/${topicId}`}
                  className="px-3 py-1.5 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-100/50 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Pelajari Materi
                </Link>

                {simOption && (
                  <Link
                    to={simOption.path}
                    className="px-3 py-1.5 rounded-xl border border-emerald-200 text-emerald-700 hover:bg-emerald-100/50 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Gamepad2 className="w-3.5 h-3.5" />
                    Coba Simulasi
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopicPerformanceAnalysis;

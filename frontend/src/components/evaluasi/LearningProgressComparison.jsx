import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  ArrowUpRight, 
  BarChart3, 
  Clock, 
  Calendar,
  Zap
} from 'lucide-react';
import CharacterIllustration from '../common/CharacterIllustration';

const LearningProgressComparison = ({ 
  pretestAttempt, 
  posttestAttempt, 
  comparison 
}) => {
  if (!pretestAttempt || !posttestAttempt || !comparison) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-sm text-slate-500">
        Data evaluasi belum lengkap untuk menampilkan perbandingan.
      </div>
    );
  }

  const {
    pretestScore,
    posttestScore,
    absoluteGain,
    relativeGain,
    hasGain,
    isNeutral,
    isDrop,
    growthCategory,
    interpretation,
    recommendations = []
  } = comparison;

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDuration = (seconds = 0) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} menit`;
  };

  const mascotMood = hasGain ? 'celebrating' : isNeutral ? 'curious' : 'motivating';

  return (
    <div className="space-y-6">
      {/* Hero Comparative Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-200">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Laporan Evaluasi Pembelajaran Siswa
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {hasGain 
                ? 'Luar Biasa! Pemahamanmu Meningkat Signifikan' 
                : isNeutral 
                  ? 'Pertahankan Semangat, Yuk Pelajari Lagi Materinya' 
                  : 'Tetap Semangat! Terus Asah Pemahamanmu'}
            </h1>

            <p className="text-sm md:text-base text-blue-100/90 leading-relaxed max-w-2xl">
              {interpretation}
            </p>

            {/* Growth Metrics Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                {hasGain ? (
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                ) : isDrop ? (
                  <TrendingDown className="w-5 h-5 text-rose-400" />
                ) : (
                  <Minus className="w-5 h-5 text-slate-400" />
                )}
                <div>
                  <p className="text-[11px] text-blue-200 uppercase font-semibold">Peningkatan Skor</p>
                  <p className="text-lg font-bold text-white">
                    {absoluteGain > 0 ? `+${absoluteGain}` : absoluteGain} Poin
                  </p>
                </div>
              </div>

              {relativeGain !== null && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-[11px] text-blue-200 uppercase font-semibold">Persentase Kenaikan</p>
                    <p className="text-lg font-bold text-white">
                      {relativeGain > 0 ? `+${relativeGain}%` : `${relativeGain}%`}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30">
                <Award className="w-5 h-5 text-emerald-300" />
                <div>
                  <p className="text-[11px] text-emerald-200 uppercase font-semibold">Kategori Capaian</p>
                  <p className="text-sm font-bold text-white">{growthCategory}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mascot / Avatar */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center">
                <CharacterIllustration 
                  expression={mascotMood}
                  size="lg"
                  alt="Karakter Pencapaian Belajar"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side by Side Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pretest Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-40 pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
              Evaluasi Awal
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(pretestAttempt.completedAt)}
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900">Pretest Ekonomi</h3>
          <p className="text-xs text-slate-500 mt-1">Kemampuan sebelum proses pembelajaran.</p>

          <div className="my-6 flex items-baseline gap-2">
            <span className="text-5xl font-black text-blue-600">{pretestScore}</span>
            <span className="text-slate-400 font-medium text-lg">/ 100</span>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
            <div className="flex justify-between items-center text-slate-600">
              <span>Jawaban Benar</span>
              <span className="font-semibold text-slate-800">{pretestAttempt.correctCount} / 50</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Akurasi</span>
              <span className="font-semibold text-slate-800">{pretestAttempt.accuracy}%</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Waktu Tempuh</span>
              <span className="font-semibold text-slate-800">{formatDuration(pretestAttempt.durationSeconds)}</span>
            </div>
          </div>
        </div>

        {/* Posttest Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-2xl opacity-40 pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
              Evaluasi Akhir
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(posttestAttempt.completedAt)}
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900">Posttest Ekonomi</h3>
          <p className="text-xs text-slate-500 mt-1">Capaian penguasaan setelah belajar.</p>

          <div className="my-6 flex items-baseline gap-2">
            <span className="text-5xl font-black text-emerald-600">{posttestScore}</span>
            <span className="text-slate-400 font-medium text-lg">/ 100</span>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
            <div className="flex justify-between items-center text-slate-600">
              <span>Jawaban Benar</span>
              <span className="font-semibold text-slate-800">{posttestAttempt.correctCount} / 50</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Akurasi</span>
              <span className="font-semibold text-slate-800">{posttestAttempt.accuracy}%</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Waktu Tempuh</span>
              <span className="font-semibold text-slate-800">{formatDuration(posttestAttempt.durationSeconds)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Bar Comparison Chart */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Grafik Perbandingan Capaian Nilai
        </h3>

        <div className="space-y-6">
          {/* Pretest Bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold text-slate-700 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                Nilai Pretest (Awal)
              </span>
              <span className="font-bold text-blue-600">{pretestScore} / 100</span>
            </div>
            <div className="w-full bg-slate-100 h-6 rounded-xl overflow-hidden p-0.5">
              <div 
                className="bg-blue-500 h-full rounded-lg transition-all duration-700 flex items-center justify-end pr-2 text-[11px] font-bold text-white"
                style={{ width: `${Math.max(pretestScore, 5)}%` }}
              >
                {pretestScore > 10 && `${pretestScore}%`}
              </div>
            </div>
          </div>

          {/* Posttest Bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold text-slate-700 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                Nilai Posttest (Akhir)
              </span>
              <span className="font-bold text-emerald-600">{posttestScore} / 100</span>
            </div>
            <div className="w-full bg-slate-100 h-6 rounded-xl overflow-hidden p-0.5">
              <div 
                className="bg-emerald-500 h-full rounded-lg transition-all duration-700 flex items-center justify-end pr-2 text-[11px] font-bold text-white"
                style={{ width: `${Math.max(posttestScore, 5)}%` }}
              >
                {posttestScore > 10 && `${posttestScore}%`}
              </div>
            </div>
          </div>

          {/* Target KKM line reference */}
          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100">
            <span>Standar KKM: 70 / 100</span>
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              {posttestScore >= 70 ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Lolos KKM
                </span>
              ) : (
                <span className="text-amber-600 flex items-center gap-1">
                  Belum Lolos KKM
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningProgressComparison;

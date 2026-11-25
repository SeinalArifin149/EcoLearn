import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  BookOpen, 
  Gamepad2, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  Sparkles,
  Award,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { evaluasiService } from '../../services/evaluasiService';
import { compareLearningGrowth } from '../../utils/evaluasiScoring';
import LearningProgressComparison from '../../components/evaluasi/LearningProgressComparison';
import TopicPerformanceAnalysis from '../../components/evaluasi/TopicPerformanceAnalysis';
import CharacterIllustration from '../../components/common/CharacterIllustration';

export default function PerbandinganEvaluasiPage() {
  const { user } = useAuth();
  const userId = user?.id || 'guest_user';

  const [summary, setSummary] = useState({ pretest: null, posttest: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = evaluasiService.getEvaluasiSummary(userId);
    setSummary(data);
    setLoading(false);
  }, [userId]);

  const pretest = summary.pretest;
  const posttest = summary.posttest;
  const hasBoth = pretest && posttest;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center text-slate-500">
        Memuat analisis evaluasi...
      </div>
    );
  }

  // If one or both tests are missing
  if (!hasBoth) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 space-y-6 animate-fadeIn">
        <Link
          to="/evaluasi"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Hub Evaluasi
        </Link>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center space-y-6">
          <div className="w-32 h-32 mx-auto flex items-center justify-center">
            <CharacterIllustration 
              expression="thinking"
              size="md"
              alt="Karakter Berpikir"
              className="drop-shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Evaluasi Belum Lengkap
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Untuk melihat perbandingan peningkatan kemampuan, kamu harus menyelesaikan kedua tes: <strong>Pretest</strong> (sebelum belajar) dan <strong>Posttest</strong> (setelah belajar).
            </p>
          </div>

          {/* Status checklist */}
          <div className="bg-slate-50 rounded-2xl p-4 text-left max-w-sm mx-auto space-y-3 border border-slate-100 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">1. Pretest Ekonomi:</span>
              {pretest ? (
                <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Selesai ({pretest.score})
                </span>
              ) : (
                <span className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Belum Dikerjakan
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">2. Posttest Ekonomi:</span>
              {posttest ? (
                <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Selesai ({posttest.score})
                </span>
              ) : (
                <span className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Belum Dikerjakan
                </span>
              )}
            </div>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            {!pretest ? (
              <Link
                to="/evaluasi/pretest"
                className="px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 shadow-sm transition-colors"
              >
                Mulai Pretest Sekarang
              </Link>
            ) : (
              <Link
                to="/evaluasi/posttest"
                className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 shadow-sm transition-colors"
              >
                Mulai Posttest Sekarang
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Calculate full comparison
  const comparison = compareLearningGrowth(pretest, posttest);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/evaluasi"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Hub Evaluasi
        </Link>
      </div>

      {/* Hero Comparative View */}
      <LearningProgressComparison 
        pretestAttempt={pretest}
        posttestAttempt={posttest}
        comparison={comparison}
      />

      {/* Topic-by-Topic Performance */}
      <TopicPerformanceAnalysis 
        topicComparisons={comparison.topicComparisons}
      />

      {/* Actionable Next Steps */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-blue-950">
            Rekomendasi Langkah Belajar Selanjutnya
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
          Berdasarkan hasil perbandingan Pretest dan Posttest, kamu dapat terus mengasah pemahaman dengan mendalami materi yang masih perlu penguatan atau mencoba simulasi ekonomi interaktif.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            to="/materi"
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-semibold text-xs sm:text-sm shadow-sm transition-colors inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Buka Katalog Materi
          </Link>

          <Link
            to="/simulasi"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-xs sm:text-sm shadow-sm transition-colors inline-flex items-center gap-2"
          >
            <Gamepad2 className="w-4 h-4" />
            Coba Simulasi Pasar & Ekonomi
          </Link>

          <Link
            to="/ujian"
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm transition-colors inline-flex items-center gap-2"
          >
            Latihan Soal Kuis Interaktif
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

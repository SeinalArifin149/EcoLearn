import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ClipboardCheck, 
  Clock, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  TrendingUp, 
  RotateCcw, 
  Award, 
  Sparkles, 
  BookOpen,
  Calendar,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { evaluasiService } from '../../services/evaluasiService';
import { compareLearningGrowth } from '../../utils/evaluasiScoring';
import CharacterIllustration from '../../components/common/CharacterIllustration';

export default function EvaluasiPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = user?.id || 'guest_user';

  const [summary, setSummary] = useState({
    pretest: null,
    posttest: null,
    history: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = evaluasiService.getEvaluasiSummary(userId);
    setSummary(data);
    setLoading(false);
  }, [userId]);

  const pretest = summary.pretest;
  const posttest = summary.posttest;
  const hasBoth = pretest && posttest;

  const comparison = hasBoth ? compareLearningGrowth(pretest, posttest) : null;

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-blue-100 text-xs font-semibold border border-white/20">
              <ClipboardCheck className="w-3.5 h-3.5" />
              Sistem Evaluasi Belajar Ekonomi SMA Kelas X
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Pretest & Posttest Evaluasi
            </h1>
            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
              Ukur pemahaman awalmu melalui Pretest, pelajari 10 materi ekonomi interaktif, lalu buktikan peningkatan kompetensimu pada Posttest!
            </p>
          </div>

          <div className="shrink-0 flex items-center justify-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center">
              <CharacterIllustration 
                expression="explaining"
                size="md"
                alt="Karakter Pembelajaran Evaluasi"
                className="drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Banner (if both completed) */}
      {hasBoth && comparison && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 text-emerald-100 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Evaluasi Lengkap
              </span>
              <h2 className="text-2xl font-bold">Analisis Perbandingan Belajar Siap!</h2>
              <p className="text-emerald-100 text-sm max-w-xl">
                {comparison.hasGain ? (
                  <>Nilai kamu meningkat sebesar <strong className="text-white">+{comparison.absoluteGain} Poin</strong> ({comparison.growthCategory}).</>
                ) : (
                  <>Hasil evaluasi awal dan akhir kamu sudah tercatat. Simak analisis penguasaan per bab!</>
                )}
              </p>
            </div>

            <Link
              to="/evaluasi/perbandingan"
              className="px-6 py-3 bg-white text-emerald-800 hover:bg-emerald-50 rounded-2xl font-bold text-sm shadow-md transition-all inline-flex items-center gap-2 shrink-0"
            >
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Buka Analisis Pertumbuhan Belajar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Two Main Cards: Pretest & Posttest */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pretest Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
                Tahap Awal
              </span>

              {pretest ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Selesai (Skor: {pretest.score})
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  <AlertCircle className="w-3.5 h-3.5" /> Belum Dikerjakan
                </span>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">Pretest Ekonomi Kelas X</h2>
              <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                Ujian diagnostik awal untuk mengukur pemahaman dasarmu sebelum mempelajari materi. Kerjakan sejujurnya tanpa melihat catatan!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-slate-400">Jumlah Soal</p>
                  <p className="font-bold text-slate-800">50 Butir (A - E)</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-slate-400">Batas Waktu</p>
                  <p className="font-bold text-slate-800">60 Menit</p>
                </div>
              </div>
            </div>

            {pretest && (
              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-800 font-medium">Skor Pretest Terakhir</p>
                  <p className="text-2xl font-black text-blue-900">{pretest.score} <span className="text-xs font-normal text-blue-600">/ 100</span></p>
                </div>
                <Link
                  to={`/evaluasi/hasil/${pretest.attemptId}`}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                >
                  Lihat Hasil & Pembahasan <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2.5">
            <Link
              to="/pretest"
              className="w-full sm:flex-1 py-2.5 px-3 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 font-bold text-xs text-center transition-all inline-flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Buka di Padlet
            </Link>
            <Link
              to="/evaluasi/pretest"
              className={`w-full sm:flex-1 py-2.5 px-3 rounded-xl font-bold text-xs text-center transition-all inline-flex items-center justify-center gap-1.5 ${
                pretest 
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200'
              }`}
            >
              {pretest ? <RotateCcw className="w-3.5 h-3.5" /> : <ClipboardCheck className="w-3.5 h-3.5" />}
              {pretest ? 'Ulangi CBT' : 'Mulai CBT (50 Soal)'}
            </Link>
          </div>
        </div>

        {/* Posttest Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                Tahap Akhir
              </span>

              {posttest ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Selesai (Skor: {posttest.score})
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  <AlertCircle className="w-3.5 h-3.5" /> Belum Dikerjakan
                </span>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">Posttest Ekonomi Kelas X</h2>
              <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                Evaluasi akhir untuk mengukur peningkatan capaian belajar setelah mempelajari materi dan simulasi. Standar kelulusan KKM adalah 70.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <div>
                  <p className="text-slate-400">Jumlah Soal</p>
                  <p className="font-bold text-slate-800">50 Butir (A - E)</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <div>
                  <p className="text-slate-400">Batas Waktu</p>
                  <p className="font-bold text-slate-800">60 Menit</p>
                </div>
              </div>
            </div>

            {posttest && (
              <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-emerald-800 font-medium">Skor Posttest Terakhir</p>
                  <p className="text-2xl font-black text-emerald-900">{posttest.score} <span className="text-xs font-normal text-emerald-600">/ 100</span></p>
                </div>
                <Link
                  to={`/evaluasi/hasil/${posttest.attemptId}`}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                >
                  Lihat Hasil & Pembahasan <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2.5">
            <Link
              to="/posttest"
              className="w-full sm:flex-1 py-2.5 px-3 rounded-xl border border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-bold text-xs text-center transition-all inline-flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Buka di Padlet
            </Link>
            <Link
              to="/evaluasi/posttest"
              className={`w-full sm:flex-1 py-2.5 px-3 rounded-xl font-bold text-xs text-center transition-all inline-flex items-center justify-center gap-1.5 ${
                posttest 
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-200'
              }`}
            >
              {posttest ? <RotateCcw className="w-3.5 h-3.5" /> : <ClipboardCheck className="w-3.5 h-3.5" />}
              {posttest ? 'Ulangi CBT' : 'Mulai CBT (50 Soal)'}
            </Link>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-600" />
            Riwayat Pengerjaan Evaluasi
          </h3>
          <span className="text-xs text-slate-400">
            Total {summary.history.length} kali pengerjaan
          </span>
        </div>

        {summary.history.length === 0 ? (
          <div className="p-8 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl">
            Belum ada riwayat pengerjaan evaluasi. Mulai dengan mengerjakan Pretest!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Jenis Tes</th>
                  <th className="py-3 px-4">Waktu Selesai</th>
                  <th className="py-3 px-4">Skor</th>
                  <th className="py-3 px-4">Akurasi</th>
                  <th className="py-3 px-4">Durasi</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {summary.history.map((item) => (
                  <tr key={item.attemptId} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase mr-2 ${
                        item.testType === 'pretest' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {item.testType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      {new Date(item.completedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <span className={item.score >= 70 ? 'text-emerald-600' : 'text-slate-800'}>
                        {item.score}
                      </span>
                      <span className="text-xs font-normal text-slate-400"> / 100</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-xs">
                      {item.accuracy}% ({item.correctCount}/{item.totalQuestions})
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-xs">
                      {Math.floor((item.durationSeconds || 0) / 60)}m {(item.durationSeconds || 0) % 60}s
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/evaluasi/hasil/${item.attemptId}`}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                      >
                        Detail <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

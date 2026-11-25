import React from 'react';
import { Play, ArrowLeft, Clock, FileText, CheckCircle2, Award, ShieldAlert, Sparkles, HelpCircle, ExternalLink } from 'lucide-react';
import Button from '../common/Button';
import CharacterIllustration from '../common/CharacterIllustration';
import { appConfig } from '../../data/appConfig';

export default function EvaluasiInstructions({
  testType = 'pretest',
  totalQuestions = 50,
  durationMinutes = 60,
  passingScore = 70,
  onStart,
  onBack,
  onResume,
  hasDraft = false,
}) {
  const isPretest = testType === 'pretest';

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Pusat Evaluasi
        </button>
      </div>

      {/* Main Briefing Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-100 shadow-sm space-y-8">
        
        {/* Banner with Mascot */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2 text-center sm:text-left">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                isPretest
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isPretest ? 'EVALUASI AWAL (DIAGNOSTIK)' : 'EVALUASI AKHIR (KOMPREHENSIF)'}
            </span>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {isPretest ? 'Pretest Ekonomi Kelas X' : 'Posttest Ekonomi Kelas X'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 max-w-lg leading-relaxed">
              {isPretest
                ? 'Ukur tingkat pemahaman awalmu mengenai konsep-konsep ekonomi sebelum mempelajari materi. Kerjakan dengan kemampuan terbaikmu!'
                : 'Ukur peningkatan pemahaman dan kompetensimu setelah mempelajari seluruh materi dan simulasi ekonomi.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center justify-center">
            <CharacterIllustration
              expression={isPretest ? 'motivating' : 'learning'}
              size="lg"
              alt="Karakter Siswa Siap Ujian Evaluasi"
              className="drop-shadow-lg"
            />
          </div>
        </div>

        {/* 4 Parameter Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col items-center text-center">
            <FileText className="w-5 h-5 text-blue-600 mb-1" />
            <span className="text-lg font-black text-blue-900">{totalQuestions} Soal</span>
            <span className="text-[11px] font-semibold text-slate-500">Pilihan Ganda A-E</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 flex flex-col items-center text-center">
            <Clock className="w-5 h-5 text-amber-600 mb-1" />
            <span className="text-lg font-black text-amber-900">{durationMinutes} Menit</span>
            <span className="text-[11px] font-semibold text-slate-500">Waktu Pengerjaan</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-col items-center text-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-1" />
            <span className="text-lg font-black text-emerald-900">KKM {passingScore}</span>
            <span className="text-[11px] font-semibold text-slate-500">Standar Ketuntasan</span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 flex flex-col items-center text-center">
            <Award className="w-5 h-5 text-purple-600 mb-1" />
            <span className="text-lg font-black text-purple-900">{isPretest ? '+10 XP' : '+40 XP'}</span>
            <span className="text-[11px] font-semibold text-slate-500">Reward Prestasi</span>
          </div>
        </div>

        {/* Instructions list */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            Petunjuk & Ketentuan Pengerjaan:
          </h3>

          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </span>
              <span>Tes mencakup seluruh <strong>10 Bab Ekonomi Kelas X</strong> (masing-masing 5 butir soal).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                2
              </span>
              <span>Waktu tes berjalan secara mutlak. Jika kamu merefresh browser, sisa waktu akan <strong>tetap berlanjut</strong> tanpa mengulang dari 60 menit.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                3
              </span>
              <span>Gunakan fitur <strong>Tandai Ragu-ragu</strong> untuk menandai soal yang ingin kamu tinjau ulang.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                4
              </span>
              <span>Ketika waktu habis (00:00), jawaban yang telah terisi akan <strong>terkumpul otomatis</strong> oleh sistem.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                5
              </span>
              <span>Kunci jawaban dan pembahasan mendalam akan langsung terbuka setelah lembar tes berhasil dikumpulkan.</span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <button
              type="button"
              onClick={() => {
                const targetUrl = isPretest ? appConfig.padletPretestUrl : appConfig.padletPosttestUrl;
                window.open(targetUrl || 'https://padlet.com', '_blank', 'noopener,noreferrer');
              }}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1.5 py-2 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Buka Lembar Kerja di Padlet Kelas
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={onBack} fullWidth className="sm:w-auto">
              Kembali
            </Button>
            {hasDraft && onResume && (
              <Button
                variant="secondary"
                onClick={onResume}
                fullWidth
                className="sm:w-auto px-6 border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100"
              >
                Lanjutkan Pengerjaan (Draft)
              </Button>
            )}
            <Button
              variant="primary"
              icon={Play}
              onClick={onStart}
              fullWidth
              className="sm:w-auto px-8"
            >
              {hasDraft ? 'Mulai Ulang dari Awal' : `Mulai CBT ${isPretest ? 'Pretest' : 'Posttest'}`}
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

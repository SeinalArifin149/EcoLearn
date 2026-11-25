import React from 'react';
import { Play, ArrowLeft, Clock, CheckCircle2, Award, FileText, AlertCircle, ShieldCheck } from 'lucide-react';
import Button from '../common/Button';
import CharacterIllustration from '../common/CharacterIllustration';

export default function QuizInstructions({
  materiTitle = 'Konsep Dasar Ilmu Ekonomi',
  totalQuestions = 10,
  durationMinutes = 15,
  passingScore = 70,
  onStart,
  onBack,
}) {
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* Top Breadcrumb/Back link */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Halaman Materi
        </button>
      </div>

      {/* Main Instruction Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-100 shadow-sm space-y-8">
        
        {/* Banner with Motivating Character */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              Petunjuk Ujian Bab
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {materiTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg leading-relaxed">
              Uji sejauh mana pemahaman konsep ekonomimu setelah menuntaskan subbab pembelajaran.
            </p>
          </div>

          <div className="shrink-0 flex items-center justify-center">
            <CharacterIllustration
              expression="motivating"
              size="lg"
              alt="Karakter Siswa Siap Ujian"
              className="drop-shadow-lg"
            />
          </div>
        </div>

        {/* 4 Key Exam Parameter Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col items-center text-center">
            <FileText className="w-5 h-5 text-blue-600 mb-1" />
            <span className="text-lg font-black text-blue-900">{totalQuestions} Soal</span>
            <span className="text-[11px] font-semibold text-slate-500">Pilihan Ganda (A-E)</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 flex flex-col items-center text-center">
            <Clock className="w-5 h-5 text-amber-600 mb-1" />
            <span className="text-lg font-black text-amber-900">{durationMinutes} Menit</span>
            <span className="text-[11px] font-semibold text-slate-500">Batas Waktu</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-col items-center text-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-1" />
            <span className="text-lg font-black text-emerald-900">KKM {passingScore}</span>
            <span className="text-[11px] font-semibold text-slate-500">Batas Kelulusan</span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 flex flex-col items-center text-center">
            <Award className="w-5 h-5 text-purple-600 mb-1" />
            <span className="text-lg font-black text-purple-900">+50 XP</span>
            <span className="text-[11px] font-semibold text-slate-500">Poin Hadiah</span>
          </div>
        </div>

        {/* Rules & Guidelines */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600" />
            Ketentuan & Aturan Pengerjaan:
          </h3>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </span>
              <span>Setiap soal memiliki <strong>5 pilihan jawaban (A, B, C, D, E)</strong> dengan hanya satu jawaban yang paling tepat.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                2
              </span>
              <span>Kamu bebas berpindah nomor soal kapan saja menggunakan <strong>Palet Nomor Soal</strong> di sebelah kanan.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                3
              </span>
              <span>Gunakan fitur <strong>Tandai Ragu-ragu</strong> untuk memberi tanda pada nomor yang ingin kamu periksa kembali sebelum mengumpulkan.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                4
              </span>
              <span>Jika waktu hitung mundur habis (00:00), sistem secara otomatis mengumpulkan lembar jawabanmu.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                5
              </span>
              <span>Progress jawaban tersimpan otomatis secara lokal, sehingga kamu tidak perlu cemas jika halaman tidak sengaja termuat ulang.</span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          <Button variant="outline" onClick={onBack} fullWidth className="sm:w-auto">
            Batal & Kembali
          </Button>
          <Button variant="primary" icon={Play} onClick={onStart} fullWidth className="sm:w-auto px-8">
            Mulai Kerjakan Ujian Sekarang
          </Button>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  ExternalLink, 
  Maximize2, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Layers
} from 'lucide-react';
import Button from '../common/Button';
import CharacterIllustration from '../common/CharacterIllustration';
import { appConfig } from '../../data/appConfig';

export default function PadletEvaluasiCard({ 
  testType = 'pretest', 
  onSwitchToCBT 
}) {
  const isPretest = testType === 'pretest';
  const padletUrl = isPretest 
    ? (appConfig.padletPretestUrl || 'https://padlet.com') 
    : (appConfig.padletPosttestUrl || 'https://padlet.com');

  const [isLoading, setIsLoading] = useState(true);

  const handleOpenNewTab = () => {
    window.open(padletUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-6xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
              <Layers className="w-3.5 h-3.5" />
              Papan Interaktif Padlet • {isPretest ? 'Evaluasi Awal' : 'Evaluasi Akhir'}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {isPretest ? 'Pretest Ekonomi Kelas X di Padlet' : 'Posttest Ekonomi Kelas X di Padlet'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isPretest 
                ? 'Lembar kerja interaktif Pretest telah disiapkan melalui papan Padlet. Kerjakan instruksi atau soal yang tertera pada lembar kerja di bawah ini secara mandiri dan jujur.'
                : 'Evaluasi akhir Posttest untuk mengukur pemahaman materi ekonomi yang telah kamu pelajari. Isi lembar kerja Padlet berikut ini sesuai arahan guru.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 justify-center md:justify-start">
              <Button 
                variant="primary" 
                size="md" 
                icon={ExternalLink} 
                onClick={handleOpenNewTab}
              >
                Buka Padlet di Tab Baru
              </Button>

              {onSwitchToCBT && (
                <button
                  type="button"
                  onClick={onSwitchToCBT}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Beralih ke Kuis Interaktif (CBT 50 Soal)
                </button>
              )}
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-blue-50/80 border border-blue-100 flex items-center justify-center">
              <CharacterIllustration 
                expression={isPretest ? 'motivating' : 'explaining'}
                size="md"
                alt="Karakter Siswa Padlet"
                className="drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Petunjuk Ringkas */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 text-xs text-slate-600 space-y-2">
        <p className="font-bold text-slate-800 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          Petunjuk Pengerjaan Lembar Kerja Padlet:
        </p>
        <ul className="list-disc list-inside space-y-1 text-slate-500 pl-1">
          <li>Kamu dapat langsung mengisi atau berinteraksi dengan Padlet di dalam frame di bawah ini.</li>
          <li>Jika tampilan terasa sempit pada layar HP, klik tombol <strong>"Buka Padlet di Tab Baru"</strong> untuk pengalaman layar penuh.</li>
          <li>Pastikan kamu mengisi nama lengkap dan kelas agar guru dapat mencatat hasil evaluasimu.</li>
        </ul>
      </div>

      {/* Embedded Iframe Container */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between px-2 pt-1 text-xs text-slate-500">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Tampilan Lembar Kerja Padlet Terintegrasi
          </span>
          <button
            onClick={handleOpenNewTab}
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
          >
            Layar Penuh <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="w-full h-[650px] sm:h-[750px] rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-50">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-50 z-10 text-slate-400 text-xs">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span>Memuat papan Padlet...</span>
            </div>
          )}

          <iframe
            src={padletUrl}
            title={`Padlet ${isPretest ? 'Pretest' : 'Posttest'} EcoLearn`}
            className="w-full h-full border-0"
            allow="camera; microphone; geolocation"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}

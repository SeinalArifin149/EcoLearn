import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';
import { materiService } from '../../services/materiService';

export default function RecommendedMateri() {
  const { user } = useAuth();
  const userId = user?.id || 'usr-001';

  const recommendations = useMemo(() => {
    const list = materiService.getAllMateriWithProgress(userId);
    return list.slice(0, 3);
  }, [userId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Materi Rekomendasi Hari Ini
          </h3>
          <p className="text-xs text-slate-500">
            Pilih bab pembelajaran untuk melanjutkan petualangan ilmumu.
          </p>
        </div>
        <Link
          to="/materi"
          className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
        >
          Lihat Semua 10 Bab <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {recommendations.map((item) => {
          const isCompleted = item.progress === 100;
          const isInProgress = item.progress > 0 && item.progress < 100;

          return (
            <div
              key={item.id}
              className="group bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-blue-300 shadow-sm hover:shadow-xl hover:shadow-blue-950/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    {item.chapterNum}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : isInProgress
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}
                  >
                    {isCompleted ? 'Selesai' : isInProgress ? 'Sedang Berjalan' : 'Belum Dimulai'}
                  </span>
                </div>

                <h4 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {item.summary}
                </p>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {item.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> {item.chapters?.length || 3} Subtopik
                  </span>
                </div>

                {/* Progress per item */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500">
                    <span>Progres Bab</span>
                    <span>{item.progress || 0}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-emerald-500'
                          : isInProgress
                          ? 'bg-amber-400'
                          : 'bg-slate-200'
                      }`}
                      style={{ width: `${item.progress || 0}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100">
                <Link to={`/materi/${item.id}`} className="block">
                  <Button
                    variant={isCompleted ? 'outline' : isInProgress ? 'amber' : 'primary'}
                    fullWidth
                    size="sm"
                    icon={isCompleted ? CheckCircle2 : Play}
                  >
                    {isCompleted ? 'Pelajari Ulang' : isInProgress ? 'Lanjutkan Belajar' : 'Mulai Belajar'}
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

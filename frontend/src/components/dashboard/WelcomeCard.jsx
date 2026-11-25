import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Sparkles, Trophy, TrendingUp, ArrowRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import CharacterIllustration from '../common/CharacterIllustration';

export default function WelcomeCard() {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-emerald-700 p-6 sm:p-8 text-white shadow-xl shadow-blue-900/10">
      
      {/* Background soft glow patterns */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 -mb-12 w-48 h-48 bg-amber-400/20 rounded-full blur-xl pointer-events-none"></div>

      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left: Greeting & Motivational Message */}
        <div className="md:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-blue-200 text-xs font-black tracking-wide border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>LEVEL {user?.levelNumber || 3} • {user?.level || 'EKONOM MUDA'}</span>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Selamat Datang Kembali, <br className="hidden sm:inline" />
              <span className="text-amber-300">{user?.name || 'Siswa EcoLearn'}</span>! 👋
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl">
              "Memahami konsep ekonomi, mekanisme pasar, dan pengelolaan sumber daya sejak dini adalah kunci menjadi generasi cerdas finansial yang berdaya saing."
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link to="/materi">
              <Button variant="amber" size="md" icon={ArrowRight}>
                Lanjutkan Materi Ekonomi
              </Button>
            </Link>
            <Link to="/pretest">
              <Button variant="outline" size="md" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                Pengerjaan Pretest
              </Button>
            </Link>
          </div>
        </div>

        {/* Right: Gamified Mascot / Level Badge Card */}
        <div className="md:col-span-4 flex justify-center md:justify-end">
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 text-center w-full max-w-xs shadow-lg space-y-3">
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <CharacterIllustration
                expression="motivating"
                size="md"
                alt="Maskot Pelajar EcoLearn"
                className="w-full h-full drop-shadow-lg"
              />
              <div className="absolute -bottom-1 right-2 bg-amber-400 text-slate-950 p-1.5 rounded-xl text-xs font-black shadow">
                <Flame className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-white/70">Tingkat Kemahiran</p>
              <h4 className="text-base font-black text-white">{user?.level || 'Ekonom Muda Level 3'}</h4>
            </div>

            {/* Level XP Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-blue-200">
                <span>XP Level {user?.levelNumber || 3}</span>
                <span>{user?.currentLevelXp || 450} / {user?.nextLevelXp || 600}</span>
              </div>
              <div className="w-full h-2.5 bg-black/25 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-amber-300 to-amber-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.round(((user?.currentLevelXp || 450) / (user?.nextLevelXp || 600)) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

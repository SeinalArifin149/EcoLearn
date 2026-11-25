import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { materiService } from '../../services/materiService';
import MateriCard from '../../components/materi/MateriCard';
import MateriProgressOverview from '../../components/materi/MateriProgressOverview';
import MateriFilter from '../../components/materi/MateriFilter';
import CharacterIllustration from '../../components/common/CharacterIllustration';
import EmptyState from '../../components/common/EmptyState';
import { BookOpen, Sparkles } from 'lucide-react';

export default function MateriPage() {
  const { user } = useAuth();
  const userId = user?.id || 'usr-001';

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');

  // Load dynamic materi list & statistics from materiService
  const [materiData, setMateriData] = useState([]);
  const [progressStats, setProgressStats] = useState({
    totalMateri: 10,
    completed: 0,
    inProgress: 0,
    notStarted: 10,
    overallPercentage: 0,
  });

  useEffect(() => {
    const list = materiService.getAllMateriWithProgress(userId);
    const stats = materiService.getProgressStatistics(userId);
    setMateriData(list);
    setProgressStats(stats);
  }, [userId]);

  // Filtered List
  const filteredMateri = useMemo(() => {
    return materiData.filter((item) => {
      // 1. Search Query
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.chapterNum.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Category
      const matchesCategory =
        selectedCategory === 'Semua Kategori' || item.category === selectedCategory;

      // 3. Status
      let matchesStatus = true;
      if (selectedStatus === 'Selesai') {
        matchesStatus = item.progress === 100;
      } else if (selectedStatus === 'Sedang Berjalan') {
        matchesStatus = item.progress > 0 && item.progress < 100;
      } else if (selectedStatus === 'Belum Dimulai') {
        matchesStatus = !item.progress || item.progress === 0;
      }

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [materiData, searchQuery, selectedCategory, selectedStatus]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua Kategori');
    setSelectedStatus('Semua Status');
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. Header Halaman dengan Maskot Learning */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-900/10">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-8 space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-xs text-blue-200 text-xs font-black tracking-wide border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>KURIKULUM EKONOMI SMA KELAS X</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Materi Pembelajaran Ekonomi
            </h2>

            <p className="text-xs sm:text-sm text-white/90 max-w-xl leading-relaxed">
              Pelajari 10 bab ekonomi komprehensif mulai dari konsep kelangkaan, mekanisme pasar, arus lingkar kegiatan, hingga sistem ekonomi Pancasila secara interaktif.
            </p>

            {/* Quick Summary Pill on Header */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold text-blue-100">
              <span className="bg-black/20 px-3.5 py-1.5 rounded-xl border border-white/10">
                📚 Total: <strong>{progressStats.totalMateri} Bab</strong>
              </span>
              <span className="bg-black/20 px-3.5 py-1.5 rounded-xl border border-white/10 text-emerald-300">
                ✓ Selesai: <strong>{progressStats.completed} Bab</strong>
              </span>
              <span className="bg-black/20 px-3.5 py-1.5 rounded-xl border border-white/10 text-amber-300">
                ⚡ Progres: <strong>{progressStats.overallPercentage}%</strong>
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
              <CharacterIllustration
                expression="learning"
                size="full"
                alt="Siswa Membaca Buku Materi Ekonomi"
                className="drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 2. Kartu Progress Pembelajaran Dinamis */}
      <MateriProgressOverview stats={progressStats} />

      {/* 3. Pencarian dan Filter Materi */}
      <MateriFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onResetFilters={handleResetFilters}
        totalResults={filteredMateri.length}
      />

      {/* 4. Daftar Materi Cards / Empty State */}
      {filteredMateri.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMateri.map((materi) => (
            <MateriCard key={materi.id} materi={materi} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-sm p-8">
          <EmptyState
            character="boy"
            expression="curious"
            title="Materi Tidak Ditemukan"
            description={`Tidak ada materi yang sesuai dengan kata kunci "${searchQuery}" atau filter yang kamu pilih.`}
            actionText="Reset Pencarian & Filter"
            onAction={handleResetFilters}
          />
        </div>
      )}

    </div>
  );
}

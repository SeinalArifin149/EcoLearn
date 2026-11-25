import React from 'react';
import { Search, X, RotateCcw, Filter } from 'lucide-react';
import { materiCategories } from '../../data/materiData';

export default function MateriFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  onResetFilters,
  totalResults,
}) {
  const isFilterActive = searchQuery || selectedCategory !== 'Semua Kategori' || selectedStatus !== 'Semua Status';

  const statuses = ['Semua Status', 'Selesai', 'Sedang Berjalan', 'Belum Dimulai'];

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm space-y-5">
      
      {/* Top Bar: Search Input & Status Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
        
        {/* Search Bar */}
        <div className="sm:col-span-8 relative flex items-center">
          <Search className="w-4 h-4 absolute left-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari judul bab, konsep, atau topik ekonomi..."
            className="w-full pl-11 pr-10 py-3 text-sm font-medium text-slate-800 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
              aria-label="Bersihkan pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Dropdown */}
        <div className="sm:col-span-4 relative flex items-center">
          <Filter className="w-4 h-4 absolute left-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full pl-11 pr-8 py-3 text-sm font-bold text-slate-700 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Category Pills (Horizontal scrollable tags) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400">
            Kategori Topik Ekonomi:
          </span>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
            {totalResults} Materi Ditemukan
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {materiCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 scale-[1.02]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Filter Button if active */}
      {isFilterActive && (
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Menampilkan hasil terfilter.
          </p>
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-black text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Semua Filter
          </button>
        </div>
      )}

    </div>
  );
}

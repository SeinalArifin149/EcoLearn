import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, Tag } from 'lucide-react';
import Button from '../common/Button';

export default function ExpenseList({
  expenses = [],
  onAddExpense,
  onUpdateExpense,
  onDeleteExpense,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('kebutuhan'); // 'kebutuhan' | 'keinginan' | 'tabungan'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !amount || Number(amount) <= 0) return;

    onAddExpense({
      id: `exp-${Date.now()}`,
      name: name.trim(),
      amount: Number(amount),
      type,
    });

    setName('');
    setAmount('');
    setType('kebutuhan');
    setIsAdding(false);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-100 shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-black text-slate-900">Daftar Alokasi Pengeluaran</h4>
          <p className="text-[11px] text-slate-400 font-medium">
            Atur dan klasifikasikan setiap pos belanja siswa
          </p>
        </div>

        {!isAdding && (
          <Button
            variant="outline"
            size="sm"
            icon={Plus}
            onClick={() => setIsAdding(true)}
          >
            Tambah Pos
          </Button>
        )}
      </div>

      {/* Add New Expense Form */}
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded-2xl bg-blue-50/70 border-2 border-blue-200 space-y-3 animate-fadeIn"
        >
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-black text-blue-900">Tambah Pos Alokasi Baru</h5>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Batal
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <input
              type="text"
              placeholder="Nama pengeluaran (misal: Buku Tulis)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:border-blue-500"
              required
            />

            <input
              type="number"
              placeholder="Jumlah nominal (Rp)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:border-blue-500"
              min="1000"
              step="1000"
              required
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="kebutuhan">Kebutuhan Pokok</option>
              <option value="keinginan">Keinginan / Hiburan</option>
              <option value="tabungan">Tabungan Masa Depan</option>
            </select>
          </div>

          <div className="flex justify-end pt-1">
            <Button variant="primary" size="sm" type="submit" icon={Check}>
              Simpan Pos Anggaran
            </Button>
          </div>
        </form>
      )}

      {/* Expense Items List */}
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {expenses.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400 rounded-2xl bg-slate-50">
            Belum ada pos pengeluaran. Klik tombol Tambah Pos di atas.
          </div>
        ) : (
          expenses.map((item) => {
            const isNeeds = item.type === 'kebutuhan';
            const isSavings = item.type === 'tabungan';

            return (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs transition-all hover:bg-slate-100/60"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 truncate">{item.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        // Toggle type cycle: kebutuhan -> keinginan -> tabungan -> kebutuhan
                        const nextType =
                          item.type === 'kebutuhan'
                            ? 'keinginan'
                            : item.type === 'keinginan'
                            ? 'tabungan'
                            : 'kebutuhan';
                        onUpdateExpense(item.id, { ...item, type: nextType });
                      }}
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border transition-transform active:scale-95 cursor-pointer ${
                        isSavings
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : isNeeds
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}
                      title="Klik untuk mengubah tipe pos"
                    >
                      {isSavings ? 'Tabungan' : isNeeds ? 'Kebutuhan' : 'Keinginan'}
                    </button>
                  </div>
                  <span className="text-[11px] font-black text-slate-700 block mt-0.5">
                    Rp {Number(item.amount).toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => onDeleteExpense(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Hapus pos ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

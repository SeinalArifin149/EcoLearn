/**
 * Dataset Awal Siswa SMA Kelas X EcoLearn
 * Data lengkap profil, keaktifan, dan rekapitulasi nilai evaluasi (Pretest, Posttest, Kuis Bab)
 */

export const initialSiswaList = [
  {
    id: 'sis-001',
    nisn: '0081234501',
    name: 'Budi Santoso',
    email: 'budi@ecolearn.id',
    phone: '081234567891',
    gender: 'Laki-laki',
    kelas: 'X-1',
    status: 'Aktif',
    joinedAt: '2026-07-15',
    avatarColor: 'bg-blue-600',
    pretest: 55,
    posttest: 88,
    gain: 33,
    rataRataKuis: 85.5,
    quizBab: {
      1: 90, 2: 85, 3: 80, 4: 95, 5: 85,
      6: 80, 7: 75, 8: 90, 9: 85, 10: 90
    },
    xp: 1450,
    lencanaCount: 4,
    catatan: 'Siswa sangat aktif berdiskusi dan memahami konsep pasar dengan sangat baik.'
  },
  {
    id: 'sis-002',
    nisn: '0081234502',
    name: 'Siti Aisyah',
    email: 'siti.aisyah@ecolearn.id',
    phone: '081234567892',
    gender: 'Perempuan',
    kelas: 'X-1',
    status: 'Aktif',
    joinedAt: '2026-07-15',
    avatarColor: 'bg-emerald-600',
    pretest: 60,
    posttest: 94,
    gain: 34,
    rataRataKuis: 91.0,
    quizBab: {
      1: 95, 2: 90, 3: 90, 4: 100, 5: 85,
      6: 90, 7: 85, 8: 95, 9: 90, 10: 90
    },
    xp: 1680,
    lencanaCount: 5,
    catatan: 'Peringkat 1 kelas X-1 pada posttest ekonomi.'
  },
  {
    id: 'sis-003',
    nisn: '0081234503',
    name: 'Rina Sari',
    email: 'rina.sari@ecolearn.id',
    phone: '081234567893',
    gender: 'Perempuan',
    kelas: 'X-1',
    status: 'Aktif',
    joinedAt: '2026-07-16',
    avatarColor: 'bg-indigo-600',
    pretest: 48,
    posttest: 82,
    gain: 34,
    rataRataKuis: 80.0,
    quizBab: {
      1: 80, 2: 75, 3: 85, 4: 80, 5: 80,
      6: 75, 7: 85, 8: 80, 9: 80, 10: 80
    },
    xp: 1220,
    lencanaCount: 3,
    catatan: 'Perlu penguatan pada bab kebijakan moneter dan inflasi.'
  },
  {
    id: 'sis-004',
    nisn: '0081234504',
    name: 'Andi Pratama',
    email: 'andi.pratama@ecolearn.id',
    phone: '081234567894',
    gender: 'Laki-laki',
    kelas: 'X-2',
    status: 'Aktif',
    joinedAt: '2026-07-16',
    avatarColor: 'bg-amber-600',
    pretest: 50,
    posttest: 78,
    gain: 28,
    rataRataKuis: 76.5,
    quizBab: {
      1: 75, 2: 70, 3: 80, 4: 85, 5: 70,
      6: 75, 7: 80, 8: 75, 9: 75, 10: 80
    },
    xp: 1150,
    lencanaCount: 2,
    catatan: 'Telah tuntas melampaui KKM 70 pada posttest.'
  },
  {
    id: 'sis-005',
    nisn: '0081234505',
    name: 'Dika Pratama',
    email: 'dika.pratama@ecolearn.id',
    phone: '081234567895',
    gender: 'Laki-laki',
    kelas: 'X-2',
    status: 'Aktif',
    joinedAt: '2026-07-17',
    avatarColor: 'bg-teal-600',
    pretest: 40,
    posttest: 66,
    gain: 26,
    rataRataKuis: 68.0,
    quizBab: {
      1: 70, 2: 65, 3: 70, 4: 75, 5: 60,
      6: 65, 7: 70, 8: 65, 9: 70, 10: 70
    },
    xp: 890,
    lencanaCount: 1,
    catatan: 'Memerlukan bimbingan remedial khusus untuk persiapan ujian akhir.'
  },
  {
    id: 'sis-006',
    nisn: '0081234506',
    name: 'Dewi Lestari',
    email: 'dewi.lestari@ecolearn.id',
    phone: '081234567896',
    gender: 'Perempuan',
    kelas: 'X-2',
    status: 'Aktif',
    joinedAt: '2026-07-17',
    avatarColor: 'bg-rose-600',
    pretest: 62,
    posttest: 90,
    gain: 28,
    rataRataKuis: 88.5,
    quizBab: {
      1: 90, 2: 85, 3: 90, 4: 95, 5: 85,
      6: 90, 7: 85, 8: 90, 9: 85, 10: 90
    },
    xp: 1510,
    lencanaCount: 4,
    catatan: 'Karakter pembelajar mandiri yang konsisten.'
  },
  {
    id: 'sis-007',
    nisn: '0081234507',
    name: 'Fajar Ramadhan',
    email: 'fajar.ramadhan@ecolearn.id',
    phone: '081234567897',
    gender: 'Laki-laki',
    kelas: 'X-3',
    status: 'Aktif',
    joinedAt: '2026-07-18',
    avatarColor: 'bg-violet-600',
    pretest: 45,
    posttest: 74,
    gain: 29,
    rataRataKuis: 75.0,
    quizBab: {
      1: 75, 2: 70, 3: 80, 4: 80, 5: 75,
      6: 70, 7: 75, 8: 75, 9: 80, 10: 70
    },
    xp: 1040,
    lencanaCount: 2,
    catatan: 'Peningkatan baik, lulus KKM dengan skor 74.'
  },
  {
    id: 'sis-008',
    nisn: '0081234508',
    name: 'Maya Putri',
    email: 'maya.putri@ecolearn.id',
    phone: '081234567898',
    gender: 'Perempuan',
    kelas: 'X-3',
    status: 'Aktif',
    joinedAt: '2026-07-18',
    avatarColor: 'bg-pink-600',
    pretest: 58,
    posttest: 86,
    gain: 28,
    rataRataKuis: 84.0,
    quizBab: {
      1: 85, 2: 80, 3: 85, 4: 90, 5: 80,
      6: 85, 7: 80, 8: 85, 9: 80, 10: 80
    },
    xp: 1390,
    lencanaCount: 3,
    catatan: 'Penguasaan materi koperasi dan badan usaha sangat baik.'
  }
];

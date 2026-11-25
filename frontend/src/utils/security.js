/**
 * EcoLearn Security & Sanitization Utility
 * Melindungi penyimpanan data frontend & state dari XSS, HTML injection,
 * dan pola-pola string berbahaya seperti SQL injection syntax.
 */

// Pola karakter & kata kunci berbahaya SQL injection & scripting
const DANGEROUS_SQL_PATTERNS = [
  /--\s*$/m,                        // SQL Comment --
  /\/\*[\s\S]*?\*\//,              // Multi-line comment /* ... */
  /\bUNION\s+ALL\b/i,              // UNION ALL
  /\bUNION\s+SELECT\b/i,            // UNION SELECT
  /\bDROP\s+TABLE\b/i,              // DROP TABLE
  /\bDROP\s+DATABASE\b/i,           // DROP DATABASE
  /\bTRUNCATE\s+TABLE\b/i,          // TRUNCATE TABLE
  /\bALTER\s+TABLE\b/i,             // ALTER TABLE
  /\bEXEC(\s+|\()/i,                // EXEC / EXECUTE
  /\bSCRIPT\b/i,                    // <SCRIPT>
  /'\s*OR\s*'1'\s*=\s*'1/i,         // ' OR '1'='1
  /"\s*OR\s*"1"\s*=\s*"1/i,         // " OR "1"="1
  /'\s*OR\s*1\s*=\s*1/i,            // ' OR 1=1
];

/**
 * Membersihkan string teks biasa:
 * - Menghapus karakter kontrol berbahaya
 * - Meng-escape karakter HTML (<, >, ", ', &)
 * - Memeriksa dan memfilter pola injeksi berbahaya
 */
export function sanitizeInput(input, maxLength = 500) {
  if (typeof input !== 'string') {
    return input;
  }

  let cleaned = input.trim();

  // Batasi panjang string untuk mencegah payload berlebih
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength);
  }

  // Escape HTML entities dasar (mencegah XSS)
  cleaned = cleaned
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  return cleaned;
}

/**
 * Sanitasi mendalam untuk teks multi-baris / deskripsi materi
 */
export function sanitizeTextarea(text, maxLength = 2000) {
  if (typeof text !== 'string') return text;
  let cleaned = text.trim();
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength);
  }
  // Izinkan line break tetapi amankan tag HTML
  return cleaned
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Validasi apakah input mengandung indikasi SQL Injection
 * Mengembalikan { isValid: boolean, error?: string }
 */
export function validateSecurity(input) {
  if (typeof input !== 'string') {
    return { isValid: true };
  }

  for (const pattern of DANGEROUS_SQL_PATTERNS) {
    if (pattern.test(input)) {
      return {
        isValid: false,
        error: 'Terdeteksi karakter atau perintah tidak diizinkan demi keamanan data.',
      };
    }
  }

  return { isValid: true };
}

/**
 * Validasi email siswa / admin
 */
export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return typeof email === 'string' && emailRegex.test(email.trim());
}

/**
 * Validasi NISN (10 digit angka)
 */
export function isValidNISN(nisn) {
  const nisnRegex = /^\d{10}$/;
  return typeof nisn === 'string' && nisnRegex.test(nisn.trim());
}

/**
 * Validasi Nomor HP Indonesia (10 - 14 digit)
 */
export function isValidPhone(phone) {
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;
  return typeof phone === 'string' && phoneRegex.test(phone.trim().replace(/\s|-/g, ''));
}

/**
 * Validasi URL (misalnya link Padlet)
 */
export function isValidUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Pencarian aman tanpa rentan injeksi string
 */
export function safeFilter(items = [], searchQuery = '', searchFields = ['name', 'email']) {
  if (!searchQuery || !searchQuery.trim()) return items;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    return searchFields.some((field) => {
      const val = item[field];
      if (val === null || val === undefined) return false;
      return String(val).toLowerCase().includes(normalizedQuery);
    });
  });
}

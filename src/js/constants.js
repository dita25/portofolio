/* ============================================================
   DITA Portfolio — constants.js
   Centralized configuration and constants for all pages
   ============================================================ */

// Storage Keys
const STORAGE_KEYS = {
  THEME: 'dita-theme',
  ADMIN_SESSION: 'dita-admin-session',
  CERTS: 'dita-certifications',
  LANGS: 'dita-langs',
  EXP: 'dita-experience',
  EDU: 'dita-education',
  PROJECTS: 'dita-projects',
  HERO: 'dita-hero',
  BIO: 'dita-bio',
  SKILLS: 'dita-skills',
  STATS: 'dita-stats'
};

// Modal IDs
const MODAL_IDS = {
  CERT: 'modal-cert',
  CERT_DETAIL: 'modal-cert-detail',
  LANGS: 'modal-languages',
  EXP: 'modal-exp',
  EDU: 'modal-edu',
  PROJ: 'modal-proj',
  PROJ_DETAIL: 'modal-detail',
  HERO: 'modal-hero',
  BIO: 'modal-bio',
  SKILLS: 'modal-skills',
  STATS: 'modal-stats'
};

// Element IDs
const ELEMENT_IDS = {
  CERT_LIST: 'cert-list',
  LANG_RENDER: 'lang-render',
  EXP_LIST: 'exp-list',
  EDU_LIST: 'edu-list',
  PROJ_LIST: 'proj-list',
  TOAST: 'toast',
  NAVBAR: 'navbar',
  ADMIN_BAR: 'admin-bar',
  BACK_TO_TOP: 'back-to-top'
};

// Admin Configuration
const ADMIN_CONFIG = {
  // Password encoded in base64 - decode: atob('Zm9vQmF6') 
  PASSWORD_ENCODED: 'ZGl0YTIwMjU=', // dita2025
  SESSION_KEY: STORAGE_KEYS.ADMIN_SESSION,
  TIMEOUT_MS: 3600000 // 1 hour
};

// Supabase Configuration (Cloud Database)
const SUPABASE_CONFIG = {
  URL: 'https://yfnqnoukvcnraugtkekj.supabase.co',
  KEY: 'sb_publishable_EIgGw1INPhP-npJoINoVwQ_ZR0cWi0X',
  TABLES: {
    CERTIFICATIONS: 'certifications',
    EXPERIENCE: 'experience',
    PROJECTS: 'projects'
  },
  ENABLED: true // Set to false to use localStorage only
};

// Image Configuration
const IMAGE_CONFIG = {
  MAX_SIZE_MB: 2,
  MAX_SIZE_BYTES: 2 * 1024 * 1024,
  MAX_DIMENSIONS: 400, // Max width/height in px
  COMPRESSION_QUALITY: 0.7,
  FALLBACK_FORMAT: 'image/jpeg'
};

// Validation Rules
const VALIDATION = {
  URL_PATTERN: /^https?:\/\/.+/i,
  DATE_PATTERN: /^[A-Za-z]+\s+\d{4}$/, // "July 2025"
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_PATTERN: /^\+?[\d\s\-()]{10,}$/
};

// Page Routes
const PAGES = {
  HOME: 'index.html',
  EXPERIENCE: 'experience.html',
  PROJECTS: 'projects.html',
  CERTIFICATIONS: 'certifications.html',
  CONTACT: 'contact.html'
};

// Asset Paths (use relative paths)
const ASSETS = {
  CV: './assets/cv-dita.pdf',
  PROFILE_IMG: './assets/profile.png'
};

// Error Messages
const ERROR_MESSAGES = {
  REQUIRED_FIELD: '⚠ Bidang ini wajib diisi.',
  INVALID_URL: '⚠ URL tidak valid.',
  INVALID_EMAIL: '⚠ Email tidak valid.',
  IMAGE_TOO_LARGE: `⚠ Gambar terlalu besar. Maksimal ${IMAGE_CONFIG.MAX_SIZE_MB}MB.`,
  STORAGE_QUOTA_EXCEEDED: '⚠ Penyimpanan penuh. Hapus beberapa item lama.',
  NETWORK_ERROR: '⚠ Terjadi kesalahan jaringan.',
  INVALID_PASSWORD: '✕ Password salah. Coba lagi.',
  FORM_INCOMPLETE: '⚠ Mohon lengkapi semua field yang diperlukan.'
};

// Success Messages
const SUCCESS_MESSAGES = {
  SAVED: '✓ Data berhasil disimpan!',
  UPDATED: '✓ Data berhasil diperbarui!',
  DELETED: '✓ Data berhasil dihapus.',
  ADMIN_LOGIN: '✓ Admin mode aktif! Kamu bisa edit & hapus sekarang.',
  ADMIN_LOGOUT: '✓ Admin mode dinonaktifkan.',
  COPIED: '✓ Tersalin ke clipboard!'
};

// Theme Configuration
const THEME_CONFIG = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
};

// Animation Timing (milliseconds)
const TIMING = {
  TOAST_DURATION: 2800,
  MODAL_DELAY: 50,
  PAGE_LOAD_DELAY: 300
};

// Accessibility
const A11Y = {
  SKIP_LINK_ID: 'skip-link',
  MAIN_CONTENT_ID: 'main-content',
  LIVE_REGION_ID: 'live-region'
};

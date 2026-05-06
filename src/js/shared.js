/* ============================================================
   DITA Portfolio — shared.js
   Theme · Nav · Toast · Modal · IntersectionObserver · Storage
   ============================================================ */
"use strict";

/* ── THEME ──────────────────────────────────────────────────── */
const THEME_KEY = 'dita-theme';
function applyTheme(t) {
  document.body.classList.toggle('dark', t === 'dark');
  localStorage.setItem(THEME_KEY, t);
}
(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const pref = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  applyTheme(saved || pref);
})();

/* ── NAV INIT (call after DOM ready) ────────────────────────── */
function initNav(activePage) {
  const navbar = document.getElementById('navbar');
  const tog = document.getElementById('theme-tog');
  const ham = document.getElementById('ham');
  const drawer = document.getElementById('mob-drawer');

  /* Scroll shadow */
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  /* Theme toggle */
  tog.addEventListener('click', () => {
    applyTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
  });

  /* Hamburger */
  ham.addEventListener('click', () => {
    const open = ham.classList.toggle('open');
    ham.setAttribute('aria-expanded', open);
    drawer.classList.toggle('open', open);
  });

  /* Close drawer on link click */
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      drawer.classList.remove('open');
    });
  });

  /* Mark active page */
  document.querySelectorAll('.nav-pages a, .mob-drawer a').forEach(a => {
    if (a.dataset.page === activePage) a.classList.add('active');
  });

  /* Page-in animation */
  const pw = document.querySelector('.page-wrap');
  if (pw) requestAnimationFrame(() => pw.classList.add('loaded'));
}

/* ── SCROLL ANIMATIONS ──────────────────────────────────────── */
function initFadeUp() {
  const els = document.querySelectorAll('.fu');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ── TOAST ──────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ── MODAL ──────────────────────────────────────────────────── */
function openModal(id) {
  const bd = document.getElementById(id);
  if (!bd) return;
  /* Force display flex even if it's an admin-only element */
  bd.style.display = 'flex';
  bd.classList.add('open');
  document.body.style.overflow = 'hidden';
  /* Focus first focusable element */
  setTimeout(() => {
    const first = bd.querySelector('input, button, textarea, select');
    if (first) first.focus();
  }, 50);
}
function closeModal(id) {
  const bd = document.getElementById(id);
  if (!bd) return;
  bd.classList.remove('open');
  /* If admin-only modal: hide it again after closing */
  setTimeout(() => {
    if (bd.classList.contains('admin-only') && !bd.classList.contains('open')) {
      bd.style.display = 'none';
    }
  }, 50);
  document.body.style.overflow = '';
}
/* Close on backdrop click */
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});
/* Close on Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.open').forEach(bd => {
      bd.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

/* ── LOCAL STORAGE HELPERS ──────────────────────────────────── */
const Store = {
  get(key, fallback = []) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
};

/* ── GENERATE ID ─────────────────────────────────────────────── */
function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

/* ══════════════════════════════════════════════════════════════
   ADMIN MODE SYSTEM
   ─────────────────────────────────────────────────────────────
   ✏️  GANTI password di bawah ini sebelum upload ke GitHub!
   Cara aktifkan: tekan Ctrl + Shift + A di halaman mana saja.
   Sesi admin aktif selama tab browser masih terbuka.
   ══════════════════════════════════════════════════════════════ */
const ADMIN_PASSWORD = 'dita2025';   /* ← GANTI INI */
const ADMIN_SESSION  = 'dita-admin-session';

/* Cek apakah sesi admin masih aktif (sessionStorage, hilang saat tab ditutup) */
function isAdmin() {
  return sessionStorage.getItem(ADMIN_SESSION) === 'true';
}

/* Aktifkan / nonaktifkan tampilan elemen admin di halaman */
function applyAdminUI() {
  const admin = isAdmin();
  document.querySelectorAll('.admin-only').forEach(el => {
    if (!admin) {
      el.style.display = 'none';
      return;
    }
    /* Modal backdrop: jangan tampilkan otomatis */
    if (el.classList.contains('modal-backdrop')) {
      el.style.display = 'none';
      return;
    }
    /* Gunakan data-saved-display jika ada (di-set di HTML), lalu fallback */
    const saved = el.dataset.savedDisplay;
    el.style.display = saved || 'block';
  });
  const bar = document.getElementById('admin-bar');
  if (bar) bar.style.display = admin ? 'flex' : 'none';
}

/* Tampilkan prompt login admin */
function promptAdminLogin() {
  if (isAdmin()) {
    /* Kalau sudah login, tanya apakah mau logout */
    if (confirm('Kamu sedang dalam Admin Mode.\n\nKlik OK untuk keluar dari Admin Mode.')) {
      sessionStorage.removeItem(ADMIN_SESSION);
      applyAdminUI();
      showToast('Admin mode dinonaktifkan.');
    }
    return;
  }

  /* Buat overlay login */
  const overlay = document.createElement('div');
  overlay.id = 'admin-login-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:500;
    display:flex;align-items:center;justify-content:center;padding:24px;
    animation:fadein .2s ease;
  `;
  overlay.innerHTML = `
    <div style="background:var(--bg,#fff);border:1px solid var(--bdr,#e4e4e1);border-radius:20px;
                padding:36px 32px;width:100%;max-width:380px;box-shadow:0 24px 64px rgba(0,0,0,.18);">
      <div style="text-align:center;margin-bottom:28px">
        <div style="width:48px;height:48px;background:var(--bg2,#f7f7f6);border:1px solid var(--bdr,#e4e4e1);
                    border-radius:14px;display:flex;align-items:center;justify-content:center;
                    font-size:1.3rem;margin:0 auto 14px">🔐</div>
        <h2 style="font-family:var(--display,'Playfair Display',serif);font-size:1.4rem;font-weight:700;margin-bottom:6px">Admin Mode</h2>
        <p style="font-size:.83rem;color:var(--muted,#6a6a68)">Masukkan password untuk mengaktifkan mode edit.</p>
      </div>
      <input type="password" id="admin-pw-input" placeholder="Password..."
        style="width:100%;background:var(--bg2,#f7f7f6);color:var(--txt,#0d0d0d);
               border:1.5px solid var(--bdr,#e4e4e1);border-radius:10px;padding:12px 16px;
               font-size:.9rem;font-family:inherit;outline:none;margin-bottom:10px;
               transition:border-color .2s" />
      <p id="admin-pw-err" style="font-size:.78rem;color:#b91c1c;margin-bottom:10px;display:none">
        ✕ Password salah. Coba lagi.
      </p>
      <button id="admin-pw-btn"
        style="width:100%;background:var(--txt,#0d0d0d);color:var(--bg,#fff);border:none;
               border-radius:10px;padding:13px;font-size:.88rem;font-weight:500;font-family:inherit;
               cursor:pointer;transition:opacity .2s">
        Masuk sebagai Admin
      </button>
      <button id="admin-pw-cancel"
        style="width:100%;background:none;border:1px solid var(--bdr,#e4e4e1);border-radius:10px;
               padding:11px;font-size:.85rem;color:var(--muted,#6a6a68);font-family:inherit;
               cursor:pointer;margin-top:10px;transition:background .2s">
        Batal
      </button>
      <p style="font-size:.72rem;color:var(--faint,#9a9a98);text-align:center;margin-top:18px;line-height:1.6">
        Shortcut: <code style="background:var(--bg2,#f5f5f5);padding:2px 6px;border-radius:4px">Ctrl + Shift + A</code><br>
        Hanya kamu yang tahu shortcut ini 🤫
      </p>
    </div>
  `;
  document.body.appendChild(overlay);

  const inp    = document.getElementById('admin-pw-input');
  const btn    = document.getElementById('admin-pw-btn');
  const cancel = document.getElementById('admin-pw-cancel');
  const err    = document.getElementById('admin-pw-err');

  inp.focus();

  function tryLogin() {
    if (inp.value === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION, 'true');
      overlay.remove();
      applyAdminUI();
      showToast('✓ Admin mode aktif! Kamu bisa edit & hapus sekarang.');
    } else {
      err.style.display = 'block';
      inp.style.borderColor = '#f87171';
      inp.value = '';
      inp.focus();
    }
  }

  btn.addEventListener('click', tryLogin);
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });
  cancel.addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
}

/* ── LOAD SUPABASE LIBRARY ──────────────────────────────────── */
async function loadSupabaseLibrary() {
  return new Promise((resolve) => {
    if (window.supabase) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.0/+esm';
    script.type = 'module';
    script.onload = () => resolve();
    script.onerror = () => {
      console.warn('Supabase library failed to load. Using localStorage only.');
      resolve();
    };
    document.head.appendChild(script);
  });
}

/* Keyboard shortcut: Ctrl + Shift + A */
document.addEventListener('keydown', e => {
  const key = (e.key || '').toLowerCase();
  if (e.ctrlKey && e.shiftKey && key === 'a') {
    e.preventDefault();
    promptAdminLogin();
  }
});

/* Jalankan saat DOM siap — sembunyikan semua .admin-only dari viewer */
document.addEventListener('DOMContentLoaded', async () => {
  applyAdminUI();
  initBackToTop();
  initLiveRegion();
  initLazyLoading();
  
  // Using localStorage only (Supabase replaced with Cloudinary)
  console.log('✓ Using localStorage for data persistence');
});

/* ── BACK TO TOP BUTTON ──────────────────────────────────────── */
function initBackToTop() {
  // Check if button exists, if not create it
  let backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.className = 'back-to-top-btn';
    backToTopBtn.innerHTML = '↑';
    document.body.appendChild(backToTopBtn);
  }
  
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('show', window.scrollY > 300);
  }, { passive: true });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── LIVE REGION FOR ACCESSIBILITY ───────────────────────────– */
function initLiveRegion() {
  let liveRegion = document.getElementById('live-region');
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    document.body.appendChild(liveRegion);
  }
}

/* ── LAZY LOADING FOR IMAGES ─────────────────────────────────– */
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

/* ── PASSWORD ENCODING HELPER ────────────────────────────────– */
function decodePassword(encoded) {
  try {
    return atob(encoded);
  } catch (e) {
    console.error('Failed to decode password');
    return '';
  }
}

# 🎯 QUICK REFERENCE - Cloudinary Setup

## 📋 Checklist Cepat (10 Menit)

- [ ] Daftar Cloudinary: https://cloudinary.com/users/register/free
- [ ] Login ke console: https://cloudinary.com/console
- [ ] Copy CLOUD_NAME dari Account Details
- [ ] Copy API Key dari Account Details
- [ ] Buat upload preset "portfolio_upload" (unsigned)
- [ ] Edit `src/js/constants.js`
- [ ] Update 3 nilai Cloudinary
- [ ] Save file
- [ ] Reload halaman F5
- [ ] Test upload gambar

## 🔧 3 Nilai yang Harus Diubah

File: `src/js/constants.js` (baris ~63-68)

| Placeholder | Dari Cloudinary | Contoh |
|---|---|---|
| `YOUR_CLOUD_NAME` | Account Details → Cloud Name | `dita-portfolio-12345` |
| `YOUR_API_KEY` | Account Details → API Key | `abc123xyz789` |
| `YOUR_UPLOAD_PRESET` | Upload preset yang dibuat | `portfolio_upload` |

## 💾 Template Kode

```javascript
const CLOUDINARY_CONFIG = {
  CLOUD_NAME: 'GANTI_DENGAN_CLOUD_NAME_ANDA',
  API_KEY: 'GANTI_DENGAN_API_KEY_ANDA',
  UPLOAD_PRESET: 'GANTI_DENGAN_PRESET_ANDA',
  FOLDER: 'portfolio',
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  AUTO_OPTIMIZE: true
};
```

## 🚀 Test Flow

```
1. Reload page (F5)
2. Admin Mode: Ctrl+Shift+A
3. "+ Add Certification"
4. Upload gambar JPG/PNG
5. Isi form lengkap
6. "Simpan"
7. Lihat gambar muncul di card ✓
8. Klik card → modal → gambar ada ✓
```

## 📁 File Upload Path

Gambar akan tersimpan di Cloudinary di:
```
portfolio/
├── certifications/
│   └── [gambar sertifikasi]
└── projects/
    └── [gambar proyek]
```

## 🆘 Troubleshoot 5 Detik

**Gambar tidak muncul?**
→ Update constants.js belum disimpan? Tekan Ctrl+S

**Error "Cloudinary belum dikonfigurasi"?**
→ CLOUD_NAME atau UPLOAD_PRESET masih placeholder

**Upload fail?**
→ File > 5MB? Gunakan file lebih kecil

**Masih error?**
→ Buka F12 Console, liat error message, report

## 📱 Browser Console Test

```javascript
// Cek konfigurasi
console.log(CLOUDINARY_CONFIG);

// Cek data tersimpan
JSON.parse(localStorage.getItem('dita-certifications'));

// Lihat semua debug
debugSave();
```

## 🔐 Security Notes

**Aman dibagikan:**
- CLOUD_NAME
- UPLOAD_PRESET

**Jangan dibagikan:**
- API Key
- API Secret

---

**DONE!** Setelah update constants.js, gambar siap diupload! 🚀

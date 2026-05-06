# ⚠️ PENTING: SETUP CLOUDINARY TERLEBIH DAHULU

## Status Saat Ini

- ✅ Sistem penyimpanan data: **localStorage** (bekerja)
- ✅ Sistem upload gambar: **Cloudinary** (dikonfigurasi)
- ❌ Gambar tidak muncul karena: **Cloudinary config masih PLACEHOLDER**

## 🚨 Masalah

Saat ini, Cloudinary di `src/js/constants.js` masih berisi nilai placeholder:
```javascript
CLOUD_NAME: 'YOUR_CLOUD_NAME'        // ❌ Belum diganti
UPLOAD_PRESET: 'YOUR_UPLOAD_PRESET'  // ❌ Belum diganti
```

Karena belum dikonfigurasi dengan benar, sistem akan menolak upload dan menampilkan error.

## ✅ Solusi - 3 Langkah Mudah

### LANGKAH 1: Buat Akun Cloudinary (5 menit)
```
1. Buka: https://cloudinary.com/users/register/free
2. Isi email dan password
3. Verifikasi email
4. Login ke dashboard
```

### LANGKAH 2: Ambil Credentials (2 menit)
```
1. Di dashboard Cloudinary, lihat "Account Details"
2. Copy: CLOUD_NAME (contoh: dita-portfolio-12345)
3. Copy: API Key (contoh: abc123xyz789)
4. Buat "Upload Preset" (unsigned):
   - Settings → Upload
   - Add upload preset
   - Name: portfolio_upload
   - Mode: Unsigned
   - Save
5. Copy nama preset: portfolio_upload
```

### LANGKAH 3: Update src/js/constants.js (1 menit)
```javascript
const CLOUDINARY_CONFIG = {
  CLOUD_NAME: 'dita-portfolio-12345',    // ← Ganti dengan nilai Anda
  API_KEY: 'abc123xyz789',               // ← Ganti dengan nilai Anda
  UPLOAD_PRESET: 'portfolio_upload',     // ← Ganti dengan nilai Anda
  FOLDER: 'portfolio',
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  AUTO_OPTIMIZE: true
};
```

## 🧪 Test Setelah Setup

Setelah update config, lakukan test ini:

```
1. Reload halaman (F5)
2. Buka certifications.html
3. Admin Mode: Ctrl+Shift+A
4. "+ Add Certification"
5. Upload gambar
6. Lihat preview muncul? ✓
7. Isi form (nama, organisasi, dll)
8. Klik "Simpan"
9. Gambar muncul di card? ✓
10. Klik card → modal detail
11. Gambar muncul di modal? ✓
```

## 🎯 Hasil yang Diharapkan Setelah Setup

1. **Upload gambar**
   - Toast: "🔄 Mengompresi..."
   - Toast: "📤 Upload ke Cloudinary..."
   - Toast: "✓ Gambar berhasil diupload ke Cloudinary!"

2. **Klik Simpan**
   - Data tersimpan ke localStorage
   - URL Cloudinary disimpan (bukan base64)
   - Toast: "✓ Sertifikasi ditambahkan!"

3. **Lihat di Halaman**
   - Gambar muncul di card
   - Klik card → modal terbuka
   - Gambar ditampilkan di modal detail

## 📝 File yang Perlu Diupdate

**HANYA satu file yang perlu diubah:**
```
src/js/constants.js
↓
Baris 63-68: CLOUDINARY_CONFIG
```

Ganti:
```
CLOUD_NAME: 'YOUR_CLOUD_NAME'
API_KEY: 'YOUR_API_KEY'
UPLOAD_PRESET: 'YOUR_UPLOAD_PRESET'
```

Dengan nilai Cloudinary Anda yang sebenarnya.

## ❓ FAQ

**Q: Apakah gratis?**
A: Ya! Cloudinary free tier memberikan 10GB storage gratis.

**Q: Berapa lama proses setup?**
A: Sekitar 10 menit total.

**Q: Apa kalau lupa catat cloud name?**
A: Bisa lihat lagi di https://cloudinary.com/console → Account Details

**Q: Bisa upload lebih dari satu gambar?**
A: Ya, untuk projects bisa upload multiple images.

---

## 🚀 NEXT STEP

1. **Sekarang**: Setup Cloudinary (ikuti 3 langkah di atas)
2. **Kemudian**: Update constants.js dengan credentials Anda
3. **Akhirnya**: Test upload gambar

Setelah selesai, gambar akan otomatis:
- ✅ Di-compress (lebih kecil)
- ✅ Di-upload ke Cloudinary (cloud storage)
- ✅ URL disimpan ke localStorage
- ✅ Muncul di card dan modal

---

**📞 Lihat docs/CLOUDINARY-SETUP.md untuk detail lengkap setup Cloudinary**

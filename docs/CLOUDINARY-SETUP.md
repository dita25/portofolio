# ⚙️ SETUP CLOUDINARY - PANDUAN LENGKAP

## 📋 Cara Mendapatkan Credentials Cloudinary

### Langkah 1: Buat Akun Cloudinary
1. Pergi ke https://cloudinary.com/users/register/free
2. Daftar dengan email Anda
3. Verifikasi email
4. Login ke dashboard

### Langkah 2: Ambil CLOUD_NAME
1. Di dashboard, lihat bagian "Account Details"
2. Catat **Cloud Name** (misalnya: `dita-portfolio`)
3. Ini value untuk `CLOUD_NAME`

### Langkah 3: Buat UPLOAD_PRESET
1. Di dashboard, klik **Settings** (gear icon)
2. Pilih tab **Upload**
3. Scroll ke bagian "Upload presets"
4. Klik **Add upload preset**
5. Isi:
   - **Name**: `portfolio_upload`
   - **Signing Mode**: `Unsigned`
   - **Folder**: `portfolio/certifications` atau `portfolio/projects`
   - Klik **Save**

Catat nama preset ini untuk `UPLOAD_PRESET`

### Langkah 4: Ambil API Key
1. Di Settings → Account
2. Catat **API Key**
3. Ini untuk `API_KEY`

## 🔧 Update Configuration

### File: `src/js/constants.js`

```javascript
const CLOUDINARY_CONFIG = {
  CLOUD_NAME: 'your-cloud-name',          // ← Ganti dengan cloud name Anda
  API_KEY: 'your-api-key',                // ← Ganti dengan API key Anda
  UPLOAD_PRESET: 'portfolio_upload',      // ← Ganti dengan preset name Anda
  FOLDER: 'portfolio',
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  AUTO_OPTIMIZE: true
};
```

## ✅ Test Konfigurasi

### Test 1: Lihat Config di Console
```javascript
F12 → Console
console.log(CLOUDINARY_CONFIG);
```

### Test 2: Upload Test Image
```
1. Buka certifications.html
2. Aktifkan Admin Mode (Ctrl+Shift+A)
3. Klik "+ Add Certification"
4. Upload gambar JPG/PNG
5. Lihat preview muncul
6. Klik "Simpan"
7. Lihat gambar di card
8. Klik card untuk modal - gambar harus muncul
```

---

**PENTING: Setup Cloudinary dulu sebelum upload gambar!**

  UPLOAD_PRESET: 'portfolio', // Preset yang dibuat di step 3
  FOLDER: 'portfolio'
};
```

---

## ✅ Testing Upload

1. **Deploy web Anda ke GitHub Pages** (lihat [QUICK-START.md](./QUICK-START.md))
2. **Buka website Anda** di browser
3. **Login sebagai Admin** (password: `dita2025`)
4. **Coba tambah sertifikat/project dengan gambar**
5. **Gambar akan otomatis:**
   - ✓ Dikompres
   - ✓ Diupload ke Cloudinary
   - ✓ Tersimpan URL-nya
   - ✓ Ditampilkan di portfolio

---

## 🎯 Flow Upload Otomatis

```
1. Admin Login ke Portfolio
   ↓
2. Klik "Tambah Sertifikat/Project"
   ↓
3. Pilih gambar dari komputer
   ↓
4. Sistem otomatis:
   a. Kompresi gambar
   b. Upload ke Cloudinary
   c. Simpan URL ke localStorage
   d. Refresh halaman
   ↓
5. Gambar muncul di portfolio! 🎉
```

---

## 🔒 Security Notes

- ✅ **Upload Preset harus "Unsigned"** - Memungkinkan upload dari browser tanpa API secret
- ✅ **API Key Anda aman** - Hanya untuk dokumentasi, tidak digunakan di frontend
- ✅ **Storage aman** - localStorage hanya di browser lokal Anda
- ✅ **Gambar di Cloudinary** - Permanent storage dengan CDN global

---

## 📁 File Structure

```
portfolio/
├── src/js/
│   ├── constants.js ← EDIT: Ganti CLOUDINARY_CONFIG
│   ├── cloudinary-client.js ← Upload handler + compression
│   ├── shared.js ← UI utilities
│   └── supabase-client.js ← (DEPRECATED)
├── docs/
│   ├── CLOUDINARY-SETUP.md ← (Anda di sini)
│   ├── QUICK-START.md
│   └── DEPLOYMENT.md
└── ...
```

---

## 🖼️ Image Compression Details

**Sebelum upload, gambar akan:**
- Dikompres ke format JPEG (quality: 70%)
- Diresize maks 400x400px (aspek ratio tetap)
- Otomatis di-optimize oleh Cloudinary (format auto, quality auto)

**Hasilnya:**
- Upload cepat 🚀
- Storage efisien 💾
- Loading halaman lebih cepat ⚡

---

## 🐛 Troubleshooting

### ❌ "Upload failed" / "401 Unauthorized"
**Penyebab:** Upload Preset salah atau belum dibuat
**Solusi:**
- Verifikasi `UPLOAD_PRESET` di constants.js
- Pastikan preset berstatus "Active"
- Cek di Cloudinary Settings → Upload

### ❌ "Gambar tidak muncul"
**Penyebab:** URL tidak tersimpan dengan benar
**Solusi:**
- Buka DevTools (F12) → Console
- Cari error message
- Lihat Network tab untuk request Cloudinary

### ❌ "Maximum upload size exceeded"
**Penyebab:** File terlalu besar (>5MB)
**Solusi:**
- Sistem sudah kompresi otomatis
- Pastikan file asli < 10MB
- Gunakan image editor untuk resize manual

### 🔄 Reset Data
Jika ingin reset semua data dan mulai fresh:
```javascript
// Jalankan di Console:
localStorage.clear();
location.reload();
```

---

## 📊 Monitoring Uploads

Pantau upload Anda di [Cloudinary Media Library](https://cloudinary.com/console/media_library):
- Lihat semua gambar yang ter-upload
- Check storage usage
- View upload statistics

---

## 💾 Backup Data

Ekspor data portfolio Anda sebagai backup:

1. Buka Console DevTools (F12)
2. Jalankan: `exportDataBackup()`
3. File JSON akan didownload otomatis

Untuk restore:
1. Buka Admin mode
2. Lihat button "Import Backup" (jika ada)
3. Pilih file JSON

---

## 🎓 Advanced: Custom Transformations

Cloudinary support transformasi URL untuk berbagai use case:

```javascript
// Contoh transformasi URL:
const baseUrl = 'https://res.cloudinary.com/your-cloud/image/upload/';

// Thumbnail (400x300):
`${baseUrl}c_fill,w_400,h_300,q_auto/portfolio/image.jpg`

// Full size optimized:
`${baseUrl}c_fit,w_1200,q_auto/portfolio/image.jpg`

// Mobile (600px):
`${baseUrl}c_fit,w_600,q_auto/portfolio/image.jpg`
```

---

## ✨ Tips & Best Practices

1. **Organize dengan folder** - Semua gambar disimpan di folder `portfolio`
2. **Use tags** - Tag gambar untuk organisasi lebih baik
3. **Monitor storage** - Gratis Cloudinary: 25 GB storage
4. **Set up webhooks** - (Advanced) Untuk notifikasi upload
5. **Use CDN** - Cloudinary auto-serve dari CDN terdekat

---

## 📞 Support

- Cloudinary Docs: https://cloudinary.com/documentation
- API Reference: https://cloudinary.com/documentation/image_upload_api_reference
- Community: https://support.cloudinary.com

---

**Selamat! Portfolio Anda sekarang terkoneksi ke Cloudinary! 🎉**

Next: Deploy ke GitHub Pages (lihat [QUICK-START.md](./QUICK-START.md))

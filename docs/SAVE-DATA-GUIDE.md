# 🔧 PANDUAN PENYIMPANAN DATA DAN DEBUGGING

## Perubahan Yang Dilakukan

### 1. **Penyimpanan Data (Cloudinary + localStorage)**
- **Gambar**: Di-upload otomatis ke Cloudinary saat user memilih file
- **Data Sertifikasi/Project**: Disimpan ke localStorage setelah user klik "Simpan"
- **Perubahan Code**:
  - Hapus semua referensi Supabase yang tidak perlu
  - Gunakan `_certImageUrl` dari Cloudinary upload
  - Gunakan `_projectImageUrls` array untuk multiple images

### 2. **Flow Penyimpanan Sertifikasi**
```
1. User klik "+ Add Certification"
   ↓
2. User upload gambar → handleCertImg() → Cloudinary upload
   ↓
3. Preview muncul, URL disimpan di _certImageUrl
   ↓
4. User isi form (nama, organisasi, dll)
   ↓
5. User klik "Simpan"
   ↓
6. saveCert() dipanggil:
   - Baca form data + _certImageUrl
   - Simpan ke localStorage
   - Re-render halaman dengan data baru
   - Tampilkan toast "✓ Sertifikasi ditambahkan!"
   ↓
7. Modal tutup otomatis
   ↓
8. Data muncul di list dengan pagination (halaman 1)
```

### 3. **Flow Penyimpanan Project**
```
1. User klik "+ Add Project"
   ↓
2. User upload 1+ gambar → handleImgUpload() → Cloudinary upload
   ↓
3. Thumbnails muncul, URLs disimpan di _projectImageUrls array
   ↓
4. User isi form (judul, kategori, dll)
   ↓
5. User klik "Simpan Project"
   ↓
6. saveProj() dipanggil:
   - Baca form data + _projectImageUrls
   - Simpan ke localStorage
   - Reset filter ke "All" jika needed
   - Re-render halaman dengan data baru
   - Tampilkan toast "✓ Project ditambahkan!"
   ↓
7. Modal tutup otomatis
   ↓
8. Data muncul di list dengan kategori yang sesuai
```

## ✅ Cara Verify Data Tersimpan

### Opsi 1: Buka Console (Recommended)
```
1. Buka certifications.html atau projects.html
2. Tekan F12 → buka tab "Console"
3. Ketik: debugSave()
4. Lihat laporan lengkap tentang:
   - Image URLs di memory
   - Form field values
   - Data di localStorage
   - Rendered items di halaman
```

### Opsi 2: Cek Storage Langsung
```
1. Tekan F12 → buka tab "Application" atau "Storage"
2. Klik "Local Storage" → pilih domain
3. Lihat key: "dita-certifications" dan "dita-projects"
4. Data akan ditampilkan sebagai JSON
```

### Opsi 3: Test Manual
```
1. Di console, jalankan: testCertSave()
   atau: testProjSave()
2. Jalankan: location.reload()
3. Test data akan muncul di atas list
```

## 🐛 Debugging Commands

### Lihat Semua Data
```javascript
checkStorage()
```
Menampilkan tabel lengkap semua sertifikasi dan projects yang tersimpan.

### Debug Save Flow
```javascript
debugSave()
```
Menampilkan laporan lengkap tentang state saat ini.

### Export Data Backup
```javascript
exportData()
```
Download semua data sebagai file JSON.

### Import Data dari Backup
```javascript
importData('{"certifications":[...], "projects":[...]}')
```

### Test Manual
```javascript
testCertSave()  // Tambah test certification
testProjSave()  // Tambah test project
```

## 🔍 Troubleshooting

### Data Tidak Muncul Setelah Klik Simpan
1. Buka Console (F12)
2. Klik "Simpan"
3. Cari log: `[CERT SAVED]` atau `[PROJ SAVED]`
4. Jika ada, berarti data berhasil tersimpan
5. Jalankan `debugSave()` untuk melihat status keseluruhan

### Gambar Tidak Upload ke Cloudinary
1. Pastikan Cloudinary API Key sudah benar di `src/js/constants.js`
2. Buka Console dan lihat error messages
3. Coba dengan file gambar yang lebih kecil (<2MB)

### Data Hilang Setelah Refresh
1. Jalankan `checkStorage()` di console
2. Jika kosong, ada masalah dengan localStorage
3. Coba `localStorage.clear()` dan reload

## 📊 Format Data

### Certification Data
```json
{
  "id": "abc123xyz",
  "name": "Certification Name",
  "org": "Organization Name",
  "date": "April 2026",
  "cid": "Credential ID",
  "desc": "Description",
  "link": "https://...",
  "img": "https://res.cloudinary.com/..."
}
```

### Project Data
```json
{
  "id": "def456uvw",
  "title": "Project Title",
  "year": "2026",
  "category": "Data Analysis",
  "tags": ["python", "tableau"],
  "desc": "Description",
  "result": "Achievement",
  "imgs": [
    {
      "url": "https://res.cloudinary.com/...",
      "cloudinaryId": "folder/abc123",
      "width": 400,
      "height": 300
    }
  ],
  "links": [
    {
      "type": "GitHub",
      "label": "Repository",
      "url": "https://github.com/..."
    }
  ]
}
```

## 🚀 Next Steps

1. **Test penyimpanan pertama kali**
   - Buka certifications.html
   - Aktifkan Admin Mode (Ctrl+Shift+A)
   - Tambah sertifikasi baru
   - Cek apakah muncul di list

2. **Jika ada error**
   - Catat error message di console
   - Jalankan `debugSave()` untuk diagnosis
   - Periksa format data

3. **Untuk Cloudinary issues**
   - Pastikan API Key di constants.js
   - Cek console untuk upload status
   - Monitor ukuran file

---

**Last Updated**: April 29, 2026

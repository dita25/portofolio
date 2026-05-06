# 🖼️ DEBUGGING GAMBAR YANG TIDAK MUNCUL

## Masalah
Data sertifikasi/project muncul, tapi gambar tidak muncul di pop-up yang disimpan.

## 🔍 Diagnosis Cepat

### Langkah 1: Buka Console
```
Tekan F12 → Tab "Console"
```

### Langkah 2: Jalankan Debug Command
```javascript
debugSave()
```

Perhatikan bagian "1. GLOBAL IMAGE STATE" dan "3. STORED DATA WITH IMAGES"

### Langkah 3: Lihat Gambar Tersimpan
```javascript
viewCertImages()
```

Ini akan menampilkan semua gambar yang tersimpan beserta formatnya (BASE64 atau Cloudinary URL)

### Langkah 4: Test Gambar Manual
```javascript
certs = JSON.parse(localStorage.getItem('dita-certifications'));
console.log(certs[0].img); // Lihat URL gambar pertama
```

## 🐛 Kemungkinan Penyebab & Solusi

### Penyebab 1: Upload Gambar Gagal
**Tanda**: `_certImageUrl` kosong dalam console
**Solusi**:
1. Buka F12 → Tab Network
2. Upload gambar lagi
3. Lihat apakah ada request yang gagal
4. Cloudinary mungkin belum dikonfigurasi

### Penyebab 2: Gambar Tidak Disimpan ke Data
**Tanda**: Data muncul tapi `certs[0].img` kosong dalam console
**Solusi**:
```javascript
// Cek apakah _certImageUrl ada saat save
// Lihat console log: "💾 Saving certification"
// Seharusnya ada "Image URL" yang bukan empty
```

### Penyebab 3: Gambar Tidak Ditampilkan di Modal
**Tanda**: Data dan gambar tersimpan, tapi tidak muncul saat klik card
**Solusi**:
1. Klik card certification
2. Di console akan ada log: "📖 Opening cert detail"
3. Cek apakah "hasImage" true atau false
4. Jika ada tapi tidak ditampilkan, mungkin CSS issue

## ✅ Testing Flow Lengkap

### Test 1: Upload Gambar Berhasil
```
1. Buka certifications.html
2. Aktifkan Admin Mode (Ctrl+Shift+A)
3. Klik "+ Add Certification"
4. Upload gambar JPG/PNG (< 2MB)
5. Tunggu preview muncul
6. Buka console → lihat log "✓ Image compressed" atau "💾 Menyimpan gambar lokal"
```

### Test 2: Data + Gambar Tersimpan
```
1. Isi form (Nama, Organisasi, dll)
2. Klik "Simpan"
3. Buka console → cari "💾 Saving certification"
4. Lihat bagian "imageUrl" di log
5. Jalankan: debugSave()
6. Di "3. STORED DATA" cek "imageLength" > 0
```

### Test 3: Gambar Ditampilkan di Modal
```
1. Lihat daftar sertifikasi di halaman
2. Klik pada sertifikasi yang baru ditambahkan
3. Modal terbuka
4. Buka console → cari "📖 Opening cert detail"
5. Perhatikan "hasImage: true" dan "imgLength"
6. Gambar seharusnya muncul di modal
```

## 🔧 Cara Fix Jika Gambar Tidak Muncul

### Opsi A: Reset & Test Ulang
```javascript
// 1. Bersihkan data lama
localStorage.removeItem('dita-certifications');

// 2. Reload halaman
location.reload();

// 3. Test upload gambar baru
```

### Opsi B: Test Gambar Manual
```javascript
// Untuk lihat apakah gambar bisa ditampilkan
const certs = JSON.parse(localStorage.getItem('dita-certifications'));
if (certs[0].img) {
  // Buka di tab baru
  window.open(certs[0].img);
}
```

### Opsi C: Periksa Cloudinary Config
Di `src/js/constants.js`:
```javascript
// Ini harus diisi, bukan placeholder
CLOUD_NAME: 'YOUR_CLOUD_NAME'      // → ubah ke cloud name Anda
UPLOAD_PRESET: 'YOUR_UPLOAD_PRESET' // → ubah ke preset Anda
```

Jika masih placeholder, gambar akan disimpan sebagai BASE64 lokal (fallback).

## 📊 Console Log Reference

Saat save, anda akan lihat log seperti ini:

```
💾 Saving certification: {
  name: "Test Cert",
  org: "Test Org",
  imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  imageSource: "from upload",
  editId: "ADD"
}

[CERT ADD] ID: abc123xyz, Name: Test Cert, Image: yes (data:image/jpeg;base64...)
[CERT SAVED] Total certifications: 1
[STORED DATA] {...}
```

Jika log menunjukkan `imageUrl: (empty)`, berarti upload gagal dan tidak ada fallback.

## 🚀 Solusi Lengkap

Jika masih bermasalah, lakukan langkah-langkah ini:

1. **Bersihkan cache**
   ```javascript
   localStorage.clear();
   location.reload();
   ```

2. **Test dengan gambar placeholder**
   ```javascript
   testCertSave(); // Tambah test cert dengan placeholder image
   location.reload();
   ```

3. **Periksa browser compatibility**
   - Gunakan browser terbaru (Chrome, Firefox, Safari)
   - Pastikan localStorage enabled

4. **Periksa file gambar**
   - Format: JPG, PNG, WEBP
   - Ukuran: < 5MB
   - Resolusi: minimum 100x100px

## 📝 Command Quick Reference

| Command | Fungsi |
|---------|--------|
| `debugSave()` | Lihat status image & data |
| `viewCertImages()` | Lihat semua gambar sertifikasi |
| `testCertSave()` | Tambah test cert dengan placeholder |
| `checkStorage()` | Lihat semua data tersimpan |
| `exportData()` | Export ke JSON |

## 🎯 Checklist Troubleshooting

- [ ] Gambar sudah di-upload (preview muncul)
- [ ] Console log menunjukkan "✓ Image" atau "💾 Gambar"
- [ ] Klik "Simpan" dan lihat "✓ Sertifikasi ditambahkan"
- [ ] Jalankan `debugSave()` → ada image di "3. STORED DATA"
- [ ] Klik card → modal terbuka dengan gambar

---

**Last Updated**: April 29, 2026

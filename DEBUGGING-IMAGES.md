# 🔍 DEBUGGING - Gambar Tidak Muncul

## 🚀 Step 1: Run Diagnostic (2 menit)

Buka certifications.html, tekan F12 (Console), lalu jalankan:

```javascript
runDiagnostic()
```

Ini akan menampilkan:
- ✅ Config Cloudinary
- ✅ Data di localStorage
- ✅ Global upload state
- ✅ Koneksi ke Cloudinary

**Screenshot yang perlu dicek:**
```
📋 1. CLOUDINARY CONFIG
CLOUD_NAME: dbggpqfnc          ← Seharusnya ada value
API_KEY: 196345215376837       ← Seharusnya ada value
UPLOAD_PRESET: dita_portofolio ← Seharusnya ada value
✓ Config Valid: ✅ YES
```

## 🧪 Step 2: Test Upload Simulation (5 menit)

1. Di console, jalankan:
```javascript
testUploadSimulation()
```

2. Di halaman, klik "+ Add Certification"

3. Klik "Upload gambar sertifikat"

4. Pilih file JPG/PNG

5. **Amati console:**
   - Seharusnya muncul log: `🔄 Mengompresi...`
   - Kemudian: `📤 Upload ke Cloudinary...`
   - Kemudian: `✓ Image uploaded to Cloudinary: https://...`

6. Di form, **lihat preview gambar**:
   - ✅ Gambar muncul = upload berhasil
   - ❌ Kosong = error pada upload

## 📊 Step 3: Check After Save (2 menit)

1. Isi form:
   - Certification Name: Test
   - Issuing Organisation: Test Org
   - Date: May 2026

2. Klik "Simpan"

3. Di console, jalankan:
```javascript
checkAfterSave()
```

**Hasil yang diharapkan:**
```
✓ First certification in localStorage:
Name: Test
Org: Test Org
Has Image: ✅
Image Type: Cloudinary ✅
Image URL: https://res.cloudinary.com/...
✅ Image URL is accessible
```

## 🔍 Step 4: Check HTML Rendering (2 menit)

Di console, jalankan:
```javascript
viewRenderedHTML()
```

**Hasil yang diharapkan:**
```
✅ Found <img> element in card
  - src: https://res.cloudinary.com/...
```

**Hasil jika gagal:**
```
⚠ Showing emoji placeholder (image not set)
```

Ini berarti data tidak tersimpan dengan benar.

## 🎯 Interpretasi Hasil

### Skenario 1: Semua ✅
- Config OK
- Upload OK
- Data tersimpan OK
- Gambar muncul di card
- Gambar muncul di modal

**Solusi**: Sudah berhasil! 🎉

### Skenario 2: Config ❌
```
CLOUD_NAME: YOUR_CLOUD_NAME
✓ Config Valid: ❌ NO
```

**Masalah**: Config belum diupdate
**Solusi**: Edit `src/js/constants.js` baris ~63-68, ganti nilai Cloudinary Anda

### Skenario 3: Upload ❌
Console menunjukkan error saat upload:
```
❌ Upload error: Cannot reach Cloudinary
```

**Masalah**: Koneksi internet atau UPLOAD_PRESET salah
**Solusi**:
1. Cek internet connection
2. Verifikasi UPLOAD_PRESET di Cloudinary dashboard
3. Edit constants.js, ganti UPLOAD_PRESET yang benar

### Skenario 4: Upload ✅ tapi gambar tidak tersimpan
```
✓ Image uploaded to Cloudinary: https://...
✓ First certification in localStorage:
Has Image: ❌
```

**Masalah**: URL tidak disimpan ke localStorage
**Solusi**: Ada bug di code, hubungi developer

### Skenario 5: Data tersimpan tapi gambar tidak muncul
```
Has Image: ✅
Image URL: https://res.cloudinary.com/...
✅ Image URL is accessible
❌ Found <img> element in card (false)
```

**Masalah**: Render function tidak bekerja
**Solusi**: Hard refresh (Ctrl+Shift+R) atau clear cache browser

## 🔧 Troubleshooting Umum

### Q: "Cloudinary belum dikonfigurasi" saat upload
**A**: 
```javascript
// Cek di console
console.log(CLOUDINARY_CONFIG.CLOUD_NAME)
console.log(CLOUDINARY_CONFIG.UPLOAD_PRESET)
// Jika masih YOUR_CLOUD_NAME atau YOUR_UPLOAD_PRESET → belum diupdate
```

### Q: "Upload failed" tapi tidak ada error detail
**A**: 
```javascript
// Buka F12 → Network tab
// Upload image
// Cari request ke "api.cloudinary.com"
// Lihat response status code
// 401 = Auth error
// 404 = Cloud name salah
// 422 = Upload preset salah
```

### Q: Gambar muncul di preview form tapi tidak di card
**A**:
```
1. Refresh halaman (F5)
2. Klik card → modal
3. Buka Inspector (F12)
4. Cari <img> element
5. Klik kanan → "Open in new tab"
6. Lihat error dari Cloudinary
```

### Q: Gambar error 404 dari Cloudinary
**A**: File sudah di-delete dari Cloudinary

**Solusi**:
1. Upload ulang gambar
2. Jangan di-delete dari Cloudinary sebelum project selesai

## 📱 Commands Cepat

```javascript
// 1. Full diagnostic
runDiagnostic()

// 2. Lihat semua yang tersimpan
JSON.parse(localStorage.getItem('dita-certifications'))

// 3. Lihat image URL global
console.log(_certImageUrl)

// 4. Cek bisa akses URL?
fetch(_certImageUrl).then(r => console.log('Status:', r.status))

// 5. Clear semua data
localStorage.removeItem('dita-certifications')

// 6. Test connection
testCloudinaryConnection()
```

## 📋 Debugging Checklist

Jika gambar tidak muncul:

- [ ] Run `runDiagnostic()`
- [ ] Check CLOUD_NAME valid?
- [ ] Check UPLOAD_PRESET valid?
- [ ] Upload image → lihat preview?
- [ ] Run `checkAfterSave()`
- [ ] Check data di localStorage?
- [ ] Check image URL starts with https://res.cloudinary.com?
- [ ] Run `viewRenderedHTML()`
- [ ] Check <img> element ada?
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Check browser console for errors

## 🚨 Jika Masih Error

Kumpulkan info berikut dan report:

1. **Hasil `runDiagnostic()`** → copy paste ke sini
2. **Hasil `checkAfterSave()`** → copy paste ke sini  
3. **Error di console?** → screenshot atau copy paste
4. **Browser version** → Chrome/Firefox/Safari?
5. **File size** → berapa MB file yang diupload?

Dengan info ini bisa langsung di-debug dan di-fix.

---

**Mulai dengan Step 1 sekarang: jalankan `runDiagnostic()` di console!**

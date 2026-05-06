# 📸 STEP-BY-STEP SETUP CLOUDINARY DENGAN SCREENSHOT

## LANGKAH 1: Buka Cloudinary

**URL**: https://cloudinary.com/users/register/free

1. Klik "Sign Up For Free"
2. Isi email dan password
3. Pilih "For Web & Mobile"
4. Verifikasi email

## LANGKAH 2: Masuk ke Dashboard

**URL**: https://cloudinary.com/console

Di halaman dashboard:
```
┌─────────────────────────────────────────┐
│ Account Details                         │
├─────────────────────────────────────────┤
│ Cloud Name: dita-portfolio-12345        │ ← COPY INI
│ API Key: abc123xyz789                   │ ← COPY INI
│ API Secret: xyz789abc123                │ (jangan dibagikan)
└─────────────────────────────────────────┘
```

## LANGKAH 3: Buat Upload Preset

Klik: **Settings** (⚙️ icon) → **Upload**

Scroll ke "Upload presets" → Klik "Add upload preset"

```
┌──────────────────────────────────────────────┐
│ Create Upload Preset                         │
├──────────────────────────────────────────────┤
│ Name: portfolio_upload                       │
│ Signing Mode: Unsigned                       │
│ Folder: portfolio                            │
│ Auto optimize: ON                            │
│ [SAVE]                                       │
└──────────────────────────────────────────────┘
```

## LANGKAH 4: Update File

Edit file: `src/js/constants.js`

Cari section Cloudinary Config (sekitar baris 63):

**SEBELUM:**
```javascript
const CLOUDINARY_CONFIG = {
  CLOUD_NAME: 'YOUR_CLOUD_NAME',
  API_KEY: 'YOUR_API_KEY',
  UPLOAD_PRESET: 'YOUR_UPLOAD_PRESET',
  FOLDER: 'portfolio',
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  AUTO_OPTIMIZE: true
};
```

**SESUDAH (dengan nilai Anda):**
```javascript
const CLOUDINARY_CONFIG = {
  CLOUD_NAME: 'dita-portfolio-12345',  // ← Dari step 2
  API_KEY: 'abc123xyz789',              // ← Dari step 2
  UPLOAD_PRESET: 'portfolio_upload',    // ← Dari step 3
  FOLDER: 'portfolio',
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  AUTO_OPTIMIZE: true
};
```

**SIMPAN FILE** (Ctrl+S)

## LANGKAH 5: Test Upload Gambar

1. **Buka** certifications.html di browser

2. **Reload** halaman (F5)

3. **Aktifkan Admin Mode**:
   - Klik tombol ☀/☾
   - Tekan `Ctrl+Shift+A`
   - Masukkan password (default: `dita2025`)

4. **Klik "+ Add Certification"**

5. **Upload gambar**:
   - Klik area upload ("Klik upload gambar sertifikat")
   - Pilih file JPG/PNG dari komputer
   - Tunggu 3-5 detik sampai preview muncul

6. **Isi form**:
   ```
   Certification Name: Test Certificate 2026
   Issuing Organisation: Test Organization
   Date Issued: May 2026
   Description: Testing image upload to Cloudinary
   ```

7. **Klik "Simpan"**

8. **Verifikasi**:
   - ✅ Modal tutup otomatis
   - ✅ Toast muncul: "✓ Sertifikasi ditambahkan!"
   - ✅ Gambar muncul di card
   - ✅ Klik card → modal detail → gambar ada

## 🔍 Debugging Jika Gagal

### Error: "Cloudinary belum dikonfigurasi"
**Solusi**: Pastikan CLOUD_NAME dan UPLOAD_PRESET bukan placeholder

```javascript
// Di F12 Console, cek:
console.log(CLOUDINARY_CONFIG.CLOUD_NAME);
// Seharusnya: dita-portfolio-12345 (bukan YOUR_CLOUD_NAME)
```

### Error: "Upload failed" saat upload gambar
**Kemungkinan**:
1. UPLOAD_PRESET salah → Buat ulang preset
2. CLOUD_NAME salah → Copy lagi dari dashboard
3. File terlalu besar → Gunakan file < 5MB

### Gambar tidak muncul setelah "Simpan"
**Solusi**:
```
1. Buka F12 → Console
2. Klik gambar di card
3. Klik modal detail
4. Lihat console untuk error message
5. Report error di sini
```

## 📞 Verifikasi di Dashboard Cloudinary

Setelah berhasil upload:

1. Buka: https://cloudinary.com/console
2. Klik: **Media Library**
3. Cari folder: **portfolio**
4. Gambar yang diupload seharusnya ada di sana

```
Media Library
├── portfolio
│   ├── certifications
│   │   └── [gambar yang diupload] ✓
│   └── projects
│       └── [project images]
```

## ✅ Checklist Selesai

- [ ] Buat akun Cloudinary
- [ ] Copy CLOUD_NAME
- [ ] Copy API_KEY
- [ ] Buat Upload Preset
- [ ] Copy UPLOAD_PRESET name
- [ ] Update constants.js
- [ ] Reload halaman
- [ ] Test upload gambar
- [ ] Gambar muncul di card
- [ ] Gambar muncul di modal detail
- [ ] Verify di Media Library Cloudinary

---

**Setelah semua selesai, gambar akan otomatis tersimpan di Cloudinary dan muncul di portfolio Anda! 🎉**

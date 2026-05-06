# ⚡ QUICK REFERENCE - Image Debug

## 🚀 Mulai Debug (30 detik)

**Di browser certifications.html:**
1. Tekan F12 (buka console)
2. Paste command ini:
```javascript
runDiagnostic()
```

**Result = OK?** Gambar siap work.
**Result = ERROR?** Lihat tabel di bawah.

---

## 📊 Result Interpreter

| Config Status | Upload Status | Image Appears | Solusi |
|---|---|---|---|
| ✅ VALID | ✅ SUCCESS | ✅ YES | ✅ SUDAH JADI |
| ✅ VALID | ✅ SUCCESS | ❌ NO | Hard refresh (Ctrl+Shift+R) |
| ✅ VALID | ❌ FAIL | - | Cek internet, cek PRESET |
| ❌ INVALID | - | - | Update constants.js |

---

## 🧠 Debug Path

```
runDiagnostic()
    ↓
Config valid?
├─ ❌ NO  → Update constants.js dengan Cloudinary credentials
├─ ✅ YES → Continue
    ↓
Upload gambar test
├─ ❌ FAIL → Cek console error
├─ ✅ SUCCESS → Continue
    ↓
checkAfterSave()
    ↓
Data ada?
├─ ❌ NO  → Bug di code
├─ ✅ YES → Continue
    ↓
viewRenderedHTML()
    ↓
<img> element ada?
├─ ❌ NO  → Hard refresh atau clear cache
├─ ✅ YES → BERHASIL! ✅
```

---

## 🎯 Common Issues & Fixes

### Issue: "Cloudinary belum dikonfigurasi"
**Fix:**
```
1. Buka: src/js/constants.js
2. Cari: CLOUDINARY_CONFIG (baris ~63)
3. Update 3 nilai:
   - CLOUD_NAME: 'dbggpqfnc'
   - API_KEY: '196345215376837'
   - UPLOAD_PRESET: 'dita_portofolio'
4. Save: Ctrl+S
5. Reload page: F5
```

### Issue: "Upload failed"
**Check:**
```javascript
// Di console
console.log('PRESET:', CLOUDINARY_CONFIG.UPLOAD_PRESET)
// Harus match dengan preset di Cloudinary dashboard
```

### Issue: Gambar tidak muncul setelah save
**Try:**
```
1. Hard refresh: Ctrl+Shift+R
2. Or: Ctrl+Shift+Delete (clear cache)
3. Reload: F5
```

---

## 📱 Commands Reference

| Command | Function |
|---------|----------|
| `runDiagnostic()` | Full diagnostic |
| `testUploadSimulation()` | Test upload flow |
| `checkAfterSave()` | Check after saving |
| `viewRenderedHTML()` | Check HTML elements |
| `showQuickChecks()` | Show all commands |

---

## 🔗 File Locations

| File | Purpose | Update? |
|------|---------|---------|
| `src/js/constants.js` | Config | ✏️ Yes - update CLOUDINARY_CONFIG |
| `src/js/cloudinary-client.js` | Upload logic | ✓ Don't touch |
| `src/js/image-upload-handler.js` | Form handler | ✓ Don't touch |
| `certifications.html` | Page | ✓ Don't touch |

---

## 📞 Need Help?

Jika masih error, kumpulkan:

1. Output dari `runDiagnostic()` (copy/paste)
2. Browser console error (screenshot)
3. Network tab → Cloudinary request status
4. File name & size yang diupload

---

**👉 Next Step: Jalankan `runDiagnostic()` di console sekarang!**

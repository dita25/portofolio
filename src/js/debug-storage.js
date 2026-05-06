/* ══════════════════════════════════════════════════════════
   DEBUG: Check & Display Stored Data
   Buka console (F12) dan jalankan: checkStorage()
════════════════════════════════════════════════════════════ */

function checkStorage() {
  console.clear();
  console.log('%c📊 DATA TERSIMPAN DI BROWSER', 'font-size: 16px; font-weight: bold; color: #2563eb');
  
  const certData = localStorage.getItem('dita-certifications');
  const projData = localStorage.getItem('dita-projects');
  const langsData = localStorage.getItem('dita-langs');
  
  console.log('\n%c🏅 CERTIFICATIONS', 'font-size: 14px; font-weight: bold; color: #059669');
  if (certData) {
    const certs = JSON.parse(certData);
    console.log(`Total: ${certs.length} sertifikasi`);
    console.table(certs.map((c, i) => ({
      '#': i + 1,
      'ID': c.id,
      'Nama': c.name,
      'Organisasi': c.org,
      'Tanggal': c.date
    })));
    console.log('Detail lengkap:', certs);
  } else {
    console.log('%cTidak ada data sertifikasi tersimpan', 'color: #ea580c');
  }
  
  console.log('\n%c📦 PROJECTS', 'font-size: 14px; font-weight: bold; color: #0891b2');
  if (projData) {
    const projs = JSON.parse(projData);
    console.log(`Total: ${projs.length} project`);
    console.table(projs.map((p, i) => ({
      '#': i + 1,
      'ID': p.id,
      'Judul': p.title,
      'Kategori': p.category,
      'Tahun': p.year
    })));
    console.log('Detail lengkap:', projs);
  } else {
    console.log('%cTidak ada data project tersimpan', 'color: #ea580c');
  }
  
  console.log('\n%c🌐 LANGUAGES', 'font-size: 14px; font-weight: bold; color: #7c3aed');
  if (langsData) {
    const langs = JSON.parse(langsData);
    console.log('Languages:', langs);
  } else {
    console.log('%cTidak ada data languages tersimpan', 'color: #ea580c');
  }
  
  console.log('\n%c✅ Cara menampilkan data:', 'font-size: 12px; font-weight: bold; color: #16a34a');
  console.log('1. Buka certifications.html atau projects.html');
  console.log('2. Aktifkan Admin Mode (Ctrl+Shift+A)');
  console.log('3. Data akan ter-render otomatis di halaman');
  console.log('4. Klik pada card untuk membuka modal detail');
  console.log('\n📝 Debug Commands:');
  console.log('- clearCertStorage() : Hapus semua data sertifikasi');
  console.log('- clearProjStorage() : Hapus semua data project');
  console.log('- exportData() : Export semua data ke JSON');
}

function clearCertStorage() {
  if (confirm('Yakin hapus semua data certifications?')) {
    localStorage.removeItem('dita-certifications');
    console.log('✓ Data certifications dihapus');
  }
}

function clearProjStorage() {
  if (confirm('Yakin hapus semua data projects?')) {
    localStorage.removeItem('dita-projects');
    console.log('✓ Data projects dihapus');
  }
}

function exportData() {
  const data = {
    certifications: JSON.parse(localStorage.getItem('dita-certifications') || '[]'),
    projects: JSON.parse(localStorage.getItem('dita-projects') || '[]'),
    languages: JSON.parse(localStorage.getItem('dita-langs') || '[]'),
    exportDate: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `portfolio-data-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  console.log('✓ Data exported sebagai JSON');
}

function importData(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (data.certifications) localStorage.setItem('dita-certifications', JSON.stringify(data.certifications));
    if (data.projects) localStorage.setItem('dita-projects', JSON.stringify(data.projects));
    if (data.languages) localStorage.setItem('dita-langs', JSON.stringify(data.languages));
    console.log('✓ Data imported berhasil');
    location.reload();
  } catch (e) {
    console.error('❌ Error import data:', e.message);
  }
}

/* Auto-run on console open */
console.log('%c🔍 Portfolio Data Debug Mode Active', 'font-size: 12px; color: #666');
console.log('Jalankan checkStorage() untuk melihat semua data tersimpan');

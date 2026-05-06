/* ══════════════════════════════════════════════════════════
   UPLOAD & SAVE DEBUGGING
   Jalankan di console: debugSave()
════════════════════════════════════════════════════════════ */

function debugSave() {
  console.clear();
  console.log('%c🔍 DEBUG: CERTIFICATION & PROJECT SAVE FLOW', 'font-size: 16px; font-weight: bold; color: #2563eb');
  
  console.log('\n%c1. GLOBAL IMAGE STATE', 'font-size: 13px; font-weight: bold; color: #059669');
  console.log(`_certImageUrl exists: ${!!window._certImageUrl}`);
  if (window._certImageUrl) {
    console.log(`_certImageUrl (first 100 chars): ${window._certImageUrl.substring(0, 100)}...`);
  }
  console.log(`_certCloudinaryId: ${window._certCloudinaryId || '(empty)'}`);
  console.log(`_projectImageUrls: ${(window._projectImageUrls || []).length} images`);
  if (window._projectImageUrls && window._projectImageUrls.length > 0) {
    window._projectImageUrls.forEach((img, i) => {
      console.log(`  [${i}] URL (first 100 chars): ${img.url?.substring(0, 100)}...`);
    });
  }
  
  console.log('\n%c2. FORM FIELD STATE', 'font-size: 13px; font-weight: bold; color: #059669');
  const certForm = document.getElementById('cert-form');
  const projForm = document.getElementById('proj-form');
  if (certForm) {
    console.log('[CERT FORM VALUES]');
    console.log('  cert-name:', document.getElementById('cert-name')?.value);
    console.log('  cert-org:', document.getElementById('cert-org')?.value);
    console.log('  cert-date:', document.getElementById('cert-date')?.value);
    const imgData = document.getElementById('cert-img-data')?.value;
    console.log('  cert-img-data exists:', !!imgData);
    if (imgData) {
      console.log('  cert-img-data (first 100 chars):', imgData.substring(0, 100) + '...');
    }
    console.log('  cert-edit-id:', document.getElementById('cert-edit-id')?.value);
  }
  if (projForm) {
    console.log('[PROJ FORM VALUES]');
    console.log('  proj-title:', document.getElementById('proj-title')?.value);
    console.log('  proj-category:', document.getElementById('proj-category')?.value);
    console.log('  proj-tags:', document.getElementById('proj-tags')?.value);
  }
  
  console.log('\n%c3. STORED DATA WITH IMAGES', 'font-size: 13px; font-weight: bold; color: #0891b2');
  const certs = JSON.parse(localStorage.getItem('dita-certifications') || '[]');
  const projs = JSON.parse(localStorage.getItem('dita-projects') || '[]');
  console.log(`Certifications in storage: ${certs.length}`);
  if (certs.length > 0) {
    console.log('Last certification:', {
      id: certs[0].id,
      name: certs[0].name,
      hasImage: !!certs[0].img,
      imageLength: certs[0].img?.length || 0,
      imagePreview: certs[0].img ? certs[0].img.substring(0, 100) + '...' : '(none)'
    });
    if (certs[0].img) {
      console.log('Full image data:', certs[0]);
    }
  }
  console.log(`Projects in storage: ${projs.length}`);
  if (projs.length > 0) {
    console.log('Last project:', {
      id: projs[0].id,
      title: projs[0].title,
      imageCount: (projs[0].imgs || []).length,
      images: projs[0].imgs
    });
  }
  
  console.log('\n%c4. RENDERED DATA ON PAGE', 'font-size: 13px; font-weight: bold; color: #7c3aed');
  const certList = document.getElementById('cert-list');
  const projList = document.getElementById('proj-list');
  if (certList) {
    const certCards = certList.querySelectorAll('.card');
    console.log(`Certifications rendered: ${certCards.length}`);
    certCards.forEach((card, i) => {
      const img = card.querySelector('img');
      console.log(`  [${i}] has image: ${!!img}`);
    });
  }
  if (projList) {
    console.log(`Projects rendered: ${projList.querySelectorAll('.pcard').length}`);
  }
  
  console.log('\n%c📝 TEST COMMANDS:', 'font-size: 12px; font-weight: bold; color: #16a34a');
  console.log('1. To view certificate images: certs = JSON.parse(localStorage.getItem("dita-certifications")); certs[0].img');
  console.log('2. To test image display: window.open("data:text/html," + certs[0].img)');
  console.log('3. To copy first cert image URL: copy(certs[0].img)');
}

function viewCertImages() {
  const certs = JSON.parse(localStorage.getItem('dita-certifications') || '[]');
  if (certs.length === 0) {
    console.log('No certifications stored');
    return;
  }
  
  console.log('%cALL CERTIFICATION IMAGES', 'font-size: 14px; font-weight: bold; color: #0891b2');
  certs.forEach((cert, i) => {
    console.log(`\n[${i}] ${cert.name}`);
    if (cert.img) {
      console.log(`✓ Image URL (${cert.img.length} chars):`, cert.img.substring(0, 50) + '...');
      // Try to validate if it's a valid data URL or image URL
      if (cert.img.startsWith('data:')) {
        console.log('✓ Image format: BASE64 DATA URL');
      } else if (cert.img.startsWith('http')) {
        console.log('✓ Image format: CLOUDINARY URL');
      }
    } else {
      console.warn('❌ No image');
    }
  });
}

// Additional test functions
function testCertSave() {
  console.clear();
  console.log('%c🧪 TEST: Manual Certification Save', 'font-size: 14px; font-weight: bold; color: #ea580c');
  
  // Simulate form data
  const testData = {
    id: 'test-' + Date.now(),
    name: '[TEST] Manual Certification',
    org: '[TEST] Organization',
    date: 'April 2026',
    cid: '',
    desc: 'This is a test certification',
    link: '',
    img: 'https://via.placeholder.com/400'
  };
  
  let data = JSON.parse(localStorage.getItem('dita-certifications') || '[]');
  data.unshift(testData);
  localStorage.setItem('dita-certifications', JSON.stringify(data));
  
  console.log('✓ Test data saved to localStorage');
  console.log(testData);
  console.log('\nNow run: location.reload() to see it rendered');
}

function testProjSave() {
  console.clear();
  console.log('%c🧪 TEST: Manual Project Save', 'font-size: 14px; font-weight: bold; color: #ea580c');
  
  const testData = {
    id: 'test-' + Date.now(),
    title: '[TEST] Manual Project',
    year: '2026',
    category: 'Data Analysis',
    tags: ['test', 'manual'],
    desc: 'This is a test project',
    result: 'Test result',
    imgs: ['https://via.placeholder.com/400'],
    links: [{ type: 'GitHub', label: 'Test Link', url: 'https://example.com' }]
  };
  
  let data = JSON.parse(localStorage.getItem('dita-projects') || '[]');
  data.unshift(testData);
  localStorage.setItem('dita-projects', JSON.stringify(data));
  
  console.log('✓ Test data saved to localStorage');
  console.log(testData);
  console.log('\nNow run: location.reload() to see it rendered');
}

// Auto-log on first load
if (!window._debugLoaded) {
  window._debugLoaded = true;
  console.log('%c💡 Debug mode ready. Run debugSave() to check save state.', 'font-size: 12px; color: #666');
}

/**
 * DEBUG IMAGE FLOW
 * Gunakan: runDiagnostic() di F12 console untuk diagnosa lengkap
 */

function runDiagnostic() {
  console.clear();
  console.log('╔════════════════════════════════════════╗');
  console.log('║   DIAGNOSTIC UPLOAD IMAGE FLOW        ║');
  console.log('╚════════════════════════════════════════╝');

  // 1. Check Cloudinary Config
  console.log('\n📋 1. CLOUDINARY CONFIG');
  console.log('─'.repeat(50));
  console.log('CLOUD_NAME:', CLOUDINARY_CONFIG.CLOUD_NAME);
  console.log('API_KEY:', CLOUDINARY_CONFIG.API_KEY);
  console.log('UPLOAD_PRESET:', CLOUDINARY_CONFIG.UPLOAD_PRESET);
  console.log('FOLDER:', CLOUDINARY_CONFIG.FOLDER);

  const isConfigValid = 
    CLOUDINARY_CONFIG.CLOUD_NAME && 
    CLOUDINARY_CONFIG.CLOUD_NAME !== 'YOUR_CLOUD_NAME' &&
    CLOUDINARY_CONFIG.UPLOAD_PRESET && 
    CLOUDINARY_CONFIG.UPLOAD_PRESET !== 'YOUR_UPLOAD_PRESET';
  
  console.log('✓ Config Valid:', isConfigValid ? '✅ YES' : '❌ NO');

  // 2. Check localStorage data
  console.log('\n📦 2. STORED CERTIFICATIONS');
  console.log('─'.repeat(50));
  const certs = JSON.parse(localStorage.getItem('dita-certifications')) || [];
  console.log(`Total: ${certs.length} certifications`);
  
  if (certs.length > 0) {
    certs.forEach((c, i) => {
      const hasImg = !!c.img;
      const imgLength = c.img ? c.img.length : 0;
      const isCloudinary = c.img?.startsWith('https://res.cloudinary.com');
      const isBase64 = c.img?.startsWith('data:image');
      
      console.log(`\n  [${i + 1}] ${c.name}`);
      console.log(`     - ID: ${c.id}`);
      console.log(`     - Has Image: ${hasImg ? '✅' : '❌'}`);
      if (hasImg) {
        console.log(`     - Image Type: ${isCloudinary ? 'Cloudinary URL' : isBase64 ? 'Base64' : 'Other'}`);
        console.log(`     - Image Length: ${imgLength} chars`);
        if (isCloudinary) {
          console.log(`     - Image Preview: ${c.img.substring(0, 80)}...`);
        }
      }
    });
  } else {
    console.log('ℹ No certifications stored');
  }

  // 3. Check global upload state
  console.log('\n🔄 3. CURRENT UPLOAD STATE (Global Variables)');
  console.log('─'.repeat(50));
  console.log('_certImageUrl:', _certImageUrl ? '✅ Has URL' : '❌ Empty');
  if (_certImageUrl) {
    const isCloudinary = _certImageUrl.startsWith('https://res.cloudinary.com');
    const isBase64 = _certImageUrl.startsWith('data:image');
    console.log('  - Type:', isCloudinary ? 'Cloudinary' : isBase64 ? 'Base64' : 'Other');
    console.log('  - Preview:', _certImageUrl.substring(0, 80) + '...');
  }
  console.log('_certCloudinaryId:', _certCloudinaryId || '(empty)');

  // 4. Test connectivity
  console.log('\n🌐 4. CONNECTIVITY TEST');
  console.log('─'.repeat(50));
  testCloudinaryConnection();
}

async function testCloudinaryConnection() {
  try {
    console.log('Testing connection to Cloudinary API...');
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/image/upload`,
      {
        method: 'OPTIONS',
        headers: {
          'Access-Control-Request-Method': 'POST'
        }
      }
    );

    if (response.ok || response.status === 200 || response.status === 204) {
      console.log('✅ Cloudinary API accessible');
    } else {
      console.log('⚠ Cloudinary response:', response.status);
    }
  } catch (error) {
    console.log('❌ Cannot reach Cloudinary:', error.message);
  }
}

function testUploadSimulation() {
  console.clear();
  console.log('╔════════════════════════════════════════╗');
  console.log('║   UPLOAD SIMULATION TEST              ║');
  console.log('╚════════════════════════════════════════╝');
  
  console.log('\nInstructions:');
  console.log('1. Click "Upload gambar sertifikat"');
  console.log('2. Select a JPG or PNG file');
  console.log('3. Watch console for upload logs');
  console.log('4. After image preview appears, click "Simpan"');
  console.log('5. Run checkAfterSave() to verify');
  
  console.log('\nWaiting for image upload...');
}

function checkAfterSave() {
  console.clear();
  console.log('╔════════════════════════════════════════╗');
  console.log('║   CHECK AFTER SAVE                    ║');
  console.log('╚════════════════════════════════════════╝');

  // Check if new cert was added
  const certs = JSON.parse(localStorage.getItem('dita-certifications')) || [];
  const firstCert = certs[0];

  console.log('\n✓ First certification in localStorage:');
  console.log('─'.repeat(50));
  console.log('Name:', firstCert?.name);
  console.log('Org:', firstCert?.org);
  console.log('Has Image:', !!firstCert?.img ? '✅' : '❌');
  
  if (firstCert?.img) {
    const isCloudinary = firstCert.img.startsWith('https://res.cloudinary.com');
    const isBase64 = firstCert.img.startsWith('data:image');
    
    console.log('Image Type:', isCloudinary ? 'Cloudinary ✅' : isBase64 ? 'Base64 (⚠)' : '?');
    console.log('Image URL:', firstCert.img.substring(0, 100) + '...');
    
    // Check if URL is valid
    console.log('\nChecking if URL is accessible...');
    fetch(firstCert.img, { method: 'HEAD' })
      .then(r => {
        if (r.ok) console.log('✅ Image URL is accessible');
        else console.log('⚠ Image returned:', r.status, r.statusText);
      })
      .catch(e => console.log('❌ Cannot access image:', e.message));
  }

  console.log('\n📍 Now:');
  console.log('1. Check if image appears in the certification card');
  console.log('2. Click the card to open modal');
  console.log('3. Check if image appears in modal');
  console.log('4. Run viewRenderedHTML() to see actual HTML');
}

function viewRenderedHTML() {
  console.clear();
  console.log('╔════════════════════════════════════════╗');
  console.log('║   RENDERED HTML CHECK                 ║');
  console.log('╚════════════════════════════════════════╝');

  // Find first cert card
  const certList = document.getElementById('cert-list');
  if (!certList) {
    console.log('❌ cert-list not found');
    return;
  }

  const firstCard = certList.querySelector('.card');
  if (!firstCard) {
    console.log('❌ No cert cards found');
    return;
  }

  const img = firstCard.querySelector('img');
  if (img) {
    console.log('✅ Found <img> element in card');
    console.log('  - src:', img.src.substring(0, 100) + '...');
    console.log('  - Complete HTML:');
    console.log(img.outerHTML);
  } else {
    const emoji = firstCard.querySelector('[style*="font-size:2rem"]');
    if (emoji) {
      console.log('⚠ Showing emoji placeholder (image not set)');
      console.log('  HTML:', firstCard.querySelector('div').innerHTML.substring(0, 100));
    }
  }

  console.log('\n📍 Check modal image:');
  const modalImg = document.getElementById('cert-detail-img');
  if (modalImg) {
    console.log('Modal <img> src:', modalImg.src.substring(0, 100) + '...');
  }
}

function showQuickChecks() {
  console.log(`
╔════════════════════════════════════════╗
║   QUICK DIAGNOSTIC COMMANDS           ║
╚════════════════════════════════════════╝

📋 Full diagnostic:
  runDiagnostic()

🧪 Test upload:
  testUploadSimulation()
  [upload image, then:]
  checkAfterSave()

🔍 Check HTML:
  viewRenderedHTML()

🌐 Check if URL works:
  fetch(_certImageUrl).then(r => console.log('Status:', r.status))

📦 View all stored certs:
  JSON.parse(localStorage.getItem('dita-certifications'))

🗑️ Clear all certs:
  localStorage.removeItem('dita-certifications')

`);
}

// Auto-show help on load
console.log('%c💡 Image Flow Debugger Loaded', 'font-size:14px;font-weight:bold;color:#2563eb');
console.log('%cType showQuickChecks() for commands', 'color:#666;font-size:12px');

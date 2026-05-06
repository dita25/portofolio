/**
 * Image Upload Handler — Cloudinary Integration
 * Handles automatic image compression and upload to Cloudinary
 * Replaces base64 storage with URL-based CDN storage
 */

// Global state for image uploads
let _pendingImageUploads = new Map(); // Track pending uploads

/**
 * ═══════════════════════════════════════════════════════
 * UNIFIED IMAGE UPLOAD HANDLER (untuk Cert & Projects)
 * ═══════════════════════════════════════════════════════
 */

/**
 * Upload single image with compression
 * @param {File} file - Image file to upload
 * @param {string} type - Type of image ('cert' or 'project')
 * @returns {Promise<Object>} - { success, url, cloudinaryId, error }
 */
async function uploadImageWithCompression(file, type = 'project') {
  try {
    // Validate file
    if (!file || !file.type.startsWith('image/')) {
      throw new Error('Invalid image file');
    }

    // Check file size (before compression)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File terlalu besar (max 10MB)');
    }

    showToast(`🔄 Mengompresi ${file.name}...`);

    // Compress image
    const compressedBlob = await compressImage(
      file,
      0.7,  // quality
      400   // max dimensions
    );

    // Check if Cloudinary is properly configured
    const isCloudinaryConfigured = 
      CLOUDINARY_CONFIG && 
      CLOUDINARY_CONFIG.CLOUD_NAME && 
      CLOUDINARY_CONFIG.CLOUD_NAME !== 'YOUR_CLOUD_NAME' &&
      CLOUDINARY_CONFIG.UPLOAD_PRESET &&
      CLOUDINARY_CONFIG.UPLOAD_PRESET !== 'YOUR_UPLOAD_PRESET';

    if (!isCloudinaryConfigured) {
      throw new Error('Cloudinary belum dikonfigurasi. Lihat docs/CLOUDINARY-SETUP.md');
    }

    showToast(`📤 Upload ${file.name} ke Cloudinary...`);

    // Upload to Cloudinary
    const result = await uploadImageToCloudinary(compressedBlob, {
      folder: `${CLOUDINARY_CONFIG.FOLDER}/${type}`,
      tags: `portfolio,${type},${new Date().getFullYear()}`
    });

    if (!result.success) {
      throw new Error(result.error || 'Upload ke Cloudinary gagal');
    }

    console.log('✓ Image uploaded to Cloudinary:', result.url);
    showToast(`✓ ${file.name} berhasil diupload ke Cloudinary!`);
    
    return {
      success: true,
      url: result.url,
      cloudinaryId: result.publicId,
      size: result.size,
      width: result.width,
      height: result.height,
      source: 'cloudinary'
    };
  } catch (error) {
    console.error('❌ Upload error:', error);
    showToast(`❌ ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * ═══════════════════════════════════════════════════════
 * CERTIFICATION IMAGE UPLOAD
 * ═══════════════════════════════════════════════════════
 */

let _certImageUrl = ''; // Store uploaded image URL
let _certCloudinaryId = ''; // Store Cloudinary ID for deletion

async function handleCertImg(input) {
  const file = input.files[0];
  if (!file) return;

  // Validate file size (basic check)
  if (file.size > 5 * 1024 * 1024) {
    showToast('⚠ Gambar terlalu besar. Maks 5MB.');
    input.value = '';
    return;
  }

  try {
    // Show loading state
    const preview = document.getElementById('cert-img-preview');
    const clearBtn = document.getElementById('cert-img-clear');
    if (preview) preview.style.opacity = '0.6';

    // Upload and compress
    const result = await uploadImageWithCompression(file, 'cert');

    if (!result.success) {
      if (preview) preview.style.opacity = '1';
      return;
    }

    // Store URLs
    _certImageUrl = result.url;
    _certCloudinaryId = result.cloudinaryId;

    // Show preview
    if (preview) {
      preview.src = result.url;
      preview.style.display = 'block';
      preview.style.opacity = '1';
    }
    if (clearBtn) clearBtn.style.display = 'inline-flex';

    // Store in hidden form field for reference
    const dataField = document.getElementById('cert-img-data');
    if (dataField) {
      dataField.value = JSON.stringify({
        url: result.url,
        cloudinaryId: result.cloudinaryId
      });
    }

    input.value = '';
  } catch (error) {
    console.error('Error in handleCertImg:', error);
    showToast('❌ Gagal mengupload gambar');
  }
}

function clearCertImg() {
  _certImageUrl = '';
  _certCloudinaryId = '';

  const dataField = document.getElementById('cert-img-data');
  if (dataField) dataField.value = '';

  const preview = document.getElementById('cert-img-preview');
  if (preview) {
    preview.src = '';
    preview.style.display = 'none';
  }

  const clearBtn = document.getElementById('cert-img-clear');
  if (clearBtn) clearBtn.style.display = 'none';

  const input = document.getElementById('cert-img-file');
  if (input) input.value = '';
}

/**
 * ═══════════════════════════════════════════════════════
 * PROJECT MULTI-IMAGE UPLOAD
 * ═══════════════════════════════════════════════════════
 */

let _projectImageUrls = []; // Array of { url, cloudinaryId }
let _projectImageDataUrls = []; // For preview/display

async function handleImgUpload(input) {
  const files = Array.from(input.files);
  if (!files.length) return;

  // Show upload progress
  showToast(`📤 Mengupload ${files.length} gambar...`);

  let successCount = 0;
  let failCount = 0;

  // Upload each file
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      showToast(`⚠ ${file.name} terlalu besar (>5MB), dilewati.`);
      failCount++;
      continue;
    }

    try {
      // Upload with compression
      const result = await uploadImageWithCompression(file, 'project');

      if (result.success) {
        // Store URL and ID
        _projectImageUrls.push({
          url: result.url,
          cloudinaryId: result.cloudinaryId,
          width: result.width,
          height: result.height
        });

        // Store data URL for preview (load image from Cloudinary for preview)
        _projectImageDataUrls.push(result.url);

        successCount++;
      } else {
        failCount++;
      }
    } catch (error) {
      console.error(`Error uploading ${file.name}:`, error);
      failCount++;
    }
  }

  // Update thumbnails and hints
  renderProjectThumbs();

  // Show summary
  if (successCount > 0) {
    showToast(`✓ ${successCount} gambar berhasil diupload`);
  }
  if (failCount > 0) {
    showToast(`⚠ ${failCount} gambar gagal`);
  }

  input.value = '';
}

function renderProjectThumbs() {
  const wrap = document.getElementById('img-thumbs-wrap');
  if (!wrap) return;

  if (_projectImageUrls.length === 0) {
    wrap.innerHTML = '';
    const hint = document.querySelector('#img-upload-area p');
    if (hint) {
      hint.innerHTML = '<span>Klik untuk upload</span> — bisa pilih beberapa gambar sekaligus';
    }
    return;
  }

  wrap.innerHTML = _projectImageUrls.map((img, i) => `
    <div class="img-thumb-wrap">
      <img src="${img.url}" alt="project-image-${i}"
           style="width:100%;height:100%;object-fit:cover"/>
      <button type="button" class="img-thumb-del" onclick="removeProjectThumb(${i})" title="Hapus">✕</button>
    </div>
  `).join('');

  const hint = document.querySelector('#img-upload-area p');
  if (hint) {
    hint.innerHTML = `<span>${_projectImageUrls.length} gambar</span> — klik untuk tambah lagi`;
  }
}

async function removeProjectThumb(i) {
  const img = _projectImageUrls[i];

  // Delete from Cloudinary
  if (img.cloudinaryId) {
    await deleteImageFromCloudinary(img.cloudinaryId);
  }

  // Remove from arrays
  _projectImageUrls.splice(i, 1);
  _projectImageDataUrls.splice(i, 1);

  renderProjectThumbs();
  showToast('✓ Gambar dihapus');
}

function clearProjectImg() {
  // Delete all images from Cloudinary
  _projectImageUrls.forEach(async (img) => {
    if (img.cloudinaryId) {
      await deleteImageFromCloudinary(img.cloudinaryId);
    }
  });

  // Clear arrays
  _projectImageUrls = [];
  _projectImageDataUrls = [];

  document.getElementById('proj-img-file').value = '';
  const wrap = document.getElementById('img-thumbs-wrap');
  if (wrap) wrap.innerHTML = '';

  const hint = document.querySelector('#img-upload-area p');
  if (hint) {
    hint.innerHTML = '<span>Klik untuk upload</span> — bisa pilih beberapa gambar sekaligus';
  }
}

/**
 * ═══════════════════════════════════════════════════════
 * SAVE DATA DENGAN CLOUDINARY URLS
 * ═══════════════════════════════════════════════════════
 */

/**
 * Get image URLs for saving to storage
 * Returns array with Cloudinary URLs or empty array
 */
function getCertImageData() {
  if (!_certImageUrl) return '';
  return _certImageUrl;
}

function getCertCloudinaryId() {
  return _certCloudinaryId;
}

function getProjectImageURLs() {
  return _projectImageUrls.map((img) => img.url);
}

function getProjectCloudinaryIds() {
  return _projectImageUrls.map((img) => img.cloudinaryId);
}

/**
 * Initialize Cloudinary on page load
 */
async function initCloudinaryUpload() {
  try {
    await initCloudinary();
    console.log('✓ Cloudinary upload handler initialized');
  } catch (error) {
    console.error('Error initializing Cloudinary:', error);
    showToast('⚠ Cloudinary tidak tersedia, gunakan upload manual');
  }
}

/**
 * Cloudinary Client for Portfolio Media Management
 * Handles image compression, upload, and storage
 * Replaces Supabase storage with automatic compression
 */

// Initialize Cloudinary Script (if not already loaded)
let cloudinaryReady = false;

function loadCloudinaryScript() {
  return new Promise((resolve) => {
    if (window.cloudinary) {
      cloudinaryReady = true;
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/latest/global/loader.js';
    script.onload = () => {
      cloudinaryReady = true;
      console.log('✓ Cloudinary library loaded successfully');
      resolve();
    };
    script.onerror = () => {
      console.warn('⚠ Cloudinary library failed to load');
      resolve(); // Resolve anyway to allow fallback
    };
    document.head.appendChild(script);
  });
}

/**
 * ═══════════════════════════════════════════════════════
 * IMAGE COMPRESSION FUNCTION
 * ═══════════════════════════════════════════════════════
 */

/**
 * Compress image using Canvas API before upload
 * @param {File} file - Image file to compress
 * @param {number} quality - Compression quality (0-1)
 * @param {number} maxDimensions - Max width/height in pixels
 * @returns {Promise<Blob>} - Compressed image blob
 */
async function compressImage(file, quality = 0.7, maxDimensions = 400) {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();

        img.onload = () => {
          // Calculate new dimensions while maintaining aspect ratio
          let width = img.width;
          let height = img.height;

          if (width > maxDimensions || height > maxDimensions) {
            const ratio = Math.min(maxDimensions / width, maxDimensions / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          // Create canvas and compress
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(file); // Fallback to original
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Convert to blob with quality
          canvas.toBlob(
            (blob) => {
              console.log(
                `✓ Image compressed: ${(file.size / 1024).toFixed(2)}KB → ${(blob.size / 1024).toFixed(2)}KB`
              );
              resolve(blob);
            },
            'image/jpeg',
            quality
          );
        };

        img.onerror = () => {
          console.warn('Image compression failed, using original');
          resolve(file);
        };

        img.src = event.target.result;
      };

      reader.onerror = () => {
        reject(new Error('Failed to read image file'));
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Image compression error:', error);
      reject(error);
    }
  });
}

/**
 * ═══════════════════════════════════════════════════════
 * CLOUDINARY UPLOAD FUNCTIONS
 * ═══════════════════════════════════════════════════════
 */

/**
 * Upload image to Cloudinary with automatic compression
 * @param {File} file - Image file to upload
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} - Upload result with URL
 */
async function uploadImageToCloudinary(file, options = {}) {
  try {
    await loadCloudinaryScript();

    // Validate file
    if (!file || !file.type.startsWith('image/')) {
      throw new Error('Invalid image file');
    }

    // Check file size (max 5MB after compression)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File too large (max 5MB)');
    }

    showToast('🔄 Mengompresi gambar...');

    // Compress image
    const compressedBlob = await compressImage(
      file,
      IMAGE_CONFIG.COMPRESSION_QUALITY,
      IMAGE_CONFIG.MAX_DIMENSIONS
    );

    // Create FormData for upload
    const formData = new FormData();
    formData.append('file', compressedBlob, file.name);
    formData.append('upload_preset', CLOUDINARY_CONFIG.UPLOAD_PRESET);
    formData.append('folder', options.folder || CLOUDINARY_CONFIG.FOLDER);
    formData.append('resource_type', 'auto');
    formData.append('quality', 'auto');
    formData.append('fetch_format', 'auto');

    // Add tags for organization
    if (options.tags) {
      formData.append('tags', options.tags);
    }

    showToast('📤 Upload ke Cloudinary...');

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
        signal: AbortSignal.timeout(30000) // 30 second timeout
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();

    console.log('✓ Image uploaded successfully:', result.secure_url);

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      size: result.bytes,
      width: result.width,
      height: result.height,
      format: result.format
    };
  } catch (error) {
    console.error('Upload error:', error);
    showToast(`❌ ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Cloudinary public ID of image
 * @returns {Promise<boolean>} - Success status
 */
async function deleteImageFromCloudinary(publicId) {
  try {
    if (!publicId) return false;

    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('api_key', CLOUDINARY_CONFIG.API_KEY);
    formData.append('timestamp', Math.floor(Date.now() / 1000));

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/image/destroy`,
      {
        method: 'POST',
        body: formData
      }
    );

    const result = await response.json();
    console.log('✓ Image deleted from Cloudinary');
    return true;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
}

/**
 * ═══════════════════════════════════════════════════════
 * CERTIFICATIONS - CRUD Operations (localStorage + Cloudinary)
 * ═══════════════════════════════════════════════════════
 */

async function getCerts() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CERTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error fetching certs:', error);
    return [];
  }
}

async function addCert(cert) {
  try {
    const certs = await getCerts();
    const id = Date.now().toString();

    const newCert = {
      id,
      title: cert.title || '',
      issuer: cert.issuer || '',
      image_url: cert.image_url || '',
      cloudinary_id: cert.cloudinary_id || '',
      date: cert.date || '',
      created_at: new Date().toISOString()
    };

    certs.unshift(newCert);
    localStorage.setItem(STORAGE_KEYS.CERTS, JSON.stringify(certs));

    console.log('✓ Certification added');
    return newCert;
  } catch (error) {
    console.error('Error adding cert:', error);
    return null;
  }
}

async function updateCert(id, cert) {
  try {
    const certs = await getCerts();
    const index = certs.findIndex((c) => c.id === id);

    if (index === -1) return null;

    certs[index] = {
      ...certs[index],
      title: cert.title || certs[index].title,
      issuer: cert.issuer || certs[index].issuer,
      image_url: cert.image_url || certs[index].image_url,
      cloudinary_id: cert.cloudinary_id || certs[index].cloudinary_id,
      date: cert.date || certs[index].date
    };

    localStorage.setItem(STORAGE_KEYS.CERTS, JSON.stringify(certs));
    console.log('✓ Certification updated');
    return certs[index];
  } catch (error) {
    console.error('Error updating cert:', error);
    return null;
  }
}

async function deleteCert(id) {
  try {
    const certs = await getCerts();
    const cert = certs.find((c) => c.id === id);

    // Delete image from Cloudinary if exists
    if (cert && cert.cloudinary_id) {
      await deleteImageFromCloudinary(cert.cloudinary_id);
    }

    const filtered = certs.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CERTS, JSON.stringify(filtered));

    console.log('✓ Certification deleted');
    return true;
  } catch (error) {
    console.error('Error deleting cert:', error);
    return false;
  }
}

/**
 * ═══════════════════════════════════════════════════════
 * PROJECTS - CRUD Operations (localStorage + Cloudinary)
 * ═══════════════════════════════════════════════════════
 */

async function getProjects() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function addProject(proj) {
  try {
    const projects = await getProjects();
    const id = Date.now().toString();

    const newProject = {
      id,
      title: proj.title || '',
      description: proj.description || '',
      image_urls: proj.image_urls || [], // Array of image URLs
      cloudinary_ids: proj.cloudinary_ids || [], // Array of Cloudinary IDs
      tags: proj.tags || [],
      links: proj.links || [],
      result: proj.result || '',
      created_at: new Date().toISOString()
    };

    projects.unshift(newProject);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));

    console.log('✓ Project added');
    return newProject;
  } catch (error) {
    console.error('Error adding project:', error);
    return null;
  }
}

async function updateProject(id, proj) {
  try {
    const projects = await getProjects();
    const index = projects.findIndex((p) => p.id === id);

    if (index === -1) return null;

    projects[index] = {
      ...projects[index],
      title: proj.title || projects[index].title,
      description: proj.description || projects[index].description,
      image_urls: proj.image_urls || projects[index].image_urls,
      cloudinary_ids: proj.cloudinary_ids || projects[index].cloudinary_ids,
      tags: proj.tags || projects[index].tags,
      links: proj.links || projects[index].links,
      result: proj.result || projects[index].result
    };

    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    console.log('✓ Project updated');
    return projects[index];
  } catch (error) {
    console.error('Error updating project:', error);
    return null;
  }
}

async function deleteProject(id) {
  try {
    const projects = await getProjects();
    const project = projects.find((p) => p.id === id);

    // Delete all images from Cloudinary
    if (project && project.cloudinary_ids && project.cloudinary_ids.length > 0) {
      for (const cloudinaryId of project.cloudinary_ids) {
        await deleteImageFromCloudinary(cloudinaryId);
      }
    }

    const filtered = projects.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filtered));

    console.log('✓ Project deleted');
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
}

/**
 * ═══════════════════════════════════════════════════════
 * EXPERIENCE - CRUD Operations (localStorage)
 * ═══════════════════════════════════════════════════════
 */

async function getExperience() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.EXP);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error fetching experience:', error);
    return [];
  }
}

async function addExperience(exp) {
  try {
    const experiences = await getExperience();
    const id = Date.now().toString();

    const newExp = {
      id,
      company: exp.company || '',
      position: exp.position || '',
      duration: exp.duration || '',
      description: exp.description || '',
      created_at: new Date().toISOString()
    };

    experiences.unshift(newExp);
    localStorage.setItem(STORAGE_KEYS.EXP, JSON.stringify(experiences));

    console.log('✓ Experience added');
    return newExp;
  } catch (error) {
    console.error('Error adding experience:', error);
    return null;
  }
}

async function updateExperience(id, exp) {
  try {
    const experiences = await getExperience();
    const index = experiences.findIndex((e) => e.id === id);

    if (index === -1) return null;

    experiences[index] = {
      ...experiences[index],
      company: exp.company || experiences[index].company,
      position: exp.position || experiences[index].position,
      duration: exp.duration || experiences[index].duration,
      description: exp.description || experiences[index].description
    };

    localStorage.setItem(STORAGE_KEYS.EXP, JSON.stringify(experiences));
    console.log('✓ Experience updated');
    return experiences[index];
  } catch (error) {
    console.error('Error updating experience:', error);
    return null;
  }
}

async function deleteExperience(id) {
  try {
    const experiences = await getExperience();
    const filtered = experiences.filter((e) => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.EXP, JSON.stringify(filtered));

    console.log('✓ Experience deleted');
    return true;
  } catch (error) {
    console.error('Error deleting experience:', error);
    return false;
  }
}

/**
 * ═══════════════════════════════════════════════════════
 * DATA SYNC & INITIALIZATION
 * ═══════════════════════════════════════════════════════
 */

/**
 * Initialize Cloudinary client on page load
 */
async function initCloudinary() {
  try {
    await loadCloudinaryScript();
    console.log('✓ Cloudinary client initialized successfully');
    return true;
  } catch (error) {
    console.error('Cloudinary initialization failed:', error);
    return false;
  }
}

/**
 * Export data to JSON backup (useful for migrations)
 */
function exportDataBackup() {
  try {
    const backup = {
      timestamp: new Date().toISOString(),
      certifications: JSON.parse(localStorage.getItem(STORAGE_KEYS.CERTS) || '[]'),
      projects: JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || '[]'),
      experience: JSON.parse(localStorage.getItem(STORAGE_KEYS.EXP) || '[]')
    };

    const dataStr = JSON.stringify(backup, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-backup-${Date.now()}.json`;
    link.click();

    console.log('✓ Data exported to backup');
  } catch (error) {
    console.error('Export error:', error);
  }
}

/**
 * Import data from JSON backup
 */
async function importDataBackup(file) {
  try {
    const text = await file.text();
    const backup = JSON.parse(text);

    localStorage.setItem(STORAGE_KEYS.CERTS, JSON.stringify(backup.certifications || []));
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(backup.projects || []));
    localStorage.setItem(STORAGE_KEYS.EXP, JSON.stringify(backup.experience || []));

    console.log('✓ Data imported from backup');
    return true;
  } catch (error) {
    console.error('Import error:', error);
    return false;
  }
}

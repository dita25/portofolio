/**
 * Supabase Client for Portfolio Database
 * Handles all CRUD operations for certifications, experience, and projects
 * With localStorage fallback for offline support
 */

// Initialize Supabase client
let supabaseClient = null;

async function initSupabase() {
  try {
    const { createClient } = window.supabase;
    
    if (!createClient) {
      console.warn('Supabase library not loaded. Using localStorage only.');
      return false;
    }

    supabaseClient = createClient(
      SUPABASE_CONFIG.URL,
      SUPABASE_CONFIG.KEY
    );

    console.log('✓ Supabase connected successfully');
    return true;
  } catch (error) {
    console.error('Supabase initialization failed:', error);
    return false;
  }
}

/**
 * ═══════════════════════════════════════════════════════
 * CERTIFICATIONS - CRUD Operations
 * ═══════════════════════════════════════════════════════
 */

// Get all certifications
async function getSupabaseCerts() {
  try {
    if (!supabaseClient) return null;

    const { data, error } = await supabaseClient
      .from('certifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return null;
  }
}

// Add certification
async function addSupabaseCert(cert) {
  try {
    if (!supabaseClient) return null;

    const { data, error } = await supabaseClient
      .from('certifications')
      .insert([{
        title: cert.title,
        issuer: cert.issuer || '',
        image_url: cert.image_url || '',
        date: cert.date || ''
      }])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error adding certification:', error);
    return null;
  }
}

// Update certification
async function updateSupabaseCert(id, cert) {
  try {
    if (!supabaseClient) return null;

    const { data, error } = await supabaseClient
      .from('certifications')
      .update({
        title: cert.title,
        issuer: cert.issuer || '',
        image_url: cert.image_url || '',
        date: cert.date || ''
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating certification:', error);
    return null;
  }
}

// Delete certification
async function deleteSupabaseCert(id) {
  try {
    if (!supabaseClient) return false;

    const { error } = await supabaseClient
      .from('certifications')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting certification:', error);
    return false;
  }
}

/**
 * ═══════════════════════════════════════════════════════
 * EXPERIENCE - CRUD Operations
 * ═══════════════════════════════════════════════════════
 */

// Get all experience
async function getSupabaseExperience() {
  try {
    if (!supabaseClient) return null;

    const { data, error } = await supabaseClient
      .from('experience')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching experience:', error);
    return null;
  }
}

// Add experience
async function addSupabaseExp(exp) {
  try {
    if (!supabaseClient) return null;

    const { data, error } = await supabaseClient
      .from('experience')
      .insert([{
        company: exp.company || '',
        position: exp.position || '',
        duration: exp.duration || '',
        description: exp.description || ''
      }])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error adding experience:', error);
    return null;
  }
}

// Update experience
async function updateSupabaseExp(id, exp) {
  try {
    if (!supabaseClient) return null;

    const { data, error } = await supabaseClient
      .from('experience')
      .update({
        company: exp.company || '',
        position: exp.position || '',
        duration: exp.duration || '',
        description: exp.description || ''
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating experience:', error);
    return null;
  }
}

// Delete experience
async function deleteSupabaseExp(id) {
  try {
    if (!supabaseClient) return false;

    const { error } = await supabaseClient
      .from('experience')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting experience:', error);
    return false;
  }
}

/**
 * ═══════════════════════════════════════════════════════
 * PROJECTS - CRUD Operations
 * ═══════════════════════════════════════════════════════
 */

// Get all projects
async function getSupabaseProjects() {
  try {
    if (!supabaseClient) return null;

    const { data, error } = await supabaseClient
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return null;
  }
}

// Add project
async function addSupabaseProj(proj) {
  try {
    if (!supabaseClient) return null;

    const { data, error } = await supabaseClient
      .from('projects')
      .insert([{
        title: proj.title || '',
        description: proj.description || '',
        image_url: proj.image_url || '',
        link: proj.link || ''
      }])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error adding project:', error);
    return null;
  }
}

// Update project
async function updateSupabaseProj(id, proj) {
  try {
    if (!supabaseClient) return null;

    const { data, error } = await supabaseClient
      .from('projects')
      .update({
        title: proj.title || '',
        description: proj.description || '',
        image_url: proj.image_url || '',
        link: proj.link || ''
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating project:', error);
    return null;
  }
}

// Delete project
async function deleteSupabaseProj(id) {
  try {
    if (!supabaseClient) return false;

    const { error } = await supabaseClient
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
}

/**
 * ═══════════════════════════════════════════════════════
 * SYNC Utilities - Sync between localStorage and Supabase
 * ═══════════════════════════════════════════════════════
 */

// Sync certifications from localStorage to Supabase (one-time)
async function syncCertsToSupabase() {
  try {
    if (!supabaseClient) return;
    
    const localCerts = Store.get(STORAGE_KEYS.CERTS) || [];
    if (localCerts.length === 0) return;

    console.log('Syncing', localCerts.length, 'certifications to Supabase...');

    for (const cert of localCerts) {
      // Check if already exists (by title + issuer)
      const { data: existing } = await supabaseClient
        .from('certifications')
        .select('id')
        .eq('title', cert.title)
        .eq('issuer', cert.issuer);

      if (!existing || existing.length === 0) {
        await addSupabaseCert({
          title: cert.title,
          issuer: cert.issuer,
          date: cert.date,
          image_url: cert.image_url
        });
      }
    }

    console.log('✓ Certifications synced to Supabase');
  } catch (error) {
    console.error('Error syncing certifications:', error);
  }
}

// Sync experience from localStorage to Supabase (one-time)
async function syncExpToSupabase() {
  try {
    if (!supabaseClient) return;
    
    const localExp = Store.get(STORAGE_KEYS.EXP) || [];
    if (localExp.length === 0) return;

    console.log('Syncing', localExp.length, 'experiences to Supabase...');

    for (const exp of localExp) {
      const { data: existing } = await supabaseClient
        .from('experience')
        .select('id')
        .eq('company', exp.company)
        .eq('position', exp.position);

      if (!existing || existing.length === 0) {
        await addSupabaseExp({
          company: exp.company,
          position: exp.position,
          duration: exp.duration,
          description: exp.description
        });
      }
    }

    console.log('✓ Experience synced to Supabase');
  } catch (error) {
    console.error('Error syncing experience:', error);
  }
}

// Sync projects from localStorage to Supabase (one-time)
async function syncProjsToSupabase() {
  try {
    if (!supabaseClient) return;
    
    const localProjs = Store.get(STORAGE_KEYS.PROJECTS) || [];
    if (localProjs.length === 0) return;

    console.log('Syncing', localProjs.length, 'projects to Supabase...');

    for (const proj of localProjs) {
      const { data: existing } = await supabaseClient
        .from('projects')
        .select('id')
        .eq('title', proj.title);

      if (!existing || existing.length === 0) {
        await addSupabaseProj({
          title: proj.title,
          description: proj.description,
          image_url: proj.image_url,
          link: proj.link
        });
      }
    }

    console.log('✓ Projects synced to Supabase');
  } catch (error) {
    console.error('Error syncing projects:', error);
  }
}

// Sync all data from Supabase to localStorage on page load
async function syncSupabaseToLocal() {
  try {
    if (!supabaseClient) return;

    console.log('Loading data from Supabase...');

    // Load certifications
    const certs = await getSupabaseCerts();
    if (certs && certs.length > 0) {
      Store.set(STORAGE_KEYS.CERTS, certs);
      console.log('✓ Loaded', certs.length, 'certifications from Supabase');
    }

    // Load experience
    const exps = await getSupabaseExperience();
    if (exps && exps.length > 0) {
      Store.set(STORAGE_KEYS.EXP, exps);
      console.log('✓ Loaded', exps.length, 'experiences from Supabase');
    }

    // Load projects
    const projs = await getSupabaseProjects();
    if (projs && projs.length > 0) {
      Store.set(STORAGE_KEYS.PROJECTS, projs);
      console.log('✓ Loaded', projs.length, 'projects from Supabase');
    }

    console.log('✓ All data synced from Supabase to localStorage');
  } catch (error) {
    console.error('Error syncing from Supabase:', error);
  }
}

/**
 * ═══════════════════════════════════════════════════════
 * REAL-TIME Subscriptions (Optional - for live updates)
 * ═══════════════════════════════════════════════════════
 */

// Subscribe to certifications changes
function subscribeToSupabaseCerts(callback) {
  try {
    if (!supabaseClient) return null;

    const subscription = supabaseClient
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'certifications'
      }, (payload) => {
        console.log('Certifications updated:', payload);
        callback(payload);
      })
      .subscribe();

    return subscription;
  } catch (error) {
    console.error('Error subscribing to certifications:', error);
    return null;
  }
}

// Subscribe to experience changes
function subscribeToSupabaseExp(callback) {
  try {
    if (!supabaseClient) return null;

    const subscription = supabaseClient
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'experience'
      }, (payload) => {
        console.log('Experience updated:', payload);
        callback(payload);
      })
      .subscribe();

    return subscription;
  } catch (error) {
    console.error('Error subscribing to experience:', error);
    return null;
  }
}

// Subscribe to projects changes
function subscribeToSupabaseProjs(callback) {
  try {
    if (!supabaseClient) return null;

    const subscription = supabaseClient
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'projects'
      }, (payload) => {
        console.log('Projects updated:', payload);
        callback(payload);
      })
      .subscribe();

    return subscription;
  } catch (error) {
    console.error('Error subscribing to projects:', error);
    return null;
  }
}

// ✓ End of supabase-client.js

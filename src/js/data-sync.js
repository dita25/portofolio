/**
 * ============================================================
 * Data Sync Module — Syncs projects between data.json and localStorage
 * ============================================================
 * 
 * Flow:
 * 1. Load data.json (public source of truth)
 * 2. Merge with localStorage (personal changes)
 * 3. Save changes to both localStorage AND data.json
 */

const DataSync = {
  // Path to the JSON data file
  DATA_URL: './data.json',
  GITHUB_API_URL: 'https://api.github.com/repos/', // Will be used with token
  PROJ_KEY: 'dita-projects',
  ETAG_KEY: 'dita-projects-etag',
  SYNC_LOCK: 'dita-projects-syncing',
  
  /**
   * Load projects from data.json (with caching)
   * Falls back to localStorage if fetch fails
   */
  async loadFromCloud() {
    try {
      const response = await fetch(this.DATA_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      console.log('[DataSync] Loaded from data.json:', data.length, 'projects');
      return data;
    } catch (err) {
      console.warn('[DataSync] Failed to load data.json, using localStorage fallback:', err.message);
      return null;
    }
  },
  
  /**
   * Load from localStorage
   */
  loadFromLocal() {
    try {
      const raw = localStorage.getItem(this.PROJ_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      console.log('[DataSync] Loaded from localStorage:', data.length, 'projects');
      return data;
    } catch (err) {
      console.warn('[DataSync] Failed to load localStorage:', err.message);
      return null;
    }
  },
  
  /**
   * Merge cloud data with local changes
   * Priority: Local > Cloud (local edits override cloud)
   */
  merge(cloudData, localData) {
    if (!cloudData && !localData) return [];
    if (!cloudData) return localData;
    if (!localData) return cloudData;
    
    // Create a map of cloud projects by ID
    const cloudMap = new Map(cloudData.map(p => [p.id, p]));
    
    // Result: all local items + any cloud items not modified locally
    const result = [];
    const seenIds = new Set();
    
    // First, add all local projects (they're more recent)
    localData.forEach(p => {
      result.push(p);
      seenIds.add(p.id);
    });
    
    // Then add any cloud projects not present locally
    cloudData.forEach(p => {
      if (!seenIds.has(p.id)) {
        result.push(p);
      }
    });
    
    console.log('[DataSync] Merged:', result.length, 'projects (Cloud: ' + cloudData.length + ', Local: ' + localData.length + ')');
    return result;
  },
  
  /**
   * Main load function - returns merged data
   */
  async load() {
    const cloudData = await this.loadFromCloud();
    const localData = this.loadFromLocal();
    
    // If we have cloud data, use it as base and merge with local
    if (cloudData) {
      const merged = this.merge(cloudData, localData);
      // Always keep local storage in sync with merged data
      this.saveLocal(merged);
      return merged;
    }
    
    // Fallback: just use local data or empty array
    return localData || [];
  },
  
  /**
   * Save to localStorage only (for quick updates)
   */
  saveLocal(data) {
    try {
      localStorage.setItem(this.PROJ_KEY, JSON.stringify(data));
      console.log('[DataSync] Saved to localStorage:', data.length, 'projects');
    } catch (err) {
      console.error('[DataSync] Failed to save to localStorage:', err.message);
    }
  },
  
  /**
   * Save to GitHub via API (requires GitHub token in admin panel)
   * Admin should input their GitHub token for this to work
   */
  async saveToGithub(data, githubToken, repoOwner, repoName, branch = 'main') {
    if (!githubToken) {
      console.warn('[DataSync] No GitHub token provided, skipping cloud save');
      return false;
    }
    
    try {
      const url = `${this.GITHUB_API_URL}${repoOwner}/${repoName}/contents/data.json`;
      const content = JSON.stringify(data, null, 2);
      const encodedContent = btoa(unescape(encodeURIComponent(content)));
      
      // First, get the current file to get its SHA (required for updates)
      const getResponse = await fetch(url + `?ref=${branch}`, {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      const currentFile = await getResponse.json();
      
      // Then update with PUT request
      const putResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Update projects data - ${new Date().toLocaleString()}`,
          content: encodedContent,
          sha: currentFile.sha,
          branch: branch
        })
      });
      
      if (!putResponse.ok) {
        const error = await putResponse.json();
        throw new Error(error.message || `HTTP ${putResponse.status}`);
      }
      
      console.log('[DataSync] Saved to GitHub successfully');
      return true;
    } catch (err) {
      console.error('[DataSync] Failed to save to GitHub:', err.message);
      return false;
    }
  },
  
  /**
   * Complete save: update both localStorage and GitHub
   */
  async save(data, githubToken = null, repoOwner = null, repoName = null) {
    // Always save to localStorage
    this.saveLocal(data);
    
    // If GitHub credentials provided, also try to save to GitHub
    if (githubToken && repoOwner && repoName) {
      const success = await this.saveToGithub(data, githubToken, repoOwner, repoName);
      return success;
    }
    
    return true;
  }
};

// For backward compatibility, create a global wrapper
async function loadProjWithSync() {
  return await DataSync.load();
}

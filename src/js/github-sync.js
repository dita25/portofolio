/**
 * GitHub Sync Module - Auto-sync project data to GitHub
 * Allows admin to save edits directly to data.json without manual git commands
 */

const GitHubSync = {
  // GitHub API configuration
  GITHUB_API: 'https://api.github.com',
  REPO_OWNER: 'dita25',
  REPO_NAME: 'portofolio',
  BRANCH: 'main',
  FILE_PATH: 'data.json',
  
  // Store token in sessionStorage (cleared on browser close)
  TOKEN_KEY: 'github-token-session',
  
  /**
   * Get stored GitHub token
   */
  getToken() {
    return sessionStorage.getItem(this.TOKEN_KEY);
  },
  
  /**
   * Set GitHub token (from admin input)
   */
  setToken(token) {
    if (token && token.trim()) {
      sessionStorage.setItem(this.TOKEN_KEY, token.trim());
      console.log('[GitHubSync] ✓ Token stored (session)');
      return true;
    }
    return false;
  },
  
  /**
   * Clear token
   */
  clearToken() {
    sessionStorage.removeItem(this.TOKEN_KEY);
    console.log('[GitHubSync] Token cleared');
  },
  
  /**
   * Check if token is available
   */
  hasToken() {
    return !!this.getToken();
  },
  
  /**
   * Get current file info from GitHub (SHA needed for updates)
   */
  async getFileInfo() {
    const token = this.getToken();
    if (!token) {
      console.warn('[GitHubSync] No token available');
      return null;
    }
    
    try {
      const url = `${this.GITHUB_API}/repos/${this.REPO_OWNER}/${this.REPO_NAME}/contents/${this.FILE_PATH}?ref=${this.BRANCH}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (!response.ok) {
        console.error('[GitHubSync] Failed to get file info:', response.status, response.statusText);
        return null;
      }
      
      const data = await response.json();
      return data; // Returns {name, path, sha, size, content, ...}
    } catch (err) {
      console.error('[GitHubSync] Error getting file info:', err.message);
      return null;
    }
  },
  
  /**
   * Push data to GitHub (update data.json)
   */
  async pushToGithub(projectsData, commitMessage = 'Update projects data') {
    const token = this.getToken();
    if (!token) {
      console.error('[GitHubSync] No GitHub token - cannot push');
      return { success: false, error: 'No token' };
    }
    
    try {
      // Step 1: Get current file SHA (needed for update)
      console.log('[GitHubSync] Fetching current file SHA...');
      const fileInfo = await this.getFileInfo();
      
      if (!fileInfo) {
        return { success: false, error: 'Could not fetch file info' };
      }
      
      // Step 2: Prepare new content
      const content = JSON.stringify(projectsData, null, 2);
      const encodedContent = btoa(unescape(encodeURIComponent(content)));
      
      // Step 3: Push to GitHub
      console.log('[GitHubSync] Pushing to GitHub...');
      const url = `${this.GITHUB_API}/repos/${this.REPO_OWNER}/${this.REPO_NAME}/contents/${this.FILE_PATH}`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: commitMessage,
          content: encodedContent,
          sha: fileInfo.sha,
          branch: this.BRANCH
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('[GitHubSync] Push failed:', errorData);
        return { 
          success: false, 
          error: errorData.message || `HTTP ${response.status}`
        };
      }
      
      const result = await response.json();
      console.log('[GitHubSync] ✓ Successfully pushed to GitHub');
      console.log('[GitHubSync] Commit:', result.commit.sha);
      
      return { 
        success: true, 
        sha: result.content.sha,
        commit: result.commit.sha
      };
      
    } catch (err) {
      console.error('[GitHubSync] Error pushing to GitHub:', err.message);
      return { 
        success: false, 
        error: err.message
      };
    }
  },
  
  /**
   * Prompt admin for GitHub token
   */
  promptForToken() {
    const token = prompt(
      'Enter your GitHub Personal Access Token (fine-grained with write access to data.json):\n\n' +
      '🔗 Create token at: https://github.com/settings/tokens?type=beta\n' +
      '📋 Permissions needed: "contents" read+write on "portofolio" repo\n\n' +
      'Token will be stored only in this browser session.'
    );
    
    if (token) {
      return this.setToken(token);
    }
    return false;
  }
};

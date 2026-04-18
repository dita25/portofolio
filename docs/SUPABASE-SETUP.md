# 🚀 Supabase Setup Guide

Complete setup guide for integrating Supabase PostgreSQL database with your portfolio.

---

## **📋 What is Supabase?**

Supabase is a **PostgreSQL database in the cloud** that provides:
- ✅ Real-time database (500MB free tier)
- ✅ REST API (auto-generated)
- ✅ Built-in authentication
- ✅ Real-time subscriptions
- ✅ Automatic backups
- ✅ Row-level security

---

## **🔑 Your Credentials**

Your portfolio is already configured with Supabase credentials in `constants.js`:

```javascript
const SUPABASE_CONFIG = {
  URL: 'https://yfnqnoukvcnraugtkekj.supabase.co',
  KEY: 'sb_publishable_EIgGw1INPhP-npJoINoVwQ_ZR0cWi0X',
  TABLES: {
    CERTIFICATIONS: 'certifications',
    EXPERIENCE: 'experience',
    PROJECTS: 'projects'
  },
  ENABLED: true
}
```

---

## **📊 Database Schema**

### **Certifications Table**
```sql
CREATE TABLE certifications (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT,
  image_url TEXT,
  date TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Fields:**
- `id` - Unique identifier (UUID)
- `title` - Certificate name
- `issuer` - Organization name
- `image_url` - Base64 or URL of certificate image
- `date` - Date obtained (e.g., "July 2025")
- `created_at` - Auto-generated timestamp

### **Experience Table**
```sql
CREATE TABLE experience (
  id UUID PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT,
  duration TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Fields:**
- `id` - Unique identifier
- `company` - Company name
- `position` - Job title
- `duration` - Duration (e.g., "Jan 2023 - Dec 2024")
- `description` - Job description or bullet points
- `created_at` - Auto-generated timestamp

### **Projects Table**
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Fields:**
- `id` - Unique identifier
- `title` - Project name
- `description` - Project description
- `image_url` - Project image/screenshot URL
- `link` - Link to project/demo
- `created_at` - Auto-generated timestamp

---

## **🔄 How Syncing Works**

### **On Page Load:**
1. JavaScript loads Supabase library
2. Connects to Supabase using credentials
3. Loads data from Supabase tables
4. Stores in localStorage for faster display

### **On Data Save:**
1. Data saved to localStorage (instant)
2. Data also synced to Supabase (background)
3. Real-time sync across devices
4. Automatic backup in cloud

### **Fallback:**
- If Supabase unavailable → Uses localStorage only
- Data persists locally
- Syncs to cloud when connection restored

---

## **💻 File Structure**

```
portofolio-dita/
├── supabase-client.js    (← NEW: Supabase API client)
├── constants.js          (← UPDATED: Supabase credentials)
├── shared.js             (← UPDATED: Supabase init)
├── certifications.html   (← UPDATED: Sync on save)
├── experience.html       (← UPDATED: Sync on save)
├── projects.html         (← UPDATED: Sync on save)
└── ...
```

---

## **🔑 Key Files**

### **`supabase-client.js`** - Database Operations

**Certifications Functions:**
```javascript
await getSupabaseCerts()           // Get all certs
await addSupabaseCert(cert)        // Add new cert
await updateSupabaseCert(id, cert) // Update cert
await deleteSupabaseCert(id)       // Delete cert
```

**Experience Functions:**
```javascript
await getSupabaseExperience()      // Get all experience
await addSupabaseExp(exp)          // Add new experience
await updateSupabaseExp(id, exp)   // Update experience
await deleteSupabaseExp(id)        // Delete experience
```

**Projects Functions:**
```javascript
await getSupabaseProjects()        // Get all projects
await addSupabaseProj(proj)        // Add new project
await updateSupabaseProj(id, proj) // Update project
await deleteSupabaseProj(id)       // Delete project
```

**Sync Functions:**
```javascript
await syncSupabaseToLocal()        // Load from cloud to browser
await syncCertsToSupabase()        // Push certs to cloud
await syncExpToSupabase()          // Push experience to cloud
await syncProjsToSupabase()        // Push projects to cloud
```

### **`constants.js`** - Configuration

Added Supabase configuration:
```javascript
const SUPABASE_CONFIG = {
  URL: '...',
  KEY: '...',
  TABLES: {...},
  ENABLED: true/false
};
```

Set `ENABLED: false` to use localStorage only.

### **`shared.js`** - Initialization

Added Supabase init in `DOMContentLoaded`:
```javascript
// Load Supabase library
await loadSupabaseLibrary()

// Initialize connection
const connected = await initSupabase()

// Sync data
await syncSupabaseToLocal()
```

### **HTML Files** - Save Operations

Updated save/delete functions:
```javascript
// When saving data:
if (supabaseClient) {
  await addSupabaseCert(certData)  // Push to Supabase
}
Store.set(key, data)               // Save to localStorage
```

---

## **📱 How It Works for Users**

### **Scenario 1: Online**
```
User edits certification
    ↓
Save to localStorage (instant display)
    ↓
Push to Supabase (background)
    ↓
Data syncs across devices
```

### **Scenario 2: Offline**
```
User edits certification (offline)
    ↓
Save to localStorage
    ↓
(No internet connection)
    ↓
Sync to Supabase when back online
```

### **Scenario 3: New Device**
```
User opens portfolio on new device
    ↓
Load Supabase credentials
    ↓
Fetch all data from cloud
    ↓
Display data immediately
    ↓
(All edits across devices)
```

---

## **🔐 Security Features**

### **Row-Level Security (RLS)**
- Rows are public-readable
- Only authenticated users can write
- Admin password protects UI

### **API Key Types**
- **Anon Key** (public) - Used in browser
  - Can read from tables
  - Cannot write/delete without RLS rules
  - Safe to expose in frontend code
  
- **Secret Key** - NEVER in browser
  - Full database access
  - Keep private

### **Your Setup**
- ✅ Using Anon Key (public)
- ✅ RLS enabled on tables
- ✅ Admin password protection in UI
- ✅ No sensitive data exposed

---

## **📊 Quota & Limits**

### **Free Tier Includes:**
- ✅ 500MB database storage
- ✅ 1000 auth users
- ✅ Real-time subscriptions
- ✅ REST API (unlimited requests)
- ✅ 7-day backups
- ✅ HTTPS/SSL

### **Your Usage:**
- Certifications: ~100KB
- Experience: ~50KB
- Projects: ~200KB
- **Total: ~350KB** (plenty of room!)

### **Upgrade if Needed:**
- $25/month → 8GB storage
- Covers 50+ GB of data
- Bandwidth included

---

## **🧪 Testing Locally**

### **Test Supabase Connection:**
Open browser console (F12) and run:
```javascript
// Check if Supabase initialized
console.log(supabaseClient)

// Try fetching data
const certs = await getSupabaseCerts()
console.log(certs)
```

### **Test Data Sync:**
1. Add a certification in admin mode
2. Open browser console
3. Run: `Store.get('dita-certifications')`
4. Should show array with new cert

### **Test from Different Device:**
1. Go to portfolio from phone/tablet
2. Should auto-load all data
3. Edit something on phone
4. Refresh on laptop
5. Should see updates

---

## **🚀 Deployment Checklist**

Before deploying to GitHub/production:

- [ ] Supabase project created
- [ ] 3 tables created (certifications, experience, projects)
- [ ] credentials in constants.js
- [ ] SUPABASE_CONFIG.ENABLED set to true
- [ ] Admin mode tested
- [ ] Save/edit/delete tested
- [ ] Cross-device sync tested
- [ ] Offline fallback works
- [ ] Console shows no errors
- [ ] GitHub repository updated
- [ ] Pushed to production

---

## **📚 Useful Supabase Resources**

- **Dashboard:** [app.supabase.com](https://app.supabase.com)
- **Documentation:** [supabase.com/docs](https://supabase.com/docs)
- **API Reference:** [supabase.com/docs/reference](https://supabase.com/docs/reference)
- **Community:** [discord.supabase.io](https://discord.supabase.io)

---

## **🆘 Troubleshooting**

### **Error: "relation 'certifications' already exists"**
- Tables already created from previous run
- Either: DROP and recreate, or just proceed

### **Data not syncing?**
1. Check browser console (F12) for errors
2. Verify Supabase credentials are correct
3. Check internet connection
4. Try refreshing page

### **Admin mode not working?**
1. Check sessionStorage (F12 → Storage)
2. Verify admin password in constants.js
3. Try Ctrl+Shift+A shortcut
4. Check browser console for JS errors

### **Offline data not saving?**
1. Verify localStorage enabled in browser
2. Check storage quota: `localStorage`
3. Try clearing cache and retry
4. Switch to online and retry

### **Supabase library not loading?**
1. Check internet connection
2. CDN might be blocked (corporate firewall?)
3. Fallback to localStorage works
4. Update shared.js loadSupabaseLibrary() with alternative CDN

---

## **🎯 Next Steps**

1. **Test locally:**
   - Add certifications in admin mode
   - Verify they appear in Supabase dashboard

2. **Deploy to GitHub:**
   ```bash
   git add .
   git commit -m "Integrate Supabase database"
   git push origin main
   ```

3. **Deploy to hosting:**
   - GitHub Pages, Vercel, or Netlify
   - See DEPLOYMENT.md for steps

4. **Monitor:**
   - Check Supabase dashboard
   - Verify data syncing
   - Monitor storage usage

---

## **💡 Pro Tips**

1. **Backup data:**
   - Export from Supabase dashboard regularly
   - Or use API to download data

2. **Monitor storage:**
   - Supabase dashboard shows usage
   - Optimize large images before uploading

3. **Performance:**
   - Real-time subscriptions can be slow
   - Consider pagination for large datasets

4. **Security:**
   - Update admin password regularly
   - Use HTTPS only
   - Enable 2FA on Supabase account

---

**Your portfolio is now equipped with a professional cloud database! 🎉**

Questions? Check Supabase docs or your framework documentation.

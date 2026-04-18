# 🚀 Deployment Guide

Complete guide for deploying the Dita Anggraini portfolio to production.

---

## **Pre-Deployment Checklist**

- [ ] All links use relative paths (`./` prefix)
- [ ] Meta tags updated with your domain
- [ ] Contact email correct in `contact.html`
- [ ] Social media links verified
- [ ] CV/PDF files accessible
- [ ] Admin password changed
- [ ] All images have alt text
- [ ] Mobile responsive tested
- [ ] All pages tested in different browsers
- [ ] **NEW:** Supabase tables created ✓
- [ ] **NEW:** Supabase credentials in constants.js ✓
- [ ] **NEW:** Data syncing verified ✓

For detailed checklist, see **PRE-DEPLOYMENT-CHECKLIST.md**

---

## **🗄️ Database Integration: Supabase**

This portfolio now uses **Supabase PostgreSQL database** for cloud storage!

### **Key Features:**
- ✅ 500MB free storage (generous for portfolio)
- ✅ Real-time data sync across devices
- ✅ Automatic cloud backup
- ✅ Secure REST API
- ✅ Offline-first with localStorage fallback

### **How It Works:**
1. Data saves to **localStorage** first (instant display)
2. Automatically syncs to **Supabase** (cloud backup)
3. On next page load, fetches latest data from cloud
4. Works offline - syncs when back online

### **Your Credentials (Already Configured):**
```javascript
// In constants.js
const SUPABASE_CONFIG = {
  URL: 'https://yfnqnoukvcnraugtkekj.supabase.co',
  KEY: 'sb_publishable_EIgGw1INPhP-npJoINoVwQ_ZR0cWi0X',
  ENABLED: true
}
```

### **Tables in Database:**
- `certifications` - All certifications
- `experience` - Work experience
- `projects` - Portfolio projects

### **For More Details:**
See **SUPABASE-SETUP.md** for complete guide.

---

## **Deployment Options**

### **Option 1: Vercel (Recommended - Free, Fast)**

**Pros:**
- Zero configuration
- Auto-deploys on git push
- Free SSL certificate
- Excellent performance
- CDN included

**Steps:**
1. Create account at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Run: `vercel`
4. Follow prompts
5. Connect custom domain (optional)

**Via GitHub:**
1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import GitHub repository
4. Deploy

---

### **Option 2: Netlify (Free, Simple)**

**Pros:**
- User-friendly dashboard
- Git integration
- Form handling available
- Free SSL
- Custom domain support

**Steps:**
1. Create account at [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Select GitHub repo
4. Leave build settings empty (static site)
5. Deploy

**Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy
```

---

### **Option 3: GitHub Pages (Free)**

**Pros:**
- Built-in GitHub integration
- Simple setup
- Free hosting
- Good for portfolio

**Steps:**
1. Ensure repo is public
2. Go to Settings → Pages
3. Select source: `main` branch
4. Click Save
5. Wait for deployment (1-2 minutes)

**Custom Domain:**
1. Go to Settings → Pages
2. Enter custom domain
3. Update DNS records at your registrar:
   - Type: `A`
   - Value: `185.199.108.153`

---

### **Option 4: Self-Hosted (Advanced)**

**Pros:**
- Full control
- No platform restrictions
- Custom server setup

**Servers:**
- Shared hosting (Bluehost, HostGator)
- VPS (DigitalOcean, Linode)
- Own server

**FTP Upload:**
```bash
# Using SFTP
sftp user@yourdomain.com
put -r ./* /public_html/
```

---

## **Domain Setup**

### **Registrars:**
- Namecheap
- GoDaddy
- Google Domains
- CloudFlare

### **DNS Configuration:**

For Vercel:
```
Type: CNAME
Name: www
Value: cname.vercel.dns
TTL: 3600
```

For GitHub Pages:
```
Type: A
Value: 185.199.108.153
```

---

## **Post-Deployment**

### **Verify**
- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Links work properly
- [ ] Images display
- [ ] Mobile responsive
- [ ] Admin mode works
- [ ] Contact form functions

### **Monitor**
- Check for console errors (F12)
- Monitor performance
- Test across browsers
- Mobile testing

### **SEO Setup**
1. Submit to Google Search Console
2. Submit to Bing Webmaster Tools
3. Add sitemap.xml to robots.txt
4. Verify robots.txt accessible

---

## **SSL Certificate**

All deployment options above include **free SSL certificates** (HTTPS).

Verify:
- URL starts with `https://`
- Green lock icon in browser
- No "not secure" warnings

---

## **Performance Optimization**

### **Caching Headers**
```
Cache-Control: public, max-age=31536000
```

### **Compression**
- Gzip enabled on all platforms
- CSS/JS minified
- Images optimized

### **CDN**
- Vercel: Automatic CDN
- Netlify: Automatic CDN
- GitHub Pages: CloudFlare CDN (optional)

---

## **Troubleshooting**

### **Site Not Loading**
- Check domain DNS settings
- Verify file permissions
- Check build logs
- Clear browser cache

### **Assets Not Displaying**
- Verify relative paths (use `./assets/`)
- Check file names (case-sensitive)
- Inspect Network tab (F12)

### **Admin Mode Not Working**
- Check browser console for errors
- Verify localStorage enabled
- Clear session storage
- Try incognito mode

### **Contact Form Issues**
- Verify email address correct
- Check email client installed
- Test on different browser
- Check spam folder

---

## **Update Process**

### **Pull Updates**
```bash
git pull origin main
```

### **Deploy Changes**
- Vercel: Auto-deploys on push
- Netlify: Auto-deploys on push
- GitHub Pages: Auto-deploys on push
- Manual: Re-upload via FTP

---

## **Security Best Practices**

1. **Admin Password**
   - Change from default
   - Use strong password
   - Encode in constants.js

2. **Contact Information**
   - Email won't be exposed (uses mailto:)
   - Phone private
   - No form data stored

3. **HTTPS**
   - Always use HTTPS
   - Verify SSL certificate
   - Never disable SSL

4. **Updates**
   - Keep repo private if storing secrets
   - Don't commit .env files
   - Review code before pushing

---

## **Support**

For deployment issues:
- Check platform documentation
- Review console errors (F12)
- Test locally first
- Clear cache/cookies

---

**Last Updated:** April 18, 2026

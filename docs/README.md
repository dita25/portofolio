# 👋 Dita Anggraini's Portfolio

A modern, responsive portfolio website showcasing data analysis projects, certifications, and professional experience. Built with vanilla HTML, CSS, and JavaScript with admin capabilities for content management.

**Live Demo:** [ditaanggraini.com](https://ditaanggraini.com)

---

## ✨ Features

### 🎨 **Design & UX**
- ✅ Minimalist, clean design with professional aesthetic
- ✅ Dark mode support with system preference detection
- ✅ Fully responsive (mobile-first approach)
- ✅ Smooth animations and transitions
- ✅ Accessibility-focused (WCAG compliance)

### 🛠️ **Functionality**
- ✅ Admin Mode with password protection
- ✅ Dynamic content management (CRUD operations)
- ✅ Local Storage persistence
- ✅ Image compression optimization
- ✅ Modal-based editing interface
- ✅ Real-time form validation
- ✅ Lazy loading for images

### 📊 **Pages**
- **Home** - Hero section, skills, and highlights
- **Experience** - Work history and education timeline
- **Projects** - Portfolio of completed projects with filtering
- **Certifications** - Professional certifications and training
- **Contact** - Contact information and links

---

## 🏗️ Project Structure

```
portfolio/
├── index.html              # Home page
├── experience.html         # Experience & Education
├── projects.html           # Portfolio projects
├── certifications.html     # Certifications & Training
├── contact.html            # Contact page
├── style.css               # Main stylesheet
├── shared.js               # Shared utilities & components
├── constants.js            # Configuration & constants
├── robots.txt              # SEO sitemap configuration
├── sitemap.xml             # XML sitemap for SEO
├── .gitignore              # Git ignore rules
├── assets/
│   ├── cv-dita.pdf         # Curriculum Vitae
│   └── profile.png         # Profile photo
└── README.md               # This file
```

---

## 🚀 Getting Started

### **Local Development**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dita25/portfolio.git
   cd portfolio
   ```

2. **Open with Live Server (VS Code):**
   - Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
   - Right-click on `index.html` → "Open with Live Server"

3. **Or open directly in browser:**
   ```bash
   # Drag and drop index.html into browser
   # Or double-click index.html
   ```

### **Admin Mode**

1. Open any page
2. Press `Ctrl + Shift + A`
3. Enter password: `dita2025`
4. Edit content directly on the page

---

## 🔐 Admin Features

### Password Management
- Password is encoded in `constants.js`
- Change password in `constants.js` → `ADMIN_CONFIG.PASSWORD_ENCODED`
- Encode new password: `btoa('your-new-password')`

### Content Management
Each page has admin features:
- **Home**: Edit hero info, bio, skills, stats
- **Experience**: Add/edit work experience and education
- **Projects**: Create and manage portfolio projects
- **Certifications**: Add certifications and manage languages
- **Contact**: View contact information

---

## 🔧 Technical Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage:** Browser Local Storage API
- **Fonts:** Google Fonts (Playfair Display, DM Sans)
- **Optimization:** Image compression, lazy loading, minified assets
- **SEO:** Meta tags, Open Graph, structured data, sitemap.xml, robots.txt

---

## 📈 SEO & Performance

- ✅ Optimized meta tags on all pages
- ✅ Open Graph tags for social media sharing
- ✅ XML sitemap for search engines
- ✅ robots.txt for crawler guidance
- ✅ Responsive design (mobile-first)
- ✅ Image lazy loading
- ✅ Font optimization with `font-display: swap`

---

## 🎯 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ IE11 (limited support - no image compression)

---

## 📝 Customization

### **Change Site Information**
Edit `constants.js` and update:
- `STORAGE_KEYS` for custom storage
- `ERROR_MESSAGES` & `SUCCESS_MESSAGES` for translations
- `ASSETS` for image/PDF paths

### **Update Contact Information**
Edit `contact.html` and update:
- Email address
- Phone number
- Social media links
- CV download path

### **Modify Colors**
Edit `style.css` and change CSS variables in `:root`:
```css
:root {
  --bg: #fff;           /* Background */
  --txt: #0d0d0d;       /* Text */
  --acc: #0d0d0d;       /* Accent */
  /* ... other colors ... */
}
```

---

## 🚢 Deployment

### **Deploy to Vercel (Recommended)**
1. Push to GitHub
2. Connect Vercel to GitHub repository
3. Auto-deploy on push

```bash
# Or deploy via CLI
npm i -g vercel
vercel
```

### **Deploy to Netlify**
1. Push to GitHub
2. Connect Netlify to GitHub
3. Configure build: (leave empty for static sites)

### **Deploy to GitHub Pages**
```bash
git push origin main
# Enable GitHub Pages in repository settings
# Choose `main` branch as source
```

---

## ⚠️ Important Notes

### **Security**
- Admin password is encoded but NOT encrypted
- For production, consider backend authentication
- Never commit sensitive credentials to public repos
- Always use HTTPS on deployed sites

### **Storage Limitations**
- Browser localStorage has ~5-10MB limit
- Large images may exceed quota
- Images are auto-compressed to manage size
- Periodically backup important data

### **Mobile Optimization**
- Test on various devices
- Font size 16px on inputs (prevents iOS zoom)
- Hamburger menu auto-closes after navigation
- Responsive images with lazy loading

---

## 🐛 Troubleshooting

### **Data Not Saving**
1. Check browser console (F12)
2. Verify localStorage is enabled
3. Clear cache and reload
4. Check localStorage quota usage

### **Images Not Loading**
1. Verify image paths are relative
2. Check file size (max 2MB)
3. Ensure files exist in `/assets/` folder
4. Test on different browsers

### **Admin Mode Not Working**
1. Press `Ctrl + Shift + A` correctly
2. Clear session storage: `sessionStorage.clear()`
3. Reload page
4. Try again with correct password

---

## 📞 Contact & Links

- **Email:** ditaanggraini173@gmail.com
- **LinkedIn:** [linkedin.com/in/dita-anggraini](https://linkedin.com/in/dita-anggraini-5b5807343)
- **GitHub:** [github.com/dita25](https://github.com/dita25)
- **Phone:** +62 810-0754-8121

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- Google Fonts for typography
- Modern CSS best practices
- Web accessibility guidelines (WCAG)
- Community feedback and testing

---

**Last Updated:** April 18, 2026  
**Version:** 2.0

# 📚 Quick Start Guide

Get the premium car rental template up and running in minutes.

## 5-Minute Setup

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/premium-car-rental.git
cd premium-car-rental
```

### Step 2: Start Local Server
```bash
# Option A: Python
python3 -m http.server 8000

# Option B: Node.js
npx http-server

# Option C: PHP
php -S localhost:8000
```

### Step 3: Open in Browser
```
http://localhost:8000
```

✅ **Done!** Site should load with all features working.

---

## Common Customizations

### Change Company Name
Edit `index.html`:
```html
<h1 class="company-name-header">Your Company Name</h1>
```

### Change Logo
Replace file: `assets/images/logo.png`

### Update Contact Info
Edit `index.html`:
```html
<a href="mailto:your@email.com">Email</a>
<a href="tel:+1234567890">Phone</a>
```

### Configure Form Endpoint
Edit `assets/js/config.js`:
```javascript
FORM_SUBMISSION: '/api/method/your_module.your_function'
```

### Update Partner Logos
Edit `assets/data/partners.csv`:
```csv
name,logo,description
Your Partner,https://url/logo.png,Description
```

---

## File Structure Explained

```
├── index.html              ← Main page
├── assets/
│   ├── css/styles.css      ← All styling
│   ├── js/
│   │   ├── config.js       ← Settings (API endpoint, form settings)
│   │   └── script.js       ← Main functionality
│   ├── data/
│   │   └── partners.csv    ← Partner logos (edit this)
│   └── images/             ← Your images (replace these)
├── .env.example            ← Environment variables template
├── .gitignore              ← Files to exclude from Git
└── README.md               ← Full documentation
```

---

## Development Workflow

### 1. Make Changes
- Edit HTML in `index.html`
- Edit styles in `assets/css/styles.css`
- Edit scripts in `assets/js/script.js`

### 2. Test in Browser
- Refresh page (Ctrl+R or Cmd+R)
- Check mobile view (F12 → Toggle device toolbar)
- Open console (F12) for errors

### 3. Commit Changes
```bash
git add .
git commit -m "Describe your changes"
git push origin main
```

---

## JavaScript Modules Explained

### `config.js` - Configuration
```javascript
CONFIG = {
    API: {
        BASE_URL: window.location.origin,
        FORM_SUBMISSION: '/api/submit',  // ← Change this
        TIMEOUT: 30000
    }
}
```

### `script.js` - Main Functions

**ParticleAnimation** - Background animations
```javascript
new ParticleAnimation('particleCanvas');
```

**LanguageManager** - EN/AR language toggle
```javascript
languageManager = new LanguageManager();
languageManager.toggle(); // Switch language
```

**PartnerLoader** - Load logos from CSV
```javascript
const loader = new PartnerLoader('assets/data/partners.csv');
await loader.loadPartners();
```

**FormHandler** - Form validation & submission
```javascript
new FormHandler('supportForm');
```

---

## Styling Quick Reference

### Main Colors
- Primary Green: `#22c55e`
- Dark Green: `#16a34a`
- Background: `#1a1a1a`

### Edit Colors
Search for these hex values in `assets/css/styles.css` and replace.

### Fonts
- Headings: `Inter` (sans-serif)
- Body: `Inter` (sans-serif)
- Quotes: `Dancing Script` (cursive)
- Arabic: `Cairo` (custom font)

Edit font imports in `index.html` `<head>` if needed.

---

## Language Support

### Add New Language

1. **Add data attributes in HTML:**
```html
<h1 data-en="English Text" data-ar="Arabic Text">English Text</h1>
```

2. **Update language manager in `script.js`:**
```javascript
const languages = ['en', 'ar', 'es', 'fr'];
```

3. **Add to config:**
```javascript
LANGUAGE: {
    DEFAULT: 'en',
    SUPPORTED: ['en', 'ar', 'es', 'fr']
}
```

---

## Form Submission

### Test Locally
```bash
# Start a simple backend
python3 -c "
import http.server
import json

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        data = json.loads(self.rfile.read(int(self.headers['Content-Length'])))
        print('Form Data:', data)
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'success': True}).encode())

http.server.HTTPServer(('localhost', 3000), Handler).serve_forever()
"
```

Then update endpoint in `config.js`:
```javascript
FORM_SUBMISSION: 'http://localhost:3000/submit'
```

### Deploy Form
See `DEPLOYMENT.md` for backend setup instructions.

---

## Security Checklist Before Sharing

- [ ] No API keys in code
- [ ] No passwords in code
- [ ] `config.js` has placeholders only
- [ ] `.env` file NOT committed
- [ ] `.gitignore` properly configured
- [ ] Removed all test/demo data
- [ ] No console.log() with secrets

---

## Troubleshooting

### Site won't load
```bash
# Check file exists
ls -la index.html

# Check permissions
chmod 644 index.html

# Check server running
curl http://localhost:8000
```

### Form doesn't submit
```bash
# Check console errors (F12 → Console)
# Check API endpoint in config.js
# Verify backend is running
# Check browser network tab
```

### Language toggle not working
```bash
# Check localStorage enabled
# Check data-en and data-ar attributes exist
# Verify script.js loaded
```

### Images not loading
```bash
# Check file paths are relative
# Check images exist: ls -la assets/images/
# Check image format supported
```

---

## Next Steps

1. **Read Full Documentation:** `README.md`
2. **Security Review:** `SECURITY.md`
3. **Deployment Guide:** `DEPLOYMENT.md`
4. **Customize Design:** Edit `assets/css/styles.css`
5. **Setup Backend:** See form submission section
6. **Deploy Live:** Choose hosting platform

---

## Command Cheatsheet

```bash
# Start server
python3 -m http.server 8000

# Git commands
git add .
git commit -m "message"
git push origin main

# Check file permissions
ls -la assets/

# Open DevTools
F12 or Cmd+Option+I (Mac)

# Clear cache
Ctrl+Shift+Delete (Chrome)
Cmd+Shift+Delete (Mac)
```

---

## Need Help?

1. Check `README.md` for comprehensive guide
2. Review `SECURITY.md` for security practices
3. Check `DEPLOYMENT.md` for deployment options
4. Look for comments in code files
5. Check browser console for errors

---

**Ready to build? Start customizing and make it your own! 🚀**

# Premium Car Rental Website Template

A professional, responsive, and feature-rich website template for car rental services. Built with vanilla HTML5, CSS3, and JavaScript—no frameworks required.

## ✨ Features

- **Responsive Design** - Mobile-first approach, works on all devices
- **Bilingual Support** - English (EN) and Arabic (AR) with RTL support
- **Modern Animations** - Particle effects, smooth transitions, and glowing elements
- **Contact Form** - Fully validated with honeypot bot protection
- **Dynamic Partner Logos** - Load partners from CSV file
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Accessibility** - WCAG compliant, keyboard navigation support
- **Production-Ready** - Modular code structure, best practices
- **Zero Dependencies** - No external libraries needed

## 🚀 Quick Start

### Prerequisites
- Basic text editor (VS Code, Sublime, etc.)
- Git (for version control)
- Web server (optional, for local testing)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/premium-car-rental.git
cd premium-car-rental
```

2. **Open in your browser:**
```bash
# Option 1: Direct file (limited functionality)
open index.html

# Option 2: Using Python (recommended)
python3 -m http.server 8000

# Option 3: Using Node.js http-server
npx http-server

# Then visit: http://localhost:8000
```

## 📁 Project Structure

```
premium-car-rental/
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css        # All styling
│   ├── js/
│   │   ├── config.js         # Configuration & settings
│   │   └── script.js         # Main functionality
│   ├── data/
│   │   └── partners.csv      # Partner logos data
│   └── images/
│       ├── logo.png          # Company logo
│       ├── about-1.jpg       # About section images
│       ├── about-2.jpg
│       └── about-3.jpg
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
├── README.md                # This file
└── SECURITY.md              # Security guidelines
```

## ⚙️ Configuration

### Basic Setup

1. **Update Company Information in `index.html`:**

```html
<!-- Change these elements -->
<h1 class="company-name-header">Your Company Name</h1>
<img src="assets/images/logo.png" alt="Your Company">

<!-- Update contact links -->
<a href="mailto:info@yourcompany.com">Email</a>
<a href="tel:+1234567890">Phone</a>
```

2. **Configure API Endpoint in `assets/js/config.js`:**

```javascript
const CONFIG = {
    API: {
        BASE_URL: window.location.origin,
        // Change this to your actual API endpoint
        FORM_SUBMISSION: '/api/method/your_app.your_module.submit_inquiry',
        TIMEOUT: 30000
    }
};
```

3. **Update Partner Logos in `assets/data/partners.csv`:**

```csv
name,logo,description
Your Partner 1,https://yourcompany.com/logo1.png,Partner description
Your Partner 2,https://yourcompany.com/logo2.png,Partner description
```

### Advanced Configuration

See `.env.example` for all available environment variables:

```bash
cp .env.example .env
```

Then edit `.env` with your specific settings.

## 🔐 Security Guidelines

⚠️ **CRITICAL: Never commit sensitive data to Git!**

### What NOT to Include in Code

- ❌ API Keys or Secret Tokens
- ❌ Database Passwords
- ❌ Internal IP Addresses
- ❌ Private API Endpoints
- ❌ Authentication Credentials

### How to Handle Sensitive Data

1. **Create `.env` file** (NOT committed):
```bash
echo ".env" >> .gitignore
cp .env.example .env
```

2. **Use Environment Variables** in your backend, not frontend.

3. **Server-Side API Calls** - Never expose direct API calls to public endpoints:

```javascript
// ❌ DON'T DO THIS (exposed)
const response = await fetch('https://internal-api.company.com/submit', {
    body: JSON.stringify(data)
});

// ✅ DO THIS (use relative path)
const response = await fetch('/api/submit', {
    body: JSON.stringify(data)
});
```

4. **GitHub Secrets** - For CI/CD pipelines:
```yaml
# In GitHub Actions
- name: Deploy
  env:
    API_KEY: ${{ secrets.API_KEY }}
    DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
  run: npm deploy
```

## 🎨 Customization

### Colors

Edit CSS variables in `assets/css/styles.css`:

```css
/* Green theme (default) */
--primary-color: #22c55e;
--primary-dark: #16a34a;
--primary-light: #bbf7d0;

/* To change theme, modify hex colors */
```

### Fonts

Update in `index.html` head:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
```

### Content

- **Hero Section** - Edit `<section class="hero">`
- **Features** - Edit `<section class="features">`
- **About Section** - Edit `<section class="about-us-section">`
- **Contact** - Update email/phone in `<section class="contact-section">`

## 📝 Form Submission

The contact form requires a backend endpoint to handle submissions.

### Backend Requirements

Your API endpoint should:

1. **Accept POST requests** with JSON body:
```json
{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "subject": "booking",
    "message": "I would like to rent a car..."
}
```

2. **Return JSON response**:
```json
{
    "success": true,
    "inquiry_id": "INQ-2025-001",
    "message": "Your inquiry has been received"
}
```

3. **Validate and sanitize** all input
4. **Send confirmation emails** to user and admin
5. **Log submissions** to database
6. **Implement rate limiting** to prevent spam

### Example Implementations

**Python/Flask:**
```python
@app.route('/api/submit', methods=['POST'])
def submit_inquiry():
    data = request.json
    # Validate data
    # Save to database
    # Send email
    return jsonify({'success': True, 'inquiry_id': '...'})
```

**Node.js/Express:**
```javascript
app.post('/api/submit', (req, res) => {
    const { fullName, email, phone, subject, message } = req.body;
    // Validate data
    // Save to database
    // Send email
    res.json({ success: true, inquiry_id: '...' });
});
```

**PHP:**
```php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    // Validate and process
    // Save to database
    // Send email
    echo json_encode(['success' => true, 'inquiry_id' => '...']);
}
```

## 🌐 Deployment

### Hosting Options

1. **GitHub Pages** (Static only, no form submission)
```bash
# Enable GitHub Pages in repository settings
# Deploy from main branch /root directory
```

2. **Netlify** (Recommended for forms)
```bash
npm install -g netlify-cli
netlify deploy --prod
```

3. **Vercel**
```bash
npm install -g vercel
vercel --prod
```

4. **Traditional Hosting**
- Upload files via FTP
- Configure domain DNS
- Set up SSL certificate

### Pre-Deployment Checklist

- [ ] Update all company information
- [ ] Replace placeholder images
- [ ] Configure API endpoint
- [ ] Test form submission
- [ ] Check mobile responsiveness
- [ ] Verify language toggle works
- [ ] Optimize images for web
- [ ] Add favicon
- [ ] Set up email notifications
- [ ] Configure analytics (optional)
- [ ] Review security guidelines

## 📱 Responsive Breakpoints

- **Mobile:** 480px and below
- **Tablet:** 768px to 1024px
- **Desktop:** 1025px and above

Test using browser DevTools (F12) or physical devices.

## ♿ Accessibility

Website includes:
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast ratios (WCAG AA)
- Alt text for images
- Focus indicators

## 🔍 SEO

Pre-optimized with:
- Meta descriptions
- Open Graph tags (social sharing)
- Structured data
- Mobile-friendly viewport
- Fast loading performance

Add your own meta tags in `<head>`:
```html
<meta name="description" content="Your meta description">
<meta property="og:image" content="https://yoursite.com/preview.jpg">
```

## 📊 Analytics (Optional)

Add Google Analytics in `assets/js/script.js`:

```javascript
// Add your Google Analytics script
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
```

## 🐛 Troubleshooting

### Form not submitting
- Check browser console for errors (F12 → Console)
- Verify API endpoint URL
- Check CORS headers on backend
- Ensure form fields are filled correctly

### Images not loading
- Check file paths (relative vs absolute)
- Verify image files exist in `assets/images/`
- Use browser DevTools to inspect network requests

### Language toggle not working
- Clear browser cache
- Check localStorage in DevTools
- Verify data-en and data-ar attributes exist

### Styling issues
- Clear CSS cache (Ctrl+Shift+Delete)
- Check CSS file is linked correctly
- Inspect element to debug styles

## 💡 Tips & Best Practices

1. **Always use HTTPS** in production
2. **Minify CSS/JS** before deployment
3. **Compress images** using tools like TinyPNG
4. **Test on real devices** not just browsers
5. **Keep backups** of your code
6. **Monitor form submissions** for issues
7. **Update content regularly** for SEO
8. **Use CDN** for faster delivery

## 📄 License

This template is provided as-is for use in your projects.

## 🤝 Contributing

Found a bug? Have suggestions? Feel free to:
1. Open an issue
2. Submit a pull request
3. Share feedback

## 📧 Support

For questions or issues:
- Check this README first
- Review the code comments
- Check browser console for errors
- Open a GitHub issue

## 🔄 Version History

**v1.0.0** (2025-01-09)
- Initial release
- Bilingual support (EN/AR)
- Responsive design
- Contact form
- Partner logos loader

---

**Happy coding! 🎉**

*This template is production-ready and secure. Follow the security guidelines to keep it that way.*

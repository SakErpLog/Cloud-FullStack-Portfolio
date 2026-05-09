# 🔐 Security Guidelines

## Critical Security Rules

### ⛔ NEVER Commit These to GitHub

1. **API Keys & Tokens**
   ```javascript
   // ❌ WRONG - Never do this
   const API_KEY = "sk_live_abc123xyz789";
   const TOKEN = "ghp_abc123xyz789";
   ```

2. **Database Credentials**
   ```
   DATABASE_URL=postgresql://user:password@host:port/db
   DB_PASSWORD=MySecurePassword123
   ```

3. **Private API Endpoints**
   ```
   INTERNAL_API_URL=https://internal.company.com:8443/api
   ADMIN_PANEL_URL=https://admin.company.internal/panel
   ```

4. **Authentication Secrets**
   ```
   JWT_SECRET=my-super-secret-key-12345
   SESSION_SECRET=another-secret-key
   ENCRYPTION_KEY=e2e5f6c8a1b9d3f7
   ```

5. **Personal Information**
   - Employee emails
   - Phone numbers
   - Home addresses
   - Social Security numbers
   - License plate information

6. **Environment Variables**
   - Database URLs with passwords
   - API URLs
   - Service credentials
   - File paths to sensitive files

### ✅ DO Use These Practices

1. **Environment Variables (.env file)**
   ```bash
   # .env file (NEVER commit this)
   API_ENDPOINT=/api/submit
   COMPANY_EMAIL=public@company.com
   SUPPORT_PHONE=+1-555-000-0000
   ```

2. **GitHub Secrets (for CI/CD)**
   ```yaml
   # Settings → Secrets → New Repository Secret
   - API_KEY
   - DATABASE_URL
   - DEPLOY_KEY
   ```

3. **Backend Server Configuration**
   ```bash
   # On server only (.env or config files)
   export STRIPE_KEY="sk_live_..."
   export DB_PASSWORD="complex_password"
   ```

## File-by-File Security Checklist

### ✅ Safe to Commit
- `index.html` - No sensitive data
- `assets/css/styles.css` - Styling only
- `.gitignore` - What NOT to commit
- `README.md` - Documentation
- `SECURITY.md` - This file
- Public images and logos

### ⚠️ Requires Review Before Committing
- `assets/js/config.js` - Check for hardcoded API URLs
- `assets/js/script.js` - Verify no console.log() with secrets
- `.env.example` - Template ONLY, actual .env excluded

### ❌ Never Commit
- `.env` - Environment variables with actual values
- `.env.local` - Local configuration
- API keys in any file
- Database connection strings with passwords
- Private SSL certificates
- Database backups
- Log files with sensitive data

## Git Configuration

### 1. Create .gitignore

```bash
# Create .gitignore file in project root
cat > .gitignore << 'EOF'
# Environment variables
.env
.env.local
.env.*.local
env.json

# Dependencies
node_modules/
package-lock.json
yarn.lock

# IDE
.vscode/
.idea/
*.swp
*.swo
*.sublime-workspace

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Build files
dist/
build/

# Database
*.db
*.sqlite
*.sqlite3

# Backups
*.backup
*.bak
*.sql

# API Keys (if stored locally)
**/secrets/*
**/credentials/*

# Sensitive config files
config.prod.js
config.live.js
EOF
```

### 2. Configure Git

```bash
# Set git to use global gitignore
git config --global core.excludesFile ~/.gitignore_global

# Or for this project only
git config core.excludesFile .gitignore
```

### 3. Stop Tracking Already Committed Files

```bash
# Remove .env from git history (if accidentally committed)
git rm --cached .env
git commit -m "Remove .env file from tracking"

# Add to .gitignore
echo ".env" >> .gitignore
git commit -am "Add .env to gitignore"
```

## Form Security

### Client-Side Validation
```javascript
// ✅ Safe: Client-side validation for UX
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### Honeypot Field (Bot Detection)
```html
<!-- Hidden from users, catches bots -->
<input type="text" name="website" style="display:none" />
```

### Phone Number Validation
```javascript
// ✅ Generic validation (no country-specific exposure)
const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
```

### Backend Requirements

**Always validate on backend:**
```javascript
// ❌ NEVER trust client-side validation
// ✅ Always re-validate on server
function validateFormData(data) {
    // Check email format
    // Check phone format
    // Check message length
    // Check for SQL injection
    // Sanitize HTML
}
```

## API Endpoint Security

### Use Relative Paths
```javascript
// ✅ GOOD - Doesn't expose internal URL
fetch('/api/submit', { method: 'POST' })

// ❌ BAD - Exposes internal infrastructure
fetch('https://internal.company.com:8443/api/submit', { method: 'POST' })
```

### Backend Should Handle
1. **Authentication** - Verify user identity
2. **Authorization** - Check permissions
3. **Rate Limiting** - Prevent spam
4. **Input Validation** - Sanitize data
5. **HTTPS Only** - Encrypt in transit
6. **CORS Policy** - Restrict origins
7. **Logging** - Track suspicious activity

## Company-Specific Data Protection

### For Etihad Company Example
- ❌ Don't include actual company phone numbers in frontend code
- ❌ Don't expose database structure
- ❌ Don't reveal employee information
- ❌ Don't show admin panel URLs
- ✅ Use placeholder data in template
- ✅ Add real data via configuration files
- ✅ Store sensitive info on server only

## Secret Management for CI/CD

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy with secrets
        env:
          API_KEY: ${{ secrets.API_KEY }}
          DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
        run: |
          npm run build
          npm run deploy
```

### Set Secrets in GitHub
1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add secret name and value
4. Use in workflow with `${{ secrets.SECRET_NAME }}`

## Common Mistakes to Avoid

### ❌ Hardcoded API Keys
```javascript
// WRONG
const STRIPE_KEY = "sk_live_51234567890";
const API_KEY = "abc123xyz789";
```

### ❌ Exposed Database URLs
```javascript
// WRONG
const DB_URL = "mongodb://admin:password123@db.internal:27017/ecommerce";
```

### ❌ Console Logging Secrets
```javascript
// WRONG
console.log("API Key:", apiKey);
console.log("User Token:", token);
```

### ❌ Comments with Sensitive Data
```javascript
// WRONG
// To test, use: email: "admin@company.com", password: "Admin123!"
```

### ❌ Version Control Credentials
```bash
# WRONG - git history remembers this
git commit -m "Adding API key: sk_live_123..."
```

## Testing Safely

### Use Dummy Data
```javascript
// ✅ GOOD - Use fake data for testing
const testData = {
    fullName: "John Doe",
    email: "test@example.com",
    phone: "+1-555-000-0000"
};
```

### Use Test Endpoints
```javascript
// ✅ GOOD - Use sandbox/test API
const testApiUrl = "https://sandbox.example.com/api";
```

### Don't Use Production Secrets
```javascript
// ❌ WRONG
const prodKey = process.env.STRIPE_LIVE_KEY; // in frontend

// ✅ RIGHT
// Only use in backend/server
```

## Audit Checklist

Before deploying or sharing:

- [ ] No .env files committed
- [ ] No API keys in code
- [ ] No database passwords visible
- [ ] No internal URLs exposed
- [ ] No employee information visible
- [ ] Config.js has placeholder values
- [ ] .gitignore properly configured
- [ ] No console.log with sensitive data
- [ ] All secrets in environment variables
- [ ] Backend validates all form input
- [ ] HTTPS enforced in production
- [ ] Rate limiting implemented
- [ ] CORS properly configured

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [API Security](https://cheatsheetseries.owasp.org/cheatsheets/REST_Cheat_Sheet.html)

---

**Remember: When in doubt, don't commit it!** 🔐

If you accidentally commit a secret, immediately:
1. Rotate/invalidate the secret
2. Remove from git history
3. Create a new secret
4. Notify your security team

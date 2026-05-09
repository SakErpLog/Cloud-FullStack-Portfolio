/**
 * Premium Car Rental Website - Main Script
 * 
 * Features:
 * - Particle animation
 * - Language toggle (EN/AR)
 * - Form validation and submission
 * - Dynamic partner loading from CSV
 */

// ============================================
// PARTICLE ANIMATION
// ============================================

class ParticleAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        
        this.setCanvasSize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.setCanvasSize());
    }

    setCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        const numberOfParticles = 15;
        
        for (let i = 0; i < numberOfParticles; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.particles.push(new Particle(x, y));
        }
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.draw(this.ctx);
            particle.update(this.canvas);
        });
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.color = `rgba(34, 197, 94, ${Math.random() * 0.6 + 0.4})`;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    update(canvas) {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x - this.size < 0 || this.x + this.size > canvas.width) {
            this.vx = -this.vx;
            this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x));
        }
        if (this.y - this.size < 0 || this.y + this.size > canvas.height) {
            this.vy = -this.vy;
            this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y));
        }
    }
}

// Initialize particles on page load
window.addEventListener('DOMContentLoaded', () => {
    new ParticleAnimation('particleCanvas');
});

// ============================================
// LANGUAGE TOGGLE SYSTEM
// ============================================

class LanguageManager {
    constructor(storageKey = 'preferredLanguage') {
        this.storageKey = storageKey;
        this.currentLang = this.getSavedLanguage();
        this.init();
    }

    getSavedLanguage() {
        const saved = localStorage.getItem(this.storageKey);
        return saved || 'en';
    }

    init() {
        const html = document.documentElement;
        const lang = this.currentLang;
        
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        
        this.updateUI();
    }

    toggle() {
        this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
        this.init();
        localStorage.setItem(this.storageKey, this.currentLang);
    }

    updateUI() {
        const langText = this.currentLang === 'en' ? 'العربية' : 'English';
        const langElement = document.getElementById('langText');
        if (langElement) {
            langElement.textContent = langText;
        }
        
        this.updatePageText();
    }

    updatePageText() {
        document.querySelectorAll('[data-en]').forEach(el => {
            const text = el.getAttribute(`data-${this.currentLang}`);
            if (text) {
                el.textContent = text;
            }
        });
    }

    getCurrentLanguage() {
        return this.currentLang;
    }
}

// Create global language manager
let languageManager;
window.addEventListener('DOMContentLoaded', () => {
    languageManager = new LanguageManager();
});

// Global function for HTML onclick handler
function toggleLanguage() {
    if (languageManager) {
        languageManager.toggle();
    }
}

// ============================================
// PARTNER LOGOS LOADER
// ============================================

class PartnerLoader {
    constructor(csvPath = 'assets/data/partners.csv', gridId = 'partnersGrid') {
        this.csvPath = csvPath;
        this.gridId = gridId;
        this.partners = [];
    }

    async loadPartners() {
        try {
            const response = await fetch(this.csvPath);
            if (!response.ok) {
                throw new Error(`Failed to load CSV: ${response.statusText}`);
            }
            
            const csv = await response.text();
            this.parseCSV(csv);
            this.render();
        } catch (error) {
            console.warn('Could not load partners from CSV:', error);
            this.loadPlaceholders();
        }
    }

    parseCSV(csv) {
        const lines = csv.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            if (values[0]) { // Skip empty rows
                const partner = {};
                headers.forEach((header, index) => {
                    partner[header] = values[index] || '';
                });
                this.partners.push(partner);
            }
        }
    }

    loadPlaceholders() {
        // Create placeholder partners if CSV not available
        for (let i = 1; i <= 9; i++) {
            this.partners.push({
                name: `Partner ${i}`,
                logo: `https://placehold.co/180x100/2a2a2a/d1d5db?text=Partner+${i}`
            });
        }
    }

    render() {
        const grid = document.getElementById(this.gridId);
        if (!grid) return;
        
        grid.innerHTML = '';
        
        this.partners.forEach(partner => {
            const div = document.createElement('div');
            div.className = 'partner-logo';
            
            const img = document.createElement('img');
            img.src = partner.logo;
            img.alt = partner.name;
            img.onerror = () => {
                img.src = `https://placehold.co/180x100/2a2a2a/d1d5db?text=${encodeURIComponent(partner.name)}`;
            };
            
            div.appendChild(img);
            grid.appendChild(div);
        });
    }
}

// Load partners on page load
window.addEventListener('DOMContentLoaded', async () => {
    const partnerLoader = new PartnerLoader();
    await partnerLoader.loadPartners();
});

// ============================================
// FORM HANDLING & VALIDATION
// ============================================

class FormHandler {
    constructor(formId = 'supportForm') {
        this.form = document.getElementById(formId);
        if (!this.form) return;
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        const subjectSelect = this.form.querySelector('#subject');
        if (subjectSelect) {
            subjectSelect.addEventListener('change', (e) => this.handleSubjectChange(e));
        }
    }

    handleSubjectChange(event) {
        const select = event.target;
        if (select.value === '') {
            select.style.color = 'rgba(255, 255, 255, 0.5)';
            select.style.fontStyle = 'italic';
        } else {
            select.style.color = '#ffffff';
            select.style.fontStyle = 'normal';
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Check honeypot
        const honeypot = this.form.querySelector('#website');
        if (honeypot && honeypot.value) {
            console.warn('Bot detected via honeypot');
            return;
        }

        try {
            const formData = this.collectFormData();
            
            // Validate form data
            if (!this.validateForm(formData)) {
                return;
            }

            await this.submitForm(formData);
        } catch (error) {
            console.error('Form error:', error);
            this.showMessage(error.message || 'An error occurred', 'error');
        }
    }

    collectFormData() {
        return {
            fullName: this.form.querySelector('#fullName').value.trim(),
            email: this.form.querySelector('#email').value.trim(),
            phone: this.form.querySelector('#phone').value.trim(),
            subject: this.form.querySelector('#subject').value,
            message: this.form.querySelector('#message').value.trim()
        };
    }

    validateForm(data) {
        const lang = languageManager?.getCurrentLanguage() || 'en';
        const messages = {
            en: {
                nameRequired: '✗ Full name is required',
                emailInvalid: '✗ Please enter a valid email address',
                phoneInvalid: '✗ Please enter a valid phone number',
                subjectRequired: '✗ Please select a subject',
                messageRequired: '✗ Please enter a message'
            },
            ar: {
                nameRequired: '✗ الاسم الكامل مطلوب',
                emailInvalid: '✗ يرجى إدخال عنوان بريد إلكتروني صحيح',
                phoneInvalid: '✗ يرجى إدخال رقم هاتف صحيح',
                subjectRequired: '✗ يرجى تحديد الموضوع',
                messageRequired: '✗ يرجى إدخال الرسالة'
            }
        };

        const m = messages[lang];

        if (!data.fullName) {
            this.showMessage(m.nameRequired, 'error');
            return false;
        }

        if (!this.isValidEmail(data.email)) {
            this.showMessage(m.emailInvalid, 'error');
            return false;
        }

        if (!data.phone) {
            this.showMessage(m.phoneInvalid, 'error');
            return false;
        }

        if (!data.subject) {
            this.showMessage(m.subjectRequired, 'error');
            return false;
        }

        if (!data.message) {
            this.showMessage(m.messageRequired, 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async submitForm(formData) {
        const submitBtn = this.form.querySelector('.submit-btn');
        const loading = this.form.querySelector('#loading');

        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
        loading.classList.add('show');

        try {
            // Get API URL from config
            const apiUrl = getAPIUrl(CONFIG.API.FORM_SUBMISSION);
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData),
                signal: AbortSignal.timeout(CONFIG.API.TIMEOUT)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            
            if (data.success || (data.message && data.message.success)) {
                const lang = languageManager?.getCurrentLanguage() || 'en';
                const successMsg = lang === 'ar' 
                    ? `✓ تم إرسال طلبك بنجاح! رقم المرجع: ${data.inquiry_id || data.message?.inquiry_id || ''}`
                    : `✓ Your inquiry has been sent successfully! Reference ID: ${data.inquiry_id || data.message?.inquiry_id || ''}`;
                
                this.showMessage(successMsg, 'success');
                this.form.reset();
                
                // Reset subject field styling
                const subjectSelect = this.form.querySelector('#subject');
                if (subjectSelect) {
                    subjectSelect.style.color = 'rgba(255, 255, 255, 0.5)';
                    subjectSelect.style.fontStyle = 'italic';
                }
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (error) {
            const lang = languageManager?.getCurrentLanguage() || 'en';
            const errorMsg = lang === 'ar'
                ? `✗ حدث خطأ: ${error.message}. يرجى المحاولة مرة أخرى.`
                : `✗ Error: ${error.message}. Please try again or contact support.`;
            
            this.showMessage(errorMsg, 'error');
            console.error('Form submission error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            loading.classList.remove('show');
        }
    }

    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessages = this.form.parentNode.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());

        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';

        const styles = {
            success: {
                background: 'rgba(34, 197, 94, 0.2)',
                color: '#86efac',
                border: '2px solid #22c55e'
            },
            error: {
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#fca5a5',
                border: '2px solid #ef4444'
            },
            info: {
                background: 'rgba(59, 130, 246, 0.2)',
                color: '#93c5fd',
                border: '2px solid #3b82f6'
            }
        };

        const style = styles[type] || styles.info;

        messageDiv.style.cssText = `
            padding: 15px 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            font-weight: 600;
            text-align: center;
            background: ${style.background};
            color: ${style.color};
            border: ${style.border};
            display: block;
            animation: fadeInUp 0.5s ease;
        `;

        messageDiv.textContent = message;
        this.form.parentNode.insertBefore(messageDiv, this.form);

        // Auto-remove after delay
        const delay = type === 'success' ? CONFIG.FORM.MESSAGE_DURATION.SUCCESS : CONFIG.FORM.MESSAGE_DURATION.ERROR;
        setTimeout(() => {
            messageDiv.style.transition = 'opacity 0.5s ease';
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 500);
        }, delay);
    }
}

// Initialize form handler on page load
window.addEventListener('DOMContentLoaded', () => {
    new FormHandler('supportForm');
});

// ============================================
// SMOOTH SCROLLING
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// ============================================
// CONSOLE LOGGING (Development only)
// ============================================

if (IS_DEVELOPMENT) {
    console.log('%c🚀 Premium Car Rental Website Loaded', 'color: #22c55e; font-size: 14px; font-weight: bold;');
    console.log('%c📖 Documentation: Check README.md for setup instructions', 'color: #22c55e; font-size: 12px;');
}

/**
 * Configuration File
 * 
 * SECURITY WARNING: Never commit API keys, URLs, or credentials to GitHub
 * Use environment variables instead (see .env.example)
 * 
 * This file should NOT contain:
 * - API Keys
 * - Database URLs
 * - Secret Tokens
 * - Internal IP Addresses
 * 
 * If you need to use these, load them from:
 * - Environment variables (process.env in Node.js)
 * - GitHub Secrets (in CI/CD)
 * - Server-side configuration files (.env in root directory - ADD TO .gitignore)
 */

// ============================================
// API CONFIGURATION
// ============================================

const CONFIG = {
    // API Endpoints - IMPORTANT: Use your actual API URL
    // Load from environment variables for security
    API: {
        // Example: Use environment variable or default to relative path
        BASE_URL: window.location.origin,
        
        // IMPORTANT: Replace with your actual endpoint
        // DO NOT commit your internal API path to GitHub
        FORM_SUBMISSION: '/api/method/your_app.your_module.submit_inquiry',
        
        // Alternative: If using external API service
        // EXTERNAL_API: 'https://api.external-service.com',
        
        TIMEOUT: 30000 // 30 seconds
    },

    // Form Configuration
    FORM: {
        // Phone number validation patterns
        PHONE_PATTERNS: {
            // International format
            INTERNATIONAL: /^[+][1-9]\d{1,14}$/,
            // US format (example)
            US: /^(\+1)?[-.\s]?(\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
            // UK format (example)
            UK: /^(\+44|0)[1-9]\d{1,10}$/,
            // Generic: At least 10 digits
            GENERIC: /^[+]?[\d\s\-()]{10,}$/
        },
        
        // Default timeout for form submission
        SUBMIT_TIMEOUT: 30000,
        
        // Message display duration (milliseconds)
        MESSAGE_DURATION: {
            SUCCESS: 7000,
            ERROR: 5000
        }
    },

    // Language Configuration
    LANGUAGE: {
        DEFAULT: 'en',
        SUPPORTED: ['en', 'ar'],
        STORAGE_KEY: 'preferredLanguage'
    },

    // Security
    SECURITY: {
        // Enable honeypot field for bot detection
        HONEYPOT_ENABLED: true,
        // Rate limiting (requests per minute)
        RATE_LIMIT: 5,
        // Content Security Policy headers (configured on server)
        CSP_ENABLED: true
    },

    // Analytics (Optional)
    ANALYTICS: {
        ENABLED: false,
        // Replace with your Google Analytics ID
        GOOGLE_ANALYTICS_ID: '', // 'G-XXXXXXXXXXXXXXX'
        // Replace with your tracking ID
        TRACKING_ID: ''
    }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get API endpoint with optional parameters
 * @param {string} endpoint - The endpoint path
 * @returns {string} - Full API URL
 */
function getAPIUrl(endpoint) {
    return `${CONFIG.API.BASE_URL}${endpoint}`;
}

/**
 * Validate phone number based on country
 * @param {string} phone - Phone number to validate
 * @param {string} country - Country code (default: 'GENERIC')
 * @returns {boolean} - True if valid
 */
function validatePhoneNumber(phone, country = 'GENERIC') {
    const pattern = CONFIG.FORM.PHONE_PATTERNS[country.toUpperCase()];
    if (!pattern) {
        return CONFIG.FORM.PHONE_PATTERNS.GENERIC.test(phone.replace(/\s/g, ''));
    }
    return pattern.test(phone);
}

/**
 * Get configuration value safely
 * @param {string} path - Dot notation path (e.g., 'API.BASE_URL')
 * @returns {*} - Config value or null
 */
function getConfig(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], CONFIG);
}

// ============================================
// ENVIRONMENT DETECTION
// ============================================

const IS_DEVELOPMENT = !window.location.hostname.includes('.') || 
                       window.location.hostname === 'localhost';
const IS_PRODUCTION = window.location.protocol === 'https:';

// Log configuration in development
if (IS_DEVELOPMENT) {
    console.log('🔧 Configuration loaded:', CONFIG);
    console.log('📍 Environment:', IS_PRODUCTION ? 'Production' : 'Development');
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, getAPIUrl, validatePhoneNumber, getConfig };
}

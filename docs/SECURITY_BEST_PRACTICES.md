# Security & Best Practices

## 1. AUTHENTICATION SECURITY

### Token Management
```javascript
class AuthService {
  static setToken(token) {
    // Store in httpOnly cookie (if backend available)
    // For frontend-only: localStorage with expiration
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    localStorage.setItem('auth_token', token);
    localStorage.setItem('token_expires', expiresAt);
  }
  
  static getToken() {
    const token = localStorage.getItem('auth_token');
    const expires = localStorage.getItem('token_expires');
    
    if (!token || !expires) return null;
    
    if (Date.now() > parseInt(expires)) {
      this.clearToken();
      return null;
    }
    
    return token;
  }
  
  static clearToken() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('token_expires');
    localStorage.removeItem('user_profile');
  }
  
  static isAuthenticated() {
    return !!this.getToken();
  }
}
```

### Password Security
- Minimum 8 characters
- Require uppercase, lowercase, number
- Show password strength indicator
- Never store plain text passwords
- Implement rate limiting on login attempts
- Account lockout after failed attempts

### XSS Prevention
```javascript
// Sanitize user input
function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

// Use textContent instead of innerHTML
element.textContent = userInput; // Safe
// element.innerHTML = userInput; // Dangerous

// Sanitize before rendering
function renderReview(review) {
  return `
    <div class="review">
      <p>${sanitizeHTML(review.text)}</p>
    </div>
  `;
}
```

### CSRF Protection
- Use CSRF tokens for state-changing operations
- Validate origin headers
- SameSite cookie attribute

## 2. DATA VALIDATION

### Input Sanitization
```javascript
class Sanitizer {
  static string(input, maxLength = 255) {
    return String(input).trim().slice(0, maxLength);
  }
  
  static number(input, min = 0, max = Infinity) {
    const num = parseFloat(input);
    if (isNaN(num)) return min;
    return Math.max(min, Math.min(max, num));
  }
  
  static email(input) {
    return String(input).toLowerCase().trim();
  }
  
  static url(input) {
    try {
      const url = new URL(input);
      return url.href;
    } catch {
      return '';
    }
  }
}
```

### Server-Side Validation (Mock)
```javascript
// Always validate on server, even if validated on client
function validateProductData(data) {
  const errors = [];
  
  if (!data.title || data.title.length < 3) {
    errors.push('Title must be at least 3 characters');
  }
  
  if (!data.price || data.price < 0) {
    errors.push('Price must be positive');
  }
  
  if (!data.category) {
    errors.push('Category is required');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
```

## 3. PAYMENT SECURITY

### PCI Compliance
- Never store credit card numbers
- Use payment tokenization
- Implement 3D Secure
- SSL/TLS encryption
- PCI DSS compliance

### Payment Flow
```javascript
// Mock payment processing
class PaymentService {
  static async processPayment(paymentData) {
    // In production: Use Stripe, PayPal, etc.
    // Never handle raw card data
    
    const token = await this.tokenizeCard(paymentData.card);
    
    const response = await fetch('/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthService.getToken()}`
      },
      body: JSON.stringify({
        token,
        amount: paymentData.amount,
        currency: 'USD'
      })
    });
    
    return response.json();
  }
  
  static async tokenizeCard(cardData) {
    // Use payment gateway SDK
    // Return token, not raw card data
    return 'tok_' + Math.random().toString(36).substr(2);
  }
}
```

## 4. RATE LIMITING

### Client-Side Rate Limiting
```javascript
class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
  }
  
  canMakeRequest() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    if (this.requests.length >= this.maxRequests) {
      return false;
    }
    
    this.requests.push(now);
    return true;
  }
  
  getRemainingTime() {
    if (this.requests.length < this.maxRequests) return 0;
    
    const oldestRequest = Math.min(...this.requests);
    return this.timeWindow - (Date.now() - oldestRequest);
  }
}

// Usage
const searchLimiter = new RateLimiter(10, 60000); // 10 requests per minute

function performSearch(query) {
  if (!searchLimiter.canMakeRequest()) {
    const wait = Math.ceil(searchLimiter.getRemainingTime() / 1000);
    showToast(`Too many requests. Please wait ${wait} seconds.`, 'error');
    return;
  }
  
  // Perform search
}
```

## 5. CONTENT SECURITY POLICY

### CSP Headers
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://api.example.com;
  frame-src 'self' https://www.google.com https://www.facebook.com;
">
```

## 6. ERROR HANDLING

### Secure Error Messages
```javascript
class ErrorHandler {
  static handle(error, context) {
    // Log detailed error for debugging
    console.error('Error:', error, 'Context:', context);
    
    // Show user-friendly message (don't expose internals)
    const userMessage = this.getUserMessage(error);
    showToast(userMessage, 'error');
    
    // Send to error tracking service
    this.logToService(error, context);
  }
  
  static getUserMessage(error) {
    // Don't expose technical details
    const messages = {
      'NetworkError': 'Connection error. Please check your internet.',
      'ValidationError': 'Please check your input and try again.',
      'AuthError': 'Please log in to continue.',
      'NotFoundError': 'The requested item was not found.',
      'default': 'Something went wrong. Please try again.'
    };
    
    return messages[error.name] || messages.default;
  }
  
  static logToService(error, context) {
    // Send to error tracking (Sentry, LogRocket, etc.)
    // In production only
    if (process.env.NODE_ENV === 'production') {
      // Log error
    }
  }
}
```

## 7. ACCESSIBILITY (a11y)

### ARIA Labels
```html
<!-- Navigation -->
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<!-- Search -->
<form role="search">
  <label for="search">Search products</label>
  <input 
    id="search" 
    type="search" 
    aria-label="Search products"
    aria-describedby="search-help"
  />
  <span id="search-help" class="sr-only">
    Enter product name or category
  </span>
</form>

<!-- Buttons -->
<button 
  aria-label="Add to cart"
  aria-pressed="false"
>
  <svg aria-hidden="true"><!-- Icon --></svg>
  Add to Cart
</button>

<!-- Loading states -->
<div 
  role="status" 
  aria-live="polite" 
  aria-busy="true"
>
  Loading...
</div>

<!-- Modals -->
<div 
  role="dialog" 
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <h2 id="modal-title">Product Details</h2>
</div>
```

### Keyboard Navigation
```javascript
// Trap focus in modal
class FocusTrap {
  constructor(element) {
    this.element = element;
    this.focusableElements = element.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    this.firstFocusable = this.focusableElements[0];
    this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
  }
  
  activate() {
    this.element.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.firstFocusable.focus();
  }
  
  deactivate() {
    this.element.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }
  
  handleKeyDown(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === this.firstFocusable) {
          e.preventDefault();
          this.lastFocusable.focus();
        }
      } else {
        if (document.activeElement === this.lastFocusable) {
          e.preventDefault();
          this.firstFocusable.focus();
        }
      }
    }
    
    if (e.key === 'Escape') {
      this.close();
    }
  }
}
```

### Screen Reader Support
```css
/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Skip to main content */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

## 8. PERFORMANCE MONITORING

### Web Vitals
```javascript
// Monitor Core Web Vitals
function measureWebVitals() {
  // Largest Contentful Paint
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
  }).observe({ entryTypes: ['largest-contentful-paint'] });
  
  // First Input Delay
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log('FID:', entry.processingStart - entry.startTime);
    });
  }).observe({ entryTypes: ['first-input'] });
  
  // Cumulative Layout Shift
  let clsScore = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsScore += entry.value;
      }
    }
    console.log('CLS:', clsScore);
  }).observe({ entryTypes: ['layout-shift'] });
}
```

## 9. GDPR COMPLIANCE

### Cookie Consent
```javascript
class CookieConsent {
  static show() {
    const consent = localStorage.getItem('cookie_consent');
    if (consent) return;
    
    // Show consent banner
    const banner = document.createElement('div');
    banner.className = 'cookie-consent';
    banner.innerHTML = `
      <p>We use cookies to improve your experience.</p>
      <button onclick="CookieConsent.accept()">Accept</button>
      <button onclick="CookieConsent.decline()">Decline</button>
    `;
    document.body.appendChild(banner);
  }
  
  static accept() {
    localStorage.setItem('cookie_consent', 'accepted');
    this.hide();
    this.enableAnalytics();
  }
  
  static decline() {
    localStorage.setItem('cookie_consent', 'declined');
    this.hide();
  }
  
  static hide() {
    document.querySelector('.cookie-consent')?.remove();
  }
  
  static enableAnalytics() {
    // Enable Google Analytics, etc.
  }
}
```

### Data Privacy
- Privacy policy page
- Terms of service
- Data deletion requests
- Export user data
- Opt-out options
- Clear data retention policies

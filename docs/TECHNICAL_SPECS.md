# Technical Specifications

## 1. INTERNATIONALIZATION (i18n)

### Language Support
- English (LTR)
- Arabic (RTL)

### Implementation Strategy
```javascript
// Translation structure
const translations = {
  en: {
    nav: {
      home: 'Home',
      shop: 'Shop',
      about: 'About'
    },
    product: {
      addToCart: 'Add to Cart',
      outOfStock: 'Out of Stock'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      shop: 'المتجر',
      about: 'من نحن'
    },
    product: {
      addToCart: 'أضف إلى السلة',
      outOfStock: 'غير متوفر'
    }
  }
};

class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'en';
    this.translations = translations;
  }
  
  t(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];
    
    for (const k of keys) {
      value = value[k];
      if (!value) return key;
    }
    
    return value;
  }
  
  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.updatePage();
  }
  
  updatePage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });
  }
}
```

### RTL Considerations
- Mirror layout for Arabic
- Flip icons/arrows
- Text alignment
- Tailwind RTL utilities: `rtl:text-right`, `ltr:ml-4`
- CSS logical properties: `margin-inline-start` instead of `margin-left`

### HTML Structure
```html
<html lang="en" dir="ltr">
  <!-- Content -->
</html>

<!-- Arabic -->
<html lang="ar" dir="rtl">
  <!-- Content -->
</html>
```

## 2. THEME SYSTEM (Dark/Light Mode)

### Implementation
```javascript
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.apply();
  }
  
  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.apply();
  }
  
  apply() {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(this.theme);
    localStorage.setItem('theme', this.theme);
  }
  
  setTheme(theme) {
    this.theme = theme;
    this.apply();
  }
}
```

### CSS Variables
```css
:root {
  --color-primary: #e91e63;
  --color-secondary: #9c27b0;
  --color-background: #ffffff;
  --color-surface: #f5f5f5;
  --color-text: #212121;
  --color-text-secondary: #757575;
  --color-border: #e0e0e0;
}

.dark {
  --color-background: #121212;
  --color-surface: #1e1e1e;
  --color-text: #ffffff;
  --color-text-secondary: #b0b0b0;
  --color-border: #333333;
}
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        background: 'var(--color-background)',
        // ...
      }
    }
  }
}
```

## 3. ROUTING SYSTEM

### Client-Side Router
```javascript
class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    
    window.addEventListener('popstate', () => this.handleRoute());
    document.addEventListener('click', (e) => this.handleClick(e));
  }
  
  register(path, handler) {
    this.routes[path] = handler;
  }
  
  navigate(path, pushState = true) {
    if (pushState) {
      history.pushState({}, '', path);
    }
    this.handleRoute();
  }
  
  handleRoute() {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    
    // Match route
    for (const [route, handler] of Object.entries(this.routes)) {
      const match = this.matchRoute(route, path);
      if (match) {
        this.currentRoute = route;
        handler(match.params, params);
        return;
      }
    }
    
    // 404
    this.show404();
  }
  
  matchRoute(route, path) {
    const routeParts = route.split('/');
    const pathParts = path.split('/');
    
    if (routeParts.length !== pathParts.length) return null;
    
    const params = {};
    
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        params[routeParts[i].slice(1)] = pathParts[i];
      } else if (routeParts[i] !== pathParts[i]) {
        return null;
      }
    }
    
    return { params };
  }
  
  handleClick(e) {
    const link = e.target.closest('a[href]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (href.startsWith('http') || href.startsWith('#')) return;
    
    e.preventDefault();
    this.navigate(href);
  }
}

// Usage
const router = new Router();

router.register('/', () => renderHomePage());
router.register('/shop', () => renderShopPage());
router.register('/product/:id', (params) => renderProductPage(params.id));
router.register('/cart', () => renderCartPage());
// ...

router.handleRoute();
```

## 4. SEO OPTIMIZATION

### Meta Tags Management
```javascript
class SEO {
  static setTitle(title) {
    document.title = `${title} | Cosmetics Store`;
  }
  
  static setMeta(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  }
  
  static setOG(property, content) {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  }
  
  static setProductSchema(product) {
    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.title,
      "image": product.images,
      "description": product.description,
      "brand": {
        "@type": "Brand",
        "name": product.brand
      },
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": "USD",
        "availability": product.stock > 0 ? "InStock" : "OutOfStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating,
        "reviewCount": product.reviewCount
      }
    };
    
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }
}

// Usage on product page
SEO.setTitle(product.title);
SEO.setMeta('description', product.description);
SEO.setOG('og:title', product.title);
SEO.setOG('og:image', product.image);
SEO.setProductSchema(product);
```

### Semantic HTML
```html
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <!-- Nav items -->
  </nav>
</header>

<main role="main">
  <article>
    <h1>Product Title</h1>
    <!-- Content -->
  </article>
</main>

<aside role="complementary">
  <!-- Sidebar -->
</aside>

<footer role="contentinfo">
  <!-- Footer -->
</footer>
```

## 5. PERFORMANCE OPTIMIZATION

### Image Optimization
```javascript
// Lazy loading
<img 
  src="placeholder.jpg" 
  data-src="actual-image.jpg" 
  loading="lazy"
  alt="Product"
  class="lazy"
/>

// Lazy load implementation
const lazyImages = document.querySelectorAll('img.lazy');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));
```

### Responsive Images
```html
<picture>
  <source 
    media="(min-width: 1024px)" 
    srcset="product-large.webp"
    type="image/webp"
  />
  <source 
    media="(min-width: 768px)" 
    srcset="product-medium.webp"
    type="image/webp"
  />
  <img 
    src="product-small.jpg" 
    alt="Product"
    loading="lazy"
  />
</picture>
```

### Code Splitting
```javascript
// Dynamic imports for pages
async function loadPage(pageName) {
  const module = await import(`./pages/${pageName}.page.js`);
  module.render();
}
```

### Caching Strategy
```javascript
// Service Worker for offline support
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/css/main.css',
        '/js/app.js',
        '/assets/logo.svg'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

### Performance Metrics
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.8s
- Cumulative Layout Shift (CLS) < 0.1
- First Input Delay (FID) < 100ms

### Optimization Techniques
1. Minify CSS/JS
2. Compress images (WebP format)
3. Enable Gzip/Brotli compression
4. Use CDN for assets
5. Defer non-critical JS
6. Inline critical CSS
7. Preload key resources
8. Use font-display: swap
9. Reduce third-party scripts
10. Implement virtual scrolling for long lists

## 6. FORM VALIDATION

### Validation Rules
```javascript
class Validator {
  static email(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }
  
  static phone(value) {
    const regex = /^[\d\s\-\+\(\)]+$/;
    return regex.test(value) && value.replace(/\D/g, '').length >= 10;
  }
  
  static required(value) {
    return value.trim().length > 0;
  }
  
  static minLength(value, min) {
    return value.length >= min;
  }
  
  static maxLength(value, max) {
    return value.length <= max;
  }
  
  static password(value) {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(value);
  }
  
  static creditCard(value) {
    // Luhn algorithm
    const digits = value.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;
    
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  }
}

// Form validation
class FormValidator {
  constructor(form, rules) {
    this.form = form;
    this.rules = rules;
    this.errors = {};
  }
  
  validate() {
    this.errors = {};
    
    for (const [field, fieldRules] of Object.entries(this.rules)) {
      const input = this.form.querySelector(`[name="${field}"]`);
      const value = input.value;
      
      for (const rule of fieldRules) {
        if (!rule.validator(value)) {
          this.errors[field] = rule.message;
          break;
        }
      }
    }
    
    return Object.keys(this.errors).length === 0;
  }
  
  showErrors() {
    for (const [field, message] of Object.entries(this.errors)) {
      const input = this.form.querySelector(`[name="${field}"]`);
      const errorEl = input.parentElement.querySelector('.error-message');
      
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
      }
      
      input.classList.add('error');
    }
  }
  
  clearErrors() {
    this.form.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
      el.classList.add('hidden');
    });
    
    this.form.querySelectorAll('.error').forEach(el => {
      el.classList.remove('error');
    });
  }
}

// Usage
const loginForm = document.querySelector('#login-form');
const validator = new FormValidator(loginForm, {
  email: [
    { validator: Validator.required, message: 'Email is required' },
    { validator: Validator.email, message: 'Invalid email format' }
  ],
  password: [
    { validator: Validator.required, message: 'Password is required' },
    { validator: (v) => Validator.minLength(v, 8), message: 'Password must be at least 8 characters' }
  ]
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  validator.clearErrors();
  
  if (validator.validate()) {
    // Submit form
  } else {
    validator.showErrors();
  }
});
```

# Mobile-First Design Strategy

## 1. RESPONSIVE BREAKPOINTS

### Tailwind Breakpoints
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '375px',   // Small phones
      'sm': '640px',   // Large phones
      'md': '768px',   // Tablets
      'lg': '1024px',  // Small laptops
      'xl': '1280px',  // Desktops
      '2xl': '1536px'  // Large screens
    }
  }
}
```

### Design Approach
1. Design for mobile (375px) first
2. Enhance for tablet (768px)
3. Optimize for desktop (1024px+)

## 2. MOBILE NAVIGATION

### Hamburger Menu
```html
<header class="fixed top-0 w-full bg-white shadow-md z-50">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <a href="/" class="text-2xl font-bold">Logo</a>
      
      <!-- Mobile Menu Button -->
      <button 
        id="mobile-menu-btn"
        class="lg:hidden"
        aria-label="Toggle menu"
        aria-expanded="false"
      >
        <svg class="w-6 h-6"><!-- Hamburger icon --></svg>
      </button>
      
      <!-- Desktop Nav -->
      <nav class="hidden lg:flex space-x-6">
        <a href="/shop">Shop</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
      
      <!-- Icons -->
      <div class="flex items-center space-x-4">
        <button aria-label="Search">
          <svg class="w-5 h-5"><!-- Search icon --></svg>
        </button>
        <a href="/cart" aria-label="Cart">
          <svg class="w-5 h-5"><!-- Cart icon --></svg>
          <span class="badge">3</span>
        </a>
      </div>
    </div>
  </div>
  
  <!-- Mobile Menu Drawer -->
  <div 
    id="mobile-menu"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden"
  >
    <div class="fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform -translate-x-full transition-transform">
      <nav class="p-6">
        <a href="/shop" class="block py-3">Shop</a>
        <a href="/about" class="block py-3">About</a>
        <a href="/contact" class="block py-3">Contact</a>
      </nav>
    </div>
  </div>
</header>
```

### Bottom Navigation (Optional)
```html
<nav class="fixed bottom-0 w-full bg-white border-t lg:hidden z-50">
  <div class="flex justify-around py-2">
    <a href="/" class="flex flex-col items-center">
      <svg class="w-6 h-6"><!-- Home icon --></svg>
      <span class="text-xs">Home</span>
    </a>
    <a href="/shop" class="flex flex-col items-center">
      <svg class="w-6 h-6"><!-- Shop icon --></svg>
      <span class="text-xs">Shop</span>
    </a>
    <a href="/wishlist" class="flex flex-col items-center">
      <svg class="w-6 h-6"><!-- Heart icon --></svg>
      <span class="text-xs">Wishlist</span>
    </a>
    <a href="/profile" class="flex flex-col items-center">
      <svg class="w-6 h-6"><!-- Profile icon --></svg>
      <span class="text-xs">Profile</span>
    </a>
  </div>
</nav>
```

## 3. TOUCH-FRIENDLY DESIGN

### Minimum Touch Targets
- Buttons: 44x44px minimum
- Links: 44x44px minimum
- Form inputs: 44px height minimum

### Touch Gestures
```javascript
class TouchHandler {
  constructor(element) {
    this.element = element;
    this.startX = 0;
    this.startY = 0;
    this.distX = 0;
    this.distY = 0;
    
    this.element.addEventListener('touchstart', this.handleStart.bind(this));
    this.element.addEventListener('touchmove', this.handleMove.bind(this));
    this.element.addEventListener('touchend', this.handleEnd.bind(this));
  }
  
  handleStart(e) {
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
  }
  
  handleMove(e) {
    if (!this.startX || !this.startY) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    
    this.distX = currentX - this.startX;
    this.distY = currentY - this.startY;
  }
  
  handleEnd(e) {
    const threshold = 50;
    
    if (Math.abs(this.distX) > threshold) {
      if (this.distX > 0) {
        this.onSwipeRight();
      } else {
        this.onSwipeLeft();
      }
    }
    
    if (Math.abs(this.distY) > threshold) {
      if (this.distY > 0) {
        this.onSwipeDown();
      } else {
        this.onSwipeUp();
      }
    }
    
    this.startX = 0;
    this.startY = 0;
  }
  
  onSwipeLeft() { /* Override */ }
  onSwipeRight() { /* Override */ }
  onSwipeUp() { /* Override */ }
  onSwipeDown() { /* Override */ }
}

// Usage: Image gallery swipe
const gallery = new TouchHandler(document.querySelector('.gallery'));
gallery.onSwipeLeft = () => nextImage();
gallery.onSwipeRight = () => prevImage();
```

## 4. MOBILE FORMS

### Optimized Input Types
```html
<!-- Email -->
<input type="email" inputmode="email" autocomplete="email" />

<!-- Phone -->
<input type="tel" inputmode="tel" autocomplete="tel" />

<!-- Number -->
<input type="number" inputmode="numeric" pattern="[0-9]*" />

<!-- Search -->
<input type="search" inputmode="search" />

<!-- URL -->
<input type="url" inputmode="url" />

<!-- Date -->
<input type="date" />

<!-- Credit Card -->
<input 
  type="text" 
  inputmode="numeric" 
  pattern="[0-9\s]{13,19}"
  autocomplete="cc-number"
/>
```

### Form Layout
```html
<form class="space-y-4">
  <!-- Full width on mobile -->
  <div class="w-full">
    <label class="block text-sm font-medium mb-1">Email</label>
    <input 
      type="email" 
      class="w-full h-12 px-4 border rounded-lg text-base"
    />
  </div>
  
  <!-- Two columns on desktop -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium mb-1">First Name</label>
      <input 
        type="text" 
        class="w-full h-12 px-4 border rounded-lg"
      />
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">Last Name</label>
      <input 
        type="text" 
        class="w-full h-12 px-4 border rounded-lg"
      />
    </div>
  </div>
  
  <!-- Large submit button -->
  <button 
    type="submit"
    class="w-full h-12 bg-primary text-white rounded-lg font-medium"
  >
    Submit
  </button>
</form>
```

### Prevent Zoom on Input Focus
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

```css
/* Or use minimum font size */
input, select, textarea {
  font-size: 16px; /* Prevents zoom on iOS */
}
```

## 5. MOBILE PRODUCT CARDS

### Responsive Grid
```html
<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
  <!-- Product Card -->
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <!-- Image -->
    <div class="aspect-square relative">
      <img 
        src="product.jpg" 
        alt="Product"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <button 
        class="absolute top-2 right-2 w-10 h-10 bg-white rounded-full shadow"
        aria-label="Add to wishlist"
      >
        <svg class="w-5 h-5 mx-auto"><!-- Heart --></svg>
      </button>
    </div>
    
    <!-- Info -->
    <div class="p-3">
      <h3 class="text-sm font-medium line-clamp-2">Product Name</h3>
      <p class="text-xs text-gray-500 mt-1">Brand</p>
      <div class="flex items-center mt-2">
        <span class="text-lg font-bold">$29.99</span>
        <button 
          class="ml-auto w-8 h-8 bg-primary text-white rounded-full"
          aria-label="Add to cart"
        >
          <svg class="w-4 h-4 mx-auto"><!-- Plus --></svg>
        </button>
      </div>
    </div>
  </div>
</div>
```

## 6. MOBILE FILTERS

### Filter Drawer
```html
<!-- Filter Button -->
<button 
  id="filter-btn"
  class="fixed bottom-20 right-4 w-14 h-14 bg-primary text-white rounded-full shadow-lg lg:hidden z-40"
>
  <svg class="w-6 h-6 mx-auto"><!-- Filter icon --></svg>
</button>

<!-- Filter Drawer -->
<div 
  id="filter-drawer"
  class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden"
>
  <div class="fixed inset-y-0 right-0 w-full sm:w-80 bg-white transform translate-x-full transition-transform">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b">
      <h2 class="text-lg font-bold">Filters</h2>
      <button id="close-filter" aria-label="Close">
        <svg class="w-6 h-6"><!-- X icon --></svg>
      </button>
    </div>
    
    <!-- Filters -->
    <div class="overflow-y-auto h-[calc(100vh-140px)] p-4">
      <!-- Filter sections -->
    </div>
    
    <!-- Footer -->
    <div class="absolute bottom-0 w-full p-4 border-t bg-white">
      <div class="flex gap-2">
        <button class="flex-1 h-12 border rounded-lg">Clear</button>
        <button class="flex-1 h-12 bg-primary text-white rounded-lg">Apply</button>
      </div>
    </div>
  </div>
</div>
```

## 7. MOBILE CHECKOUT

### Single Column Layout
```html
<div class="max-w-2xl mx-auto p-4">
  <!-- Progress -->
  <div class="flex items-center justify-between mb-8">
    <div class="flex-1">
      <div class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">1</div>
      <span class="text-xs mt-1">Shipping</span>
    </div>
    <div class="flex-1 h-0.5 bg-gray-300"></div>
    <div class="flex-1">
      <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">2</div>
      <span class="text-xs mt-1">Payment</span>
    </div>
    <div class="flex-1 h-0.5 bg-gray-300"></div>
    <div class="flex-1">
      <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">3</div>
      <span class="text-xs mt-1">Review</span>
    </div>
  </div>
  
  <!-- Form -->
  <form class="space-y-6">
    <!-- Sections -->
  </form>
  
  <!-- Sticky Footer -->
  <div class="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
    <div class="flex items-center justify-between mb-2">
      <span class="font-medium">Total</span>
      <span class="text-xl font-bold">$99.99</span>
    </div>
    <button class="w-full h-12 bg-primary text-white rounded-lg">
      Continue to Payment
    </button>
  </div>
</div>
```

## 8. MOBILE PERFORMANCE

### Image Optimization
```html
<!-- Responsive images -->
<img 
  srcset="
    product-small.jpg 400w,
    product-medium.jpg 800w,
    product-large.jpg 1200w
  "
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
  src="product-medium.jpg"
  alt="Product"
  loading="lazy"
/>
```

### Reduce JavaScript
```javascript
// Load features conditionally
if (window.innerWidth < 768) {
  // Mobile-specific code
  import('./mobile-menu.js');
} else {
  // Desktop-specific code
  import('./mega-menu.js');
}
```

### Optimize Fonts
```css
/* Load only necessary weights */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Use system fonts as fallback */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

## 9. MOBILE MODALS

### Full-Screen on Mobile
```html
<div class="fixed inset-0 z-50 overflow-y-auto">
  <!-- Backdrop -->
  <div class="fixed inset-0 bg-black bg-opacity-50"></div>
  
  <!-- Modal -->
  <div class="relative min-h-screen lg:min-h-0 lg:my-8 lg:mx-auto lg:max-w-2xl">
    <div class="bg-white lg:rounded-lg shadow-xl">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b">
        <h2 class="text-lg font-bold">Product Details</h2>
        <button aria-label="Close">
          <svg class="w-6 h-6"><!-- X --></svg>
        </button>
      </div>
      
      <!-- Content -->
      <div class="p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
        <!-- Content -->
      </div>
      
      <!-- Footer -->
      <div class="p-4 border-t">
        <button class="w-full h-12 bg-primary text-white rounded-lg">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</div>
```

## 10. MOBILE TESTING CHECKLIST

### Functionality
- [ ] All buttons are tappable (44x44px min)
- [ ] Forms work with mobile keyboards
- [ ] Swipe gestures work
- [ ] Modals are full-screen on mobile
- [ ] Navigation is accessible
- [ ] Images load properly
- [ ] Videos are responsive

### Performance
- [ ] Page loads in < 3 seconds on 3G
- [ ] Images are optimized
- [ ] Lazy loading works
- [ ] No layout shifts
- [ ] Smooth scrolling

### UX
- [ ] Text is readable (16px min)
- [ ] Contrast ratios meet WCAG
- [ ] Touch targets don't overlap
- [ ] Forms have proper input types
- [ ] Error messages are visible
- [ ] Loading states are clear

### Devices to Test
- iPhone SE (375px)
- iPhone 12/13/14 (390px)
- iPhone 14 Pro Max (430px)
- Samsung Galaxy S21 (360px)
- iPad (768px)
- iPad Pro (1024px)

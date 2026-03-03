# Cosmetics E-Commerce - Technical Architecture Blueprint

## 1. FOLDER STRUCTURE

```
/
├── index.html
├── css/
│   ├── tailwind.config.js
│   ├── main.css
│   ├── components/
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── forms.css
│   │   └── modals.css
│   └── themes/
│       ├── light.css
│       └── dark.css
├── js/
│   ├── app.js
│   ├── config/
│   │   ├── constants.js
│   │   └── routes.js
│   ├── core/
│   │   ├── router.js
│   │   ├── state.js
│   │   ├── storage.js
│   │   └── i18n.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── product.service.js
│   │   ├── cart.service.js
│   │   ├── order.service.js
│   │   ├── user.service.js
│   │   └── wishlist.service.js
│   ├── components/
│   │   ├── header.component.js
│   │   ├── footer.component.js
│   │   ├── product-card.component.js
│   │   ├── cart-item.component.js
│   │   ├── filter-sidebar.component.js
│   │   ├── search-bar.component.js
│   │   ├── modal.component.js
│   │   └── toast.component.js
│   ├── pages/
│   │   ├── home.page.js
│   │   ├── shop.page.js
│   │   ├── product-detail.page.js
│   │   ├── cart.page.js
│   │   ├── checkout.page.js
│   │   ├── auth.page.js
│   │   ├── profile.page.js
│   │   ├── dashboard.page.js
│   │   ├── admin.page.js
│   │   ├── blog.page.js
│   │   ├── skin-quiz.page.js
│   │   ├── about.page.js
│   │   └── contact.page.js
│   ├── utils/
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   ├── helpers.js
│   │   └── seo.js
│   └── data/
│       ├── products.json
│       ├── categories.json
│       ├── translations.json
│       └── mock-users.json
├── assets/
│   ├── images/
│   │   ├── products/
│   │   ├── banners/
│   │   ├── icons/
│   │   └── placeholders/
│   ├── fonts/
│   └── videos/
└── docs/
    ├── ARCHITECTURE.md
    ├── COMPONENTS.md
    ├── STATE_MANAGEMENT.md
    └── USER_FLOWS.md
```

## 2. COMPLETE SITEMAP

### Public Pages
- `/` - Home
- `/shop` - All Products
- `/shop/:category` - Category Products
- `/product/:id` - Product Details
- `/cart` - Shopping Cart
- `/checkout` - Checkout Process
- `/login` - Login
- `/register` - Register
- `/blog` - Blog Listing
- `/blog/:slug` - Blog Post
- `/skin-quiz` - Skin Analysis Quiz
- `/about` - About Us
- `/contact` - Contact Us
- `/search` - Search Results
- `/wishlist` - Saved Products

### Protected User Pages
- `/profile` - Profile Settings
- `/profile/orders` - Order History
- `/profile/addresses` - Saved Addresses
- `/profile/payment-methods` - Payment Methods
- `/profile/loyalty` - Loyalty Points
- `/profile/reviews` - My Reviews

### Admin Pages
- `/admin` - Admin Dashboard
- `/admin/products` - Product Management
- `/admin/products/add` - Add Product
- `/admin/products/edit/:id` - Edit Product
- `/admin/orders` - Order Management
- `/admin/customers` - Customer Management
- `/admin/analytics` - Analytics
- `/admin/content` - Content Management

## 3. STATE MANAGEMENT ARCHITECTURE

### Global State Structure
```javascript
window.AppState = {
  user: {
    isAuthenticated: false,
    role: null, // 'user' | 'admin'
    profile: {},
    loyaltyPoints: 0
  },
  cart: {
    items: [],
    total: 0,
    itemCount: 0
  },
  wishlist: {
    items: []
  },
  ui: {
    theme: 'light', // 'light' | 'dark'
    language: 'en', // 'en' | 'ar'
    isRTL: false,
    modals: {},
    loading: false
  },
  filters: {
    category: null,
    priceRange: [0, 1000],
    brands: [],
    skinType: [],
    concerns: [],
    ingredients: [],
    sortBy: 'featured'
  },
  products: [],
  categories: [],
  orders: []
}
```

### State Management Methods
- `setState(path, value)` - Update state
- `getState(path)` - Get state value
- `subscribe(path, callback)` - Listen to changes
- `dispatch(action, payload)` - Trigger actions

## 4. AUTHENTICATION FLOW

### Registration Flow
1. User clicks Register
2. Modal/Page opens with form
3. Options: Email, Google OAuth, Facebook OAuth
4. Email: Validate → Create account → Send verification
5. Social: OAuth redirect → Create profile → Return
6. Profile setup: Name, Phone, Address
7. Redirect to dashboard

### Login Flow
1. User clicks Login
2. Modal/Page opens
3. Email/Password or Social login
4. Validate credentials
5. Store token in localStorage
6. Update global state
7. Redirect based on role (user/admin)

### Guest Checkout Flow
1. Add items to cart
2. Proceed to checkout
3. Option: Continue as guest or Login
4. Guest: Enter shipping info only
5. Complete order
6. Optional: Create account after order

## 5. STORAGE STRATEGY

### LocalStorage
- `auth_token` - JWT token
- `user_profile` - User data
- `cart_items` - Cart persistence
- `wishlist_items` - Wishlist
- `theme_preference` - Dark/Light
- `language_preference` - en/ar
- `recent_searches` - Search history
- `viewed_products` - Recently viewed

### SessionStorage
- `checkout_data` - Temporary checkout info
- `filter_state` - Current filters
- `quiz_progress` - Skin quiz answers

## 6. COMPONENT ARCHITECTURE

### Reusable Components
│   │   └── wishlist.service.js
│   ├── components/
│   │   ├── header.component.js
│   │   ├── footer.component.js
│   │   ├── product-card.component.js
│   │   ├── cart-item.component.js
│   │   ├── filter-sidebar.component.js
│   │   ├── search-bar.component.js
│   │   ├── modal.component.js
│   │   └── toast.component.js
│   ├── pages/
│   │   ├── home.page.js
│   │   ├── shop.page.js
│   │   ├── product-detail.page.js
│   │   ├── cart.page.js
│   │   ├── checkout.page.js
│   │   ├── auth.page.js
│   │   ├── profile.page.js
│   │   ├── dashboard.page.js
│   │   ├── admin.page.js
│   │   ├── blog.page.js
│   │   ├── skin-quiz.page.js
│   │   ├── about.page.js
│   │   └── contact.page.js
│   ├── utils/
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   ├── helpers.js
│   │   └── seo.js
│   └── data/
│       ├── products.json
│       ├── categories.json
│       ├── translations.json
│       └── mock-users.json
├── assets/
│   ├── images/
│   │   ├── products/
│   │   ├── banners/
│   │   ├── icons/
│   │   └── placeholders/
│   ├── fonts/
│   └── videos/
└── docs/
    ├── ARCHITECTURE.md (this file)
    ├── COMPONENTS.md
    ├── PAGES_BREAKDOWN.md
    ├── FEATURES_LOGIC.md
    ├── UX_FLOWS.md
    ├── TECHNICAL_SPECS.md
    ├── SECURITY_BEST_PRACTICES.md
    ├── MOBILE_FIRST_STRATEGY.md
    ├── CONVERSION_OPTIMIZATION.md
    ├── DATA_MODELS.md
    └── IMPLEMENTATION_ROADMAP.md
```

## ADDITIONAL PROFESSIONAL ELEMENTS

### 1. GIFT CARDS
- Purchase gift cards
- Custom amounts
- Email delivery
- Redemption at checkout
- Balance checking

### 2. PRODUCT COMPARISON
- Compare up to 4 products
- Side-by-side specifications
- Price comparison
- Add to cart from comparison

### 3. LIVE CHAT SUPPORT
- Chat widget
- Automated responses
- Product recommendations
- Order tracking help

### 4. SUBSCRIPTION PRODUCTS
- Subscribe & save option
- Delivery frequency selection
- Manage subscriptions
- Pause/cancel anytime

### 5. VIRTUAL TRY-ON
- AR makeup try-on
- Skin tone matching
- Before/after comparison
- Share results

### 6. INGREDIENT DICTIONARY
- Searchable ingredient database
- Benefits explanation
- Safety information
- Products containing ingredient

### 7. ROUTINE BUILDER
- Step-by-step routine creator
- Morning/night routines
- Product recommendations
- Save custom routines

### 8. SOCIAL FEATURES
- User-generated content
- Photo reviews
- Social sharing
- Referral program
- Influencer partnerships

### 9. ADVANCED SEARCH
- Voice search
- Image search
- Barcode scanner
- Natural language queries

### 10. GAMIFICATION
- Daily login rewards
- Achievement badges
- Challenges
- Leaderboards
- Exclusive perks

### 11. INVENTORY ALERTS
- Back in stock notifications
- Price drop alerts
- New arrival alerts
- Restock reminders

### 12. MULTI-CURRENCY
- Auto-detect location
- Currency converter
- Display prices in local currency
- Checkout in preferred currency

### 13. SIZE GUIDE
- Interactive size charts
- Measurement guide
- Fit recommendations
- Size conversion tables

### 14. BUNDLE DEALS
- Create product bundles
- Bundle discounts
- Curated sets
- Build your own bundle

### 15. FLASH SALES
- Limited time offers
- Countdown timers
- Stock indicators
- Early access for members

## SUMMARY

This architecture provides:
- **Scalable structure** for growth
- **Clean separation** of concerns
- **Reusable components** for efficiency
- **Modern UX patterns** for conversion
- **Mobile-first approach** for accessibility
- **SEO optimization** for visibility
- **Performance focus** for speed
- **Security best practices** for trust
- **Bilingual support** (EN/AR) with RTL
- **Professional e-commerce features** for 2026 standards

All documentation files provide detailed implementation guidance for each aspect of the system.

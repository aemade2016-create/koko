# Data Models & Structures

## 1. PRODUCT MODEL

```javascript
const Product = {
  id: 'prod_123',
  sku: 'MOIST-001',
  title: {
    en: 'Hydrating Face Moisturizer',
    ar: 'مرطب الوجه المرطب'
  },
  description: {
    en: 'A lightweight, hydrating moisturizer...',
    ar: 'مرطب خفيف الوزن...'
  },
  brand: 'CeraVe',
  category: 'skincare',
  subcategory: 'moisturizers',
  price: 29.99,
  compareAtPrice: 39.99, // Original price for discount display
  currency: 'USD',
  
  // Inventory
  stock: 150,
  lowStockThreshold: 10,
  trackInventory: true,
  allowBackorder: false,
  
  // Variants
  variants: [
    {
      id: 'var_001',
      name: '50ml',
      sku: 'MOIST-001-50',
      price: 29.99,
      stock: 100,
      image: 'url'
    },
    {
      id: 'var_002',
      name: '100ml',
      sku: 'MOIST-001-100',
      price: 49.99,
      stock: 50,
      image: 'url'
    }
  ],
  
  // Images
  images: [
    {
      url: 'https://cdn.example.com/product-1.jpg',
      alt: 'Product front view',
      isPrimary: true
    },
    {
      url: 'https://cdn.example.com/product-2.jpg',
      alt: 'Product ingredients',
      isPrimary: false
    }
  ],
  
  // Product Details
  ingredients: [
    'Hyaluronic Acid',
    'Ceramides',
    'Niacinamide',
    'Glycerin'
  ],
  howToUse: {
    en: 'Apply to clean, dry skin...',
    ar: 'ضعيه على بشرة نظيفة وجافة...'
  },
  benefits: [
    'Deep hydration',
    'Strengthens skin barrier',
    'Reduces fine lines'
  ],
  
  // Categorization
  suitableFor: ['dry', 'normal', 'combination'],
  skinConcerns: ['dryness', 'aging', 'sensitivity'],
  freeFrom: ['parabens', 'sulfates', 'fragrance'],
  
  // Ratings & Reviews
  rating: 4.8,
  reviewCount: 1234,
  
  // SEO
  slug: 'hydrating-face-moisturizer',
  metaTitle: 'Hydrating Face Moisturizer | Best Moisturizer for Dry Skin',
  metaDescription: 'Shop our best-selling hydrating face moisturizer...',
  
  // Status
  status: 'active', // active, draft, archived
  featured: true,
  onSale: true,
  isNew: false,
  
  // Loyalty
  pointsEarned: 30, // Points customer earns on purchase
  
  // Timestamps
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-03-01T00:00:00Z'
};
```

## 2. USER MODEL

```javascript
const User = {
  id: 'user_123',
  email: 'user@example.com',
  password: 'hashed_password', // Never store plain text
  
  // Profile
  profile: {
    firstName: 'Jane',
    lastName: 'Doe',
    phone: '+1234567890',
    dateOfBirth: '1990-01-01',
    gender: 'female',
    avatar: 'https://cdn.example.com/avatar.jpg'
  },
  
  // Skin Profile
  skinProfile: {
    skinType: 'combination',
    concerns: ['acne', 'dark-spots'],
    sensitivity: 'moderate',
    allergies: ['fragrance']
  },
  
  // Addresses
  addresses: [
    {
      id: 'addr_001',
      type: 'shipping', // shipping, billing
      isDefault: true,
      firstName: 'Jane',
      lastName: 'Doe',
      company: '',
      address1: '123 Main St',
      address2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'US',
      phone: '+1234567890'
    }
  ],
  
  // Payment Methods
  paymentMethods: [
    {
      id: 'pm_001',
      type: 'card',
      isDefault: true,
      last4: '4242',
      brand: 'visa',
      expiryMonth: 12,
      expiryYear: 2025,
      token: 'tok_xxx' // Tokenized, never store full card
    }
  ],
  
  // Loyalty
  loyaltyPoints: 1500,
  loyaltyTier: 'gold', // bronze, silver, gold
  
  // Preferences
  preferences: {
    language: 'en',
    currency: 'USD',
    newsletter: true,
    smsNotifications: false,
    emailNotifications: true
  },
  
  // Role
  role: 'customer', // customer, admin
  
  // Timestamps
  createdAt: '2024-01-01T00:00:00Z',
  lastLoginAt: '2024-03-01T00:00:00Z',
  emailVerified: true,
  emailVerifiedAt: '2024-01-01T00:00:00Z'
};
```

## 3. ORDER MODEL

```javascript
const Order = {
  id: 'order_123',
  orderNumber: 'ORD-2024-001234',
  userId: 'user_123',
  
  // Customer Info (snapshot at time of order)
  customer: {
    email: 'user@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    phone: '+1234567890'
  },
  
  // Items
  items: [
    {
      id: 'item_001',
      productId: 'prod_123',
      variantId: 'var_001',
      title: 'Hydrating Face Moisturizer',
      variant: '50ml',
      sku: 'MOIST-001-50',
      quantity: 2,
      price: 29.99,
      subtotal: 59.98,
      image: 'url'
    }
  ],
  
  // Pricing
  subtotal: 89.97,
  discount: 10.00,
  discountCode: 'SAVE10',
  shipping: 0.00,
  shippingMethod: 'standard',
  tax: 7.20,
  total: 87.17,
  
  // Loyalty Points
  pointsEarned: 87,
  pointsRedeemed: 500,
  pointsDiscount: 5.00,
  
  // Addresses
  shippingAddress: {
    firstName: 'Jane',
    lastName: 'Doe',
    address1: '123 Main St',
    address2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'US',
    phone: '+1234567890'
  },
  
  billingAddress: {
    // Same structure as shipping
  },
  
  // Payment
  payment: {
    method: 'card',
    status: 'paid', // pending, paid, failed, refunded
    transactionId: 'txn_123',
    last4: '4242',
    brand: 'visa'
  },
  
  // Shipping
  shipping: {
    method: 'standard',
    carrier: 'USPS',
    trackingNumber: '1Z999AA10123456784',
    trackingUrl: 'https://tools.usps.com/go/TrackConfirmAction?tLabels=1Z999AA10123456784',
    estimatedDelivery: '2024-03-10'
  },
  
  // Status
  status: 'processing', // pending, processing, shipped, delivered, cancelled, refunded
  fulfillmentStatus: 'unfulfilled', // unfulfilled, partial, fulfilled
  
  // Timeline
  timeline: [
    {
      status: 'pending',
      timestamp: '2024-03-01T10:00:00Z',
      note: 'Order placed'
    },
    {
      status: 'processing',
      timestamp: '2024-03-01T11:00:00Z',
      note: 'Payment confirmed'
    }
  ],
  
  // Notes
  customerNote: 'Please leave at door',
  internalNote: 'VIP customer',
  
  // Timestamps
  createdAt: '2024-03-01T10:00:00Z',
  updatedAt: '2024-03-01T11:00:00Z',
  paidAt: '2024-03-01T10:05:00Z',
  shippedAt: null,
  deliveredAt: null,
  cancelledAt: null
};
```

## 4. CART MODEL

```javascript
const Cart = {
  id: 'cart_123',
  userId: 'user_123', // null for guest
  sessionId: 'session_abc', // For guest carts
  
  items: [
    {
      id: 'cart_item_001',
      productId: 'prod_123',
      variantId: 'var_001',
      quantity: 2,
      
      // Snapshot of product data
      title: 'Hydrating Face Moisturizer',
      variant: '50ml',
      price: 29.99,
      image: 'url',
      stock: 100
    }
  ],
  
  // Pricing
  subtotal: 59.98,
  discount: 0,
  discountCode: null,
  shipping: 5.99,
  tax: 5.28,
  total: 71.25,
  
  // Loyalty
  pointsToEarn: 71,
  pointsToRedeem: 0,
  
  // Timestamps
  createdAt: '2024-03-01T10:00:00Z',
  updatedAt: '2024-03-01T10:30:00Z',
  expiresAt: '2024-03-08T10:00:00Z' // 7 days
};
```

## 5. REVIEW MODEL

```javascript
const Review = {
  id: 'review_123',
  productId: 'prod_123',
  userId: 'user_123',
  orderId: 'order_123', // Verified purchase
  
  // Review Content
  rating: 5,
  title: 'Amazing moisturizer!',
  content: 'This product has transformed my skin...',
  
  // Media
  images: [
    'https://cdn.example.com/review-1.jpg',
    'https://cdn.example.com/review-2.jpg'
  ],
  
  // Author Info (snapshot)
  author: {
    name: 'Jane D.',
    avatar: 'url',
    verified: true
  },
  
  // Engagement
  helpfulCount: 45,
  notHelpfulCount: 2,
  
  // Status
  status: 'published', // pending, published, rejected
  
  // Timestamps
  createdAt: '2024-02-15T10:00:00Z',
  updatedAt: '2024-02-15T10:00:00Z'
};
```

## 6. CATEGORY MODEL

```javascript
const Category = {
  id: 'cat_001',
  name: {
    en: 'Skincare',
    ar: 'العناية بالبشرة'
  },
  slug: 'skincare',
  description: {
    en: 'Complete skincare solutions...',
    ar: 'حلول كاملة للعناية بالبشرة...'
  },
  
  // Hierarchy
  parentId: null, // null for top-level
  children: ['cat_002', 'cat_003'], // Subcategories
  
  // Display
  image: 'https://cdn.example.com/category.jpg',
  icon: 'skincare-icon.svg',
  order: 1,
  
  // SEO
  metaTitle: 'Skincare Products | Best Skincare Routine',
  metaDescription: 'Shop our complete range of skincare products...',
  
  // Status
  status: 'active',
  featured: true,
  
  // Stats
  productCount: 150
};
```

## 7. DISCOUNT CODE MODEL

```javascript
const DiscountCode = {
  id: 'disc_001',
  code: 'SAVE10',
  
  // Type
  type: 'percentage', // percentage, fixed, free_shipping
  value: 10, // 10% or $10
  
  // Conditions
  minPurchase: 50.00,
  maxDiscount: 20.00, // Max discount amount
  usageLimit: 100, // Total uses
  usageLimitPerUser: 1,
  usageCount: 45,
  
  // Eligibility
  applicableProducts: [], // Empty = all products
  applicableCategories: [],
  excludedProducts: [],
  
  // Dates
  startsAt: '2024-03-01T00:00:00Z',
  endsAt: '2024-03-31T23:59:59Z',
  
  // Status
  status: 'active'
};
```

## 8. WISHLIST MODEL

```javascript
const Wishlist = {
  id: 'wish_123',
  userId: 'user_123',
  
  items: [
    {
      productId: 'prod_123',
      addedAt: '2024-03-01T10:00:00Z',
      
      // Notifications
      priceDropAlert: true,
      backInStockAlert: true
    }
  ],
  
  // Sharing
  shareToken: 'abc123xyz', // For public sharing
  isPublic: false,
  
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-03-01T10:00:00Z'
};
```

## 9. BLOG POST MODEL

```javascript
const BlogPost = {
  id: 'post_123',
  title: {
    en: '10 Skincare Tips for Glowing Skin',
    ar: '10 نصائح للعناية بالبشرة للحصول على بشرة متوهجة'
  },
  slug: '10-skincare-tips-glowing-skin',
  
  // Content
  excerpt: {
    en: 'Discover the secrets to radiant skin...',
    ar: 'اكتشف أسرار البشرة المشرقة...'
  },
  content: {
    en: '<p>Full article content...</p>',
    ar: '<p>محتوى المقال الكامل...</p>'
  },
  
  // Media
  featuredImage: 'https://cdn.example.com/blog-1.jpg',
  
  // Categorization
  category: 'skincare-tips',
  tags: ['skincare', 'beauty', 'tips'],
  
  // Author
  author: {
    id: 'author_001',
    name: 'Dr. Sarah Johnson',
    avatar: 'url',
    bio: 'Dermatologist and skincare expert'
  },
  
  // Related Products
  relatedProducts: ['prod_123', 'prod_456'],
  
  // SEO
  metaTitle: '10 Skincare Tips for Glowing Skin | Beauty Blog',
  metaDescription: 'Learn expert skincare tips...',
  
  // Stats
  views: 5420,
  readTime: 5, // minutes
  
  // Status
  status: 'published',
  
  // Timestamps
  publishedAt: '2024-02-01T10:00:00Z',
  createdAt: '2024-01-25T10:00:00Z',
  updatedAt: '2024-02-01T10:00:00Z'
};
```

## 10. SKIN QUIZ RESULT MODEL

```javascript
const SkinQuizResult = {
  id: 'quiz_123',
  userId: 'user_123', // null for guest
  sessionId: 'session_abc',
  
  // Answers
  answers: {
    skinType: 'combination',
    concerns: ['acne', 'dark-spots'],
    currentRoutine: 'basic',
    sensitivity: 'moderate',
    age: '25-34',
    climate: 'humid',
    budget: 'mid-range'
  },
  
  // Results
  skinProfile: {
    type: 'combination',
    concerns: ['acne', 'dark-spots'],
    recommendations: [
      {
        step: 'cleanser',
        productIds: ['prod_001', 'prod_002']
      },
      {
        step: 'toner',
        productIds: ['prod_003']
      },
      {
        step: 'serum',
        productIds: ['prod_004', 'prod_005']
      },
      {
        step: 'moisturizer',
        productIds: ['prod_006']
      }
    ]
  },
  
  // Timestamps
  createdAt: '2024-03-01T10:00:00Z'
};
```

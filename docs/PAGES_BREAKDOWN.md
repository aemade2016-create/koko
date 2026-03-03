# Page-by-Page Breakdown

## 1. HOME PAGE (`/`)

### Sections
1. **Hero Section**
   - Full-width banner slider
   - CTA buttons (Shop Now, Learn More)
   - Auto-play with pause on hover
   - Mobile: Single image with swipe

2. **Category Grid**
   - 6-8 main categories with images
   - Hover effects
   - Click to filter shop page

3. **Featured Products**
   - Best sellers carousel
   - New arrivals section
   - Sale items
   - Quick view modal

4. **Benefits Section**
   - Free shipping
   - Secure payment
   - Easy returns
   - 24/7 support

5. **Skin Quiz CTA**
   - Banner with quiz invitation
   - Visual appeal
   - Direct link to quiz

6. **Testimonials**
   - Customer reviews carousel
   - Star ratings
   - Photos

7. **Instagram Feed**
   - Latest posts grid
   - Shop the look tags

8. **Blog Preview**
   - Latest 3 articles
   - Read more links

9. **Newsletter**
   - Email signup
   - Discount incentive

### UX Behavior
- Lazy load images below fold
- Smooth scroll animations
- Intersection observer for section reveals
- Prefetch shop page on hover

## 2. SHOP PAGE (`/shop`)

### Sections
1. **Breadcrumbs**
   - Home > Shop > Category

2. **Page Header**
   - Title
   - Result count
   - View toggle (grid/list)

3. **Filter Sidebar** (Desktop) / Drawer (Mobile)
   - Categories
   - Price range slider
   - Brands (multi-select)
   - Skin type (multi-select)
   - Skin concerns (multi-select)
   - Ingredients (search + select)
   - Rating filter
   - Availability (in stock only)

4. **Active Filters Bar**
   - Chips showing active filters
   - Clear individual or all

5. **Sort Dropdown**
   - Featured
   - Price: Low to High
   - Price: High to Low
   - Newest
   - Best Selling
   - Top Rated

6. **Product Grid**
   - 3-4 columns desktop
   - 2 columns tablet
   - 1 column mobile
   - Infinite scroll or pagination

7. **Quick View Modal**
   - Product images
   - Title, price, rating
   - Quick add to cart
   - View full details link

### Interactive Logic
- URL params for filters: `/shop?category=skincare&price=0-100&brand=cerave`
- Filter changes update URL
- Back button restores filters
- Filter count badges
- Real-time product count update
- Skeleton loaders during filter
- Save filter preferences

## 3. PRODUCT DETAIL PAGE (`/product/:id`)

### Sections
1. **Breadcrumbs**
   - Home > Category > Product

2. **Product Gallery**
   - Main image with zoom on hover
   - Thumbnail carousel
   - Lightbox on click
   - Video support
   - 360° view option

3. **Product Info**
   - Title
   - Brand
   - Rating + review count
   - Price (original + discounted)
   - Loyalty points earned
   - Stock status
   - SKU
   - Share buttons

4. **Variant Selector**
   - Size dropdown
   - Color swatches
   - Quantity selector

5. **Action Buttons**
   - Add to Cart (primary)
   - Add to Wishlist (secondary)
   - Buy Now (express checkout)

6. **Product Details Tabs**
   - Description
   - Ingredients
   - How to Use
   - Benefits
   - Suitable for (skin types)

7. **Reviews Section**
   - Average rating
   - Rating breakdown (5★ to 1★)
   - Filter reviews
   - Sort reviews
   - Write review (authenticated)
   - Helpful votes

8. **Related Products**
   - "You may also like"
   - Same category
   - Frequently bought together

9. **Cross-Sell Section**
   - "Complete your routine"
   - Bundle discount option

10. **Recently Viewed**
    - Horizontal scroll

### UX Behavior
- Add to cart: Toast notification + cart icon animation
- Out of stock: Email notification signup
- Low stock: Urgency message
- Price drop alert signup
- Sticky add to cart on scroll (mobile)
- Image preloading
- Schema markup for SEO

## 4. CART PAGE (`/cart`)

### Sections
1. **Cart Items List**
   - Product image
   - Title + variant
   - Price
   - Quantity selector
   - Subtotal
   - Remove button
   - Move to wishlist

2. **Cart Summary**
   - Subtotal
   - Shipping estimate
   - Tax estimate
   - Discount code input
   - Loyalty points redemption
   - Total
   - Checkout button
   - Continue shopping link

3. **Recommended Products**
   - "Complete your order"
   - Based on cart items

4. **Trust Badges**
   - Secure checkout
   - Money-back guarantee

### Interactive Logic
- Real-time price updates
- Quantity limits
- Stock validation
- Auto-save cart to localStorage
- Discount code validation
- Loyalty points calculator
- Shipping threshold progress bar
- Empty cart state with CTA

## 5. CHECKOUT PAGE (`/checkout`)

### Sections
1. **Progress Indicator**
   - Shipping → Payment → Review

2. **Guest/Login Toggle**
   - Continue as guest
   - Login for faster checkout

3. **Shipping Form**
   - Email
   - Full name
   - Phone
   - Address (autocomplete)
   - City, State, ZIP
   - Save address checkbox

4. **Shipping Method**
   - Standard (free over X)
   - Express
   - Next day

5. **Payment Form**
   - Credit card
   - PayPal
   - Apple Pay
   - Google Pay
   - Cash on delivery
   - Save payment method

6. **Order Review**
   - Items summary
   - Shipping address
   - Payment method
   - Order total
   - Terms checkbox
   - Place order button

7. **Order Summary Sidebar**
   - Cart items
   - Pricing breakdown
   - Sticky on scroll

### UX Behavior
- Multi-step or single page
- Form validation
- Address autocomplete
- Payment tokenization
- Loading state on submit
- Error handling
- Order confirmation page
- Email confirmation
- Guest: Offer account creation

## 6. LOGIN/REGISTER PAGE (`/login`, `/register`)

### Login Section
1. **Email/Password Form**
   - Email input
   - Password input
   - Remember me checkbox
   - Forgot password link
   - Login button

2. **Social Login**
   - Google button
   - Facebook button
   - Divider: "or continue with"

3. **Register Link**
   - "Don't have an account? Sign up"

### Register Section
1. **Registration Form**
   - Full name
   - Email
   - Password
   - Confirm password
   - Terms acceptance checkbox
   - Register button

2. **Social Register**
   - Same as login

3. **Login Link**
   - "Already have an account? Login"

### UX Behavior
- Real-time validation
- Password strength indicator
- Show/hide password toggle
- OAuth popup/redirect
- Auto-login after register
- Redirect to intended page
- Welcome toast

## 7. PROFILE SETUP PAGE (`/profile/setup`)

### Sections
1. **Welcome Message**
   - Personalized greeting

2. **Profile Form**
   - Profile photo upload
   - Phone number
   - Date of birth
   - Gender
   - Skin type
   - Skin concerns

3. **Address Form**
   - Default shipping address
   - Billing same as shipping

4. **Preferences**
   - Newsletter subscription
   - SMS notifications
   - Language preference

5. **Skip/Complete Buttons**

### UX Behavior
- Optional step
- Save progress
- Skip to dashboard
- Incentive: Bonus loyalty points

## 8. USER DASHBOARD (`/profile`)

### Navigation Sidebar
- Overview
- Orders
- Addresses
- Payment Methods
- Loyalty Points
- Reviews
- Wishlist
- Settings
- Logout

### Overview Tab
1. **Welcome Section**
   - User name
   - Loyalty points balance
   - Member since

2. **Quick Stats**
   - Total orders
   - Pending orders
   - Wishlist items
   - Reviews written

3. **Recent Orders**
   - Last 3 orders
   - Status badges
   - View all link

4. **Recommended Products**
   - Based on purchase history

### Orders Tab
1. **Filter Tabs**
   - All
   - Pending
   - Processing
   - Shipped
   - Delivered
   - Cancelled

2. **Order List**
   - Order number
   - Date
   - Items count
   - Total
   - Status
   - Actions (view, track, reorder)

3. **Order Detail Modal**
   - Items list
   - Shipping info
   - Tracking number
   - Timeline
   - Invoice download
   - Cancel option (if pending)

### Addresses Tab
1. **Address Cards**
   - Default badge
   - Edit/Delete buttons
   - Set as default

2. **Add Address Button**
   - Modal form

### Payment Methods Tab
1. **Saved Cards**
   - Last 4 digits
   - Expiry
   - Default badge
   - Remove button

2. **Add Payment Method**

### Loyalty Points Tab
1. **Points Balance**
   - Current points
   - Points value in currency
   - Tier status

2. **Points History**
   - Earned/Redeemed
   - Date
   - Order reference

3. **Rewards Catalog**
   - Redeem options
   - Discount vouchers

4. **How It Works**
   - Earning rules
   - Redemption rules

### Reviews Tab
1. **My Reviews List**
   - Product image
   - Rating
   - Review text
   - Date
   - Edit/Delete

2. **Pending Reviews**
   - Products awaiting review
   - Write review CTA

## 9. ADMIN DASHBOARD (`/admin`)

### Navigation Sidebar
- Dashboard
- Products
- Orders
- Customers
- Analytics
- Content
- Settings

### Dashboard Overview
1. **Key Metrics Cards**
   - Total revenue
   - Orders today
   - Total products
   - Total customers

2. **Revenue Chart**
   - Last 30 days
   - Line/Bar chart

3. **Recent Orders**
   - Quick view table
   - Status updates

4. **Low Stock Alerts**
   - Products below threshold

5. **Top Products**
   - Best sellers

### Products Management (`/admin/products`)
1. **Product Table**
   - Image thumbnail
   - Name
   - Category
   - Price
   - Stock
   - Status (active/draft)
   - Actions (edit, delete, duplicate)

2. **Filters**
   - Category
   - Status
   - Stock level

3. **Search Bar**

4. **Add Product Button**

### Add/Edit Product (`/admin/products/add`)
1. **Product Form**
   - Title (EN/AR)
   - Description (EN/AR)
   - Category
   - Brand
   - Price
   - Compare at price
   - SKU
   - Barcode
   - Stock quantity
   - Low stock threshold

2. **Images Upload**
   - Multiple images
   - Drag to reorder
   - Set featured

3. **Variants**
   - Size options
   - Color options
   - Price adjustments

4. **Product Details**
   - Ingredients
   - How to use
   - Benefits
   - Suitable for

5. **SEO Section**
   - Meta title
   - Meta description
   - URL slug

6. **Status**
   - Active/Draft
   - Featured
   - On sale

7. **Save/Publish Buttons**

### Orders Management (`/admin/orders`)
1. **Orders Table**
   - Order number
   - Customer
   - Date
   - Total
   - Status
   - Payment status
   - Actions

2. **Status Filter Tabs**
   - All, Pending, Processing, Shipped, Delivered, Cancelled

3. **Order Detail View**
   - Customer info
   - Items list
   - Shipping address
   - Payment info
   - Order timeline
   - Status update dropdown
   - Add tracking number
   - Print invoice
   - Refund option

### Customers Management (`/admin/customers`)
1. **Customer Table**
   - Name
   - Email
   - Orders count
   - Total spent
   - Loyalty points
   - Join date
   - Actions

2. **Customer Detail**
   - Profile info
   - Order history
   - Lifetime value
   - Notes

### Analytics (`/admin/analytics`)
1. **Date Range Selector**

2. **Revenue Metrics**
   - Total revenue
   - Average order value
   - Conversion rate

3. **Charts**
   - Sales over time
   - Top products
   - Top categories
   - Customer acquisition

4. **Export Reports**

## 10. BLOG PAGE (`/blog`)

### Sections
1. **Featured Post**
   - Large hero image
   - Title
   - Excerpt
   - Read more

2. **Category Filter**
   - All
   - Skincare Tips
   - Ingredients Guide
   - Tutorials
   - News

3. **Blog Grid**
   - Post image
   - Category badge
   - Title
   - Excerpt
   - Author
   - Date
   - Read time

4. **Pagination**

### Blog Post Page (`/blog/:slug`)
1. **Hero Image**

2. **Post Meta**
   - Author
   - Date
   - Read time
   - Share buttons

3. **Content**
   - Rich text
   - Images
   - Videos
   - Product mentions (linked)

4. **Related Posts**

5. **Comments Section** (optional)

## 11. SKIN QUIZ PAGE (`/skin-quiz`)

### Flow
1. **Welcome Screen**
   - Quiz description
   - Benefits
   - Start button

2. **Question Steps** (5-8 questions)
   - Progress bar
   - Question text
   - Answer options (single/multiple choice)
   - Image options
   - Next/Back buttons

3. **Questions**
   - What's your skin type?
   - Main skin concerns?
   - Current routine?
   - Sensitivity level?
   - Age range?
   - Climate?
   - Budget preference?

4. **Results Page**
   - Skin profile summary
   - Recommended products
   - Routine builder
   - Save results (if logged in)
   - Email results option

### UX Behavior
- Save progress in sessionStorage
- Allow back navigation
- Visual progress indicator
- Animated transitions
- Results shareable

## 12. ABOUT PAGE (`/about`)

### Sections
1. **Hero Section**
   - Brand story headline
   - Image/Video

2. **Our Story**
   - Text content
   - Timeline

3. **Our Values**
   - Cards with icons

4. **Team Section** (optional)
   - Team photos
   - Roles

5. **Certifications**
   - Badges
   - Trust signals

6. **CTA Section**
   - Shop now
   - Contact us

## 13. CONTACT PAGE (`/contact`)

### Sections
1. **Contact Form**
   - Name
   - Email
   - Phone
   - Subject
   - Message
   - Submit button

2. **Contact Info**
   - Address
   - Phone
   - Email
   - Business hours

3. **Map** (optional)
   - Embedded map

4. **FAQ Section**
   - Common questions
   - Expandable answers

5. **Social Links**

### UX Behavior
- Form validation
- Success message
- Email notification simulation
- Response time expectation

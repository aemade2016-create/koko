# Features & Logic Implementation

## 1. SMART FILTERING SYSTEM

### Filter Types
1. **Price Range**
   - Dual-handle slider
   - Min/Max input fields
   - Currency formatting
   - Real-time update

2. **Category**
   - Hierarchical structure
   - Parent/Child categories
   - Multi-select

3. **Brand**
   - Checkbox list
   - Search within brands
   - Show count per brand

4. **Skin Type**
   - Normal, Dry, Oily, Combination, Sensitive
   - Multi-select
   - Icon representation

5. **Skin Concerns**
   - Acne, Aging, Dark Spots, Dryness, Pores, etc.
   - Multi-select
   - Tag-based UI

6. **Ingredients**
   - Search autocomplete
   - Include/Exclude toggle
   - Popular ingredients quick select
   - "Free from" filters (paraben-free, sulfate-free)

7. **Rating**
   - 4+ stars, 3+ stars, etc.
   - Star visualization

8. **Availability**
   - In stock only toggle
   - On sale toggle

### Filter Logic
```javascript
// Pseudo-code
function filterProducts(products, filters) {
  return products.filter(product => {
    // Price range
    if (product.price < filters.priceMin || product.price > filters.priceMax) return false;
    
    // Category
    if (filters.categories.length && !filters.categories.includes(product.category)) return false;
    
    // Brands
    if (filters.brands.length && !filters.brands.includes(product.brand)) return false;
    
    // Skin type
    if (filters.skinTypes.length) {
      const match = filters.skinTypes.some(type => product.suitableFor.includes(type));
      if (!match) return false;
    }
    
    // Concerns
    if (filters.concerns.length) {
      const match = filters.concerns.some(concern => product.targets.includes(concern));
      if (!match) return false;
    }
    
    // Ingredients - Include
    if (filters.includeIngredients.length) {
      const match = filters.includeIngredients.every(ing => 
        product.ingredients.some(i => i.toLowerCase().includes(ing.toLowerCase()))
      );
      if (!match) return false;
    }
    
    // Ingredients - Exclude
    if (filters.excludeIngredients.length) {
      const match = filters.excludeIngredients.some(ing => 
        product.ingredients.some(i => i.toLowerCase().includes(ing.toLowerCase()))
      );
      if (match) return false;
    }
    
    // Rating
    if (filters.minRating && product.rating < filters.minRating) return false;
    
    // Availability
    if (filters.inStockOnly && product.stock <= 0) return false;
    if (filters.onSaleOnly && !product.onSale) return false;
    
    return true;
  });
}
```

### URL State Management
- Encode filters in URL: `/shop?cat=skincare&price=10-50&brand=cerave,neutrogena`
- Parse URL on page load
- Update URL on filter change (without reload)
- Browser back/forward support

## 2. LOYALTY POINTS SYSTEM

### Earning Rules
- Purchase: 1 point per $1 spent
- Account creation: 100 bonus points
- First purchase: 200 bonus points
- Birthday: 500 points
- Product review: 50 points per review
- Social share: 25 points
- Referral: 500 points (when friend purchases)

### Redemption Rules
- 100 points = $1 discount
- Minimum redemption: 500 points
- Maximum per order: 50% of order value
- Cannot combine with certain promotions

### Point Calculation Logic
```javascript
function calculatePointsEarned(orderTotal, isFirstPurchase) {
  let points = Math.floor(orderTotal); // 1 point per dollar
  if (isFirstPurchase) points += 200;
  return points;
}

function calculatePointsValue(points) {
  return points / 100; // 100 points = $1
}

function applyPointsDiscount(orderTotal, pointsToRedeem) {
  const maxRedeemable = Math.floor(orderTotal * 0.5 * 100); // 50% max
  const actualRedeem = Math.min(pointsToRedeem, maxRedeemable);
  const discount = actualRedeem / 100;
  return {
    discount,
    pointsUsed: actualRedeem,
    newTotal: orderTotal - discount
  };
}
```

### Tier System (Optional)
- Bronze: 0-999 points (1x earning)
- Silver: 1000-2499 points (1.25x earning)
- Gold: 2500+ points (1.5x earning)

## 3. WISHLIST SYSTEM

### Features
- Add/Remove products
- Persist across sessions
- Share wishlist (generate link)
- Move to cart
- Price drop notifications
- Back in stock notifications

### Logic
```javascript
class WishlistService {
  add(productId) {
    const wishlist = this.get();
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      this.save(wishlist);
      this.syncToServer(); // if authenticated
    }
  }
  
  remove(productId) {
    const wishlist = this.get().filter(id => id !== productId);
    this.save(wishlist);
    this.syncToServer();
  }
  
  get() {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
  }
  
  save(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
  
  isInWishlist(productId) {
    return this.get().includes(productId);
  }
}
```

## 4. CART SYSTEM

### Features
- Add/Update/Remove items
- Quantity limits
- Stock validation
- Variant selection
- Discount codes
- Shipping calculation
- Tax calculation
- Persist across sessions
- Merge guest cart on login

### Cart Item Structure
```javascript
{
  id: 'unique-cart-item-id',
  productId: 'product-123',
  variantId: 'variant-456',
  quantity: 2,
  price: 29.99,
  title: 'Product Name',
  variant: 'Size: 50ml',
  image: 'url',
  stock: 10
}
```

### Cart Logic
```javascript
class CartService {
  addItem(product, variant, quantity) {
    const cart = this.get();
    const existingItem = cart.items.find(item => 
      item.productId === product.id && item.variantId === variant.id
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        id: generateId(),
        productId: product.id,
        variantId: variant.id,
        quantity,
        price: variant.price || product.price,
        title: product.title,
        variant: variant.name,
        image: product.image,
        stock: variant.stock || product.stock
      });
    }
    
    this.save(cart);
    this.updateTotals();
  }
  
  updateQuantity(itemId, quantity) {
    const cart = this.get();
    const item = cart.items.find(i => i.id === itemId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeItem(itemId);
      } else if (quantity <= item.stock) {
        item.quantity = quantity;
        this.save(cart);
        this.updateTotals();
      } else {
        throw new Error('Insufficient stock');
      }
    }
  }
  
  removeItem(itemId) {
    const cart = this.get();
    cart.items = cart.items.filter(i => i.id !== itemId);
    this.save(cart);
    this.updateTotals();
  }
  
  updateTotals() {
    const cart = this.get();
    cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    
    // Apply discount
    cart.discount = this.calculateDiscount(cart.discountCode, cart.subtotal);
    
    // Calculate shipping
    cart.shipping = this.calculateShipping(cart.subtotal - cart.discount);
    
    // Calculate tax
    cart.tax = this.calculateTax(cart.subtotal - cart.discount);
    
    // Total
    cart.total = cart.subtotal - cart.discount + cart.shipping + cart.tax;
    
    this.save(cart);
    this.notifySubscribers();
  }
  
  applyDiscount(code) {
    // Validate discount code
    const discount = this.validateDiscountCode(code);
    if (discount) {
      const cart = this.get();
      cart.discountCode = code;
      this.save(cart);
      this.updateTotals();
      return true;
    }
    return false;
  }
  
  calculateShipping(subtotal) {
    const freeShippingThreshold = 50;
    if (subtotal >= freeShippingThreshold) return 0;
    return 5.99;
  }
  
  calculateTax(subtotal) {
    const taxRate = 0.08; // 8%
    return subtotal * taxRate;
  }
}
```

## 5. CROSS-SELL & RELATED PRODUCTS

### Strategies
1. **Frequently Bought Together**
   - Analyze order history
   - Show products often purchased together
   - Bundle discount option

2. **Similar Products**
   - Same category
   - Similar price range
   - Similar attributes

3. **Complete Your Routine**
   - Complementary products
   - Morning/Night routine
   - Step-by-step skincare

4. **Recently Viewed**
   - Track in localStorage
   - Show on product pages
   - Limit to last 10

### Logic
```javascript
function getRelatedProducts(product, allProducts, limit = 4) {
  return allProducts
    .filter(p => p.id !== product.id)
    .filter(p => p.category === product.category)
    .sort((a, b) => {
      // Prioritize similar price
      const priceDiffA = Math.abs(a.price - product.price);
      const priceDiffB = Math.abs(b.price - product.price);
      return priceDiffA - priceDiffB;
    })
    .slice(0, limit);
}

function getFrequentlyBoughtTogether(productId, orderHistory) {
  // Find orders containing this product
  const ordersWithProduct = orderHistory.filter(order => 
    order.items.some(item => item.productId === productId)
  );
  
  // Count co-occurrences
  const coOccurrences = {};
  ordersWithProduct.forEach(order => {
    order.items.forEach(item => {
      if (item.productId !== productId) {
        coOccurrences[item.productId] = (coOccurrences[item.productId] || 0) + 1;
      }
    });
  });
  
  // Sort by frequency
  return Object.entries(coOccurrences)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([productId]) => productId);
}
```

## 6. SEARCH FUNCTIONALITY

### Features
- Real-time search
- Autocomplete suggestions
- Search history
- Popular searches
- Typo tolerance
- Category filtering in results
- Sort options

### Search Logic
```javascript
class SearchService {
  search(query, products) {
    const normalizedQuery = query.toLowerCase().trim();
    
    if (!normalizedQuery) return [];
    
    return products
      .map(product => ({
        product,
        score: this.calculateRelevance(product, normalizedQuery)
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.product);
  }
  
  calculateRelevance(product, query) {
    let score = 0;
    
    const title = product.title.toLowerCase();
    const brand = product.brand.toLowerCase();
    const category = product.category.toLowerCase();
    const description = product.description.toLowerCase();
    
    // Exact title match
    if (title === query) score += 100;
    
    // Title starts with query
    if (title.startsWith(query)) score += 50;
    
    // Title contains query
    if (title.includes(query)) score += 30;
    
    // Brand match
    if (brand.includes(query)) score += 40;
    
    // Category match
    if (category.includes(query)) score += 20;
    
    // Description match
    if (description.includes(query)) score += 10;
    
    // Ingredient match
    if (product.ingredients.some(ing => ing.toLowerCase().includes(query))) {
      score += 15;
    }
    
    return score;
  }
  
  getSuggestions(query, products, limit = 5) {
    const results = this.search(query, products);
    return results.slice(0, limit).map(p => ({
      title: p.title,
      category: p.category,
      image: p.image,
      price: p.price
    }));
  }
  
  saveSearchHistory(query) {
    const history = JSON.parse(localStorage.getItem('search_history') || '[]');
    if (!history.includes(query)) {
      history.unshift(query);
      localStorage.setItem('search_history', JSON.stringify(history.slice(0, 10)));
    }
  }
}
```

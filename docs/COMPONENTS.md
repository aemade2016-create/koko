# Component Architecture

## Reusable Components

### ProductCard
**Props**: product, showQuickView, showWishlist
**Features**:
- Image with hover zoom
- Quick add to cart
- Wishlist toggle
- Rating display
- Price with discount badge
- Out of stock overlay
- Lazy loading images

### FilterSidebar
**Props**: filters, onFilterChange
**Features**:
- Price range slider
- Multi-select checkboxes (brands, skin type, concerns)
- Ingredient search
- Clear all filters
- Active filter chips
- Collapsible sections
- Mobile drawer version

### SearchBar
**Props**: placeholder, onSearch
**Features**:
- Autocomplete suggestions
- Recent searches
- Popular searches
- Category quick links
- Debounced input
- Clear button
- Voice search icon

### CartItem
**Props**: item, onUpdate, onRemove
**Features**:
- Product image
- Quantity selector
- Remove button
- Price calculation
- Stock indicator
- Move to wishlist

### Modal
**Props**: isOpen, onClose, title, content
**Features**:
- Backdrop click to close
- ESC key to close
- Scroll lock
- Animation transitions
- Mobile full-screen option

### Toast
**Props**: message, type, duration
**Features**:
- Success/Error/Info/Warning types
- Auto-dismiss
- Close button
- Stack multiple toasts
- Animation

### Header
**Features**:
- Logo
- Navigation menu
- Search bar
- Language switcher
- Theme toggle
- Cart icon with count
- Wishlist icon with count
- User menu dropdown
- Mobile hamburger menu
- Sticky on scroll
- Announcement bar

### Footer
**Features**:
- Newsletter signup
- Social links
- Quick links
- Contact info
- Payment methods
- Trust badges
- Copyright

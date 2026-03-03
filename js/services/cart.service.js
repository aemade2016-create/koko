// Cart Service

// Add item to cart
function addToCart(product, quantity = 1) {
    const cart = AppState.cart;
    const existingItem = cart.items.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            id: product.id,
            title: product.title,
            brand: product.brand,
            price: product.price,
            image: product.image,
            quantity: quantity,
            stock: product.stock
        });
    }

    updateCartTotals();
    showToast(t('common.success'), 'Product added to cart!', 'success');
}

// Remove item from cart
function removeFromCart(productId) {
    AppState.cart.items = AppState.cart.items.filter(item => item.id !== productId);
    updateCartTotals();
    showToast(t('common.success'), 'Product removed from cart', 'success');
}

// Update item quantity
function updateCartQuantity(productId, quantity) {
    const item = AppState.cart.items.find(item => item.id === productId);

    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else if (quantity <= item.stock) {
            item.quantity = quantity;
            updateCartTotals();
        } else {
            showToast('Error', 'Insufficient stock', 'error');
        }
    }
}

// Update cart totals
function updateCartTotals() {
    const cart = AppState.cart;

    cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    // Initialize discount if not exists
    if (!cart.discount) cart.discount = 0;

    // Calculate subtotal after discount
    const subtotalAfterDiscount = cart.subtotal - cart.discount;

    // Shipping (free over 500 EGP or with FREESHIP coupon)
    if (cart.freeShipping) {
        cart.shipping = 0;
    } else {
        cart.shipping = subtotalAfterDiscount >= 500 ? 0 : 50;
    }

    // Tax (14%)
    cart.tax = subtotalAfterDiscount * 0.14;

    // Total
    cart.total = subtotalAfterDiscount + cart.shipping + cart.tax;

    setState('cart', cart);
    updateCartBadge();
}

// Clear cart
function clearCart() {
    AppState.cart.items = [];
    updateCartTotals();
}

// Get cart
function getCart() {
    return AppState.cart;
}

// Update cart badge in header
function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = AppState.cart.itemCount;
        if (AppState.cart.itemCount > 0) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}

// Apply coupon code
function applyCoupon(code) {
    // Mock coupon validation
    const coupons = {
        'SAVE10': { type: 'percentage', value: 10 },
        'SAVE50': { type: 'fixed', value: 50 },
        'FREESHIP': { type: 'shipping', value: 0 }
    };

    const coupon = coupons[code.toUpperCase()];

    if (coupon) {
        AppState.cart.couponCode = code.toUpperCase();

        if (coupon.type === 'percentage') {
            AppState.cart.discount = AppState.cart.subtotal * (coupon.value / 100);
        } else if (coupon.type === 'fixed') {
            AppState.cart.discount = Math.min(coupon.value, AppState.cart.subtotal);
        } else if (coupon.type === 'shipping') {
            AppState.cart.discount = 0;
            AppState.cart.freeShipping = true;
        }

        updateCartTotals();
        showToast('Success', 'Coupon applied successfully!', 'success');
        return true;
    } else {
        showToast('Error', 'Invalid coupon code', 'error');
        return false;
    }
}

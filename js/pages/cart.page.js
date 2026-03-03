// Cart Page Logic

function renderCartPage() {
    const cart = getCart();
    const cartItems = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const lang = AppState.ui.language;

    if (cart.items.length === 0) {
        cartItems.classList.add('hidden');
        emptyCart.classList.remove('hidden');
        return;
    }

    cartItems.classList.remove('hidden');
    emptyCart.classList.add('hidden');

    cartItems.innerHTML = cart.items.map(item => `
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div class="flex flex-col md:flex-row gap-6">
                <!-- Image -->
                <div class="w-full md:w-32 h-32 flex-shrink-0">
                    <img src="${item.image}" alt="${item.title[lang]}" class="w-full h-full object-cover rounded-lg">
                </div>
                
                <!-- Info -->
                <div class="flex-1">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h3 class="text-lg font-bold">${item.title[lang]}</h3>
                            <p class="text-sm text-gray-500">${item.brand}</p>
                        </div>
                        <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 transition">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <!-- Quantity -->
                        <div class="flex items-center gap-3">
                            <span class="text-sm font-medium">Quantity:</span>
                            <div class="flex items-center border rounded-lg dark:border-gray-600">
                                <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" 
                                        class="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span class="px-4 py-1 border-x dark:border-gray-600">${item.quantity}</span>
                                <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" 
                                        class="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                        ${item.quantity >= item.stock ? 'disabled' : ''}>
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            ${item.quantity >= item.stock ? '<span class="text-xs text-red-500">Max stock reached</span>' : ''}
                        </div>
                        
                        <!-- Price -->
                        <div class="text-right">
                            <p class="text-sm text-gray-500">${item.price} EGP each</p>
                            <p class="text-xl font-bold text-pink-600">${item.price * item.quantity} EGP</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    updateCartSummary();
    updatePageTranslations();
}

function updateCartSummary() {
    const cart = getCart();

    document.getElementById('cart-subtotal').textContent = `${cart.subtotal.toFixed(2)} EGP`;
    document.getElementById('cart-shipping').textContent = cart.shipping === 0 ? 'FREE' : `${cart.shipping.toFixed(2)} EGP`;
    document.getElementById('cart-tax').textContent = `${cart.tax.toFixed(2)} EGP`;
    document.getElementById('cart-total').textContent = `${cart.total.toFixed(2)} EGP`;

    if (cart.discount && cart.discount > 0) {
        document.getElementById('discount-row').classList.remove('hidden');
        document.getElementById('cart-discount').textContent = `-${cart.discount.toFixed(2)} EGP`;
    } else {
        document.getElementById('discount-row').classList.add('hidden');
    }
}

function applyCouponCode() {
    const code = document.getElementById('coupon-input').value;
    if (code) {
        applyCoupon(code);
        renderCartPage();
    }
}

function proceedToCheckout() {
    if (AppState.cart.items.length === 0) {
        showToast('Error', 'Your cart is empty', 'error');
        return;
    }

    navigateTo('./checkout.html');
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items')) {
        renderCartPage();

        // Subscribe to cart changes
        subscribe('cart', () => {
            renderCartPage();
        });
    }
});

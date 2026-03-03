// Checkout Page Logic

function loadCheckoutSummary() {
    const cart = AppState.cart;

    if (cart.items.length === 0) {
        navigateTo('./cart.html');
        return;
    }

    // Render cart items in summary
    const summaryContainer = document.getElementById('checkout-summary');
    summaryContainer.innerHTML = cart.items.map(item => `
        <div class="flex gap-3 text-sm">
            <img src="${item.image}" alt="${item.title.en}" class="w-16 h-16 object-cover rounded-lg">
            <div class="flex-1">
                <p class="font-semibold">${item.title[AppState.ui.language]}</p>
                <p class="text-gray-500">Qty: ${item.quantity}</p>
            </div>
            <p class="font-semibold">${item.price * item.quantity} EGP</p>
        </div>
    `).join('');

    // Update totals
    document.getElementById('summary-subtotal').textContent = `${cart.subtotal.toFixed(2)} EGP`;
    document.getElementById('summary-shipping').textContent = `${cart.shipping.toFixed(2)} EGP`;
    document.getElementById('summary-tax').textContent = `${cart.tax.toFixed(2)} EGP`;
    document.getElementById('summary-total').textContent = `${cart.total.toFixed(2)} EGP`;
}

function goToPayment() {
    const form = document.getElementById('shipping-form');

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Save shipping info
    const formData = new FormData(form);
    const shippingInfo = {
        firstName: form.querySelector('input[type="text"]').value,
        lastName: form.querySelectorAll('input[type="text"]')[1].value,
        email: form.querySelector('input[type="email"]').value,
        phone: form.querySelector('input[type="tel"]').value,
        address: form.querySelectorAll('input[type="text"]')[2].value,
        city: form.querySelectorAll('input[type="text"]')[3].value,
        state: form.querySelectorAll('input[type="text"]')[4].value,
        postalCode: form.querySelectorAll('input[type="text"]')[5].value
    };

    AppState.checkoutData = { ...AppState.checkoutData, shipping: shippingInfo };
    saveStateToStorage();

    // Show payment step
    document.getElementById('step-shipping').classList.add('hidden');
    document.getElementById('step-payment').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function backToShipping() {
    document.getElementById('step-payment').classList.add('hidden');
    document.getElementById('step-shipping').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function goToReview() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    AppState.checkoutData = { ...AppState.checkoutData, paymentMethod: selectedPayment };
    saveStateToStorage();

    // Render review items
    const reviewContainer = document.getElementById('review-items');
    const cart = AppState.cart;

    reviewContainer.innerHTML = `
        <div class="border dark:border-gray-700 rounded-lg p-4 mb-4">
            <h4 class="font-semibold mb-2">Shipping Address</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                ${AppState.checkoutData.shipping.firstName} ${AppState.checkoutData.shipping.lastName}<br>
                ${AppState.checkoutData.shipping.address}<br>
                ${AppState.checkoutData.shipping.city}, ${AppState.checkoutData.shipping.state} ${AppState.checkoutData.shipping.postalCode}<br>
                ${AppState.checkoutData.shipping.phone}<br>
                ${AppState.checkoutData.shipping.email}
            </p>
        </div>

        <div class="border dark:border-gray-700 rounded-lg p-4 mb-4">
            <h4 class="font-semibold mb-2">Payment Method</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                ${selectedPayment === 'card' ? 'Credit/Debit Card' : selectedPayment === 'vodafone' ? 'Vodafone Cash' : 'Cash on Delivery'}
            </p>
        </div>

        <div class="border dark:border-gray-700 rounded-lg p-4">
            <h4 class="font-semibold mb-3">Order Items</h4>
            ${cart.items.map(item => `
                <div class="flex gap-3 mb-3">
                    <img src="${item.image}" alt="${item.title.en}" class="w-16 h-16 object-cover rounded-lg">
                    <div class="flex-1">
                        <p class="font-semibold">${item.title[AppState.ui.language]}</p>
                        <p class="text-sm text-gray-500">Qty: ${item.quantity} × ${item.price} EGP</p>
                    </div>
                    <p class="font-semibold">${item.price * item.quantity} EGP</p>
                </div>
            `).join('')}
        </div>
    `;

    // Show review step
    document.getElementById('step-payment').classList.add('hidden');
    document.getElementById('step-review').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function backToPayment() {
    document.getElementById('step-review').classList.add('hidden');
    document.getElementById('step-payment').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function placeOrder() {
    showLoading();

    // Create order
    const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: [...AppState.cart.items],
        shipping: AppState.checkoutData.shipping,
        paymentMethod: AppState.checkoutData.paymentMethod,
        subtotal: AppState.cart.subtotal,
        shipping: AppState.cart.shipping,
        tax: AppState.cart.tax,
        discount: AppState.cart.discount,
        total: AppState.cart.total,
        status: 'processing'
    };

    // Add to user orders if logged in
    if (AppState.isAuthenticated && AppState.user) {
        if (!AppState.user.orders) {
            AppState.user.orders = [];
        }
        AppState.user.orders.push(order);

        // Add loyalty points (1 EGP = 1 point)
        const pointsEarned = Math.floor(order.total);
        AppState.user.loyaltyPoints = (AppState.user.loyaltyPoints || 0) + pointsEarned;

        // First purchase bonus
        if (AppState.user.orders.length === 1) {
            AppState.user.loyaltyPoints += 200;
            showToast('Bonus!', 'You earned 200 bonus points for your first purchase!', 'success');
        }
    }

    // Clear cart
    AppState.cart = {
        items: [],
        subtotal: 0,
        shipping: 0,
        tax: 0,
        discount: 0,
        total: 0,
        appliedCoupon: null
    };

    // Clear checkout data
    AppState.checkoutData = {};

    saveStateToStorage();

    setTimeout(() => {
        hideLoading();
        showToast('Success', 'Order placed successfully!', 'success');

        setTimeout(() => {
            if (AppState.isAuthenticated) {
                navigateTo('./dashboard.html');
            } else {
                navigateTo('./index.html');
            }
        }, 1500);
    }, 2000);
}

// Initialize checkout page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('checkout-summary')) {
        loadCheckoutSummary();
    }
});

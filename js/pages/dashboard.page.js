// Dashboard Page Logic

let currentOrderFilter = 'all';

async function loadDashboard() {
    // Check authentication
    if (!isAuthenticated()) {
        navigateTo('./login.html');
        return;
    }

    const user = AppState.user;

    // Show admin panel link if admin
    if (user.role === 'admin') {
        document.getElementById('admin-panel-link').classList.remove('hidden');
    }

    // Update stats
    const orders = user.orders || [];
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

    document.getElementById('stat-orders').textContent = orders.length;
    document.getElementById('stat-points').textContent = user.loyaltyPoints || 0;
    document.getElementById('stat-wishlist').textContent = AppState.wishlist.items.length;
    document.getElementById('stat-spent').textContent = `${totalSpent.toFixed(0)} EGP`;

    // Load orders
    renderOrders();

    // Load wishlist preview
    await loadWishlistPreview();
}

function renderOrders() {
    const user = AppState.user;
    const orders = user.orders || [];
    const container = document.getElementById('orders-container');

    let filteredOrders = orders;
    if (currentOrderFilter !== 'all') {
        filteredOrders = orders.filter(order => order.status === currentOrderFilter);
    }

    if (filteredOrders.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-shopping-bag text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">No orders found</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredOrders.map(order => {
        const statusColors = {
            processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        };

        return `
            <div class="border dark:border-gray-700 rounded-lg p-4 mb-4">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <p class="font-semibold">Order #${order.id}</p>
                        <p class="text-sm text-gray-500">${new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <span class="px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}">
                        ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                </div>

                <div class="space-y-2 mb-4">
                    ${order.items.slice(0, 2).map(item => `
                        <div class="flex gap-3">
                            <img src="${item.image}" alt="${item.title.en}" class="w-16 h-16 object-cover rounded-lg">
                            <div class="flex-1">
                                <p class="font-semibold text-sm">${item.title[AppState.ui.language]}</p>
                                <p class="text-xs text-gray-500">Qty: ${item.quantity}</p>
                            </div>
                            <p class="font-semibold">${item.price * item.quantity} EGP</p>
                        </div>
                    `).join('')}
                    ${order.items.length > 2 ? `<p class="text-sm text-gray-500">+${order.items.length - 2} more items</p>` : ''}
                </div>

                <div class="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                    <div>
                        <p class="text-sm text-gray-500">Total</p>
                        <p class="text-xl font-bold">${order.total.toFixed(2)} EGP</p>
                    </div>
                    <button onclick="reorder(${order.id})" class="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                        <i class="fas fa-redo mr-2"></i>Reorder
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function filterOrders(status) {
    currentOrderFilter = status;

    // Update tabs
    ['all', 'processing', 'completed'].forEach(s => {
        const tab = document.getElementById(`tab-${s}`);
        if (s === status) {
            tab.classList.add('border-pink-600', 'text-pink-600');
            tab.classList.remove('border-transparent', 'text-gray-500');
        } else {
            tab.classList.remove('border-pink-600', 'text-pink-600');
            tab.classList.add('border-transparent', 'text-gray-500');
        }
    });

    renderOrders();
}

async function reorder(orderId) {
    const user = AppState.user;
    const order = user.orders.find(o => o.id === orderId);

    if (!order) {
        showToast('Error', 'Order not found', 'error');
        return;
    }

    // Add all items to cart
    for (const item of order.items) {
        const product = await getProductById(item.id);
        if (product && product.stock > 0) {
            addToCart(product, item.quantity);
        }
    }

    showToast('Success', 'Items added to cart!', 'success');
    setTimeout(() => {
        navigateTo('./cart.html');
    }, 1000);
}

async function loadWishlistPreview() {
    const container = document.getElementById('wishlist-preview');
    const wishlistIds = AppState.wishlist.items.slice(0, 4);

    if (wishlistIds.length === 0) {
        container.innerHTML = `
            <div class="col-span-4 text-center py-8">
                <i class="fas fa-heart text-4xl text-gray-300 mb-3"></i>
                <p class="text-gray-500">Your wishlist is empty</p>
            </div>
        `;
        return;
    }

    const products = await Promise.all(
        wishlistIds.map(id => getProductById(id))
    );

    container.innerHTML = products.filter(p => p).map(product => {
        return `
            <div class="border dark:border-gray-700 rounded-lg p-3 hover:shadow-lg transition">
                <img src="${product.image}" alt="${product.title.en}" class="w-full aspect-square object-cover rounded-lg mb-2">
                <p class="font-semibold text-sm mb-1">${product.title[AppState.ui.language]}</p>
                <p class="text-pink-600 font-bold">${product.price} EGP</p>
            </div>
        `;
    }).join('');
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('orders-container')) {
        loadDashboard();
    }
});

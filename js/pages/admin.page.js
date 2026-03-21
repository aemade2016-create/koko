// Admin Panel Logic

async function loadAdminPanel() {
    // Check if user is admin
    if (!AppState.user || !AppState.user.isAuthenticated || !AppState.user.role || AppState.user.role !== 'admin') {
        if (typeof showToast === 'function') {
            showToast('Error', 'Access denied. Admin only.', 'error');
        }
        setTimeout(() => navigateTo('./index.html'), 1500);
        return;
    }

    console.log('✅ Admin panel access granted');

    // Show loading
    const container = document.getElementById('products-list');
    if (container) {
        container.innerHTML = '<div class="text-center py-8"><i class="fas fa-spinner fa-spin text-4xl text-pink-600"></i><p class="mt-4 text-gray-500">Loading products...</p></div>';
    }

    await loadProductsList();
    loadOrdersList();
}

async function loadProductsList() {
    try {
        // Load products using getAllProducts to ensure they're loaded
        const products = await getAllProducts();
        console.log('📦 Admin: Loaded', products.length, 'products');

        const container = document.getElementById('products-list');
        if (!container) return;

        if (!products || products.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500 text-xl mb-4">No products found</p>
                    <button onclick="window.location.href='./reset-products.html'" class="bg-pink-600 text-white px-6 py-3 rounded-lg">
                        Reset Products
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = products.map(product => `
            <div class="flex items-center gap-4 p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <img src="${product.image}" alt="${product.title.en}" class="w-20 h-20 object-cover rounded-lg">
                <div class="flex-1">
                    <p class="font-semibold text-lg">${product.title.en}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">${product.title.ar}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span class="font-semibold">${product.brand}</span> • 
                        <span class="text-pink-600 font-bold">${product.price} EGP</span>
                        ${product.oldPrice ? `<span class="line-through text-gray-400 ml-2">${product.oldPrice} EGP</span>` : ''}
                    </p>
                    <p class="text-sm mt-1">
                        <span class="${product.stock > 0 ? 'text-green-600' : 'text-red-600'} font-semibold">
                            Stock: ${product.stock}
                        </span> • 
                        <span class="text-gray-500">Category: ${product.category}</span> •
                        <span class="text-gray-500">ID: ${product.id}</span>
                    </p>
                </div>
                <div class="flex gap-2">
                    <button onclick="editProduct(${product.id})" class="text-blue-600 hover:text-blue-700 px-4 py-2 border border-blue-600 rounded-lg transition hover:bg-blue-50">
                        <i class="fas fa-edit mr-2"></i>Edit
                    </button>
                    <button onclick="confirmDeleteProduct(${product.id})" class="text-red-600 hover:text-red-700 px-4 py-2 border border-red-600 rounded-lg transition hover:bg-red-50">
                        <i class="fas fa-trash mr-2"></i>Delete
                    </button>
                </div>
            </div>
        `).join('');

        // Update products count
        const countElement = document.getElementById('products-count');
        if (countElement) {
            countElement.textContent = products.length;
        }

        console.log('✅ Admin: Products list rendered');
    } catch (error) {
        console.error('❌ Error loading products in admin:', error);
        const container = document.getElementById('products-list');
        if (container) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-exclamation-triangle text-6xl text-red-400 mb-4"></i>
                    <p class="text-red-600 text-xl mb-4">Failed to load products</p>
                    <p class="text-gray-500 mb-4">${error.message}</p>
                    <button onclick="window.location.href='./reset-products.html'" class="bg-pink-600 text-white px-6 py-3 rounded-lg mr-2">
                        Reset Products
                    </button>
                    <button onclick="loadProductsList()" class="bg-gray-600 text-white px-6 py-3 rounded-lg">
                        Retry
                    </button>
                </div>
            `;
        }
    }
}

function loadOrdersList() {
    // Get all orders from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const allOrders = [];

    // Collect all orders from all users
    users.forEach(user => {
        if (user.orders && user.orders.length > 0) {
            user.orders.forEach(order => {
                allOrders.push({
                    ...order,
                    userEmail: user.email,
                    userName: user.name
                });
            });
        }
    });

    const container = document.getElementById('orders-list');
    if (!container) return;

    if (allOrders.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 py-8">No orders found</p>';
        return;
    }

    // Sort by date (newest first)
    allOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Group by status
    const pending = allOrders.filter(o => o.status === 'pending');
    const processing = allOrders.filter(o => o.status === 'processing');
    const completed = allOrders.filter(o => o.status === 'completed');

    container.innerHTML = `
        <div class="space-y-6">
            ${renderOrderGroup('Pending Orders', pending, 'yellow')}
            ${renderOrderGroup('Processing Orders', processing, 'blue')}
            ${renderOrderGroup('Completed Orders', completed, 'green')}
        </div>
    `;
}

function renderOrderGroup(title, orders, color) {
    if (orders.length === 0) return '';

    const colorClasses = {
        yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };

    return `
        <div>
            <h3 class="text-xl font-bold mb-4">${title} (${orders.length})</h3>
            <div class="space-y-3">
                ${orders.map(order => `
                    <div class="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <div class="flex items-center justify-between mb-3">
                            <div>
                                <p class="font-semibold">Order #${order.id}</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">${new Date(order.date).toLocaleDateString()} • ${order.userEmail}</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">${order.shipping?.name || order.userName}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-xl font-bold text-pink-600">${order.total.toFixed(2)} EGP</p>
                                <select onchange="updateOrderStatus('${order.userEmail}', ${order.id}, this.value)" 
                                    class="mt-2 px-3 py-1 rounded-full text-sm font-semibold ${colorClasses[color]} border-0 cursor-pointer">
                                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                                    <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                                </select>
                            </div>
                        </div>

                        <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <p><strong>Items:</strong> ${order.items.length} products</p>
                            <p><strong>Payment:</strong> ${order.paymentMethod}</p>
                            <p><strong>Phone:</strong> ${order.shipping?.phone || 'N/A'}</p>
                            <p><strong>Address:</strong> ${order.shipping?.address || 'N/A'}</p>
                        </div>

                        <details class="mt-3">
                            <summary class="cursor-pointer text-pink-600 hover:text-pink-700 font-semibold">View Items</summary>
                            <div class="mt-2 space-y-2">
                                ${order.items.map(item => {
        const lang = AppState?.ui?.language || 'en';
        const itemTitle = item.title && typeof item.title === 'object'
            ? (item.title[lang] || item.title.en || item.title.ar || 'Product')
            : (item.title || 'Product');
        return `
                                    <div class="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                        <img src="${item.image}" alt="${itemTitle}" class="w-12 h-12 object-cover rounded">
                                        <div class="flex-1">
                                            <p class="font-medium text-sm">${itemTitle}</p>
                                            <p class="text-xs text-gray-500">Qty: ${item.quantity} × ${item.price} EGP</p>
                                        </div>
                                        <p class="font-semibold">${(item.quantity * item.price).toFixed(2)} EGP</p>
                                    </div>
                                `}).join('')}
                            </div>
                        </details>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function showAdminTab(tab) {
    // Update tabs
    ['products', 'orders'].forEach(t => {
        const tabBtn = document.getElementById(`admin-tab-${t}`);
        const content = document.getElementById(`admin-${t}`);

        if (t === tab) {
            tabBtn.classList.add('border-pink-600', 'text-pink-600');
            tabBtn.classList.remove('border-transparent', 'text-gray-500');
            content.classList.remove('hidden');
        } else {
            tabBtn.classList.remove('border-pink-600', 'text-pink-600');
            tabBtn.classList.add('border-transparent', 'text-gray-500');
            content.classList.add('hidden');
        }
    });

    // Reload data when switching tabs
    if (tab === 'orders') {
        loadOrdersList();
    }
}

function showAddProductForm() {
    document.getElementById('modal-title').textContent = 'Add New Product';
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    document.getElementById('product-modal').classList.remove('hidden');
}

async function editProduct(productId) {
    try {
        const products = await getAllProducts();
        const product = products.find(p => p.id === parseInt(productId));

        if (!product) {
            if (typeof showToast === 'function') {
                showToast('Error', 'Product not found', 'error');
            }
            return;
        }

        document.getElementById('modal-title').textContent = 'Edit Product';
        document.getElementById('product-id').value = product.id;
        document.getElementById('title-en').value = product.title.en;
        document.getElementById('title-ar').value = product.title.ar;
        document.getElementById('brand').value = product.brand;
        document.getElementById('price').value = product.price;
        document.getElementById('old-price').value = product.oldPrice || '';
        document.getElementById('stock').value = product.stock;
        document.getElementById('image').value = product.image;
        document.getElementById('category').value = product.category;

        document.getElementById('product-modal').classList.remove('hidden');
    } catch (error) {
        console.error('Error loading product for edit:', error);
        if (typeof showToast === 'function') {
            showToast('Error', 'Failed to load product', 'error');
        }
    }
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

function confirmDeleteProduct(productId) {
    showModal(
        'Delete Product',
        '<p class="text-gray-600 dark:text-gray-400">Are you sure you want to delete this product? This action cannot be undone.</p>',
        [
            {
                text: 'Cancel',
                class: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
                action: 'document.querySelector(".modal-overlay").remove()'
            },
            {
                text: 'Delete',
                class: 'bg-red-600 hover:bg-red-700 text-white',
                action: `deleteProductConfirmed(${productId}); document.querySelector(".modal-overlay").remove()`
            }
        ]
    );
}

function deleteProductConfirmed(productId) {
    if (deleteProduct(productId)) {
        loadProductsList();
    }
}

function updateOrderStatus(userEmail, orderId, newStatus) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === userEmail);

    if (user && user.orders) {
        const order = user.orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            localStorage.setItem('users', JSON.stringify(users));
            showToast('Success', `Order #${orderId} status updated to ${newStatus}`, 'success');
            loadOrdersList(); // Reload to show in correct group
        }
    }
}

// Handle product form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const productId = document.getElementById('product-id').value;
            const productData = {
                title: {
                    en: document.getElementById('title-en').value,
                    ar: document.getElementById('title-ar').value
                },
                brand: document.getElementById('brand').value,
                price: parseFloat(document.getElementById('price').value),
                oldPrice: parseFloat(document.getElementById('old-price').value) || null,
                stock: parseInt(document.getElementById('stock').value),
                image: document.getElementById('image').value,
                category: document.getElementById('category').value,
                description: {
                    en: document.getElementById('title-en').value,
                    ar: document.getElementById('title-ar').value
                },
                suitableFor: ['all'],
                concerns: [],
                ingredients: []
            };

            if (productId) {
                // Update existing product
                updateProduct(productId, productData);
            } else {
                // Add new product
                addProduct(productData);
            }

            closeProductModal();
            await loadProductsList();
        });
    }

    if (document.getElementById('products-list')) {
        loadAdminPanel();
    }
});

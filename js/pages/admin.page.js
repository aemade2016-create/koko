// Admin Panel Logic

async function loadAdminPanel() {
    // Check if user is admin
    if (!isAuthenticated() || !AppState.user || AppState.user.role !== 'admin') {
        showToast('Error', 'Access denied. Admin only.', 'error');
        setTimeout(() => navigateTo('./index.html'), 1500);
        return;
    }

    await loadProductsList();
    loadOrdersList();
}

async function loadProductsList() {
    const products = await getAllProducts();
    const container = document.getElementById('products-list');

    container.innerHTML = products.map(product => `
        <div class="flex items-center gap-4 p-4 border dark:border-gray-700 rounded-lg">
            <img src="${product.image}" alt="${product.title.en}" class="w-20 h-20 object-cover rounded-lg">
            <div class="flex-1">
                <p class="font-semibold">${product.title.en}</p>
                <p class="text-sm text-gray-500">${product.brand} • ${product.price} EGP</p>
                <p class="text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}">
                    Stock: ${product.stock}
                </p>
            </div>
            <div class="flex gap-2">
                <button onclick="editProduct(${product.id})" class="text-blue-600 hover:text-blue-700 px-4 py-2 border border-blue-600 rounded-lg transition">
                    <i class="fas fa-edit mr-2"></i>Edit
                </button>
                <button onclick="deleteProduct(${product.id})" class="text-red-600 hover:text-red-700 px-4 py-2 border border-red-600 rounded-lg transition">
                    <i class="fas fa-trash mr-2"></i>Delete
                </button>
            </div>
        </div>
    `).join('');
}

function loadOrdersList() {
    // Get all orders from all users (in real app, this would be from backend)
    const allOrders = [];

    // For demo, just show current user's orders
    if (AppState.user && AppState.user.orders) {
        allOrders.push(...AppState.user.orders);
    }

    const container = document.getElementById('orders-list');

    if (allOrders.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 py-8">No orders found</p>';
        return;
    }

    container.innerHTML = allOrders.map(order => {
        const statusColors = {
            processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        };

        return `
            <div class="border dark:border-gray-700 rounded-lg p-4">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <p class="font-semibold">Order #${order.id}</p>
                        <p class="text-sm text-gray-500">${new Date(order.date).toLocaleDateString()}</p>
                        <p class="text-sm text-gray-500">${order.shipping.email}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-xl font-bold">${order.total.toFixed(2)} EGP</p>
                        <select onchange="updateOrderStatus(${order.id}, this.value)" 
                            class="mt-2 px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]} border-0">
                            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                        </select>
                    </div>
                </div>

                <div class="text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Items:</strong> ${order.items.length}</p>
                    <p><strong>Payment:</strong> ${order.paymentMethod}</p>
                </div>
            </div>
        `;
    }).join('');
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
}

function showAddProductForm() {
    document.getElementById('modal-title').textContent = 'Add New Product';
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    document.getElementById('product-modal').classList.remove('hidden');
}

async function editProduct(productId) {
    const product = await getProductById(productId);

    if (!product) {
        showToast('Error', 'Product not found', 'error');
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
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }

    // In real app, this would call API
    // For demo, we'll just show success message
    showToast('Success', 'Product deleted successfully!', 'success');
    await loadProductsList();
}

function updateOrderStatus(orderId, newStatus) {
    // Find and update order
    if (AppState.user && AppState.user.orders) {
        const order = AppState.user.orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            saveStateToStorage();
            showToast('Success', 'Order status updated!', 'success');
        }
    }
}

// Handle product form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const productData = {
                id: document.getElementById('product-id').value || Date.now(),
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
                rating: 4.5,
                reviews: 0,
                description: { en: '', ar: '' },
                suitableFor: ['all'],
                concerns: [],
                ingredients: []
            };

            // In real app, this would call API
            showToast('Success', 'Product saved successfully!', 'success');
            closeProductModal();
            await loadProductsList();
        });
    }

    if (document.getElementById('products-list')) {
        loadAdminPanel();
    }
});

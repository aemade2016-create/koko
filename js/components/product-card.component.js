// Product Card Component

function createProductCard(product) {
    const lang = AppState.ui.language;
    const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
    const isInWishlist = AppState.wishlist.items.includes(product.id);

    return `
        <div class="product-card bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden">
            <!-- Image -->
            <div class="relative overflow-hidden aspect-square">
                <a href="/product.html?id=${product.id}">
                    <img src="${product.image}" 
                         alt="${product.title[lang]}" 
                         class="w-full h-full object-cover"
                         loading="lazy">
                </a>
                
                ${discount > 0 ? `
                    <div class="discount-badge">-${discount}%</div>
                ` : ''}
                
                <!-- Wishlist Button -->
                <button onclick="toggleWishlist(${product.id})" 
                        class="wishlist-btn ${isInWishlist ? 'active' : ''} absolute top-3 right-3 w-10 h-10 bg-white dark:bg-gray-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition">
                    <i class="fa${isInWishlist ? 's' : 'r'} fa-heart text-lg"></i>
                </button>
                
                ${product.stock === 0 ? `
                    <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span class="bg-red-500 text-white px-4 py-2 rounded-full font-semibold" data-i18n="product.outOfStock">Out of Stock</span>
                    </div>
                ` : ''}
            </div>
            
            <!-- Info -->
            <div class="p-4">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">${product.brand}</p>
                <a href="/product.html?id=${product.id}">
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-pink-600 transition">
                        ${product.title[lang]}
                    </h3>
                </a>
                
                <!-- Rating -->
                <div class="flex items-center mb-2">
                    <div class="flex text-yellow-400 text-sm">
                        ${Array(5).fill(0).map((_, i) => `
                            <i class="fa${i < Math.floor(product.rating) ? 's' : 'r'} fa-star"></i>
                        `).join('')}
                    </div>
                    <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">(${product.reviews})</span>
                </div>
                
                <!-- Price -->
                <div class="flex items-center justify-between mb-3">
                    <div>
                        <span class="price-tag">${product.price} ${t('common.egp')}</span>
                        ${product.oldPrice ? `
                            <span class="old-price ml-2">${product.oldPrice}</span>
                        ` : ''}
                    </div>
                </div>
                
                <!-- Add to Cart Button -->
                ${product.stock > 0 ? `
                    <button onclick="quickAddToCart(${product.id})" 
                            class="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-semibold transition">
                        <i class="fas fa-shopping-cart mr-2"></i>
                        <span data-i18n="product.addToCart">Add to Cart</span>
                    </button>
                ` : `
                    <button disabled class="w-full bg-gray-300 text-gray-500 py-2 rounded-lg font-semibold cursor-not-allowed">
                        <span data-i18n="product.outOfStock">Out of Stock</span>
                    </button>
                `}
            </div>
        </div>
    `;
}

// Quick add to cart
async function quickAddToCart(productId) {
    const product = await getProductById(productId);
    if (product && product.stock > 0) {
        addToCart(product, 1);
    }
}

// Toggle wishlist
function toggleWishlist(productId) {
    const wishlist = AppState.wishlist.items;
    const index = wishlist.indexOf(productId);

    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('Removed', 'Product removed from wishlist', 'info');
    } else {
        wishlist.push(productId);
        showToast('Added', 'Product added to wishlist', 'success');
    }

    setState('wishlist.items', wishlist);

    // Update wishlist badge
    const badge = document.querySelector('.wishlist-badge');
    if (badge) {
        badge.textContent = wishlist.length;
        badge.classList.toggle('hidden', wishlist.length === 0);
    }

    // Update button state
    const btn = event.target.closest('.wishlist-btn');
    if (btn) {
        btn.classList.toggle('active');
        const icon = btn.querySelector('i');
        icon.classList.toggle('fas');
        icon.classList.toggle('far');
    }
}

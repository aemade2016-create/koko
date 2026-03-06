// Product Card Component

function createProductCard(product) {
    // Defensive: Validate product object
    if (!product) {
        console.error('❌ createProductCard: product is undefined');
        return '<div class="p-4 text-red-500">Invalid product</div>';
    }

    // Defensive: Get language with fallback
    const lang = AppState?.ui?.language || 'en';

    // Defensive: Get title with multiple fallbacks
    const getTitle = () => {
        if (product.title && typeof product.title === 'object') {
            return product.title[lang] || product.title.en || product.title.ar || 'Product';
        }
        return product.title || product.name || 'Product';
    };

    const title = getTitle();

    // Defensive: Calculate discount safely
    const discount = (product.oldPrice && product.price)
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0;

    // Defensive: Check wishlist safely
    const isInWishlist = AppState?.wishlist?.items?.includes(product.id) || false;

    // Defensive: Get brand with fallback
    const brand = product.brand || 'Unknown Brand';

    // Defensive: Get stock with fallback
    const stock = product.stock !== undefined ? product.stock : 0;

    // Defensive: Get rating with fallback
    const rating = product.rating || 0;
    const reviews = product.reviews || 0;

    return `
        <div class="product-card bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden">
            <!-- Image -->
            <div class="relative overflow-hidden aspect-square">
                <a href="./product.html?id=${product.id}">
                    <img src="${product.image || 'https://via.placeholder.com/400'}" 
                         alt="${title}" 
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
                
                ${stock === 0 ? `
                    <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span class="bg-red-500 text-white px-4 py-2 rounded-full font-semibold" data-i18n="product.outOfStock">Out of Stock</span>
                    </div>
                ` : ''}
            </div>
            
            <!-- Info -->
            <div class="p-4">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">${brand}</p>
                <a href="./product.html?id=${product.id}">
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-pink-600 transition">
                        ${title}
                    </h3>
                </a>
                
                <!-- Rating -->
                <div class="flex items-center mb-2">
                    <div class="flex text-yellow-400 text-sm">
                        ${Array(5).fill(0).map((_, i) => `
                            <i class="fa${i < Math.floor(rating) ? 's' : 'r'} fa-star"></i>
                        `).join('')}
                    </div>
                    <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">(${reviews})</span>
                </div>
                
                <!-- Price -->
                <div class="flex items-center justify-between mb-3">
                    <div>
                        <span class="price-tag">${product.price || 0} ${typeof t === 'function' ? t('common.egp') : 'EGP'}</span>
                        ${product.oldPrice ? `
                            <span class="old-price ml-2">${product.oldPrice}</span>
                        ` : ''}
                    </div>
                </div>
                
                <!-- Add to Cart Button -->
                ${stock > 0 ? `
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

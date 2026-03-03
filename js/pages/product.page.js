// Product Detail Page Logic

let currentProduct = null;

async function loadProductDetail() {
    const params = getUrlParams();
    const productId = params.id;

    if (!productId) {
        navigateTo('./shop.html');
        return;
    }

    showLoading();
    currentProduct = await getProductById(parseInt(productId));

    if (!currentProduct) {
        hideLoading();
        showToast('Error', 'Product not found', 'error');
        setTimeout(() => navigateTo('./shop.html'), 2000);
        return;
    }

    renderProductDetail();
    loadRelatedProducts();
    hideLoading();
}

function renderProductDetail() {
    const lang = AppState.ui.language;
    const product = currentProduct;
    const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
    const isInWishlist = AppState.wishlist.items.includes(product.id);

    document.getElementById('product-breadcrumb').textContent = product.title[lang];
    document.title = `${product.title[lang]} - Glow Beauty`;

    const container = document.getElementById('product-detail');
    container.innerHTML = `
        <!-- Images -->
        <div>
            <div class="relative mb-4 aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img src="${product.image}" alt="${product.title[lang]}" class="w-full h-full object-cover">
                ${discount > 0 ? `<div class="discount-badge">-${discount}%</div>` : ''}
            </div>
        </div>
        
        <!-- Info -->
        <div>
            <p class="text-gray-500 dark:text-gray-400 mb-2">${product.brand}</p>
            <h1 class="text-4xl font-bold mb-4">${product.title[lang]}</h1>
            
            <!-- Rating -->
            <div class="flex items-center gap-4 mb-6">
                <div class="flex text-yellow-400">
                    ${Array(5).fill(0).map((_, i) => `
                        <i class="fa${i < Math.floor(product.rating) ? 's' : 'r'} fa-star"></i>
                    `).join('')}
                </div>
                <span class="text-gray-600 dark:text-gray-400">${product.rating} (${product.reviews} reviews)</span>
            </div>
            
            <!-- Price -->
            <div class="mb-6">
                <div class="flex items-center gap-4">
                    <span class="text-4xl font-bold text-pink-600">${product.price} EGP</span>
                    ${product.oldPrice ? `<span class="text-2xl text-gray-400 line-through">${product.oldPrice} EGP</span>` : ''}
                </div>
                ${product.stock > 0 ? `
                    <p class="text-green-600 mt-2"><i class="fas fa-check-circle mr-2"></i>In Stock (${product.stock} available)</p>
                ` : `
                    <p class="text-red-600 mt-2"><i class="fas fa-times-circle mr-2"></i>Out of Stock</p>
                `}
            </div>
            
            <!-- Description -->
            <div class="mb-6">
                <h3 class="text-xl font-bold mb-3">Description</h3>
                <p class="text-gray-600 dark:text-gray-400">${product.description[lang]}</p>
            </div>
            
            <!-- Benefits -->
            <div class="mb-6">
                <h3 class="text-xl font-bold mb-3">Key Benefits</h3>
                <ul class="space-y-2">
                    <li class="flex items-start">
                        <i class="fas fa-check text-green-600 mr-3 mt-1"></i>
                        <span>Suitable for ${product.suitableFor.join(', ')} skin</span>
                    </li>
                    ${product.concerns.length > 0 ? `
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-600 mr-3 mt-1"></i>
                            <span>Targets: ${product.concerns.join(', ')}</span>
                        </li>
                    ` : ''}
                </ul>
            </div>
            
            <!-- Ingredients -->
            <div class="mb-8">
                <h3 class="text-xl font-bold mb-3">Key Ingredients</h3>
                <div class="flex flex-wrap gap-2">
                    ${product.ingredients.map(ing => `
                        <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">${ing}</span>
                    `).join('')}
                </div>
            </div>
            
            <!-- Actions -->
            <div class="space-y-3">
                ${product.stock > 0 ? `
                    <div class="flex gap-3">
                        <div class="flex items-center border rounded-lg dark:border-gray-600">
                            <button onclick="decreaseQuantity()" class="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span id="product-quantity" class="px-6 py-3 border-x dark:border-gray-600 font-semibold">1</span>
                            <button onclick="increaseQuantity()" class="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button onclick="addProductToCart()" class="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition">
                            <i class="fas fa-shopping-cart mr-2"></i>
                            Add to Cart
                        </button>
                    </div>
                    <button onclick="buyNow()" class="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition">
                        Buy Now
                    </button>
                ` : `
                    <button disabled class="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed">
                        Out of Stock
                    </button>
                `}
                <button onclick="toggleWishlist(${product.id})" class="w-full border-2 ${isInWishlist ? 'border-pink-600 text-pink-600' : 'border-gray-300 dark:border-gray-600'} py-3 rounded-lg font-semibold hover:border-pink-600 hover:text-pink-600 transition">
                    <i class="fa${isInWishlist ? 's' : 'r'} fa-heart mr-2"></i>
                    ${isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
            </div>
            
            <!-- Trust Badges -->
            <div class="grid grid-cols-2 gap-4 mt-8 pt-8 border-t dark:border-gray-700">
                <div class="flex items-center gap-3">
                    <i class="fas fa-truck text-2xl text-pink-600"></i>
                    <div>
                        <p class="font-semibold">Free Shipping</p>
                        <p class="text-sm text-gray-500">On orders over 500 EGP</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <i class="fas fa-shield-alt text-2xl text-pink-600"></i>
                    <div>
                        <p class="font-semibold">Authentic Products</p>
                        <p class="text-sm text-gray-500">100% Original</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    updatePageTranslations();
}

let productQuantity = 1;

function increaseQuantity() {
    if (productQuantity < currentProduct.stock) {
        productQuantity++;
        document.getElementById('product-quantity').textContent = productQuantity;
    }
}

function decreaseQuantity() {
    if (productQuantity > 1) {
        productQuantity--;
        document.getElementById('product-quantity').textContent = productQuantity;
    }
}

function addProductToCart() {
    addToCart(currentProduct, productQuantity);
    productQuantity = 1;
    document.getElementById('product-quantity').textContent = productQuantity;
}

function buyNow() {
    addToCart(currentProduct, productQuantity);
    navigateTo('./checkout.html');
}

async function loadRelatedProducts() {
    const related = await getRelatedProducts(currentProduct.id, 4);
    const container = document.getElementById('related-products');

    if (related.length > 0) {
        container.innerHTML = related.map(product => createProductCard(product)).join('');
        updatePageTranslations();
    } else {
        container.innerHTML = '<p class="text-gray-500 col-span-4 text-center">No related products found</p>';
    }
}

// Initialize product page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-detail')) {
        loadProductDetail();
    }
});

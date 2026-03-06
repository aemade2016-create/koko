// Shop Page Logic

let allProducts = [];
let filteredProducts = [];
let displayedCount = 12;

// Load shop page
async function loadShopPage() {
    try {
        // Show loading indicator
        if (typeof showLoading === 'function') showLoading();
        console.log('🔄 Loading shop page...');

        // Load products
        allProducts = await getAllProducts();
        console.log('✅ Products loaded:', allProducts.length);

        if (!allProducts || allProducts.length === 0) {
            console.error('❌ No products found!');
            if (typeof hideLoading === 'function') hideLoading();

            const grid = document.getElementById('products-grid');
            if (grid) {
                grid.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <i class="fas fa-exclamation-triangle text-6xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500 text-xl">No products available</p>
                        <button onclick="window.location.href='./reset-products.html'" class="mt-4 bg-pink-600 text-white px-6 py-3 rounded-lg">
                            Reset Products
                        </button>
                    </div>
                `;
            }
            return;
        }

        // Check URL parameters
        const params = getUrlParams();
        if (params.skinType) {
            const skinTypeCheckbox = document.querySelector(`input[value="${params.skinType}"]`);
            if (skinTypeCheckbox) {
                skinTypeCheckbox.checked = true;
            }
        }

        applyFilters();
        if (typeof hideLoading === 'function') hideLoading();
        console.log('✅ Shop page loaded successfully');
    } catch (error) {
        console.error('❌ Error loading shop page:', error);
        if (typeof hideLoading === 'function') hideLoading();

        const grid = document.getElementById('products-grid');
        if (grid) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-exclamation-triangle text-6xl text-red-400 mb-4"></i>
                    <p class="text-red-600 text-xl mb-4">Failed to load products</p>
                    <p class="text-gray-500 mb-4">${error.message}</p>
                    <button onclick="window.location.href='./reset-products.html'" class="bg-pink-600 text-white px-6 py-3 rounded-lg mr-2">
                        Reset Products
                    </button>
                    <button onclick="location.reload()" class="bg-gray-600 text-white px-6 py-3 rounded-lg">
                        Reload Page
                    </button>
                </div>
            `;
        }

        if (typeof showToast === 'function') {
            showToast('Error', 'Failed to load products. Click "Reset Products" to fix.', 'error');
        }
    }
}

// Apply filters
function applyFilters() {
    // Defensive: Validate allProducts exists and is an array
    if (!Array.isArray(allProducts)) {
        console.error('❌ applyFilters: allProducts is not an array', allProducts);
        filteredProducts = [];
        renderProducts();
        return;
    }

    // Defensive: Get filter values safely
    const priceMinEl = document.getElementById('price-min');
    const priceMaxEl = document.getElementById('price-max');
    const categoryEl = document.querySelector('input[name="category"]:checked');

    const filters = {
        priceRange: [
            priceMinEl ? parseInt(priceMinEl.value) : 0,
            priceMaxEl ? parseInt(priceMaxEl.value) : 10000
        ],
        category: categoryEl?.value || '',
        brands: Array.from(document.querySelectorAll('input[type="checkbox"][value="CeraVe"], input[type="checkbox"][value="L\'Oréal"], input[type="checkbox"][value="Neutrogena"], input[type="checkbox"][value="Maybelline"], input[type="checkbox"][value="Garnier"], input[type="checkbox"][value="Nivea"]'))
            .filter(cb => cb.checked)
            .map(cb => cb.value),
        skinType: Array.from(document.querySelectorAll('input[type="checkbox"][value="dry"], input[type="checkbox"][value="oily"], input[type="checkbox"][value="combination"], input[type="checkbox"][value="sensitive"], input[type="checkbox"][value="normal"], input[type="checkbox"][value="all"]'))
            .filter(cb => cb.checked)
            .map(cb => cb.value),
        concerns: [],
        sortBy: AppState?.filters?.sortBy || 'featured'
    };

    // Defensive: Validate filterProducts function exists
    if (typeof filterProducts !== 'function') {
        console.error('❌ applyFilters: filterProducts function not found');
        filteredProducts = allProducts;
    } else {
        try {
            filteredProducts = filterProducts(allProducts, filters);
        } catch (error) {
            console.error('❌ Error in filterProducts:', error);
            filteredProducts = allProducts;
        }
    }

    // Defensive: Ensure filteredProducts is an array
    if (!Array.isArray(filteredProducts)) {
        console.warn('⚠️ applyFilters: filteredProducts is not an array, using allProducts');
        filteredProducts = allProducts;
    }

    displayedCount = 12;
    renderProducts();
}

// Update price filter
function updatePriceFilter() {
    const min = document.getElementById('price-min').value;
    const max = document.getElementById('price-max').value;

    document.getElementById('price-min-label').textContent = `${min} EGP`;
    document.getElementById('price-max-label').textContent = `${max} EGP`;

    applyFilters();
}

// Sort products
function sortProductsBy(sortBy) {
    // Defensive: Validate filteredProducts is an array
    if (!Array.isArray(filteredProducts)) {
        console.error('❌ sortProductsBy: filteredProducts is not an array');
        return;
    }

    // Defensive: Validate sortProducts function exists
    if (typeof sortProducts !== 'function') {
        console.error('❌ sortProductsBy: sortProducts function not found');
        renderProducts();
        return;
    }

    try {
        filteredProducts = sortProducts(filteredProducts, sortBy);
        renderProducts();
    } catch (error) {
        console.error('❌ Error in sortProductsBy:', error);
        renderProducts(); // Render anyway with unsorted products
    }
}

// Render products
function renderProducts() {
    const grid = document.getElementById('products-grid');

    // Defensive: Validate grid element exists
    if (!grid) {
        console.error('❌ renderProducts: products-grid element not found');
        return;
    }

    // Defensive: Validate filteredProducts is an array
    if (!Array.isArray(filteredProducts)) {
        console.error('❌ renderProducts: filteredProducts is not an array', filteredProducts);
        grid.innerHTML = '<div class="col-span-full text-center py-12 text-red-500">Error: Invalid products data</div>';
        return;
    }

    // Defensive: Handle empty products
    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-xl">No products found</p>
                <button onclick="clearFilters()" class="mt-4 bg-pink-600 text-white px-6 py-3 rounded-lg">
                    Clear Filters
                </button>
            </div>
        `;

        // Update count
        const countElement = document.getElementById('product-count');
        if (countElement) countElement.textContent = '0';

        return;
    }

    const productsToShow = filteredProducts.slice(0, displayedCount);

    // Defensive: Filter out invalid products before rendering
    const validProducts = productsToShow.filter(p => p && p.id);

    if (validProducts.length === 0) {
        console.warn('⚠️ renderProducts: No valid products to render');
        grid.innerHTML = '<div class="col-span-full text-center py-12 text-yellow-600">No valid products available</div>';
        return;
    }

    // Render products with error handling
    try {
        grid.innerHTML = validProducts.map(product => {
            try {
                return createProductCard(product);
            } catch (error) {
                console.error('❌ Error rendering product:', product.id, error);
                return ''; // Skip broken products
            }
        }).join('');
    } catch (error) {
        console.error('❌ Error in renderProducts:', error);
        grid.innerHTML = '<div class="col-span-full text-center py-12 text-red-500">Error rendering products</div>';
        return;
    }

    // Update product count
    const countElement = document.getElementById('product-count');
    if (countElement) {
        countElement.textContent = filteredProducts.length;
    }

    // Show/hide load more button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        if (displayedCount >= filteredProducts.length) {
            loadMoreBtn.classList.add('hidden');
        } else {
            loadMoreBtn.classList.remove('hidden');
        }
    }

    // Safe function calls
    if (typeof updatePageTranslations === 'function') {
        updatePageTranslations();
    }
    if (typeof initLazyLoading === 'function') {
        initLazyLoading();
    }
}

// Load more products
function loadMore() {
    displayedCount += 12;
    renderProducts();
}

// Clear filters
function clearFilters() {
    document.getElementById('price-min').value = 0;
    document.getElementById('price-max').value = 1000;
    document.querySelector('input[name="category"][value=""]').checked = true;
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);

    applyFilters();
}

// Initialize shop page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('products-grid')) {
        loadShopPage();
    }
});

// Make sortProducts available globally
window.sortProducts = sortProductsBy;

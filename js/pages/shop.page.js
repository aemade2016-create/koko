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
    const filters = {
        priceRange: [
            parseInt(document.getElementById('price-min').value),
            parseInt(document.getElementById('price-max').value)
        ],
        category: document.querySelector('input[name="category"]:checked')?.value || '',
        brands: Array.from(document.querySelectorAll('input[type="checkbox"][value="CeraVe"], input[type="checkbox"][value="L\'Oréal"], input[type="checkbox"][value="Neutrogena"], input[type="checkbox"][value="Maybelline"], input[type="checkbox"][value="Garnier"], input[type="checkbox"][value="Nivea"]'))
            .filter(cb => cb.checked)
            .map(cb => cb.value),
        skinType: Array.from(document.querySelectorAll('input[type="checkbox"][value="dry"], input[type="checkbox"][value="oily"], input[type="checkbox"][value="combination"], input[type="checkbox"][value="sensitive"], input[type="checkbox"][value="normal"], input[type="checkbox"][value="all"]'))
            .filter(cb => cb.checked)
            .map(cb => cb.value),
        concerns: [],
        sortBy: AppState.filters.sortBy || 'featured'
    };

    filteredProducts = filterProducts(allProducts, filters);
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
    filteredProducts = sortProducts(filteredProducts, sortBy);
    renderProducts();
}

// Render products
function renderProducts() {
    const grid = document.getElementById('products-grid');
    const productsToShow = filteredProducts.slice(0, displayedCount);

    grid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');

    document.getElementById('product-count').textContent = filteredProducts.length;

    // Show/hide load more button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (displayedCount >= filteredProducts.length) {
        loadMoreBtn.classList.add('hidden');
    } else {
        loadMoreBtn.classList.remove('hidden');
    }

    updatePageTranslations();
    initLazyLoading();
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

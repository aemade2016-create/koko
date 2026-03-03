// Wishlist Page Logic

async function loadWishlistPage() {
    const wishlistIds = AppState.wishlist.items;
    const container = document.getElementById('wishlist-products');
    const emptyState = document.getElementById('empty-wishlist');

    if (wishlistIds.length === 0) {
        container.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }

    container.classList.remove('hidden');
    emptyState.classList.add('hidden');

    showLoading();
    const allProducts = await getAllProducts();
    const wishlistProducts = allProducts.filter(p => wishlistIds.includes(p.id));

    container.innerHTML = wishlistProducts.map(product => createProductCard(product)).join('');
    updatePageTranslations();
    hideLoading();
}

// Initialize wishlist page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('wishlist-products')) {
        loadWishlistPage();

        // Subscribe to wishlist changes
        subscribe('wishlist', () => {
            loadWishlistPage();
        });
    }
});

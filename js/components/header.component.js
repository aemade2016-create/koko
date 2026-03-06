// Header Component

function renderHeader() {
    const header = document.getElementById('header-component');
    const isAuth = isAuthenticated();
    const isAdminUser = isAdmin();
    const lang = AppState.ui.language;

    header.innerHTML = `
        <!-- Top Bar -->
        <div class="bg-pink-600 text-white py-2 px-4 text-center text-sm">
            <span data-i18n="header.announcement">Free shipping on orders over 500 EGP!</span>
        </div>
        
        <!-- Main Header -->
        <header class="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between h-20">
                    <!-- Mobile Menu Button -->
                    <button onclick="toggleMobileMenu()" class="lg:hidden text-2xl">
                        <i class="fas fa-bars"></i>
                    </button>
                    
                    <!-- Logo -->
                    <a href="./index.html" class="text-2xl md:text-3xl font-bold text-pink-600">
                        <i class="fas fa-gem"></i> Glow Beauty
                    </a>
                    
                    <!-- Desktop Navigation -->
                    <nav class="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
                        <a href="./index.html" class="hover:text-pink-600 transition" data-i18n="nav.home">Home</a>
                        <a href="./shop.html" class="hover:text-pink-600 transition" data-i18n="nav.shop">Shop</a>
                        <a href="./blog.html" class="hover:text-pink-600 transition" data-i18n="nav.blog">Blog</a>
                        <a href="./skin-quiz.html" class="hover:text-pink-600 transition" data-i18n="nav.skinQuiz">Skin Quiz</a>
                        <a href="./about.html" class="hover:text-pink-600 transition" data-i18n="nav.about">About</a>
                        <a href="./contact.html" class="hover:text-pink-600 transition" data-i18n="nav.contact">Contact</a>
                    </nav>
                    
                    <!-- Right Icons -->
                    <div class="flex items-center space-x-4 rtl:space-x-reverse">
                        <!-- Search -->
                        <button onclick="toggleSearch()" class="text-xl hover:text-pink-600 transition">
                            <i class="fas fa-search"></i>
                        </button>
                        
                        <!-- Language Toggle -->
                        <button onclick="toggleLanguage()" class="text-sm font-semibold hover:text-pink-600 transition">
                            ${lang === 'en' ? 'AR' : 'EN'}
                        </button>
                        
                        <!-- Theme Toggle -->
                        <button onclick="toggleTheme()" class="text-xl hover:text-pink-600 transition">
                            <i class="fas ${AppState.ui.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
                        </button>
                        
                        <!-- Wishlist -->
                        <a href="./wishlist.html" class="text-xl hover:text-pink-600 transition relative">
                            <i class="far fa-heart"></i>
                            <span class="wishlist-badge badge ${AppState.wishlist.items.length === 0 ? 'hidden' : ''}">
                                ${AppState.wishlist.items.length}
                            </span>
                        </a>
                        
                        <!-- Cart -->
                        <a href="./cart.html" class="text-xl hover:text-pink-600 transition relative">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="cart-badge badge ${AppState.cart.itemCount === 0 ? 'hidden' : ''}">
                                ${AppState.cart.itemCount}
                            </span>
                        </a>
                        
                        <!-- Account -->
                        ${isAuth ? `
                            <div class="relative account-dropdown">
                                <button onclick="toggleAccountMenu(event)" class="text-xl hover:text-pink-600 transition">
                                    <i class="fas fa-user-circle"></i>
                                </button>
                                <div id="account-menu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg py-2 hidden z-50">
                                    <a href="./profile.html" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <i class="fas fa-user-circle mr-2"></i>Profile
                                    </a>
                                    <a href="./dashboard.html" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600" data-i18n="nav.dashboard">Dashboard</a>
                                    ${isAdminUser ? `<a href="./admin.html" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600" data-i18n="nav.admin">Admin Panel</a>` : ''}
                                    <button onclick="logout()" class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600" data-i18n="nav.logout">Logout</button>
                                </div>
                            </div>
                        ` : `
                            <a href="./login.html" class="text-xl hover:text-pink-600 transition">
                                <i class="fas fa-user"></i>
                            </a>
                        `}
                    </div>
                </div>
            </div>
            
            <!-- Search Bar (Hidden by default) -->
            <div id="search-bar" class="hidden bg-gray-50 dark:bg-gray-700 py-4 px-4">
                <div class="container mx-auto max-w-2xl">
                    <div class="relative">
                        <input type="text" 
                               id="search-input"
                               placeholder="${t('common.search')}"
                               onkeyup="handleSearch(event)"
                               class="w-full px-6 py-3 pr-12 rounded-full border-2 border-pink-300 focus:border-pink-500 focus:outline-none dark:bg-gray-600 dark:border-gray-500">
                        <button onclick="toggleSearch()" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div id="search-results" class="mt-4 bg-white dark:bg-gray-600 rounded-lg shadow-lg max-h-96 overflow-y-auto hidden"></div>
                </div>
            </div>
        </header>
        
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden">
            <div class="mobile-menu fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl">
                <div class="p-6">
                    <button onclick="toggleMobileMenu()" class="text-2xl mb-6">
                        <i class="fas fa-times"></i>
                    </button>
                    <nav class="space-y-4">
                        <a href="./index.html" class="block py-2 hover:text-pink-600 transition" data-i18n="nav.home">Home</a>
                        <a href="./shop.html" class="block py-2 hover:text-pink-600 transition" data-i18n="nav.shop">Shop</a>
                        <a href="./blog.html" class="block py-2 hover:text-pink-600 transition" data-i18n="nav.blog">Blog</a>
                        <a href="./skin-quiz.html" class="block py-2 hover:text-pink-600 transition" data-i18n="nav.skinQuiz">Skin Quiz</a>
                        <a href="./about.html" class="block py-2 hover:text-pink-600 transition" data-i18n="nav.about">About</a>
                        <a href="./contact.html" class="block py-2 hover:text-pink-600 transition" data-i18n="nav.contact">Contact</a>
                        ${isAuth ? `
                            <a href="./profile.html" class="block py-2 hover:text-pink-600 transition">
                                <i class="fas fa-user-circle mr-2"></i>Profile
                            </a>
                            <a href="./dashboard.html" class="block py-2 hover:text-pink-600 transition" data-i18n="nav.dashboard">Dashboard</a>
                            ${isAdminUser ? `<a href="./admin.html" class="block py-2 hover:text-pink-600 transition" data-i18n="nav.admin">Admin Panel</a>` : ''}
                            <button onclick="logout()" class="block py-2 hover:text-pink-600 transition text-left" data-i18n="nav.logout">Logout</button>
                        ` : `
                            <a href="./login.html" class="block py-2 hover:text-pink-600 transition" data-i18n="nav.login">Login</a>
                        `}
                    </nav>
                </div>
            </div>
        </div>
    `;

    updatePageTranslations();
}

// Toggle mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const menuContent = menu.querySelector('.mobile-menu');

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        setTimeout(() => menuContent.classList.add('open'), 10);
    } else {
        menuContent.classList.remove('open');
        setTimeout(() => menu.classList.add('hidden'), 300);
    }
}

// Toggle search bar
function toggleSearch() {
    const searchBar = document.getElementById('search-bar');
    const searchInput = document.getElementById('search-input');

    if (searchBar.classList.contains('hidden')) {
        searchBar.classList.remove('hidden');
        searchInput.focus();
    } else {
        searchBar.classList.add('hidden');
        document.getElementById('search-results').classList.add('hidden');
    }
}

// Handle search
async function handleSearch(event) {
    const query = event.target.value;
    const resultsDiv = document.getElementById('search-results');

    if (query.length < 2) {
        resultsDiv.classList.add('hidden');
        return;
    }

    const products = await getAllProducts();
    const results = searchProducts(products, query).slice(0, 5);

    if (results.length > 0) {
        resultsDiv.innerHTML = results.map(product => `
            <a href="./product.html?id=${product.id}" class="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <img src="${product.image}" alt="${product.title[AppState.ui.language]}" class="w-16 h-16 object-cover rounded">
                <div class="ml-4 flex-1">
                    <h4 class="font-semibold">${product.title[AppState.ui.language]}</h4>
                    <p class="text-sm text-gray-500">${product.brand}</p>
                    <p class="text-pink-600 font-bold">${product.price} ${t('common.egp')}</p>
                </div>
            </a>
        `).join('');
        resultsDiv.classList.remove('hidden');
    } else {
        resultsDiv.innerHTML = '<p class="p-4 text-center text-gray-500">No products found</p>';
        resultsDiv.classList.remove('hidden');
    }
}

// Toggle language
function toggleLanguage() {
    const newLang = AppState.ui.language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);

    // Reload the entire page to apply language changes
    window.location.reload();
}

// Toggle account menu
function toggleAccountMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('account-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Close account menu when clicking outside
document.addEventListener('click', (event) => {
    const menu = document.getElementById('account-menu');
    const accountDropdown = document.querySelector('.account-dropdown');

    if (menu && accountDropdown && !accountDropdown.contains(event.target)) {
        menu.classList.add('hidden');
    }
});

// Initialize header on page load
document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
});

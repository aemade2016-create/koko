// Home Page Logic

// Hero Slider
let currentSlide = 0;
let slideInterval;

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
                slide.style.opacity = '1';
            } else {
                slide.classList.remove('active');
                slide.style.opacity = '0';
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Auto play
    slideInterval = setInterval(nextSlide, 5000);

    // Expose functions globally
    window.nextSlide = () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    };

    window.prevSlide = () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    };
}

// Load featured products
async function loadFeaturedProducts() {
    try {
        const container = document.getElementById('featured-products');
        if (!container) return;

        console.log('🔄 Loading featured products...');
        const products = await getFeaturedProducts(10);
        console.log('✅ Featured products loaded:', products.length);

        if (!products || products.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <p class="text-gray-500">No featured products available</p>
                </div>
            `;
            return;
        }

        container.innerHTML = products.map(product => createProductCard(product)).join('');
        updatePageTranslations();
    } catch (error) {
        console.error('❌ Error loading featured products:', error);
        const container = document.getElementById('featured-products');
        if (container) {
            container.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <p class="text-red-500">Failed to load products</p>
                </div>
            `;
        }
    }
}

// Load best sellers
async function loadBestSellers() {
    try {
        const container = document.getElementById('best-sellers');
        if (!container) return;

        console.log('🔄 Loading best sellers...');
        const products = await getBestSellers(10);
        console.log('✅ Best sellers loaded:', products.length);

        if (!products || products.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <p class="text-gray-500">No best sellers available</p>
                </div>
            `;
            return;
        }

        container.innerHTML = products.map(product => createProductCard(product)).join('');
        updatePageTranslations();
    } catch (error) {
        console.error('❌ Error loading best sellers:', error);
        const container = document.getElementById('best-sellers');
        if (container) {
            container.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <p class="text-red-500">Failed to load products</p>
                </div>
            `;
        }
    }
}

// Filter by skin type
function filterBySkinType(skinType) {
    window.location.href = `./shop.html?skinType=${skinType}`;
}

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;

    // Mock subscription
    showToast('Success', 'Thank you for subscribing!', 'success');
    event.target.reset();
}

// Initialize home page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('hero-section')) {
        initHeroSlider();
        loadFeaturedProducts();
        loadBestSellers();
    }
});

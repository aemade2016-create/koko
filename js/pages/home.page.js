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
    const container = document.getElementById('featured-products');
    const products = await getFeaturedProducts(10);

    container.innerHTML = products.map(product => createProductCard(product)).join('');
    updatePageTranslations();
}

// Load best sellers
async function loadBestSellers() {
    const container = document.getElementById('best-sellers');
    const products = await getBestSellers(10);

    container.innerHTML = products.map(product => createProductCard(product)).join('');
    updatePageTranslations();
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

// Product Service

let productsCache = null;

// Mock products data
function getMockProducts() {
    return [
        {
            id: 1,
            title: { en: "Hydrating Face Moisturizer", ar: "مرطب الوجه المرطب" },
            brand: "CeraVe",
            category: "skincare",
            price: 299,
            oldPrice: 399,
            image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
            rating: 4.8,
            reviews: 234,
            stock: 50,
            suitableFor: ["dry", "normal"],
            concerns: ["dryness", "aging"],
            ingredients: ["Hyaluronic Acid", "Ceramides", "Niacinamide"],
            description: { en: "Deep hydration for dry skin", ar: "ترطيب عميق للبشرة الجافة" },
            featured: true,
            bestSeller: true
        },
        {
            id: 2,
            title: { en: "Vitamin C Serum", ar: "سيروم فيتامين سي" },
            brand: "L'Oréal",
            category: "skincare",
            price: 450,
            oldPrice: null,
            image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
            rating: 4.9,
            reviews: 456,
            stock: 30,
            suitableFor: ["all"],
            concerns: ["dark-spots", "dullness"],
            ingredients: ["Vitamin C", "Ferulic Acid", "Vitamin E"],
            description: { en: "Brightening serum for radiant skin", ar: "سيروم مشرق للبشرة المتألقة" },
            featured: true,
            bestSeller: true
        },
        {
            id: 3,
            title: { en: "Gentle Cleanser", ar: "منظف لطيف" },
            brand: "Neutrogena",
            category: "skincare",
            price: 189,
            oldPrice: 249,
            image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
            rating: 4.7,
            reviews: 189,
            stock: 100,
            suitableFor: ["sensitive", "all"],
            concerns: ["sensitivity"],
            ingredients: ["Glycerin", "Panthenol"],
            description: { en: "Gentle cleansing for sensitive skin", ar: "تنظيف لطيف للبشرة الحساسة" },
            featured: true,
            bestSeller: false
        },
        {
            id: 4,
            title: { en: "Matte Lipstick", ar: "أحمر شفاه مات" },
            brand: "Maybelline",
            category: "makeup",
            price: 149,
            oldPrice: null,
            image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
            rating: 4.6,
            reviews: 567,
            stock: 200,
            suitableFor: ["all"],
            concerns: [],
            ingredients: ["Vitamin E", "Shea Butter"],
            description: { en: "Long-lasting matte finish", ar: "لمسة نهائية مطفية طويلة الأمد" },
            featured: true,
            bestSeller: true
        },
        {
            id: 5,
            title: { en: "Sunscreen SPF 50", ar: "واقي شمس SPF 50" },
            brand: "Garnier",
            category: "skincare",
            price: 229,
            oldPrice: 279,
            image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
            rating: 4.8,
            reviews: 345,
            stock: 75,
            suitableFor: ["all"],
            concerns: ["sun-damage"],
            ingredients: ["Zinc Oxide", "Vitamin E"],
            description: { en: "Broad spectrum sun protection", ar: "حماية واسعة من الشمس" },
            featured: true,
            bestSeller: true
        },
        {
            id: 6,
            title: { en: "Eye Cream", ar: "كريم العين" },
            brand: "Nivea",
            category: "skincare",
            price: 199,
            oldPrice: null,
            image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
            rating: 4.5,
            reviews: 123,
            stock: 60,
            suitableFor: ["all"],
            concerns: ["dark-circles", "puffiness"],
            ingredients: ["Caffeine", "Peptides"],
            description: { en: "Reduces dark circles and puffiness", ar: "يقلل الهالات السوداء والانتفاخ" },
            featured: true,
            bestSeller: false
        },
        {
            id: 7,
            title: { en: "Face Mask", ar: "قناع الوجه" },
            brand: "CeraVe",
            category: "skincare",
            price: 179,
            oldPrice: 219,
            image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
            rating: 4.7,
            reviews: 234,
            stock: 45,
            suitableFor: ["oily", "combination"],
            concerns: ["acne", "pores"],
            ingredients: ["Clay", "Salicylic Acid"],
            description: { en: "Deep cleansing clay mask", ar: "قناع طيني للتنظيف العميق" },
            featured: true,
            bestSeller: false
        },
        {
            id: 8,
            title: { en: "Foundation", ar: "كريم الأساس" },
            brand: "L'Oréal",
            category: "makeup",
            price: 349,
            oldPrice: null,
            image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
            rating: 4.6,
            reviews: 678,
            stock: 150,
            suitableFor: ["all"],
            concerns: [],
            ingredients: ["SPF 15", "Vitamin E"],
            description: { en: "Full coverage foundation", ar: "كريم أساس بتغطية كاملة" },
            featured: true,
            bestSeller: true
        },
        {
            id: 9,
            title: { en: "Mascara", ar: "ماسكارا" },
            brand: "Maybelline",
            category: "makeup",
            price: 129,
            oldPrice: 159,
            image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&h=400&fit=crop",
            rating: 4.8,
            reviews: 890,
            stock: 300,
            suitableFor: ["all"],
            concerns: [],
            ingredients: ["Panthenol", "Keratin"],
            description: { en: "Volumizing mascara", ar: "ماسكارا لزيادة الحجم" },
            featured: true,
            bestSeller: true
        },
        {
            id: 10,
            title: { en: "Night Cream", ar: "كريم الليل" },
            brand: "Neutrogena",
            category: "skincare",
            price: 279,
            oldPrice: 329,
            image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
            rating: 4.7,
            reviews: 345,
            stock: 80,
            suitableFor: ["dry", "mature"],
            concerns: ["aging", "wrinkles"],
            ingredients: ["Retinol", "Hyaluronic Acid"],
            description: { en: "Anti-aging night cream", ar: "كريم ليلي مضاد للشيخوخة" },
            featured: true,
            bestSeller: false
        }
    ];
}

// Load products from JSON
async function loadProducts() {
    if (productsCache) return productsCache;

    try {
        const response = await fetch('./js/data/products.json');
        productsCache = await response.json();
        AppState.products = productsCache;
        return productsCache;
    } catch (error) {
        console.error('Failed to load products from JSON, using mock data:', error);
        // Use mock data as fallback
        productsCache = getMockProducts();
        AppState.products = productsCache;
        return productsCache;
    }
}

// Get all products
async function getAllProducts() {
    return await loadProducts();
}

// Get product by ID
async function getProductById(id) {
    const products = await loadProducts();
    return products.find(p => p.id === parseInt(id));
}

// Get featured products
async function getFeaturedProducts(limit = 10) {
    const products = await loadProducts();
    return products.filter(p => p.featured).slice(0, limit);
}

// Get best sellers
async function getBestSellers(limit = 10) {
    const products = await loadProducts();
    return products.filter(p => p.bestSeller).slice(0, limit);
}

// Filter products
function filterProducts(products, filters) {
    return products.filter(product => {
        // Price range
        if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
            return false;
        }

        // Category
        if (filters.category && product.category !== filters.category) {
            return false;
        }

        // Brands
        if (filters.brands.length && !filters.brands.includes(product.brand)) {
            return false;
        }

        // Skin type
        if (filters.skinType.length) {
            const match = filters.skinType.some(type =>
                product.suitableFor.includes(type) || product.suitableFor.includes('all')
            );
            if (!match) return false;
        }

        // Concerns
        if (filters.concerns.length) {
            const match = filters.concerns.some(concern =>
                product.concerns.includes(concern)
            );
            if (!match) return false;
        }

        return true;
    });
}

// Sort products
function sortProducts(products, sortBy) {
    const sorted = [...products];

    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return sorted.sort((a, b) => b.id - a.id);
        case 'featured':
        default:
            return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
}

// Search products
function searchProducts(products, query) {
    if (!query) return products;

    const normalizedQuery = query.toLowerCase().trim();

    return products.filter(product => {
        const title = product.title.en.toLowerCase() + ' ' + product.title.ar.toLowerCase();
        const brand = product.brand.toLowerCase();
        const category = product.category.toLowerCase();

        return title.includes(normalizedQuery) ||
            brand.includes(normalizedQuery) ||
            category.includes(normalizedQuery);
    });
}

// Get related products
async function getRelatedProducts(productId, limit = 4) {
    const products = await loadProducts();
    const product = products.find(p => p.id === productId);

    if (!product) return [];

    return products
        .filter(p => p.id !== productId && p.category === product.category)
        .slice(0, limit);
}

// Internationalization (i18n) System
const translations = {
    en: {
        nav: {
            home: 'Home',
            shop: 'Shop',
            blog: 'Blog',
            skinQuiz: 'Skin Quiz',
            about: 'About',
            contact: 'Contact',
            account: 'Account',
            login: 'Login',
            register: 'Register',
            logout: 'Logout',
            dashboard: 'Dashboard',
            admin: 'Admin Panel'
        },
        hero: {
            title1: 'Discover Your Glow',
            subtitle1: 'Premium Beauty Products for Every Skin Type',
            title2: 'New Arrivals',
            subtitle2: 'Explore Our Latest Collection',
            title3: 'Special Offer',
            subtitle3: 'Up to 30% Off on Selected Items',
            cta: 'Shop Now'
        },
        home: {
            shopBySkinType: 'Shop by Skin Type',
            featuredProducts: 'Featured Products',
            bestSellers: 'Best Sellers',
            topBrands: 'Top Brands',
            testimonials: 'What Our Customers Say',
            newsletter: {
                title: 'Stay in the Glow',
                subtitle: 'Get beauty tips, exclusive offers, and new product alerts',
                subscribe: 'Subscribe'
            }
        },
        skinType: {
            dry: 'Dry Skin',
            oily: 'Oily Skin',
            combination: 'Combination',
            sensitive: 'Sensitive',
            all: 'All Skin Types'
        },
        product: {
            addToCart: 'Add to Cart',
            addToWishlist: 'Add to Wishlist',
            outOfStock: 'Out of Stock',
            inStock: 'In Stock',
            reviews: 'Reviews',
            description: 'Description',
            ingredients: 'Ingredients',
            howToUse: 'How to Use',
            suitableFor: 'Suitable For',
            relatedProducts: 'Related Products'
        },
        cart: {
            title: 'Shopping Cart',
            empty: 'Your cart is empty',
            subtotal: 'Subtotal',
            shipping: 'Shipping',
            tax: 'Tax',
            total: 'Total',
            checkout: 'Proceed to Checkout',
            continueShopping: 'Continue Shopping',
            remove: 'Remove',
            quantity: 'Quantity',
            applyCoupon: 'Apply Coupon'
        },
        footer: {
            about: 'About Us',
            contact: 'Contact Us',
            privacy: 'Privacy Policy',
            terms: 'Terms of Service',
            faq: 'FAQ',
            followUs: 'Follow Us',
            paymentMethods: 'Payment Methods',
            copyright: '© 2024 Glow Beauty. All rights reserved.'
        },
        common: {
            search: 'Search products...',
            filter: 'Filter',
            sort: 'Sort',
            apply: 'Apply',
            clear: 'Clear',
            save: 'Save',
            cancel: 'Cancel',
            edit: 'Edit',
            delete: 'Delete',
            loading: 'Loading...',
            error: 'Something went wrong',
            success: 'Success!',
            egp: 'EGP'
        }
    },
    ar: {
        nav: {
            home: 'الرئيسية',
            shop: 'المتجر',
            blog: 'المدونة',
            skinQuiz: 'اختبار البشرة',
            about: 'من نحن',
            contact: 'اتصل بنا',
            account: 'الحساب',
            login: 'تسجيل الدخول',
            register: 'إنشاء حساب',
            logout: 'تسجيل الخروج',
            dashboard: 'لوحة التحكم',
            admin: 'لوحة الإدارة'
        },
        hero: {
            title1: 'اكتشفي إشراقتك',
            subtitle1: 'منتجات تجميل فاخرة لكل أنواع البشرة',
            title2: 'وصل حديثاً',
            subtitle2: 'استكشفي أحدث مجموعاتنا',
            title3: 'عرض خاص',
            subtitle3: 'خصم يصل إلى 30% على منتجات مختارة',
            cta: 'تسوقي الآن'
        },
        home: {
            shopBySkinType: 'تسوقي حسب نوع البشرة',
            featuredProducts: 'منتجات مميزة',
            bestSellers: 'الأكثر مبيعاً',
            topBrands: 'أفضل العلامات التجارية',
            testimonials: 'آراء عملائنا',
            newsletter: {
                title: 'ابقي على اطلاع',
                subtitle: 'احصلي على نصائح التجميل والعروض الحصرية',
                subscribe: 'اشتركي'
            }
        },
        skinType: {
            dry: 'البشرة الجافة',
            oily: 'البشرة الدهنية',
            combination: 'البشرة المختلطة',
            sensitive: 'البشرة الحساسة',
            all: 'جميع أنواع البشرة'
        },
        product: {
            addToCart: 'أضف للسلة',
            addToWishlist: 'أضف للمفضلة',
            outOfStock: 'غير متوفر',
            inStock: 'متوفر',
            reviews: 'التقييمات',
            description: 'الوصف',
            ingredients: 'المكونات',
            howToUse: 'طريقة الاستخدام',
            suitableFor: 'مناسب لـ',
            relatedProducts: 'منتجات ذات صلة'
        },
        cart: {
            title: 'سلة التسوق',
            empty: 'سلة التسوق فارغة',
            subtotal: 'المجموع الفرعي',
            shipping: 'الشحن',
            tax: 'الضريبة',
            total: 'الإجمالي',
            checkout: 'إتمام الطلب',
            continueShopping: 'متابعة التسوق',
            remove: 'إزالة',
            quantity: 'الكمية',
            applyCoupon: 'تطبيق الكوبون'
        },
        footer: {
            about: 'من نحن',
            contact: 'اتصل بنا',
            privacy: 'سياسة الخصوصية',
            terms: 'الشروط والأحكام',
            faq: 'الأسئلة الشائعة',
            followUs: 'تابعنا',
            paymentMethods: 'طرق الدفع',
            copyright: '© 2024 جلو بيوتي. جميع الحقوق محفوظة.'
        },
        common: {
            search: 'ابحث عن المنتجات...',
            filter: 'تصفية',
            sort: 'ترتيب',
            apply: 'تطبيق',
            clear: 'مسح',
            save: 'حفظ',
            cancel: 'إلغاء',
            edit: 'تعديل',
            delete: 'حذف',
            loading: 'جاري التحميل...',
            error: 'حدث خطأ ما',
            success: 'تم بنجاح!',
            egp: 'ج.م'
        }
    }
};

// Get translation
function t(key) {
    const lang = AppState.ui.language;
    const keys = key.split('.');
    let value = translations[lang];

    for (const k of keys) {
        value = value?.[k];
        if (!value) return key;
    }

    return value;
}

// Set language
function setLanguage(lang) {
    AppState.ui.language = lang;
    AppState.ui.isRTL = lang === 'ar';

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    updatePageTranslations();
    saveStateToStorage();
}

// Update all translations on page
function updatePageTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
}

// Initialize language on page load
if (AppState.ui.language) {
    setLanguage(AppState.ui.language);
}

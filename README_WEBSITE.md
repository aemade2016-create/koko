# Glow Beauty - E-Commerce Website

## 🎉 الموقع جاهز للاستخدام!

موقع تجارة إلكترونية متكامل لمستحضرات التجميل مبني بـ HTML, TailwindCSS, و Vanilla JavaScript.

## 📁 الملفات المتوفرة

### الصفحات الرئيسية
- ✅ `index.html` - الصفحة الرئيسية
- ✅ `shop.html` - صفحة المتجر مع الفلاتر
- ✅ `product.html` - تفاصيل المنتج
- ✅ `cart.html` - سلة التسوق
- ✅ `login.html` - تسجيل الدخول والتسجيل
- ✅ `wishlist.html` - قائمة الأمنيات
- ✅ `about.html` - من نحن
- ✅ `contact.html` - اتصل بنا

### المميزات المتوفرة

#### ✨ المميزات الأساسية
- 🌐 دعم اللغتين (عربي/إنجليزي) مع RTL
- 🌙 وضع داكن/فاتح
- 📱 تصميم متجاوب (Mobile-First)
- 🛒 نظام سلة تسوق كامل
- ❤️ قائمة أمنيات
- 🔍 بحث مباشر
- 🎯 فلترة ذكية للمنتجات
- ⭐ نظام التقييمات
- 💳 صفحة دفع (Checkout)
- 👤 نظام تسجيل دخول

#### 🎨 التصميم
- تصميم عصري وجذاب
- ألوان وردية وبنفسجية احترافية
- أيقونات Font Awesome
- صور عالية الجودة من Unsplash
- تأثيرات حركية سلسة

#### 🔧 التقنيات
- HTML5 Semantic
- TailwindCSS (CDN)
- Vanilla JavaScript (ES6+)
- LocalStorage للبيانات
- Mock Data (10 منتجات)

## 🚀 كيفية الاستخدام

### 1. فتح الموقع
ببساطة افتح ملف `index.html` في المتصفح:
- انقر مرتين على `index.html`
- أو اسحبه إلى المتصفح
- أو استخدم Live Server في VS Code

### 2. التنقل في الموقع

#### الصفحة الرئيسية
- عرض شرائح Hero
- منتجات مميزة
- الأكثر مبيعاً
- التسوق حسب نوع البشرة

#### صفحة المتجر
- عرض جميع المنتجات
- فلترة حسب:
  - السعر
  - الفئة (Skincare/Makeup)
  - العلامة التجارية
  - نوع البشرة
- ترتيب المنتجات
- Load More

#### تفاصيل المنتج
- صور المنتج
- معلومات كاملة
- المكونات
- إضافة للسلة
- منتجات مشابهة

#### سلة التسوق
- عرض المنتجات
- تعديل الكمية
- حذف منتجات
- تطبيق كوبون خصم
- حساب الإجمالي

### 3. تسجيل الدخول

#### حساب Admin جاهز:
```
Email: admin@glowbeauty.com
Password: admin123
```

#### إنشاء حساب جديد:
1. اذهب إلى صفحة Login
2. اضغط على Register
3. املأ البيانات
4. ستحصل على 100 نقطة ترحيبية!

### 4. كوبونات الخصم المتاحة

جرب هذه الكوبونات في صفحة السلة:
- `SAVE10` - خصم 10%
- `SAVE50` - خصم 50 جنيه
- `FREESHIP` - شحن مجاني

## 🎯 المميزات المتقدمة

### نظام نقاط الولاء
- 1 جنيه = 1 نقطة
- 100 نقطة ترحيبية عند التسجيل
- 200 نقطة عند أول طلب
- استبدال النقاط بخصومات

### الفلترة الذكية
- حسب السعر (0-1000 جنيه)
- حسب العلامة التجارية
- حسب نوع البشرة
- حسب الفئة

### البحث المباشر
- بحث فوري أثناء الكتابة
- نتائج مع الصور
- بحث في الاسم والعلامة التجارية

### تبديل اللغة
- اضغط على EN/AR في الهيدر
- تبديل فوري
- دعم RTL للعربية

### الوضع الداكن
- اضغط على أيقونة القمر/الشمس
- يحفظ اختيارك تلقائياً

## 📊 البيانات

### المنتجات المتوفرة (10 منتجات)
1. Hydrating Face Moisturizer - CeraVe
2. Vitamin C Serum - L'Oréal
3. Gentle Cleanser - Neutrogena
4. Matte Lipstick - Maybelline
5. Sunscreen SPF 50 - Garnier
6. Eye Cream - Nivea
7. Face Mask - CeraVe
8. Foundation - L'Oréal
9. Mascara - Maybelline
10. Night Cream - Neutrogena

### التخزين المحلي
جميع البيانات تُحفظ في LocalStorage:
- السلة
- قائمة الأمنيات
- المستخدمين
- الإعدادات (اللغة، الثيم)

## 🔧 التخصيص

### تغيير الألوان
في `css/main.css` أو استخدم Tailwind classes:
- Primary: `pink-600`
- Secondary: `purple-600`
- Success: `green-600`
- Error: `red-600`

### إضافة منتجات
في `js/services/product.service.js` - دالة `getMockProducts()`

### تعديل الترجمات
في `js/core/i18n.js` - كائن `translations`

## 📱 التوافق

### المتصفحات
- ✅ Chrome (موصى به)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

### الأجهزة
- ✅ Desktop (1920px+)
- ✅ Laptop (1280px+)
- ✅ Tablet (768px+)
- ✅ Mobile (375px+)

## 🐛 استكشاف الأخطاء

### المنتجات لا تظهر؟
- تأكد من فتح الموقع من ملف `index.html`
- افتح Console في المتصفح (F12)
- تحقق من وجود أخطاء JavaScript

### الصور لا تحمل؟
- تحتاج اتصال إنترنت (الصور من Unsplash)
- تحقق من الاتصال بالإنترنت

### السلة لا تحفظ؟
- تأكد من تفعيل LocalStorage في المتصفح
- لا تستخدم وضع التصفح الخاص

## 🎓 للمطورين

### البنية
```
/
├── index.html              # الصفحة الرئيسية
├── shop.html              # المتجر
├── product.html           # تفاصيل المنتج
├── cart.html              # السلة
├── login.html             # تسجيل الدخول
├── wishlist.html          # قائمة الأمنيات
├── about.html             # من نحن
├── contact.html           # اتصل بنا
├── css/
│   └── main.css           # أنماط مخصصة
└── js/
    ├── core/              # النظام الأساسي
    │   ├── state.js       # إدارة الحالة
    │   ├── i18n.js        # الترجمة
    │   ├── theme.js       # الثيمات
    │   └── router.js      # التوجيه
    ├── services/          # الخدمات
    │   ├── product.service.js
    │   ├── cart.service.js
    │   └── auth.service.js
    ├── components/        # المكونات
    │   ├── header.component.js
    │   ├── footer.component.js
    │   └── product-card.component.js
    ├── pages/             # صفحات
    │   ├── home.page.js
    │   ├── shop.page.js
    │   ├── product.page.js
    │   ├── cart.page.js
    │   ├── login.page.js
    │   └── wishlist.page.js
    └── app.js             # التطبيق الرئيسي
```

### إضافة صفحة جديدة
1. أنشئ ملف HTML
2. أضف المكونات الأساسية (header, footer)
3. أنشئ ملف JS في `js/pages/`
4. أضف الرابط في الهيدر

## 📞 الدعم

للمساعدة أو الاستفسارات:
- WhatsApp: زر عائم في الموقع
- Email: info@glowbeauty.com
- Phone: +20 123 456 7890

## 🎉 استمتع بالموقع!

الموقع جاهز للاستخدام الفوري. افتح `index.html` وابدأ التصفح!

---

Made with ❤️ by Kiro AI

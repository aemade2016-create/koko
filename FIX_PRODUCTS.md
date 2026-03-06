# 🔧 حل مشكلة المنتجات

## ⚠️ المشكلة
المنتجات لا تفتح عند الضغط عليها.

---

## ✅ الحل السريع (جرب هذا أولاً)

### استخدم Live Server

**الطريقة الأسهل**:
1. افتح VS Code
2. ثبت إضافة "Live Server" من Extensions
3. اضغط بزر الماوس الأيمن على `index.html`
4. اختر "Open with Live Server"
5. ✅ **الآن جرب الضغط على أي منتج**

---

## 🧪 اختبار المشكلة

### اختبار 1: افتح ملف الاختبار
```
افتح: test-product.html
```

**إذا عملت الروابط**:
→ المشكلة في طريقة فتح الملفات (استخدم Live Server)

**إذا لم تعمل**:
→ المشكلة في الكود (تابع القراءة)

---

### اختبار 2: افتح Console
1. اضغط `F12`
2. اذهب إلى `Console`
3. اضغط على أي منتج
4. شاهد الأخطاء

**الأخطاء الشائعة**:

#### خطأ 1: `404 Not Found`
```
الحل: استخدم Live Server
```

#### خطأ 2: `CORS policy`
```
الحل: استخدم Live Server
```

#### خطأ 3: `createProductCard is not defined`
```
الحل: تأكد من تحميل product-card.component.js
```

---

## 🎯 الحلول البديلة

### الحل 1: Python Server
```bash
cd path/to/project
python -m http.server 8000
```
ثم افتح: `http://localhost:8000`

---

### الحل 2: Node.js Server
```bash
npx http-server
```

---

### الحل 3: PHP Server
```bash
php -S localhost:8000
```

---

## 📋 تحقق من هذه الأشياء

### ✅ الملفات موجودة
```
✓ product.html
✓ js/components/product-card.component.js
✓ js/pages/product.page.js
✓ js/services/product.service.js
✓ js/data/products.json
```

### ✅ الروابط صحيحة
افتح `js/components/product-card.component.js` وتأكد من:
```javascript
<a href="./product.html?id=${product.id}">
```
يجب أن يبدأ بـ `./` وليس `/`

### ✅ السكريبتات تُحمل بالترتيب
في `product.html` يجب أن تكون السكريبتات بهذا الترتيب:
1. state.js
2. router.js
3. product.service.js
4. product.page.js

---

## 🎉 الحل المضمون

**استخدم Live Server في VS Code**

هذا سيحل المشكلة 100%!

### الخطوات:
1. افتح VS Code
2. Extensions → ابحث عن "Live Server"
3. ثبت الإضافة
4. اضغط بزر الماوس الأيمن على index.html
5. "Open with Live Server"
6. ✅ **جرب الآن!**

---

## 📞 لا يزال لا يعمل؟

### افتح Console (F12) وأرسل:
1. لقطة شاشة للأخطاء
2. المتصفح المستخدم
3. هل test-product.html يعمل؟

---

**الحل الأكيد: Live Server! 🚀**

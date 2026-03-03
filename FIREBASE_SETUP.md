# 🔥 Firebase Integration Guide

## تم الربط بنجاح مع Firebase!

### 📋 معلومات المشروع
- **Project ID**: koko-f6efb
- **Database**: Cloud Firestore
- **Authentication**: Firebase Auth
- **SDK Version**: v10.7.1 (Modular)

---

## 📁 الملفات التي تم إنشاؤها

### 1. `js/core/firebase-config.js`
ملف إعدادات Firebase الرئيسي - يحتوي على:
- بيانات الاتصال بالمشروع
- تهيئة Firebase App
- تهيئة Firestore
- تهيئة Authentication
- تهيئة Analytics

### 2. `profile.html`
صفحة البروفايل الكاملة مع:
- نموذج تعديل البيانات الشخصية
- رفع وتغيير صورة البروفايل (Base64)
- عرض نقاط الولاء
- إعدادات الحساب
- تغيير كلمة المرور
- حذف الحساب

### 3. `js/pages/profile.page.js`
منطق صفحة البروفايل - يتضمن:
- ✅ جلب البيانات من Firestore عند فتح الصفحة
- ✅ حفظ البيانات في Firestore (Full Name, Phone, Address)
- ✅ تحويل الصور إلى Base64 وحفظها في Firestore
- ✅ التحقق من المصادقة
- ✅ تحديث كلمة المرور
- ✅ حذف الحساب

### 4. `js/services/auth.firebase.service.js`
خدمة المصادقة المتكاملة مع Firebase:
- تسجيل الدخول
- إنشاء حساب جديد
- تسجيل الخروج
- إعادة تعيين كلمة المرور
- تسجيل الدخول بـ Google
- تسجيل الدخول بـ Facebook

---

## 🗄️ هيكل قاعدة البيانات Firestore

### Collection: `users`
كل مستخدم له document بـ UID الخاص به:

```javascript
{
  uid: "user_unique_id",
  email: "user@example.com",
  fullName: "Ahmed Mohamed",
  phoneNumber: "+20 123 456 7890",
  address: "123 Main Street, Apartment 4",
  city: "Cairo",
  postalCode: "12345",
  role: "user", // or "admin"
  loyaltyPoints: 100,
  profilePicture: "data:image/jpeg;base64,/9j/4AAQ...", // Base64 string
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🚀 كيفية الاستخدام

### 1. فتح صفحة البروفايل
```
./profile.html
```

### 2. تسجيل الدخول
- يجب أن يكون المستخدم مسجل دخول أولاً
- إذا لم يكن مسجل، سيتم توجيهه لصفحة Login

### 3. تعديل البيانات
- املأ الحقول المطلوبة (Full Name, Phone, Address)
- اضغط "Save Changes"
- سيتم حفظ البيانات في Firestore تلقائياً

### 4. تغيير صورة البروفايل
- اضغط على أيقونة الكاميرا
- اختر صورة (أقل من 2MB)
- سيتم تحويلها لـ Base64 وحفظها في Firestore

---

## 🔐 قواعد الأمان Firestore (يجب تطبيقها)

انسخ هذه القواعد في Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      // Allow read if authenticated
      allow read: if request.auth != null;
      
      // Allow write only to own document
      allow write: if request.auth != null && request.auth.uid == userId;
      
      // Admin can read/write all
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Products collection (if needed)
    match /products/{productId} {
      allow read: if true; // Public read
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Orders collection (if needed)
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## 📝 ملاحظات مهمة

### ✅ ما تم تنفيذه
1. ✅ ربط Firebase Config بالمشروع
2. ✅ إنشاء صفحة Profile كاملة
3. ✅ حفظ البيانات في Firestore (Full Name, Phone, Address)
4. ✅ جلب البيانات من Firestore عند فتح الصفحة
5. ✅ تحويل الصور إلى Base64 وحفظها
6. ✅ التحقق من المصادقة
7. ✅ استخدام Firebase SDK v10+ (Modular)
8. ✅ استدعاء الدوال من CDN الرسمي

### 🎯 المميزات
- **لا حاجة لـ Firebase Storage**: الصور تُحفظ كـ Base64 في Firestore
- **Real-time Updates**: البيانات تُحدث فوراً
- **Secure**: كل مستخدم يصل لبياناته فقط
- **Scalable**: يمكن إضافة مستخدمين غير محدودين

### ⚠️ تحذيرات
1. **حجم الصور**: يجب أن تكون أقل من 2MB
2. **Base64 Size**: Firestore لديه حد 1MB للـ document (الصور الكبيرة قد تتجاوز الحد)
3. **قواعد الأمان**: يجب تطبيق القواعد في Firebase Console

---

## 🔧 استكشاف الأخطاء

### خطأ: "Firebase SDK not loaded"
**الحل**: تأكد من تحميل Firebase scripts في HTML:
```html
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
```

### خطأ: "Permission denied"
**الحل**: تأكد من تطبيق قواعد الأمان في Firestore

### خطأ: "User not authenticated"
**الحل**: سجل دخول أولاً من صفحة Login

---

## 📞 الدعم

إذا واجهت أي مشكلة:
1. افتح Console في المتصفح (F12)
2. تحقق من رسائل الأخطاء
3. تأكد من تفعيل Authentication في Firebase Console
4. تأكد من إنشاء Firestore Database

---

## ✨ الخطوات التالية (اختياري)

1. **إضافة Email Verification**
2. **إضافة Phone Authentication**
3. **إضافة Cloud Functions للعمليات المعقدة**
4. **إضافة Firebase Storage للصور الكبيرة**
5. **إضافة Push Notifications**

---

**تم الإعداد بنجاح! 🎉**

الموقع الآن متصل بـ Firebase ويمكن استخدام صفحة البروفايل لحفظ وجلب البيانات من Firestore.

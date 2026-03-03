# 🧪 اختبار Firebase Integration

## خطوات الاختبار

### 1️⃣ اختبار الاتصال بـ Firebase

افتح `profile.html` في المتصفح وافتح Console (F12):

**يجب أن تشاهد:**
```
Firebase initialized successfully
```

**إذا شاهدت خطأ:**
- تأكد من اتصال الإنترنت
- تأكد من تحميل Firebase scripts

---

### 2️⃣ اختبار تسجيل الدخول

1. افتح `login.html`
2. سجل دخول بحساب موجود أو أنشئ حساب جديد
3. يجب أن يتم توجيهك للصفحة الرئيسية

**في Console يجب أن تشاهد:**
```
Login successful!
```

---

### 3️⃣ اختبار صفحة البروفايل

1. بعد تسجيل الدخول، افتح `profile.html`
2. يجب أن تُحمل بياناتك تلقائياً (إذا كانت موجودة)

**في Console يجب أن تشاهد:**
```
Profile loaded successfully
```

**إذا كنت مستخدم جديد:**
```
Creating default profile for new user
```

---

### 4️⃣ اختبار حفظ البيانات

1. املأ الحقول:
   - Full Name: "أحمد محمد"
   - Phone: "+20 123 456 7890"
   - Address: "123 شارع الرئيسي"

2. اضغط "Save Changes"

**يجب أن تشاهد:**
- رسالة نجاح: "Profile updated successfully!"
- في Console: "Profile saved successfully"

**تحقق من Firestore:**
1. افتح Firebase Console
2. اذهب إلى Firestore Database
3. افتح collection "users"
4. يجب أن تجد document بـ UID المستخدم
5. تحقق من وجود البيانات

---

### 5️⃣ اختبار تغيير الصورة

1. اضغط على أيقونة الكاميرا
2. اختر صورة (أقل من 2MB)
3. يجب أن تتغير الصورة فوراً
4. اضغط "Save Changes"

**يجب أن تشاهد:**
- الصورة تتغير في الصفحة
- رسالة: "Profile picture updated"
- بعد الحفظ: "Profile updated successfully!"

**تحقق من Firestore:**
- يجب أن يكون حقل `profilePicture` يحتوي على Base64 string
- يبدأ بـ: `data:image/jpeg;base64,` أو `data:image/png;base64,`

---

### 6️⃣ اختبار إعادة تحميل البيانات

1. بعد حفظ البيانات، اضغط F5 لإعادة تحميل الصفحة
2. يجب أن تُحمل جميع البيانات تلقائياً
3. يجب أن تظهر الصورة التي رفعتها

**هذا يؤكد أن:**
- البيانات محفوظة في Firestore
- الجلب يعمل بشكل صحيح

---

### 7️⃣ اختبار تغيير كلمة المرور

1. اضغط على "Change Password"
2. أدخل كلمة مرور جديدة (6 أحرف على الأقل)
3. يجب أن تشاهد: "Password updated successfully!"

**ملاحظة:**
- إذا ظهر خطأ "requires-recent-login"
- سجل خروج ثم دخول مرة أخرى

---

### 8️⃣ اختبار الأمان

**اختبار 1: محاولة الوصول بدون تسجيل دخول**
1. سجل خروج
2. حاول فتح `profile.html` مباشرة
3. يجب أن يتم توجيهك لصفحة Login

**اختبار 2: محاولة تعديل بيانات مستخدم آخر**
1. في Console، حاول تنفيذ:
```javascript
firebase.firestore().collection('users').doc('other_user_uid').update({
  fullName: "Hacker"
})
```
2. يجب أن تحصل على خطأ: "Permission denied"

---

## ✅ قائمة التحقق النهائية

- [ ] Firebase initialized successfully
- [ ] تسجيل الدخول يعمل
- [ ] صفحة البروفايل تفتح
- [ ] البيانات تُحمل تلقائياً
- [ ] حفظ البيانات يعمل
- [ ] البيانات تظهر في Firestore
- [ ] تغيير الصورة يعمل
- [ ] الصورة تُحفظ كـ Base64
- [ ] إعادة تحميل الصفحة تُحمل البيانات
- [ ] تغيير كلمة المرور يعمل
- [ ] الأمان يعمل (لا يمكن الوصول بدون تسجيل)

---

## 🐛 الأخطاء الشائعة وحلولها

### خطأ: "Firebase is not defined"
**السبب:** Firebase scripts لم تُحمل
**الحل:** تأكد من وجود scripts في HTML قبل firebase-config.js

### خطأ: "Permission denied"
**السبب:** قواعد الأمان غير مطبقة
**الحل:** طبق القواعد في Firebase Console → Firestore → Rules

### خطأ: "User not authenticated"
**السبب:** لم تسجل دخول
**الحل:** سجل دخول أولاً من login.html

### خطأ: "Document size exceeds 1MB"
**السبب:** الصورة كبيرة جداً
**الحل:** اختر صورة أصغر (أقل من 500KB مثالي)

### خطأ: "Network error"
**السبب:** لا يوجد اتصال بالإنترنت
**الحل:** تحقق من الاتصال بالإنترنت

---

## 📊 مثال على البيانات المحفوظة

### في Firestore Console يجب أن تشاهد:

```
users (collection)
  └── abc123xyz (document - UID)
      ├── address: "123 شارع الرئيسي، شقة 4"
      ├── city: "القاهرة"
      ├── createdAt: October 20, 2024 at 10:30:00 AM UTC+2
      ├── email: "user@example.com"
      ├── fullName: "أحمد محمد"
      ├── loyaltyPoints: 100
      ├── phoneNumber: "+20 123 456 7890"
      ├── postalCode: "12345"
      ├── profilePicture: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
      ├── role: "user"
      ├── uid: "abc123xyz"
      └── updatedAt: October 20, 2024 at 10:35:00 AM UTC+2
```

---

## 🎯 النتيجة المتوقعة

إذا نجحت جميع الاختبارات:
- ✅ Firebase متصل بنجاح
- ✅ المصادقة تعمل
- ✅ حفظ البيانات يعمل
- ✅ جلب البيانات يعمل
- ✅ الصور تُحفظ كـ Base64
- ✅ الأمان مطبق

**الموقع جاهز للاستخدام! 🎉**

---

## 📞 إذا واجهت مشكلة

1. افتح Console (F12)
2. انسخ رسالة الخطأ
3. تحقق من:
   - Firebase scripts محملة
   - قواعد الأمان مطبقة
   - تسجيل الدخول نشط
   - الاتصال بالإنترنت يعمل

---

**تم إعداد الاختبارات! ابدأ الآن 🚀**

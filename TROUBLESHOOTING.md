# دليل حل المشاكل - Student App

## مشكلة: JSON Parse error: Unexpected character: <

### السبب:
هذا الخطأ يحدث عندما يرجع السيرفر HTML بدلاً من JSON، وعادة يحدث بسبب:

1. **عنوان API خاطئ** - الطلب يذهب لصفحة HTML بدلاً من endpoint صحيح
2. **السيرفر غير متاح** - السيرفر لا يعمل أو العنوان خاطئ
3. **مشكلة في CORS** - السيرفر يرفض الطلبات من التطبيق
4. **خطأ في السيرفر** - Laravel يرجع صفحة خطأ HTML

### الحلول:

#### 1. تحقق من عنوان API

افتح `config/apiConfig.js` وتأكد من العنوان:

```javascript
export const API_BASE_URL = 'http://YOUR_IP:8000';
```

**للحصول على IP الصحيح:**

##### Windows:
```cmd
ipconfig
```
ابحث عن "IPv4 Address" في قسم "Wireless LAN adapter Wi-Fi"

##### Mac/Linux:
```bash
ifconfig
```
أو
```bash
ip addr show
```

#### 2. تأكد من أن Laravel يعمل

في terminal السيرفر:
```bash
cd path/to/laravel/project
php artisan serve --host=0.0.0.0 --port=8000
```

#### 3. اختبر API من المتصفح

افتح المتصفح وجرب:
```
http://YOUR_IP:8000/api/student/login
```

يجب أن ترى رسالة JSON مثل:
```json
{
  "message": "The POST method is not supported..."
}
```

#### 4. تأكد من أن الجهازين على نفس الشبكة

- الكمبيوتر (السيرفر) والهاتف/محاكي يجب أن يكونا على نفس WiFi
- إذا كنت تستخدم محاكي:
  - **Android Emulator**: استخدم `10.0.2.2:8000`
  - **iOS Simulator**: استخدم `localhost:8000`

#### 5. تعطيل Firewall مؤقتاً

على Windows:
- ابحث عن "Windows Defender Firewall"
- "Turn Windows Defender Firewall on or off"
- عطّل للشبكة الخاصة مؤقتاً

#### 6. تحقق من Routes في Laravel

في `routes/api.php`:
```php
Route::prefix('student')->group(function () {
    Route::post('/login', [StudentController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/profile', [StudentController::class, 'profile']);
        Route::get('/schedule', [StudentController::class, 'schedule']);
        Route::post('/logout', [StudentController::class, 'logout']);
    });
});
```

## مشكلة: Network request failed

### الأسباب والحلول:

1. **السيرفر لا يعمل**
   - تأكد من تشغيل `php artisan serve`

2. **عنوان IP خاطئ**
   - تحقق من IP في `config/apiConfig.js`

3. **الأجهزة ليست على نفس الشبكة**
   - تأكد من الاتصال بنفس WiFi

4. **Port مغلق**
   - تأكد من أن Port 8000 مفتوح

## مشكلة: تسجيل الدخول يفشل

### تحقق من:

1. **بيانات الدخول صحيحة**
   - NNI موجود في قاعدة البيانات
   - كلمة المرور صحيحة (افتراضياً = NNI)

2. **جدول students يحتوي على بيانات**
   ```sql
   SELECT * FROM students;
   ```

3. **User تم إنشاؤه للطالب**
   ```sql
   SELECT s.nni, s.fullname, u.username 
   FROM students s 
   LEFT JOIN users u ON s.user_id = u.id;
   ```

4. **كلمة المرور في جدول users**
   - يجب أن تكون مشفرة بـ bcrypt
   - افتراضياً تساوي NNI

## اختبار API يدوياً

استخدم Postman أو curl:

### تسجيل الدخول:
```bash
curl -X POST http://YOUR_IP:8000/api/student/login \
  -H "Content-Type: application/json" \
  -d '{"nni":"1234567890","password":"1234567890"}'
```

### عرض الجدول (مع Token):
```bash
curl -X GET http://YOUR_IP:8000/api/student/schedule \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/json"
```

## تفعيل Debug Mode

في `services/api.js`، تم إضافة console.log للتتبع:
- افتح Metro Bundler console
- أو استخدم React Native Debugger
- ستظهر لك:
  - عنوان الطلب
  - نوع الطلب (GET/POST)
  - حالة الرد (200, 404, 500...)
  - محتوى الرد

## نصائح إضافية

1. **استخدم جهاز حقيقي للاختبار**
   - أسهل من المحاكي
   - امسح QR code من Expo

2. **تحقق من Laravel logs**
   ```bash
   tail -f storage/logs/laravel.log
   ```

3. **تأكد من CORS**
   في Laravel `config/cors.php`:
   ```php
   'allowed_origins' => ['*'],
   ```

4. **تفعيل debug في Laravel**
   في `.env`:
   ```
   APP_DEBUG=true
   ```

## الحصول على المساعدة

إذا استمرت المشكلة:
1. انسخ رسالة الخطأ كاملة
2. تحقق من console.log في Metro
3. تحقق من Laravel logs
4. تأكد من اتباع جميع الخطوات أعلاه

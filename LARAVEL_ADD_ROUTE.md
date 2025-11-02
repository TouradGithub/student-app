# إضافة Route الجديد في Laravel

## في ملف `routes/api.php`:

أضف هذا الـ route:

```php
Route::prefix('student')->group(function () {
    Route::post('/login', [StudentApiController::class, 'login']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/profile', [StudentApiController::class, 'profile']);
        Route::get('/schedule/data', [StudentApiController::class, 'scheduleData']); // ✅ Route الجديد
        Route::get('/schedule/pdf', [StudentApiController::class, 'schedulePdf']); // اختياري للـ PDF
        Route::post('/logout', [StudentApiController::class, 'logout']);
    });
});
```

## تأكد من وجود الدالة `scheduleData` في Controller

الدالة موجودة في الكود الذي أرسلته، تأكد من:

1. استيراد Models المطلوبة
2. دالة `generateDataCalendar` موجودة
3. العلاقات في Models صحيحة

التطبيق الآن جاهز لعرض الجدول بشكل جميل! 🎉

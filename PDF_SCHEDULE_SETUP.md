# تعليمات تفعيل عرض الجدول الدراسي PDF

## ✅ ما تم تنفيذه في التطبيق:

1. **تحديث ScheduleScreen.js** - الآن يعرض واجهة لتحميل PDF بدلاً من الجدول التفصيلي
2. **إضافة مكتبات Expo** - لتحميل ومشاركة ملفات PDF
3. **زران للتحميل**:
   - تحميل ومشاركة PDF
   - فتح PDF في المتصفح

## 📋 خطوات التثبيت:

### 1. تثبيت المكتبات الجديدة:

```bash
npm install
```

أو يدوياً:

```bash
npx expo install expo-file-system expo-sharing
```

### 2. تحديث Laravel Controller:

انسخ محتوى الملف:
```
LARAVEL_StudentApiController_UPDATED.php
```

واستبدله في:
```
app/Http/Controllers/Api/StudentApiController.php
```

### 3. تأكد من Route في Laravel:

في `routes/api.php`:

```php
Route::prefix('student')->group(function () {
    Route::post('/login', [StudentApiController::class, 'login']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/profile', [StudentApiController::class, 'profile']);
        Route::get('/schedule/pdf', [StudentApiController::class, 'schedulePdf']); // ✅ مهم!
        Route::post('/logout', [StudentApiController::class, 'logout']);
    });
});
```

### 4. تأكد من وجود View للـ PDF:

يجب أن يكون لديك ملف Blade في:
```
resources/views/admin/students/pdf/student_schedule_pdf.blade.php
```

إذا لم يكن موجوداً، أنشئ ملف بسيط:

```blade
<!DOCTYPE html>
<html dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>جدول الطالب</title>
    <style>
        body { font-family: 'DejaVu Sans'; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #000; padding: 8px; text-align: center; }
        th { background-color: #667eea; color: white; }
    </style>
</head>
<body>
    <h2 style="text-align: center;">جدول الطالب: {{ $student->fullname }}</h2>
    <h3>القسم: {{ $classe->nom }}</h3>
    
    <table>
        <thead>
            <tr>
                <th>اليوم</th>
                <th>المادة</th>
                <th>المعلم</th>
                <th>الوقت</th>
            </tr>
        </thead>
        <tbody>
            @foreach($emplois_temps as $emploi)
            <tr>
                <td>{{ $emploi->jour->nom ?? '' }}</td>
                <td>{{ $emploi->matiere->nom ?? '' }}</td>
                <td>{{ $emploi->enseignant->nom ?? '' }}</td>
                <td>
                    @if($emploi->horaires && $emploi->horaires->count() > 0)
                        {{ $emploi->horaires->first()->libelle_ar }}
                    @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
```

### 5. تأكد من تثبيت mPDF في Laravel:

```bash
composer require mpdf/mpdf
```

## 🎯 كيفية الاستخدام:

1. افتح التطبيق وسجل الدخول
2. اذهب إلى الصفحة الرئيسية
3. اضغط على "الجدول الدراسي"
4. ستظهر شاشة مع زرين:
   - **تحميل الجدول (PDF)** - يحمل ويشارك الملف
   - **فتح في المتصفح** - يفتح PDF في متصفح الهاتف

## 🐛 حل المشاكل:

### خطأ: "expo-file-system is not installed"
```bash
npx expo install expo-file-system expo-sharing
```

### خطأ: "View not found"
تأكد من إنشاء ملف Blade في المسار الصحيح

### خطأ: "Class 'Mpdf\Mpdf' not found"
```bash
composer require mpdf/mpdf
```

### PDF فارغ أو لا يعمل
تحقق من:
1. وجود بيانات في `emplois_temps`
2. العلاقات في Model `EmploiTemps` صحيحة
3. ملف Blade يعرض البيانات بشكل صحيح

## 📱 ملاحظات:

- ✅ يعمل على Android و iOS
- ✅ يمكن مشاركة PDF مع تطبيقات أخرى
- ✅ يتم حفظ الملف مؤقتاً في ذاكرة التطبيق
- ✅ التصميم مناسب للطباعة (Landscape A4)

## 🔄 البديل: عرض في WebView

إذا أردت عرض PDF داخل التطبيق بدلاً من التحميل، استخدم:

```bash
npx expo install react-native-webview
```

وأضف WebView في ScheduleScreen للعرض المباشر.

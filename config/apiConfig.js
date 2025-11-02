// API Configuration
// قم بتغيير هذا العنوان ليتناسب مع السيرفر الخاص بك

// للتطوير المحلي (Local Development):
// export const API_BASE_URL = 'http://192.168.1.100:8000'; // استبدل بـ IP الكمبيوتر الخاص بك
// export const API_BASE_URL = 'http://10.0.2.2:8000'; // للمحاكي Android
// export const API_BASE_URL = 'http://localhost:8000'; // للمحاكي iOS

// للإنتاج (Production):
// export const API_BASE_URL = 'https://your-domain.com';

export const API_BASE_URL = 'http://172.20.10.4:8000/api'; // عنوان السيرفر الحالي

export const API_ENDPOINTS = {
  STUDENT_LOGIN: `${API_BASE_URL}/student/login`,
  STUDENT_LOGOUT: `${API_BASE_URL}/student/logout`,
  STUDENT_PROFILE: `${API_BASE_URL}/student/profile`,
  STUDENT_SCHEDULE: `${API_BASE_URL}/student/schedule`,
};

// تصدير عنوان قاعدة API للطلاب (بدون /api لأن Laravel يضيفها تلقائياً)
export const STUDENT_API_URL = `${API_BASE_URL}/student`;

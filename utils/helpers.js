
/**
 * تنسيق السعر مع رمز العملة
 * @param {number} price السعر
 * @param {string} currency رمز العملة (افتراضي: $)
 * @returns {string} السعر منسق
 */
export const formatPrice = (price, currency = '$') => {
  return `${currency}${price.toFixed(2)}`;
};

/**
 * حساب نسبة التخفيض
 * @param {number} originalPrice السعر الأصلي
 * @param {number} currentPrice السعر الحالي
 * @returns {number} نسبة التخفيض
 */
export const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

/**
 * فلترة المنتجات حسب النص
 * @param {Array} products قائمة المنتجات
 * @param {string} searchText نص البحث
 * @returns {Array} المنتجات المفلترة
 */
export const filterProductsByText = (products, searchText) => {
  if (!searchText) return products;
  
  const lowercaseSearch = searchText.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseSearch) ||
    product.category.toLowerCase().includes(lowercaseSearch)
  );
};

/**
 * ترتيب المنتجات
 * @param {Array} products قائمة المنتجات
 * @param {string} sortBy نوع الترتيب
 * @returns {Array} المنتجات مرتبة
 */
export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'priceLow':
      return sorted.sort((a, b) => a.price - b.price);
    case 'priceHigh':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    default:
      return sorted;
  }
};

/**
 * فلترة المنتجات حسب الفئة
 * @param {Array} products قائمة المنتجات
 * @param {string} category الفئة
 * @returns {Array} المنتجات المفلترة
 */
export const filterProductsByCategory = (products, category) => {
  if (!category || category === 'all') return products;
  
  const categoryMap = {
    electronics: 'إلكترونيات',
    fashion: 'أزياء',
    home: 'منزل',
    sports: 'رياضة',
    books: 'كتب',
    beauty: 'جمال',
  };
  
  const categoryName = categoryMap[category];
  return products.filter(product => product.category === categoryName);
};

/**
 * فلترة المنتجات حسب نطاق السعر
 * @param {Array} products قائمة المنتجات
 * @param {Array} priceRange نطاق السعر [min, max]
 * @returns {Array} المنتجات المفلترة
 */
export const filterProductsByPriceRange = (products, priceRange) => {
  if (!priceRange || priceRange.length !== 2) return products;
  
  const [minPrice, maxPrice] = priceRange;
  return products.filter(product => 
    product.price >= minPrice && product.price <= maxPrice
  );
};

/**
 * فلترة المنتجات المتوفرة فقط
 * @param {Array} products قائمة المنتجات
 * @returns {Array} المنتجات المتوفرة
 */
export const filterInStockProducts = (products) => {
  return products.filter(product => product.inStock !== false);
};

/**
 * فلترة المنتجات ذات الشحن المجاني
 * @param {Array} products قائمة المنتجات
 * @returns {Array} المنتجات مع الشحن المجاني
 */
export const filterFreeShippingProducts = (products) => {
  return products.filter(product => product.freeShipping === true);
};

/**
 * فلترة المنتجات المخفضة
 * @param {Array} products قائمة المنتجات
 * @returns {Array} المنتجات المخفضة
 */
export const filterOnSaleProducts = (products) => {
  return products.filter(product => product.discount && product.discount > 0);
};

/**
 * تطبيق جميع الفلاتر على المنتجات
 * @param {Array} products قائمة المنتجات الأصلية
 * @param {Object} filters الفلاتر
 * @returns {Array} المنتجات المفلترة
 */
export const applyAllFilters = (products, filters) => {
  let filtered = [...products];
  
  // فلترة بالنص
  if (filters.searchText) {
    filtered = filterProductsByText(filtered, filters.searchText);
  }
  
  // فلترة بالفئة
  if (filters.category) {
    filtered = filterProductsByCategory(filtered, filters.category);
  }
  
  // فلترة بنطاق السعر
  if (filters.priceRange) {
    filtered = filterProductsByPriceRange(filtered, filters.priceRange);
  }
  
  // فلترة المنتجات المتوفرة
  if (filters.inStock) {
    filtered = filterInStockProducts(filtered);
  }
  
  // فلترة الشحن المجاني
  if (filters.freeShipping) {
    filtered = filterFreeShippingProducts(filtered);
  }
  
  // فلترة المنتجات المخفضة
  if (filters.onSale) {
    filtered = filterOnSaleProducts(filtered);
  }
  
  // ترتيب النتائج
  if (filters.sortBy) {
    filtered = sortProducts(filtered, filters.sortBy);
  }
  
  return filtered;
};

/**
 * توليد معرف فريد
 * @returns {string} معرف فريد
 */
export const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * تحويل النص إلى رابط صالح
 * @param {string} text النص
 * @returns {string} الرابط
 */
export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * التحقق من صحة البريد الإلكتروني
 * @param {string} email البريد الإلكتروني
 * @returns {boolean} صحيح أم لا
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * تأخير التنفيذ (debounce)
 * @param {Function} func الدالة
 * @param {number} delay التأخير بالميللي ثانية
 * @returns {Function} الدالة المُؤخرة
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

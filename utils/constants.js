import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

//  const BASE_URL=  'http://192.168.100.41:8000/api/auth';
 const BASE_URL=  'http://172.20.10.5:8000/api/auth';
//  const BASE_URL_WITH_V1=  'http://172.20.10.4:8000/api/v1';
 const BASE_URL_WITH_V1=  'http://172.20.10.5:8000/api/v1';

export const API = {
  // IMAGE_URL: 'http://192.168.100.41:8000/',

  // BASE_URL: 'http://192.168.100.41:8000',
  // AUTH_BASE_URL: 'http://192.168.100.41:8000/api/auth',
  IMAGE_URL: 'http://172.20.10.5:8000/',
  BASE_URL: 'http://172.20.10.5:8000',
  AUTH_BASE_URL: 'http://172.20.10.5:8000/api/auth',
  PRODUCTS_ENDPOINT: `${BASE_URL}/products`,
  PRODUCTS_SEARCH: `${BASE_URL}/search-products`,
  UPDATE_PROFILE_ENDPOINT: `${BASE_URL_WITH_V1}/update-profile`,
  PRODUCT_ENDPOINT: `${BASE_URL}/product/`,

  CATEGORIES_ENDPOINT: `${BASE_URL}/categories`,
  BRANDS_ENDPOINT: `${BASE_URL}/brands`,
  FAVORITES_ENDPOINT: `${BASE_URL_WITH_V1}/add-to-favorites`,
  FAVORITES: `${BASE_URL_WITH_V1}/favorites`,
  CARTS: `${BASE_URL_WITH_V1}/cart`,
  REMOVECARTITEM: `${BASE_URL_WITH_V1}/user-remove-cart`,
  SEARCH_ENDPOINT: '/search',
  USER_PROFILE_ENDPOINT: '/user/profile',
  CART_ENDPOINT: `${BASE_URL_WITH_V1}/cart`,
  CART_SUMMARY_ENDPOINT: `${BASE_URL_WITH_V1}/cart/summary`,
  PRODUCT_SIZES_ENDPOINT: `${BASE_URL}/products`,
  PRODUCTS_BY_GENDER_ENDPOINT: `${BASE_URL}/products/gender`,
  ORDERS_ENDPOINT: `${BASE_URL_WITH_V1}/orders`,
  PAYMENT_METHODS_ENDPOINT: `${BASE_URL}/payment-methods`,
  PAYMENT_PROOF_ENDPOINT: `${BASE_URL_WITH_V1}/payments/proof`,
  PAYMENT_PAYPAL_ENDPOINT: `${BASE_URL_WITH_V1}/payments/paypal`,
  PAYMENT_PAYPAL_CONFIRM_ENDPOINT: `${BASE_URL_WITH_V1}/payments/paypal/confirm`,
  PAYMENT_PAYPAL_CANCEL_ENDPOINT: `${BASE_URL_WITH_V1}/payments/paypal/cancel`,
  PAYMENT_HISTORY_ENDPOINT: `${BASE_URL_WITH_V1}/payments/history`,
};

export const COLORS = {
    
  primary: '#667eea',
  secondary: '#764ba2',
  accent: '#f093fb',

  gradientStart: '#667eea',
  gradientEnd: '#764ba2',
  gradientAccent: '#f093fb',
  
  background: '#f8f9fa',
  surface: '#ffffff',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  text: '#2c3e50',
  textPrimary: '#2c3e50',
  textSecondary: '#6c757d',
  textMuted: '#7f8c8d',
  textLight: '#95a5a6',
  
  success: '#28a745',
  warning: '#ffc107',
  error: '#ff4757',
  danger: '#ff4757',
  info: '#17a2b8',
  
  border: '#e1e8ed',
  borderLight: '#f1f3f4',
  borderDark: '#d1d9e0',
  
  primaryLight: 'rgba(102, 126, 234, 0.1)',
  secondaryLight: 'rgba(118, 75, 162, 0.1)',
  successLight: 'rgba(40, 167, 69, 0.1)',
  warningLight: 'rgba(255, 193, 7, 0.1)',
  errorLight: 'rgba(255, 71, 87, 0.1)',
};


export const SIZES = {
    
  extraSmall: 10,
  small: 12,
  medium: 14,
  large: 16,
  extraLarge: 18,
  h1: 28,
  h2: 24,
  h3: 20,
  h4: 18,
  h5: 16,
  h6: 14,
  
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  
  radiusSmall: 8,
  radiusMedium: 12,
  radiusLarge: 16,
  radiusExtraLarge: 20,
  radiusRound: 25,
  
  iconSmall: 16,
  iconMedium: 20,
  iconLarge: 24,
  iconExtraLarge: 32,
  
  buttonSmall: 32,
  buttonMedium: 40,
  buttonLarge: 48,
  buttonExtraLarge: 56,
};

export const DIMENSIONS = {
  width,
  height,
  isSmallDevice: width < 375,
  isMediumDevice: width >= 375 && width < 414,
  isLargeDevice: width >= 414,
  
  cardWidth: (width - 45) / 2,
  fullWidth: width,
  halfWidth: width / 2,
  
  headerHeight: 60,
  tabBarHeight: 60,
  statusBarHeight: 44,
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  light: 'System',
  
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
};

export const ANIMATIONS = {
  fast: 200,
  medium: 300,
  slow: 500,
  
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

export const LAYOUTS = {
    
  padding: {
    screen: 20,
    section: 15,
    card: 15,
    button: 12,
  },
  
  margin: {
    section: 20,
    card: 10,
    element: 8,
  },
  
  gridColumns: 2,
  gridSpacing: 15,
};

export const DEFAULTS = {
  // الصور الافتراضية
  productImage: 'https://via.placeholder.com/300x300?text=Product',
  avatarImage: 'https://via.placeholder.com/100x100?text=User',
  
  // النصوص الافتراضية
  placeholderText: 'جاري التحميل...',
  errorMessage: 'حدث خطأ ما',
  emptyMessage: 'لا توجد عناصر',
  
  // القيم الرقمية
  maxRating: 5,
  defaultQuantity: 1,
  minPrice: 0,
  maxPrice: 10000000,
};

export default {
  COLORS,
  SIZES,
  DIMENSIONS,
  FONTS,
  SHADOWS,
  ANIMATIONS,
  LAYOUTS,
  DEFAULTS,
};

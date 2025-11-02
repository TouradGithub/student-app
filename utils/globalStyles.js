import { StyleSheet } from 'react-native';
import { COLORS, SHADOWS, SIZES } from './constants';

// Export COLORS and FONTS for use in other files
export { COLORS };
export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  light: 'System',
};

// أنماط مشتركة للتطبيق
export const globalStyles = StyleSheet.create({
  // الحاويات
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.lg,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // التخطيطات
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // النصوص
  textCenter: {
    textAlign: 'center',
  },
  
  textRight: {
    textAlign: 'right',
  },
  
  textLeft: {
    textAlign: 'left',
  },
  
  // أحجام النصوص
  h1: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  
  h2: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  
  h3: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  
  h4: {
    fontSize: SIZES.h4,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  
  body: {
    fontSize: SIZES.medium,
    color: COLORS.textPrimary,
  },
  
  caption: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  
  // الأزرار
  button: {
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.xl,
    borderRadius: SIZES.radiusRound,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  
  buttonSecondary: {
    backgroundColor: COLORS.secondary,
  },
  
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  
  buttonText: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  
  buttonTextOutline: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.primary,
  },
  
  // الكروت
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.lg,
    ...SHADOWS.medium,
  },
  
  cardSmall: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusMedium,
    padding: SIZES.md,
    ...SHADOWS.light,
  },
  
  // الإدخالات
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusMedium,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    fontSize: SIZES.medium,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  
  inputFocused: {
    borderColor: COLORS.primary,
  },
  
  // القوائم
  listContainer: {
    paddingVertical: SIZES.md,
  },
  
  listItem: {
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  
  // المسافات
  mt_xs: { marginTop: SIZES.xs },
  mt_sm: { marginTop: SIZES.sm },
  mt_md: { marginTop: SIZES.md },
  mt_lg: { marginTop: SIZES.lg },
  mt_xl: { marginTop: SIZES.xl },
  
  mb_xs: { marginBottom: SIZES.xs },
  mb_sm: { marginBottom: SIZES.sm },
  mb_md: { marginBottom: SIZES.md },
  mb_lg: { marginBottom: SIZES.lg },
  mb_xl: { marginBottom: SIZES.xl },
  
  ml_xs: { marginLeft: SIZES.xs },
  ml_sm: { marginLeft: SIZES.sm },
  ml_md: { marginLeft: SIZES.md },
  ml_lg: { marginLeft: SIZES.lg },
  ml_xl: { marginLeft: SIZES.xl },
  
  mr_xs: { marginRight: SIZES.xs },
  mr_sm: { marginRight: SIZES.sm },
  mr_md: { marginRight: SIZES.md },
  mr_lg: { marginRight: SIZES.lg },
  mr_xl: { marginRight: SIZES.xl },
  
  // الحشو
  p_xs: { padding: SIZES.xs },
  p_sm: { padding: SIZES.sm },
  p_md: { padding: SIZES.md },
  p_lg: { padding: SIZES.lg },
  p_xl: { padding: SIZES.xl },
  
  pt_xs: { paddingTop: SIZES.xs },
  pt_sm: { paddingTop: SIZES.sm },
  pt_md: { paddingTop: SIZES.md },
  pt_lg: { paddingTop: SIZES.lg },
  pt_xl: { paddingTop: SIZES.xl },
  
  pb_xs: { paddingBottom: SIZES.xs },
  pb_sm: { paddingBottom: SIZES.sm },
  pb_md: { paddingBottom: SIZES.md },
  pb_lg: { paddingBottom: SIZES.lg },
  pb_xl: { paddingBottom: SIZES.xl },
  
  // الظلال
  shadowLight: SHADOWS.light,
  shadowMedium: SHADOWS.medium,
  shadowHeavy: SHADOWS.heavy,
  
  // الألوان المساعدة
  bgPrimary: { backgroundColor: COLORS.primary },
  bgSecondary: { backgroundColor: COLORS.secondary },
  bgSuccess: { backgroundColor: COLORS.success },
  bgWarning: { backgroundColor: COLORS.warning },
  bgError: { backgroundColor: COLORS.error },
  bgSurface: { backgroundColor: COLORS.surface },
  
  // نصوص ملونة
  textPrimary: { color: COLORS.primary },
  textSecondary: { color: COLORS.secondary },
  textSuccess: { color: COLORS.success },
  textWarning: { color: COLORS.warning },
  textError: { color: COLORS.error },
  textMuted: { color: COLORS.textMuted },
  textLight: { color: COLORS.textLight },
  
  // الحدود
  border: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },
  
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  
  // نصف القطر
  rounded: { borderRadius: SIZES.radiusMedium },
  roundedSmall: { borderRadius: SIZES.radiusSmall },
  roundedLarge: { borderRadius: SIZES.radiusLarge },
  roundedFull: { borderRadius: SIZES.radiusRound },
  
  // العرض والارتفاع
  fullWidth: { width: '100%' },
  halfWidth: { width: '50%' },
  fullHeight: { height: '100%' },
  
  // التموضع
  absolute: { position: 'absolute' },
  relative: { position: 'relative' },
  
  // التمركز
  justifyCenter: { justifyContent: 'center' },
  justifyBetween: { justifyContent: 'space-between' },
  justifyAround: { justifyContent: 'space-around' },
  justifyEvenly: { justifyContent: 'space-evenly' },
  
  alignCenter: { alignItems: 'center' },
  alignStart: { alignItems: 'flex-start' },
  alignEnd: { alignItems: 'flex-end' },
  alignStretch: { alignItems: 'stretch' },
  
  // المرونة
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  
  // الشفافية
  opacity25: { opacity: 0.25 },
  opacity50: { opacity: 0.5 },
  opacity75: { opacity: 0.75 },
});

export default globalStyles;

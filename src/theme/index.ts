import { Platform, TextStyle, ViewStyle } from 'react-native';

// ═══════════════════════════════════════
// COLORS
// ═══════════════════════════════════════
export const Colors = {
    primary: '#1A73E8',
    primaryDark: '#1557B0',
    primaryLight: '#E8F0FE',
    secondary: '#FF6B35',
    secondaryDark: '#D4521E',
    secondaryLight: '#FFF0E8',
    success: '#2ECC71',
    successLight: '#E8FAF0',
    warning: '#F39C12',
    warningLight: '#FFF8E8',
    danger: '#E74C3C',
    dangerLight: '#FDECEB',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    surfaceVariant: '#F1F3F5',
    textPrimary: '#1A1A2E',
    textSecondary: '#6C757D',
    textMuted: '#ADB5BD',
    textInverse: '#FFFFFF',
    border: '#DEE2E6',
    borderLight: '#E9ECEF',
    divider: '#F1F3F5',
    cardShadow: 'rgba(0,0,0,0.08)',
    overlay: 'rgba(0,0,0,0.5)',
    ownerAccent: '#6C3483',
    ownerAccentLight: '#F3E8FA',
    userAccent: '#1A73E8',
    userAccentLight: '#E8F0FE',
    skeleton: '#E9ECEF',
    skeletonHighlight: '#F8F9FA',
    rating: '#FFBE0B',
    online: '#2ECC71',
    offline: '#ADB5BD',
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
} as const;

// ═══════════════════════════════════════
// TYPOGRAPHY
// ═══════════════════════════════════════
export const FontFamily = {
    regular: Platform.select({ ios: 'Inter-Regular', android: 'Inter-Regular' }) || 'System',
    medium: Platform.select({ ios: 'Inter-Medium', android: 'Inter-Medium' }) || 'System',
    semiBold: Platform.select({ ios: 'Inter-SemiBold', android: 'Inter-SemiBold' }) || 'System',
    bold: Platform.select({ ios: 'Inter-Bold', android: 'Inter-Bold' }) || 'System',
} as const;

export const FontSize = {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 19,
    xl: 22,
    xxl: 26,
    xxxl: 32,
} as const;

export const Typography: Record<string, TextStyle> = {
    h1: { fontFamily: FontFamily.bold, fontSize: FontSize.xxxl, color: Colors.textPrimary, lineHeight: 40 },
    h2: { fontFamily: FontFamily.bold, fontSize: FontSize.xxl, color: Colors.textPrimary, lineHeight: 34 },
    h3: { fontFamily: FontFamily.semiBold, fontSize: FontSize.xl, color: Colors.textPrimary, lineHeight: 30 },
    h4: { fontFamily: FontFamily.semiBold, fontSize: FontSize.lg, color: Colors.textPrimary, lineHeight: 26 },
    body: { fontFamily: FontFamily.regular, fontSize: FontSize.base, color: Colors.textPrimary, lineHeight: 22 },
    bodyMedium: { fontFamily: FontFamily.medium, fontSize: FontSize.base, color: Colors.textPrimary, lineHeight: 22 },
    bodySm: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 18 },
    caption: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textMuted, lineHeight: 16 },
    button: { fontFamily: FontFamily.semiBold, fontSize: FontSize.base, letterSpacing: 0.3 },
    buttonSm: { fontFamily: FontFamily.semiBold, fontSize: FontSize.sm, letterSpacing: 0.3 },
    label: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.textSecondary, letterSpacing: 0.2 },
};

// ═══════════════════════════════════════
// SPACING
// ═══════════════════════════════════════
export const Spacing = {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 40,
    huge: 48,
    massive: 64,
} as const;

// ═══════════════════════════════════════
// BORDER RADIUS
// ═══════════════════════════════════════
export const BorderRadius = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 999,
} as const;

// ═══════════════════════════════════════
// SHADOWS
// ═══════════════════════════════════════
export const Shadows: Record<string, ViewStyle> = {
    card: Platform.select({
        ios: { shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },
        android: { elevation: 3 },
    }) || {},
    cardHover: Platform.select({
        ios: { shadowColor: Colors.black, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12 },
        android: { elevation: 6 },
    }) || {},
    modal: Platform.select({
        ios: { shadowColor: Colors.black, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 24 },
        android: { elevation: 8 },
    }) || {},
    button: Platform.select({
        ios: { shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
        android: { elevation: 4 },
    }) || {},
    bottomTab: Platform.select({
        ios: { shadowColor: Colors.black, shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.06, shadowRadius: 8 },
        android: { elevation: 8 },
    }) || {},
};

// ═══════════════════════════════════════
// STATUS COLORS
// ═══════════════════════════════════════
export const StatusColors: Record<string, { bg: string; text: string }> = {
    PENDING: { bg: Colors.warningLight, text: Colors.warning },
    ACCEPTED: { bg: Colors.successLight, text: Colors.success },
    REJECTED: { bg: Colors.dangerLight, text: Colors.danger },
    ONGOING: { bg: Colors.primaryLight, text: Colors.primary },
    COMPLETED: { bg: Colors.surfaceVariant, text: Colors.textSecondary },
    CANCELLED: { bg: Colors.surfaceVariant, text: Colors.textMuted },
    ACTIVE: { bg: Colors.successLight, text: Colors.success },
    INACTIVE: { bg: Colors.surfaceVariant, text: Colors.textMuted },
    UNDER_REVIEW: { bg: Colors.warningLight, text: Colors.warning },
    BLOCKED: { bg: Colors.dangerLight, text: Colors.danger },
};

// ═══════════════════════════════════════
// VEHICLE TYPE ICONS
// ═══════════════════════════════════════
export const VehicleTypeIcons: Record<string, string> = {
    BIKE: 'motorbike',
    CAR: 'car-side',
    VAN: 'van-utility',
    TRUCK: 'truck',
    SCOOTER: 'scooter',
    OTHER: 'car-multiple',
    ALL: 'format-list-bulleted',
};

// ═══════════════════════════════════════
// LAYOUT
// ═══════════════════════════════════════

export const Layout = {
    screenPadding: Spacing.md,
    cardPadding: Spacing.md,
    inputHeight: 52,
    buttonHeight: 50,
    buttonHeightSm: 40,
    headerHeight: 56,
    tabBarHeight: 64,
    iconSize: 24,
    iconSizeSm: 20,
    iconSizeLg: 32,
    avatarSizeSm: 36,
    avatarSizeMd: 48,
    avatarSizeLg: 72,
    avatarSizeXl: 96,
} as const;

import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, FontFamily, FontSize, BorderRadius, Layout, Shadows } from "../../theme";
const AppButton = ({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = true,
  icon,
  iconRight,
  style,
  textStyle
}) => {
  const isDisabled = disabled || loading;
  const height = size === "sm" ? Layout.buttonHeightSm : size === "lg" ? 56 : Layout.buttonHeight;
  const fontSize = size === "sm" ? FontSize.sm : FontSize.base;
  const iconSize = size === "sm" ? 16 : 20;
  const getColors = () => {
    switch (variant) {
      case "primary":
        return { bg: Colors.primary, text: Colors.white, gradientColors: [Colors.primary, Colors.primaryDark] };
      case "secondary":
        return { bg: Colors.secondary, text: Colors.white, gradientColors: [Colors.secondary, Colors.secondaryDark] };
      case "outline":
        return { bg: Colors.transparent, text: Colors.primary, border: Colors.primary };
      case "danger":
        return { bg: Colors.danger, text: Colors.white };
      case "ghost":
        return { bg: Colors.transparent, text: Colors.primary };
      default:
        return { bg: Colors.primary, text: Colors.white };
    }
  };
  const colors = getColors();
  const buttonContent = <>
            {loading ? <ActivityIndicator size="small" color={colors.text} /> : <>
                    {icon && <Icon name={icon} size={iconSize} color={colors.text} style={styles.iconLeft} />}
                    <Text style={[styles.label, { color: colors.text, fontSize, fontFamily: FontFamily.semiBold }, textStyle]}>
                        {label}
                    </Text>
                    {iconRight && <Icon name={iconRight} size={iconSize} color={colors.text} style={styles.iconRight} />}
                </>}
        </>;
  if (colors.gradientColors && !isDisabled) {
    return <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[fullWidth && styles.fullWidth, style]}
    >
                <LinearGradient
      colors={colors.gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.button, { height }, Shadows.button, fullWidth && styles.fullWidth]}
    >
                    {buttonContent}
                </LinearGradient>
            </TouchableOpacity>;
  }
  return <TouchableOpacity
    onPress={onPress}
    disabled={isDisabled}
    activeOpacity={0.7}
    style={[
      styles.button,
      { height, backgroundColor: colors.bg },
      colors.border && { borderWidth: 1.5, borderColor: colors.border },
      isDisabled && styles.disabled,
      fullWidth && styles.fullWidth,
      style
    ]}
  >
            {buttonContent}
        </TouchableOpacity>;
};
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BorderRadius.md,
    paddingHorizontal: 24
  },
  label: { letterSpacing: 0.3 },
  fullWidth: { width: "100%" },
  disabled: { opacity: 0.5 },
  iconLeft: { marginRight: 8 },
  iconRight: { marginLeft: 8 }
});
var AppButton_default = AppButton;
export {
  AppButton_default as default
};

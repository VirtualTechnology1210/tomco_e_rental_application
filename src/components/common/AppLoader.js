import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { Colors, FontFamily, FontSize, Spacing } from "../../theme";
const AppLoader = ({ message, fullScreen = true }) => <View style={[styles.container, fullScreen && styles.fullScreen]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        {message && <Text style={styles.message}>{message}</Text>}
    </View>;
const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", padding: Spacing.xxl },
  fullScreen: { flex: 1, backgroundColor: Colors.background },
  message: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.sm }
});
var AppLoader_default = AppLoader;
export {
  AppLoader_default as default
};

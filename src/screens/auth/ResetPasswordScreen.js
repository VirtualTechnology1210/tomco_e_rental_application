import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import AppButton from "../../components/common/AppButton";
import AppInput from "../../components/common/AppInput";
import { Colors, FontFamily, FontSize, Spacing } from "../../theme";
import { resetPasswordSchema } from "../../utils/validationSchemas";
import { authApi } from "../../api/authApi";
const ResetPasswordScreen = ({ navigation, route }) => {
  const { userId, phone } = route.params;
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: { new_password: "", confirm_password: "" }
  });
  const mutation = useMutation({
    mutationFn: (data) => authApi.resetPassword({ phone, otp: userId, new_password: data.new_password }),
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Password Reset!", text2: "Login with your new password" });
      navigation.navigate("Login", { role: "USER" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Error", text2: error.response?.data?.message || "Failed" });
    }
  });
  return <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
            <View style={styles.content}>
                <Icon name="lock-check" size={56} color={Colors.success} />
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>Create a new secure password for your account.</Text>

                <Controller
    control={control}
    name="new_password"
    render={({ field: { onChange, onBlur, value } }) => <AppInput
      label="New Password"
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      error={errors.new_password?.message}
      secureTextEntry
      leftIcon="lock"
      placeholder="Min 6 characters"
    />}
  />

                <Controller
    control={control}
    name="confirm_password"
    render={({ field: { onChange, onBlur, value } }) => <AppInput
      label="Confirm Password"
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      error={errors.confirm_password?.message}
      secureTextEntry
      leftIcon="lock-check"
      placeholder="Re-enter password"
    />}
  />

                <AppButton label="Reset Password" onPress={handleSubmit((d) => mutation.mutate(d))} loading={mutation.isPending} icon="check" style={{ marginTop: Spacing.md }} />
            </View>
        </View>;
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: Spacing.xl },
  backBtn: { marginTop: Spacing.xxxl },
  content: { flex: 1, justifyContent: "center", alignItems: "center", paddingBottom: Spacing.massive },
  title: { fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: Colors.textPrimary, marginTop: Spacing.lg },
  subtitle: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textSecondary, textAlign: "center", marginTop: Spacing.xs, marginBottom: Spacing.xxl }
});
var ResetPasswordScreen_default = ResetPasswordScreen;
export {
  ResetPasswordScreen_default as default
};

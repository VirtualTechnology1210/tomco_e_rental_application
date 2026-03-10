import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import AppButton from "../../components/common/AppButton";
import AppInput from "../../components/common/AppInput";
import { Colors, FontFamily, FontSize, Spacing, BorderRadius } from "../../theme";
import { loginSchema } from "../../utils/validationSchemas";
import { authApi } from "../../api/authApi";
import { useAuth } from "../../hooks/useAuth";
import { COUNTRY_CODE } from "../../utils/constants";
const LoginScreen = ({ navigation, route }) => {
  const { role } = route.params;
  const { login } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { phone: "", password: "" }
  });
  const loginMutation = useMutation({
    mutationFn: (data) => authApi.login({ phone: `${COUNTRY_CODE}${data.phone}`, password: data.password }),
    onSuccess: async (response) => {
      const { tokens, user } = response.data;
      if (tokens && user) {
        await login(user, tokens.accessToken, tokens.refreshToken);
        Toast.show({ type: "success", text1: "Welcome back!", text2: `Hello ${user.full_name}` });
      }
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Login Failed", text2: error.response?.data?.message || "Something went wrong" });
    }
  });
  const onSubmit = (data) => loginMutation.mutate(data);
  return <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : void 0}>
            <StatusBar barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>

                <View style={styles.logoSection}>
                    <View style={styles.logoCircle}>
                        <Icon name="car-connected" size={32} color={Colors.primary} />
                    </View>
                    <Text style={styles.welcomeText}>Welcome Back</Text>
                    <Text style={styles.subtitleText}>Login to your {role === "VEHICLE_OWNER" ? "owner" : "user"} account</Text>
                </View>

                <View style={styles.form}>
                    <Controller
    control={control}
    name="phone"
    render={({ field: { onChange, onBlur, value } }) => <AppInput
      label="Phone Number"
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      error={errors.phone?.message}
      placeholder="Enter phone number"
      leftIcon="phone"
      keyboardType="phone-pad"
    />}
  />

                    <Controller
    control={control}
    name="password"
    render={({ field: { onChange, onBlur, value } }) => <AppInput
      label="Password"
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      error={errors.password?.message}
      secureTextEntry
      placeholder="Enter password"
      leftIcon="lock"
    />}
  />

                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={styles.forgotBtn}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <AppButton
    label="Login"
    onPress={handleSubmit(onSubmit)}
    loading={loginMutation.isPending}
    icon="login"
  />
                </View>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.dividerLine} />
                </View>

                {
    /* Social Login Options */
  }
                <View style={styles.socialSection}>
                    <TouchableOpacity
    style={styles.socialBtn}
    activeOpacity={0.7}
    onPress={() => Toast.show({ type: "info", text1: "Google Sign-In", text2: "Configure google-services.json to enable" })}
  >
                        <View style={styles.socialIconBox}>
                            <Icon name="google" size={22} color="#DB4437" />
                        </View>
                        <Text style={styles.socialBtnText}>Continue with Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
    style={styles.socialBtn}
    activeOpacity={0.7}
    onPress={() => Toast.show({ type: "info", text1: "Email Login", text2: "Use phone login for now" })}
  >
                        <View style={styles.socialIconBox}>
                            <Icon name="email" size={22} color={Colors.primary} />
                        </View>
                        <Text style={styles.socialBtnText}>Continue with Email</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
    style={styles.guestBtn}
    activeOpacity={0.7}
    onPress={() => Toast.show({ type: "info", text1: "Guest Mode", text2: "Browse vehicles without an account" })}
  >
                        <Icon name="account-outline" size={18} color={Colors.textSecondary} />
                        <Text style={styles.guestBtnText}>Browse as Guest</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.signupLink} onPress={() => navigation.navigate("Signup", { role })}>
                    <Text style={styles.signupText}>
                        Don't have an account? <Text style={styles.signupBold}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>;
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flexGrow: 1, paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xxxl },
  backBtn: { marginTop: Spacing.xxxl, marginBottom: Spacing.md },
  logoSection: { alignItems: "center", marginBottom: Spacing.xxl },
  logoCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: Colors.primaryLight, justifyContent: "center", alignItems: "center", marginBottom: Spacing.sm },
  welcomeText: { fontFamily: FontFamily.bold, fontSize: FontSize.xxl, color: Colors.textPrimary },
  subtitleText: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xxs },
  form: { marginBottom: Spacing.lg },
  forgotBtn: { alignSelf: "flex-end", marginBottom: Spacing.lg, marginTop: -Spacing.xs },
  forgotText: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.primary },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: Spacing.lg },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.textMuted, marginHorizontal: Spacing.md },
  signupLink: { alignItems: "center" },
  signupText: { fontFamily: FontFamily.regular, fontSize: FontSize.base, color: Colors.textSecondary },
  signupBold: { fontFamily: FontFamily.semiBold, color: Colors.primary },
  socialSection: { marginBottom: Spacing.lg },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm
  },
  socialIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceVariant,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm
  },
  socialBtnText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    color: Colors.textPrimary
  },
  guestBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    marginTop: Spacing.xxs
  },
  guestBtnText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginLeft: Spacing.xxs,
    textDecorationLine: "underline"
  }
});
var LoginScreen_default = LoginScreen;
export {
  LoginScreen_default as default
};

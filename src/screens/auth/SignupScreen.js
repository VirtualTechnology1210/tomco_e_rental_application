import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import AppButton from "../../components/common/AppButton";
import AppInput from "../../components/common/AppInput";
import { Colors, FontFamily, FontSize, Spacing } from "../../theme";
import { signupSchema, ownerSignupSchema } from "../../utils/validationSchemas";
import { authApi } from "../../api/authApi";
import { COUNTRY_CODE } from "../../utils/constants";
const SignupScreen = ({ navigation, route }) => {
  const { role } = route.params;
  const isOwner = role === "VEHICLE_OWNER";
  const schema = isOwner ? ownerSignupSchema : signupSchema;
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { full_name: "", phone: "", email: "", password: "", confirm_password: "" }
  });
  const signupMutation = useMutation({
    mutationFn: (data) => authApi.signup({ full_name: data.full_name, phone: `${COUNTRY_CODE}${data.phone}`, email: data.email || void 0, password: data.password, role }),
    onSuccess: (response) => {
      Toast.show({ type: "success", text1: "Account Created!", text2: response.data.message });
      navigation.navigate("OtpVerification", {
        userId: response.data.userId,
        phone: `${COUNTRY_CODE}`,
        mode: "signup"
      });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Signup Failed", text2: error.response?.data?.message || "Something went wrong" });
    }
  });
  const onSubmit = (data) => signupMutation.mutate(data);
  return <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : void 0}>
            <StatusBar barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>

                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Sign up as a {isOwner ? "Vehicle Owner" : "User"}</Text>

                <View style={styles.form}>
                    <Controller
    control={control}
    name="full_name"
    render={({ field: { onChange, onBlur, value } }) => <AppInput
      label="Full Name"
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      error={errors.full_name?.message}
      leftIcon="account"
      placeholder="Enter your full name"
    />}
  />

                    <Controller
    control={control}
    name="phone"
    render={({ field: { onChange, onBlur, value } }) => <AppInput
      label="Phone Number"
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      error={errors.phone?.message}
      leftIcon="phone"
      placeholder="Phone number"
      keyboardType="phone-pad"
    />}
  />

                    <Controller
    control={control}
    name="email"
    render={({ field: { onChange, onBlur, value } }) => <AppInput
      label="Email (Optional)"
      value={value || ""}
      onChangeText={onChange}
      onBlur={onBlur}
      error={errors.email?.message}
      leftIcon="email"
      placeholder="Email address"
      keyboardType="email-address"
      autoCapitalize="none"
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
      leftIcon="lock"
      placeholder="Min 6 characters"
      hint="Minimum 6 characters"
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

                    {isOwner && <>
                            <View style={styles.ownerSection}>
                                <Text style={styles.sectionTitle}>Business Info (Optional)</Text>
                            </View>
                            <Controller
    control={control}
    name="business_name"
    defaultValue=""
    render={({ field: { onChange, onBlur, value } }) => <AppInput
      label="Business Name"
      value={value || ""}
      onChangeText={onChange}
      onBlur={onBlur}
      leftIcon="store"
      placeholder="Your business name"
    />}
  />
                            <Controller
    control={control}
    name="city"
    defaultValue=""
    render={({ field: { onChange, onBlur, value } }) => <AppInput
      label="City"
      value={value || ""}
      onChangeText={onChange}
      onBlur={onBlur}
      leftIcon="city"
      placeholder="Your city"
    />}
  />
                        </>}

                    <AppButton
    label="Sign Up"
    onPress={handleSubmit(onSubmit)}
    loading={signupMutation.isPending}
    icon="account-plus"
    style={{ marginTop: Spacing.md }}
  />
                </View>

                <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate("Login", { role })}>
                    <Text style={styles.loginText}>
                        Already have an account? <Text style={styles.loginBold}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>;
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flexGrow: 1, paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xxxl },
  backBtn: { marginTop: Spacing.xxxl, marginBottom: Spacing.lg },
  title: { fontFamily: FontFamily.bold, fontSize: FontSize.xxl, color: Colors.textPrimary },
  subtitle: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xxs, marginBottom: Spacing.xl },
  form: {},
  ownerSection: { marginTop: Spacing.md, marginBottom: Spacing.sm, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.divider },
  sectionTitle: { fontFamily: FontFamily.semiBold, fontSize: FontSize.md, color: Colors.ownerAccent },
  loginLink: { alignItems: "center", marginTop: Spacing.lg },
  loginText: { fontFamily: FontFamily.regular, fontSize: FontSize.base, color: Colors.textSecondary },
  loginBold: { fontFamily: FontFamily.semiBold, color: Colors.primary }
});
var SignupScreen_default = SignupScreen;
export {
  SignupScreen_default as default
};

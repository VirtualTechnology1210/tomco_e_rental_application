import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import AppButton from '../../components/common/AppButton';
import AppInput from '../../components/common/AppInput';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';
import { AuthScreenProps } from '../../types/navigation.types';
import { forgotPasswordSchema } from '../../utils/validationSchemas';
import { authApi } from '../../api/authApi';
import { COUNTRY_CODE } from '../../utils/constants';

const ForgotPasswordScreen: React.FC<AuthScreenProps<'ForgotPassword'>> = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(forgotPasswordSchema),
        defaultValues: { phone: '' },
    });

    const mutation = useMutation({
        mutationFn: (data: { phone: string }) => authApi.forgotPassword({ phone: `${COUNTRY_CODE}${data.phone}` }),
        onSuccess: (response, variables) => {
            Toast.show({ type: 'success', text1: 'OTP Sent', text2: response.data.message });
            navigation.navigate('OtpVerification', {
                userId: response.data.userId,
                phone: `${COUNTRY_CODE}${variables.phone}`,
                mode: 'forgot',
            });
        },
        onError: (error: { response?: { data?: { message?: string } } }) => {
            Toast.show({ type: 'error', text1: 'Error', text2: error.response?.data?.message || 'Failed' });
        },
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
            <View style={styles.content}>
                <Icon name="lock-reset" size={56} color={Colors.primary} />
                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subtitle}>Enter your phone number and we'll send you an OTP to reset your password.</Text>

                <Controller control={control} name="phone"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <AppInput label="Phone Number" value={value} onChangeText={onChange} onBlur={onBlur}
                            error={errors.phone?.message} leftIcon="phone" keyboardType="phone-pad" />
                    )} />

                <AppButton label="Send OTP" onPress={handleSubmit((d) => mutation.mutate(d))} loading={mutation.isPending} icon="send" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: Spacing.xl },
    backBtn: { marginTop: Spacing.xxxl },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: Spacing.massive },
    title: { fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: Colors.textPrimary, marginTop: Spacing.lg },
    subtitle: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.xs, marginBottom: Spacing.xxl, paddingHorizontal: Spacing.md },
});

export default ForgotPasswordScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { OtpEntry } from 'react-native-otp-entry';
import { useMutation } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import AppButton from '../../components/common/AppButton';
import AppLoader from '../../components/common/AppLoader';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius } from '../../theme';
import { AuthScreenProps } from '../../types/navigation.types';
import { authApi } from '../../api/authApi';
import { useAuth } from '../../hooks/useAuth';
import { OTP_LENGTH, OTP_RESEND_TIMER } from '../../utils/constants';

const OtpVerificationScreen: React.FC<AuthScreenProps<'OtpVerification'>> = ({ navigation, route }) => {
    const { userId, phone, mode } = route.params;
    const { login } = useAuth();
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(OTP_RESEND_TIMER);

    useEffect(() => {
        if (timer <= 0) return;
        const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const verifyMutation = useMutation({
        mutationFn: () => authApi.verifyOtp({ userId, otp }),
        onSuccess: async (response) => {
            const data = response.data;
            if (mode === 'forgot') {
                navigation.replace('ResetPassword', { userId, phone });
                return;
            }
            if (data.tokens && data.user) {
                await login(data.user, data.tokens.accessToken, data.tokens.refreshToken);
                Toast.show({ type: 'success', text1: 'Verified!', text2: 'Welcome to E-Rental' });
            } else {
                Toast.show({ type: 'info', text1: 'Verified!', text2: data.message });
            }
        },
        onError: (error: { response?: { data?: { message?: string } } }) => {
            Toast.show({ type: 'error', text1: 'Verification Failed', text2: error.response?.data?.message || 'Invalid OTP' });
        },
    });

    const handleVerify = () => {
        if (otp.length !== OTP_LENGTH) return;
        verifyMutation.mutate();
    };

    const handleResend = () => {
        setTimer(OTP_RESEND_TIMER);
        Toast.show({ type: 'info', text1: 'OTP Resent', text2: 'A new OTP has been sent' });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>

            <View style={styles.content}>
                <View style={styles.iconCircle}>
                    <Icon name="shield-check" size={40} color={Colors.primary} />
                </View>
                <Text style={styles.title}>Verify Phone Number</Text>
                <Text style={styles.subtitle}>Enter the 6-digit code sent to</Text>
                <Text style={styles.phone}>{phone || 'your phone'}</Text>

                <View style={styles.otpContainer}>
                    <OtpEntry
                        numberOfDigits={OTP_LENGTH}
                        onTextChange={setOtp}
                        focusColor={Colors.primary}
                        theme={{
                            containerStyle: styles.otpInput,
                            pinCodeContainerStyle: styles.otpBox,
                            pinCodeTextStyle: styles.otpText,
                            focusedPinCodeContainerStyle: styles.otpBoxFocused,
                        }}
                    />
                </View>

                <AppButton
                    label="Verify"
                    onPress={handleVerify}
                    loading={verifyMutation.isPending}
                    disabled={otp.length !== OTP_LENGTH}
                    icon="check-circle"
                    style={{ marginTop: Spacing.xl }}
                />

                <View style={styles.resendRow}>
                    {timer > 0 ? (
                        <Text style={styles.timerText}>Resend OTP in {timer}s</Text>
                    ) : (
                        <TouchableOpacity onPress={handleResend}>
                            <Text style={styles.resendText}>Resend OTP</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: Spacing.xl },
    backBtn: { marginTop: Spacing.xxxl },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: Spacing.massive },
    iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.primaryLight, justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.lg },
    title: { fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: Colors.textPrimary },
    subtitle: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
    phone: { fontFamily: FontFamily.semiBold, fontSize: FontSize.base, color: Colors.textPrimary, marginTop: Spacing.xxs },
    otpContainer: { marginTop: Spacing.xxl, width: '100%' },
    otpInput: { gap: 8 },
    otpBox: { borderWidth: 2, borderRadius: BorderRadius.md, borderColor: Colors.border, width: 48, height: 56 },
    otpBoxFocused: { borderColor: Colors.primary },
    otpText: { fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: Colors.textPrimary },
    resendRow: { marginTop: Spacing.lg },
    timerText: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textMuted },
    resendText: { fontFamily: FontFamily.semiBold, fontSize: FontSize.base, color: Colors.primary },
});

export default OtpVerificationScreen;

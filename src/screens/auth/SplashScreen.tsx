import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';
import { useAuth } from '../../hooks/useAuth';
import { AuthScreenProps } from '../../types/navigation.types';

const SplashScreen: React.FC<AuthScreenProps<'Splash'>> = ({ navigation }) => {
    const scaleAnim = useRef(new Animated.Value(0.3)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const { isAuthenticated, user, checkAuth } = useAuth();

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
            Animated.timing(opacityAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ]).start();

        const timer = setTimeout(async () => {
            await checkAuth();
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isAuthenticated && !user) return;

        if (isAuthenticated && user) {
            if (user.status === 'BLOCKED') {
                navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
            } else if (user.role === 'VEHICLE_OWNER' && user.status === 'PENDING') {
                navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
            } else {
                navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
            }
        } else {
            navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
        }
    }, [isAuthenticated, user, navigation]);

    return (
        <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
            <Animated.View style={[styles.logoContainer, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }]}>
                <View style={styles.iconCircle}>
                    <Icon name="car-connected" size={48} color={Colors.primary} />
                </View>
                <Text style={styles.appName}>E-Rental</Text>
                <Text style={styles.tagline}>Smart Vehicle Marketplace</Text>
            </Animated.View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    logoContainer: { alignItems: 'center' },
    iconCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.lg },
    appName: { fontFamily: FontFamily.bold, fontSize: FontSize.xxxl, color: Colors.white, letterSpacing: 1 },
    tagline: { fontFamily: FontFamily.regular, fontSize: FontSize.base, color: 'rgba(255,255,255,0.8)', marginTop: Spacing.xxs },
});

export default SplashScreen;

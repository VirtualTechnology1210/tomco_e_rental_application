import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { RootStackParams } from '../types/navigation.types';
import AuthNavigator from './AuthNavigator';
import UserTabNavigator from './UserTabNavigator';
import OwnerTabNavigator from './OwnerTabNavigator';
import AppLoader from '../components/common/AppLoader';

const Stack = createNativeStackNavigator<RootStackParams>();

const RootNavigator = () => {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) return <AppLoader message="Loading..." />;

    const getInitialRoute = (): keyof RootStackParams => {
        if (!isAuthenticated || !user) return 'Auth';
        if (user.status === 'BLOCKED') return 'Blocked';
        if (user.role === 'VEHICLE_OWNER' && user.status === 'PENDING') return 'PendingApproval';
        if (user.role === 'VEHICLE_OWNER') return 'OwnerApp';
        return 'UserApp';
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={getInitialRoute()}>
                <Stack.Screen name="Auth" component={AuthNavigator} />
                <Stack.Screen name="UserApp" component={UserTabNavigator} />
                <Stack.Screen name="OwnerApp" component={OwnerTabNavigator} />
                <Stack.Screen name="PendingApproval" component={PendingApprovalScreen} />
                <Stack.Screen name="Blocked" component={BlockedScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// Inline simple screens
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppButton from '../components/common/AppButton';
import { Colors, FontFamily, FontSize, Spacing } from '../theme';

const PendingApprovalScreen = () => {
    const { logout } = useAuth();
    return (
        <View style={inlineStyles.container}>
            <StatusBar barStyle="dark-content" />
            <Icon name="clock-check-outline" size={72} color={Colors.warning} />
            <Text style={inlineStyles.title}>Verification Pending</Text>
            <Text style={inlineStyles.subtitle}>Your owner profile is being reviewed by our team. You'll be notified once approved.</Text>
            <AppButton label="Logout" onPress={logout} variant="outline" style={{ marginTop: Spacing.xl }} fullWidth={false} />
        </View>
    );
};

const BlockedScreen = () => {
    const { logout } = useAuth();
    return (
        <View style={inlineStyles.container}>
            <StatusBar barStyle="dark-content" />
            <Icon name="account-lock" size={72} color={Colors.danger} />
            <Text style={inlineStyles.title}>Account Blocked</Text>
            <Text style={inlineStyles.subtitle}>Your account has been blocked. Please contact support for assistance.</Text>
            <AppButton label="Logout" onPress={logout} variant="danger" style={{ marginTop: Spacing.xl }} fullWidth={false} />
        </View>
    );
};

const inlineStyles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background, paddingHorizontal: Spacing.xxl },
    title: { fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: Colors.textPrimary, marginTop: Spacing.lg, textAlign: 'center' },
    subtitle: { fontFamily: FontFamily.regular, fontSize: FontSize.base, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.sm, lineHeight: 22 },
});

export default RootNavigator;

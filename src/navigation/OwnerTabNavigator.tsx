import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Colors, FontFamily, Layout, Shadows } from '../theme';
import { OwnerTabParams, OwnerDashboardStackParams, OwnerVehiclesStackParams, OwnerRequestsStackParams, OwnerProfileStackParams } from '../types/navigation.types';

import OwnerHomeScreen from '../screens/owner/OwnerHomeScreen';
import MyVehiclesScreen from '../screens/owner/MyVehiclesScreen';
import AddVehicleScreen from '../screens/owner/AddVehicleScreen';
import BookingRequestsScreen from '../screens/owner/BookingRequestsScreen';
import OwnerProfileScreen from '../screens/owner/OwnerProfileScreen';
import EarningsScreen from '../screens/owner/EarningsScreen';
import NotificationsScreen from '../screens/user/NotificationsScreen';

const DashStack = createNativeStackNavigator<OwnerDashboardStackParams>();
const VehicleStack = createNativeStackNavigator<OwnerVehiclesStackParams>();
const RequestStack = createNativeStackNavigator<OwnerRequestsStackParams>();
const ProfileStack = createNativeStackNavigator<OwnerProfileStackParams>();
const Tab = createBottomTabNavigator<OwnerTabParams>();

const DashStackScreen = () => (
    <DashStack.Navigator screenOptions={{ headerShown: false }}>
        <DashStack.Screen name="OwnerDashboard" component={OwnerHomeScreen} />
    </DashStack.Navigator>
);

const VehicleStackScreen = () => (
    <VehicleStack.Navigator screenOptions={{ headerShown: false }}>
        <VehicleStack.Screen name="MyVehicles" component={MyVehiclesScreen} />
        <VehicleStack.Screen name="AddVehicle" component={AddVehicleScreen} />
    </VehicleStack.Navigator>
);

const RequestStackScreen = () => (
    <RequestStack.Navigator screenOptions={{ headerShown: false }}>
        <RequestStack.Screen name="BookingRequests" component={BookingRequestsScreen} />
    </RequestStack.Navigator>
);

const ProfileStackScreen = () => (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
        <ProfileStack.Screen name="OwnerProfileMain" component={OwnerProfileScreen} />
        <ProfileStack.Screen name="Earnings" component={EarningsScreen} />
        <ProfileStack.Screen name="OwnerNotifications" component={NotificationsScreen as any} />
    </ProfileStack.Navigator>
);

const OwnerTabNavigator = () => {
    const unreadCount = useSelector((s: RootState) => s.notifications.unreadCount);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'view-dashboard';
                    if (route.name === 'Dashboard') iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
                    else if (route.name === 'Vehicles') iconName = focused ? 'car-multiple' : 'car-multiple';
                    else if (route.name === 'Requests') iconName = focused ? 'inbox' : 'inbox-outline';
                    else if (route.name === 'OwnerProfile') iconName = focused ? 'account' : 'account-outline';
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: Colors.ownerAccent,
                tabBarInactiveTintColor: Colors.textMuted,
                tabBarLabelStyle: { fontFamily: FontFamily.medium, fontSize: 11 },
                tabBarStyle: {
                    height: Layout.tabBarHeight,
                    paddingBottom: 8,
                    paddingTop: 4,
                    backgroundColor: Colors.surface,
                    borderTopColor: Colors.divider,
                    ...Shadows.bottomTab,
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={DashStackScreen} />
            <Tab.Screen name="Vehicles" component={VehicleStackScreen} />
            <Tab.Screen name="Requests" component={RequestStackScreen} options={{ tabBarBadge: unreadCount > 0 ? unreadCount : undefined }} />
            <Tab.Screen name="OwnerProfile" component={ProfileStackScreen} options={{ tabBarLabel: 'Profile' }} />
        </Tab.Navigator>
    );
};

export default OwnerTabNavigator;

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { Colors, FontFamily, Layout, Shadows } from "../theme";
import HomeScreen from "../screens/user/HomeScreen";
import VehicleDetailScreen from "../screens/user/VehicleDetailScreen";
import BookingFormScreen from "../screens/user/BookingFormScreen";
import BookingHistoryScreen from "../screens/user/BookingHistoryScreen";
import BookingDetailScreen from "../screens/user/BookingDetailScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import NotificationsScreen from "../screens/user/NotificationsScreen";
const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const BookingStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStackScreen = () => <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="HomeMain" component={HomeScreen} />
        <HomeStack.Screen name="VehicleDetail" component={VehicleDetailScreen} />
        <HomeStack.Screen name="BookingForm" component={BookingFormScreen} />
    </HomeStack.Navigator>;
const SearchStackScreen = () => <SearchStack.Navigator screenOptions={{ headerShown: false }}>
        <SearchStack.Screen name="VehicleSearch" component={HomeScreen} />
    </SearchStack.Navigator>;
const BookingStackScreen = () => <BookingStack.Navigator screenOptions={{ headerShown: false }}>
        <BookingStack.Screen name="BookingHistory" component={BookingHistoryScreen} />
        <BookingStack.Screen name="BookingDetail" component={BookingDetailScreen} />
    </BookingStack.Navigator>;
const ProfileStackScreen = () => <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
        <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
        <ProfileStack.Screen name="Notifications" component={NotificationsScreen} />
    </ProfileStack.Navigator>;
const UserTabNavigator = () => {
  const unreadCount = useSelector((s) => s.notifications.unreadCount);
  return <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = "home";
        if (route.name === "Home") iconName = focused ? "home" : "home-outline";
        else if (route.name === "Search") iconName = focused ? "magnify" : "magnify";
        else if (route.name === "Bookings") iconName = focused ? "calendar-check" : "calendar-check-outline";
        else if (route.name === "Profile") iconName = focused ? "account" : "account-outline";
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.textMuted,
      tabBarLabelStyle: { fontFamily: FontFamily.medium, fontSize: 11 },
      tabBarStyle: {
        height: Layout.tabBarHeight,
        paddingBottom: 8,
        paddingTop: 4,
        backgroundColor: Colors.surface,
        borderTopColor: Colors.divider,
        ...Shadows.bottomTab
      }
    })}
  >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Search" component={SearchStackScreen} />
            <Tab.Screen name="Bookings" component={BookingStackScreen} options={{ tabBarBadge: unreadCount > 0 ? unreadCount : void 0 }} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>;
};
var UserTabNavigator_default = UserTabNavigator;
export {
  UserTabNavigator_default as default
};

import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { UserRole } from './auth.types';

// ═══════════════════════════════════════
// AUTH STACK
// ═══════════════════════════════════════

export type AuthStackParams = {
    Splash: undefined;
    Onboarding: undefined;
    RoleSelect: undefined;
    Login: { role: UserRole };
    Signup: { role: UserRole };
    OtpVerification: { userId: string; phone: string; mode: 'signup' | 'forgot' };
    ForgotPassword: undefined;
    ResetPassword: { userId: string; phone: string };
};

// ═══════════════════════════════════════
// USER STACKS
// ═══════════════════════════════════════

export type UserHomeStackParams = {
    HomeMain: undefined;
    VehicleDetail: { vehicleId: string };
    BookingForm: { vehicleId: string };
    BookingConfirm: { bookingData: { vehicle_id: string; pickup_time: string; drop_time: string } };
};

export type UserSearchStackParams = {
    VehicleSearch: undefined;
    SearchResults: { lat: number; lng: number; type?: string; radius_km?: number };
    VehicleDetailSearch: { vehicleId: string };
    BookingFormSearch: { vehicleId: string };
    BookingConfirmSearch: { bookingData: { vehicle_id: string; pickup_time: string; drop_time: string } };
    MapView: { lat: number; lng: number };
};

export type UserBookingStackParams = {
    BookingHistory: undefined;
    BookingDetail: { bookingId: string };
    Review: { bookingId: string; vehicleId: string };
};

export type UserProfileStackParams = {
    ProfileMain: undefined;
    EditProfile: undefined;
    Notifications: undefined;
};

export type UserTabParams = {
    Home: NavigatorScreenParams<UserHomeStackParams>;
    Search: NavigatorScreenParams<UserSearchStackParams>;
    Bookings: NavigatorScreenParams<UserBookingStackParams>;
    Profile: NavigatorScreenParams<UserProfileStackParams>;
};

// ═══════════════════════════════════════
// OWNER STACKS
// ═══════════════════════════════════════

export type OwnerDashboardStackParams = {
    OwnerDashboard: undefined;
};

export type OwnerVehiclesStackParams = {
    MyVehicles: undefined;
    AddVehicle: undefined;
    EditVehicle: { vehicleId: string };
    VehicleImages: { vehicleId: string };
};

export type OwnerRequestsStackParams = {
    BookingRequests: undefined;
    BookingRequestDetail: { bookingId: string };
    OwnerBookingHistory: undefined;
};

export type OwnerProfileStackParams = {
    OwnerProfileMain: undefined;
    OwnerEditProfile: undefined;
    OwnerProfileSetup: undefined;
    Earnings: undefined;
    OwnerNotifications: undefined;
};

export type OwnerTabParams = {
    Dashboard: NavigatorScreenParams<OwnerDashboardStackParams>;
    Vehicles: NavigatorScreenParams<OwnerVehiclesStackParams>;
    Requests: NavigatorScreenParams<OwnerRequestsStackParams>;
    OwnerProfile: NavigatorScreenParams<OwnerProfileStackParams>;
};

// ═══════════════════════════════════════
// ROOT
// ═══════════════════════════════════════

export type RootStackParams = {
    Auth: NavigatorScreenParams<AuthStackParams>;
    UserApp: NavigatorScreenParams<UserTabParams>;
    OwnerApp: NavigatorScreenParams<OwnerTabParams>;
    PendingApproval: undefined;
    Blocked: undefined;
};

// Screen prop helpers
export type AuthScreenProps<T extends keyof AuthStackParams> = NativeStackScreenProps<AuthStackParams, T>;
export type UserHomeScreenProps<T extends keyof UserHomeStackParams> = NativeStackScreenProps<UserHomeStackParams, T>;
export type UserSearchScreenProps<T extends keyof UserSearchStackParams> = NativeStackScreenProps<UserSearchStackParams, T>;
export type UserBookingScreenProps<T extends keyof UserBookingStackParams> = NativeStackScreenProps<UserBookingStackParams, T>;
export type UserProfileScreenProps<T extends keyof UserProfileStackParams> = NativeStackScreenProps<UserProfileStackParams, T>;
export type OwnerVehiclesScreenProps<T extends keyof OwnerVehiclesStackParams> = NativeStackScreenProps<OwnerVehiclesStackParams, T>;
export type OwnerRequestsScreenProps<T extends keyof OwnerRequestsStackParams> = NativeStackScreenProps<OwnerRequestsStackParams, T>;
export type OwnerProfileScreenProps<T extends keyof OwnerProfileStackParams> = NativeStackScreenProps<OwnerProfileStackParams, T>;

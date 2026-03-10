export type UserRole = 'USER' | 'VEHICLE_OWNER' | 'ADMIN';
export type UserStatus = 'PENDING' | 'ACTIVE' | 'BLOCKED' | 'REJECTED';

export interface User {
    id: string;
    full_name: string;
    email: string | null;
    phone: string;
    role: UserRole;
    status: UserStatus;
    profile_image: string | null;
    created_at: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface SignupPayload {
    full_name: string;
    phone: string;
    email?: string;
    password: string;
    role: 'USER' | 'VEHICLE_OWNER';
}

export interface LoginPayload {
    phone: string;
    password: string;
}

export interface OtpPayload {
    userId: string;
    otp: string;
}

export interface ForgotPasswordPayload {
    phone: string;
}

export interface ResetPasswordPayload {
    phone: string;
    otp: string;
    new_password: string;
}

export interface AuthResponse {
    verified: boolean;
    tokens: AuthTokens | null;
    user?: User;
    message: string;
}

export interface SignupResponse {
    userId: string;
    role: UserRole;
    status: UserStatus;
    message: string;
}

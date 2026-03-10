import axiosInstance from './axiosInstance';
import { ApiResponse } from '../types/api.types';
import { AuthResponse, LoginPayload, SignupPayload, OtpPayload, SignupResponse, ForgotPasswordPayload, ResetPasswordPayload, AuthTokens } from '../types/auth.types';

export const authApi = {
    signup: (data: SignupPayload) =>
        axiosInstance.post<ApiResponse<SignupResponse>>('/auth/signup', data).then((r) => r.data),

    verifyOtp: (data: OtpPayload) =>
        axiosInstance.post<ApiResponse<AuthResponse>>('/auth/verify-otp', data).then((r) => r.data),

    login: (data: LoginPayload) =>
        axiosInstance.post<ApiResponse<{ tokens: AuthTokens; user: AuthResponse['user'] }>>('/auth/login', data).then((r) => r.data),

    refreshToken: (refreshToken: string) =>
        axiosInstance.post<ApiResponse<AuthTokens>>('/auth/refresh-token', { refreshToken }).then((r) => r.data),

    logout: () =>
        axiosInstance.post<ApiResponse<null>>('/auth/logout').then((r) => r.data),

    forgotPassword: (data: ForgotPasswordPayload) =>
        axiosInstance.post<ApiResponse<{ userId: string; message: string }>>('/auth/forgot-password', data).then((r) => r.data),

    resetPassword: (data: ResetPasswordPayload) =>
        axiosInstance.post<ApiResponse<null>>('/auth/reset-password', data).then((r) => r.data),
};

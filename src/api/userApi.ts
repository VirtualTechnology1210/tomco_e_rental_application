import axiosInstance from './axiosInstance';
import { ApiResponse } from '../types/api.types';
import { User } from '../types/auth.types';

export const userApi = {
    getProfile: () =>
        axiosInstance.get<ApiResponse<User>>('/user/profile').then((r) => r.data),

    updateProfile: (data: Partial<Pick<User, 'full_name' | 'email' | 'profile_image'>>) =>
        axiosInstance.put<ApiResponse<User>>('/user/profile', data).then((r) => r.data),

    updateFcmToken: (fcm_token: string) =>
        axiosInstance.put<ApiResponse<null>>('/user/fcm-token', { fcm_token }).then((r) => r.data),
};

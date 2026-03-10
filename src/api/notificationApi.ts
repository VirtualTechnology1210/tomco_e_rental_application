import axiosInstance from './axiosInstance';
import { PaginatedResponse, NotificationItem, ApiResponse } from '../types/api.types';

export const notificationApi = {
    getNotifications: (params?: { cursor?: string; limit?: number }) =>
        axiosInstance.get<PaginatedResponse<NotificationItem>>('/user/notifications', { params }).then((r) => r.data),

    markAllRead: () =>
        axiosInstance.put<ApiResponse<null>>('/user/notifications/read').then((r) => r.data),
};

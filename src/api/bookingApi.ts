import axiosInstance from './axiosInstance';
import { ApiResponse, PaginatedResponse } from '../types/api.types';
import { Booking, CreateBookingPayload, SubmitReviewPayload, Review, CostBreakdown, EarningsData, DashboardData } from '../types/booking.types';

export const bookingApi = {
    // User
    createBooking: (data: CreateBookingPayload) =>
        axiosInstance.post<ApiResponse<{ booking: Booking; billing: CostBreakdown }>>('/user/bookings', data).then((r) => r.data),

    getBookings: (params?: { cursor?: string; limit?: number }) =>
        axiosInstance.get<PaginatedResponse<Booking>>('/user/bookings', { params }).then((r) => r.data),

    getBookingDetail: (id: string) =>
        axiosInstance.get<ApiResponse<Booking>>(`/user/bookings/${id}`).then((r) => r.data),

    cancelBooking: (id: string, cancellation_reason?: string) =>
        axiosInstance.put<ApiResponse<null>>(`/user/bookings/${id}/cancel`, { cancellation_reason }).then((r) => r.data),

    submitReview: (bookingId: string, data: SubmitReviewPayload) =>
        axiosInstance.post<ApiResponse<Review>>(`/user/bookings/${bookingId}/review`, data).then((r) => r.data),

    // Owner
    getOwnerBookings: (params?: { cursor?: string; limit?: number; status?: string }) =>
        axiosInstance.get<PaginatedResponse<Booking>>('/owner/bookings', { params }).then((r) => r.data),

    getOwnerBookingDetail: (id: string) =>
        axiosInstance.get<ApiResponse<Booking>>(`/owner/bookings/${id}`).then((r) => r.data),

    acceptBooking: (id: string) =>
        axiosInstance.put<ApiResponse<null>>(`/owner/bookings/${id}/accept`).then((r) => r.data),

    rejectBooking: (id: string, reason: string) =>
        axiosInstance.put<ApiResponse<null>>(`/owner/bookings/${id}/reject`, { reason }).then((r) => r.data),

    getEarnings: () =>
        axiosInstance.get<ApiResponse<EarningsData>>('/owner/earnings').then((r) => r.data),

    getDashboard: () =>
        axiosInstance.get<ApiResponse<DashboardData>>('/owner/dashboard').then((r) => r.data),
};

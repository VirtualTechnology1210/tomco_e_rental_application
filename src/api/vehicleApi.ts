import axiosInstance from './axiosInstance';
import { ApiResponse, PaginatedResponse } from '../types/api.types';
import { Vehicle, VehicleImage, VehicleSearchParams, CreateVehiclePayload, UpdateVehiclePayload } from '../types/vehicle.types';

export const vehicleApi = {
    searchVehicles: (params: VehicleSearchParams) =>
        axiosInstance.get<PaginatedResponse<Vehicle>>('/user/vehicles/search', { params }).then((r) => r.data),

    getVehicleDetail: (id: string) =>
        axiosInstance.get<ApiResponse<Vehicle>>(`/user/vehicles/${id}`).then((r) => r.data),

    // Owner endpoints
    getOwnerVehicles: (params?: { cursor?: string; limit?: number }) =>
        axiosInstance.get<PaginatedResponse<Vehicle>>('/owner/vehicles', { params }).then((r) => r.data),

    getOwnerVehicle: (id: string) =>
        axiosInstance.get<ApiResponse<Vehicle>>(`/owner/vehicles/${id}`).then((r) => r.data),

    addVehicle: (data: CreateVehiclePayload) =>
        axiosInstance.post<ApiResponse<Vehicle>>('/owner/vehicles', data).then((r) => r.data),

    updateVehicle: (id: string, data: UpdateVehiclePayload) =>
        axiosInstance.put<ApiResponse<Vehicle>>(`/owner/vehicles/${id}`, data).then((r) => r.data),

    deleteVehicle: (id: string) =>
        axiosInstance.delete<ApiResponse<null>>(`/owner/vehicles/${id}`).then((r) => r.data),

    toggleAvailability: (id: string) =>
        axiosInstance.put<ApiResponse<{ availability: boolean }>>(`/owner/vehicles/${id}/toggle-availability`).then((r) => r.data),

    uploadImages: (id: string, images: Array<{ image_url: string; is_primary?: boolean; sort_order?: number }>) =>
        axiosInstance.post<ApiResponse<VehicleImage[]>>(`/owner/vehicles/${id}/images`, { images }).then((r) => r.data),
};

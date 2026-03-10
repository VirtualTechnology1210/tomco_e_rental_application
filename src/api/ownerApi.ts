import axiosInstance from './axiosInstance';
import { ApiResponse } from '../types/api.types';
import { OwnerProfile, SubmitOwnerProfilePayload } from '../types/owner.types';

export const ownerApi = {
    submitProfile: (data: SubmitOwnerProfilePayload) =>
        axiosInstance.post<ApiResponse<OwnerProfile>>('/owner/profile', data).then((r) => r.data),

    getProfile: () =>
        axiosInstance.get<ApiResponse<OwnerProfile>>('/owner/profile').then((r) => r.data),
};

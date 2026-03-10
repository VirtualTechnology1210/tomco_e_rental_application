import { Vehicle, VehicleImage } from './vehicle.types';
import { User } from './auth.types';

export type BookingStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';

export interface Booking {
    id: string;
    user_id: string;
    vehicle_id: string;
    owner_id: string;
    pickup_time: string;
    drop_time: string;
    total_hours: string | null;
    total_days: string | null;
    total_cost: string;
    status: BookingStatus;
    cancellation_reason: string | null;
    owner_contact_shown: boolean;
    created_at: string;
    updated_at: string;
    vehicle?: Vehicle & { images?: VehicleImage[] };
    user?: Pick<User, 'id' | 'full_name' | 'phone' | 'profile_image'>;
    owner?: Pick<User, 'id' | 'full_name' | 'phone'>;
    review?: Review | null;
}

export interface CreateBookingPayload {
    vehicle_id: string;
    pickup_time: string;
    drop_time: string;
}

export interface Review {
    id: string;
    booking_id: string;
    reviewer_id: string;
    vehicle_id: string;
    rating: number;
    comment: string | null;
    created_at: string;
}

export interface SubmitReviewPayload {
    rating: number;
    comment?: string;
}

export interface CostBreakdown {
    total_hours: number;
    total_days: number;
    total_cost: number;
    billing_mode: 'HOURLY' | 'DAILY';
}

export interface EarningsData {
    total_earnings: number;
    monthly_breakdown: Array<{
        month: string;
        total: string;
        booking_count: string;
    }>;
}

export interface DashboardData {
    total_vehicles: number;
    active_vehicles: number;
    total_bookings: number;
    pending_bookings: number;
    completed_bookings: number;
    total_earnings: number;
}

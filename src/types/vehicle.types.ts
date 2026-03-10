export type VehicleType = 'BIKE' | 'CAR' | 'VAN' | 'TRUCK' | 'SCOOTER' | 'OTHER';
export type VehicleStatus = 'ACTIVE' | 'INACTIVE' | 'UNDER_REVIEW';

export interface Vehicle {
    id: string;
    owner_id: string;
    name: string;
    type: VehicleType;
    brand: string | null;
    model: string | null;
    year: number | null;
    license_plate: string | null;
    per_hour_cost: string;
    per_day_cost: string;
    location_name: string | null;
    latitude: number;
    longitude: number;
    availability: boolean;
    status: VehicleStatus;
    created_at: string;
    updated_at: string;
    distance_km?: number;
    distance_meters?: number;
    primary_image?: string;
    images?: VehicleImage[];
    reviews?: VehicleReview[];
    owner?: { id: string; full_name: string };
    avg_rating?: string | null;
    total_reviews?: number;
}

export interface VehicleImage {
    id: string;
    vehicle_id: string;
    image_url: string;
    is_primary: boolean;
    sort_order: number;
}

export interface VehicleReview {
    id: string;
    rating: number;
    comment: string | null;
    created_at: string;
    reviewer: { id: string; full_name: string; profile_image: string | null };
}

export interface VehicleSearchParams {
    lat: number;
    lng: number;
    radius_km?: number;
    type?: VehicleType;
    page?: number;
    limit?: number;
}

export interface CreateVehiclePayload {
    name: string;
    type: VehicleType;
    brand?: string;
    model?: string;
    year?: number;
    license_plate?: string;
    per_hour_cost: number;
    per_day_cost: number;
    location_name?: string;
    latitude: number;
    longitude: number;
}

export interface UpdateVehiclePayload extends Partial<CreateVehiclePayload> { }

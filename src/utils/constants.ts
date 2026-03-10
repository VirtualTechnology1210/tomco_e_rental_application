export const API_BASE_URL = 'http://192.168.1.20:5000/api/v1';

export const OTP_LENGTH = 6;
export const OTP_RESEND_TIMER = 60;

export const MAX_VEHICLE_IMAGES = 5;
export const MAX_IMAGE_SIZE_MB = 5;

export const SEARCH_RADIUS_DEFAULT = 10;
export const SEARCH_RADIUS_MAX = 50;
export const SEARCH_RESULTS_LIMIT = 20;

export const BOOKING_STATUS_ORDER = ['PENDING', 'ACCEPTED', 'ONGOING', 'COMPLETED', 'REJECTED', 'CANCELLED'];

export const VEHICLE_TYPES = ['BIKE', 'CAR', 'VAN', 'TRUCK', 'SCOOTER', 'OTHER'] as const;

export const CACHE_TIMES = {
    vehicleSearch: 2 * 60 * 1000,
    vehicleDetail: 5 * 60 * 1000,
    bookings: 1 * 60 * 1000,
    notifications: 30 * 1000,
    profile: 5 * 60 * 1000,
    dashboard: 2 * 60 * 1000,
} as const;

export const CURRENCY_SYMBOL = '₹';
export const COUNTRY_CODE = '+91';

export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data: T;
}

export interface PaginatedResponse<T = unknown> {
    success: boolean;
    message: string;
    data: T[];
    pagination: CursorPagination | OffsetPagination;
}

export interface CursorPagination {
    nextCursor: string | null;
    hasMore: boolean;
    limit: number;
}

export interface OffsetPagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore?: boolean;
}

export interface NotificationItem {
    id: string;
    user_id: string;
    title: string;
    body: string | null;
    type: 'BOOKING_REQUEST' | 'BOOKING_ACCEPTED' | 'BOOKING_REJECTED' | 'SYSTEM' | 'PAYMENT';
    is_read: boolean;
    metadata: Record<string, unknown> | null;
    created_at: string;
}

export interface ApiError {
    success: false;
    message: string;
    errors?: Array<{ field: string; message: string }>;
}

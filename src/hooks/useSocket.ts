import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { tokenStorage } from '../utils/tokenStorage';
import { API_BASE_URL } from '../utils/constants';
import { incrementUnread } from '../store/slices/notificationSlice';
import Toast from 'react-native-toast-message';
import { AppDispatch } from '../store';

const SOCKET_URL = API_BASE_URL.replace('/api/v1', '');

export const useSocket = (userId: string | undefined) => {
    const socketRef = useRef<Socket | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const connect = useCallback(async () => {
        if (!userId) return;

        const token = await tokenStorage.getAccessToken();
        if (!token) return;

        const socket = io(SOCKET_URL, {
            auth: { token },
            transports: ['websocket'],
            reconnection: true,
            reconnectionDelay: 2000,
            reconnectionAttempts: 10,
        });

        socket.on('connect', () => {
            console.log('[Socket] Connected');
        });

        socket.on('booking:new_request', (data: { booking_id: string; vehicle_name: string; total_cost: number }) => {
            dispatch(incrementUnread());
            Toast.show({
                type: 'info',
                text1: 'New Booking Request! 🔔',
                text2: `${data.vehicle_name} — ₹${data.total_cost}`,
                visibilityTime: 4000,
            });
        });

        socket.on('booking:accepted', (data: { booking_id: string }) => {
            dispatch(incrementUnread());
            Toast.show({
                type: 'success',
                text1: 'Booking Accepted! ✅',
                text2: 'Your booking has been confirmed by the owner.',
                visibilityTime: 4000,
            });
        });

        socket.on('booking:rejected', (data: { booking_id: string; reason?: string }) => {
            dispatch(incrementUnread());
            Toast.show({
                type: 'error',
                text1: 'Booking Rejected ❌',
                text2: data.reason || 'The owner declined your booking.',
                visibilityTime: 4000,
            });
        });

        socket.on('booking:cancelled', (data: { booking_id: string }) => {
            dispatch(incrementUnread());
            Toast.show({
                type: 'info',
                text1: 'Booking Cancelled',
                text2: 'A booking has been cancelled.',
                visibilityTime: 3000,
            });
        });

        socket.on('notification:new', () => {
            dispatch(incrementUnread());
        });

        socket.on('disconnect', (reason: string) => {
            console.log('[Socket] Disconnected:', reason);
        });

        socket.on('connect_error', (err: Error) => {
            console.error('[Socket] Connection error:', err.message);
        });

        socketRef.current = socket;
    }, [userId, dispatch]);

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }
    }, []);

    useEffect(() => {
        connect();
        return () => disconnect();
    }, [connect, disconnect]);

    return { socket: socketRef.current, connect, disconnect };
};

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setUser, logout as logoutAction, updateUser, setLoading } from '../store/slices/authSlice';
import { tokenStorage } from '../utils/tokenStorage';
import { authApi } from '../api/authApi';
import { User } from '../types/auth.types';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, isAuthenticated, isLoading, selectedRole } = useSelector((state: RootState) => state.auth);

    const login = useCallback(async (userData: User, accessToken: string, refreshToken: string) => {
        await tokenStorage.setTokens(accessToken, refreshToken);
        dispatch(setUser(userData));
    }, [dispatch]);

    const logout = useCallback(async () => {
        try {
            await authApi.logout();
        } catch (err) {
            // Silent fail — we're logging out anyway
        }
        await tokenStorage.clearTokens();
        dispatch(logoutAction());
    }, [dispatch]);

    const updateProfile = useCallback((data: Partial<User>) => {
        dispatch(updateUser(data));
    }, [dispatch]);

    const checkAuth = useCallback(async () => {
        dispatch(setLoading(true));
        const hasTokens = await tokenStorage.hasTokens();
        if (!hasTokens) {
            dispatch(setLoading(false));
        }
        // User state is persisted via redux-persist, so if we have tokens, we're good
        dispatch(setLoading(false));
    }, [dispatch]);

    return {
        user,
        isAuthenticated,
        isLoading,
        selectedRole,
        login,
        logout,
        updateProfile,
        checkAuth,
        isUser: user?.role === 'USER',
        isOwner: user?.role === 'VEHICLE_OWNER',
        isAdmin: user?.role === 'ADMIN',
        isPending: user?.status === 'PENDING',
        isBlocked: user?.status === 'BLOCKED',
        isActive: user?.status === 'ACTIVE',
    };
};

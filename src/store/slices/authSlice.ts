import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserRole, UserStatus } from '../../types/auth.types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    selectedRole: UserRole | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    selectedRole: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
        },
        updateUser(state, action: PayloadAction<Partial<User>>) {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        setSelectedRole(state, action: PayloadAction<UserRole>) {
            state.selectedRole = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.selectedRole = null;
        },
    },
});

export const { setUser, updateUser, setSelectedRole, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;

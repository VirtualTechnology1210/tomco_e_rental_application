import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout as logoutAction, updateUser, setLoading } from "../store/slices/authSlice";
import { tokenStorage } from "../utils/tokenStorage";
import { authApi } from "../api/authApi";
const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, selectedRole } = useSelector((state) => state.auth);
  const login = useCallback(async (userData, accessToken, refreshToken) => {
    await tokenStorage.setTokens(accessToken, refreshToken);
    dispatch(setUser(userData));
  }, [dispatch]);
  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (err) {
    }
    await tokenStorage.clearTokens();
    dispatch(logoutAction());
  }, [dispatch]);
  const updateProfile = useCallback((data) => {
    dispatch(updateUser(data));
  }, [dispatch]);
  const checkAuth = useCallback(async () => {
    dispatch(setLoading(true));
    const hasTokens = await tokenStorage.hasTokens();
    if (!hasTokens) {
      dispatch(setLoading(false));
    }
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
    isUser: user?.role === "USER",
    isOwner: user?.role === "VEHICLE_OWNER",
    isAdmin: user?.role === "ADMIN",
    isPending: user?.status === "PENDING",
    isBlocked: user?.status === "BLOCKED",
    isActive: user?.status === "ACTIVE"
  };
};
export {
  useAuth
};

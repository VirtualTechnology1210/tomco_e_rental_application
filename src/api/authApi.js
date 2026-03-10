import axiosInstance from "./axiosInstance";
const authApi = {
  signup: (data) => axiosInstance.post("/auth/signup", data).then((r) => r.data),
  verifyOtp: (data) => axiosInstance.post("/auth/verify-otp", data).then((r) => r.data),
  login: (data) => axiosInstance.post("/auth/login", data).then((r) => r.data),
  refreshToken: (refreshToken) => axiosInstance.post("/auth/refresh-token", { refreshToken }).then((r) => r.data),
  logout: () => axiosInstance.post("/auth/logout").then((r) => r.data),
  forgotPassword: (data) => axiosInstance.post("/auth/forgot-password", data).then((r) => r.data),
  resetPassword: (data) => axiosInstance.post("/auth/reset-password", data).then((r) => r.data)
};
export {
  authApi
};

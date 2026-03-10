import axiosInstance from "./axiosInstance";
const userApi = {
  getProfile: () => axiosInstance.get("/user/profile").then((r) => r.data),
  updateProfile: (data) => axiosInstance.put("/user/profile", data).then((r) => r.data),
  updateFcmToken: (fcm_token) => axiosInstance.put("/user/fcm-token", { fcm_token }).then((r) => r.data)
};
export {
  userApi
};

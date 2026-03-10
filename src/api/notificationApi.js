import axiosInstance from "./axiosInstance";
const notificationApi = {
  getNotifications: (params) => axiosInstance.get("/user/notifications", { params }).then((r) => r.data),
  markAllRead: () => axiosInstance.put("/user/notifications/read").then((r) => r.data)
};
export {
  notificationApi
};

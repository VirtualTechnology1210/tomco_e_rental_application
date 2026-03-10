import axiosInstance from "./axiosInstance";
const bookingApi = {
  // User
  createBooking: (data) => axiosInstance.post("/user/bookings", data).then((r) => r.data),
  getBookings: (params) => axiosInstance.get("/user/bookings", { params }).then((r) => r.data),
  getBookingDetail: (id) => axiosInstance.get(`/user/bookings/${id}`).then((r) => r.data),
  cancelBooking: (id, cancellation_reason) => axiosInstance.put(`/user/bookings/${id}/cancel`, { cancellation_reason }).then((r) => r.data),
  submitReview: (bookingId, data) => axiosInstance.post(`/user/bookings/${bookingId}/review`, data).then((r) => r.data),
  // Owner
  getOwnerBookings: (params) => axiosInstance.get("/owner/bookings", { params }).then((r) => r.data),
  getOwnerBookingDetail: (id) => axiosInstance.get(`/owner/bookings/${id}`).then((r) => r.data),
  acceptBooking: (id) => axiosInstance.put(`/owner/bookings/${id}/accept`).then((r) => r.data),
  rejectBooking: (id, reason) => axiosInstance.put(`/owner/bookings/${id}/reject`, { reason }).then((r) => r.data),
  getEarnings: () => axiosInstance.get("/owner/earnings").then((r) => r.data),
  getDashboard: () => axiosInstance.get("/owner/dashboard").then((r) => r.data)
};
export {
  bookingApi
};

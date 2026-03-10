import axiosInstance from "./axiosInstance";
const vehicleApi = {
  searchVehicles: (params) => axiosInstance.get("/user/vehicles/search", { params }).then((r) => r.data),
  getVehicleDetail: (id) => axiosInstance.get(`/user/vehicles/${id}`).then((r) => r.data),
  // Owner endpoints
  getOwnerVehicles: (params) => axiosInstance.get("/owner/vehicles", { params }).then((r) => r.data),
  getOwnerVehicle: (id) => axiosInstance.get(`/owner/vehicles/${id}`).then((r) => r.data),
  addVehicle: (data) => axiosInstance.post("/owner/vehicles", data).then((r) => r.data),
  updateVehicle: (id, data) => axiosInstance.put(`/owner/vehicles/${id}`, data).then((r) => r.data),
  deleteVehicle: (id) => axiosInstance.delete(`/owner/vehicles/${id}`).then((r) => r.data),
  toggleAvailability: (id) => axiosInstance.put(`/owner/vehicles/${id}/toggle-availability`).then((r) => r.data),
  uploadImages: (id, images) => axiosInstance.post(`/owner/vehicles/${id}/images`, { images }).then((r) => r.data)
};
export {
  vehicleApi
};

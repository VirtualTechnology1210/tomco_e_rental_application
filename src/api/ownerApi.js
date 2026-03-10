import axiosInstance from "./axiosInstance";
const ownerApi = {
  submitProfile: (data) => axiosInstance.post("/owner/profile", data).then((r) => r.data),
  getProfile: () => axiosInstance.get("/owner/profile").then((r) => r.data)
};
export {
  ownerApi
};

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  latitude: null,
  longitude: null,
  cityName: null,
  permissionGranted: false
};
const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      if (action.payload.cityName) {
        state.cityName = action.payload.cityName;
      }
    },
    setCityName(state, action) {
      state.cityName = action.payload;
    },
    setPermission(state, action) {
      state.permissionGranted = action.payload;
    }
  }
});
const { setLocation, setCityName, setPermission } = locationSlice.actions;
var locationSlice_default = locationSlice.reducer;
export {
  locationSlice_default as default,
  setCityName,
  setLocation,
  setPermission
};

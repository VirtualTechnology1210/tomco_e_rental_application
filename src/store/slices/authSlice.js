import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  selectedRole: null
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    updateUser(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setSelectedRole(state, action) {
      state.selectedRole = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.selectedRole = null;
    }
  }
});
const { setUser, updateUser, setSelectedRole, setLoading, logout } = authSlice.actions;
var authSlice_default = authSlice.reducer;
export {
  authSlice_default as default,
  logout,
  setLoading,
  setSelectedRole,
  setUser,
  updateUser
};

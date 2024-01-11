import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token,
    refreshToken: refreshToken
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      // state.refreshToken = action.payload.refreshToken
    },
    removeToken: (state, action) => {
      state.token = null;
      // state.refreshToken = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;

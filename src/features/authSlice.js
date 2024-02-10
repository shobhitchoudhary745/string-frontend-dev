import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");
const email = localStorage.getItem("email");
const mobile = localStorage.getItem("mobile");
const profile = localStorage.getItem("profile");
const name = localStorage.getItem("name");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token,
    refreshToken: refreshToken,
    name: name,
    email: email,
    mobile: mobile,
    profile: profile,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.mobile = action.payload.mobile;
      state.profile = action.payload.profile;
      // state.refreshToken = action.payload.refreshToken
    },
    removeToken: (state, action) => {
      state.token = null;
      state.email = null;
      state.name = null;
      state.mobile = null;
      state.profile = null;
      // state.refreshToken = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;

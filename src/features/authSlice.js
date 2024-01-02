import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("token");
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    removeToken: (state, action) => {
      state.token = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;

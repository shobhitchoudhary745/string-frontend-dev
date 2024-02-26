import { createSlice } from "@reduxjs/toolkit";

const carouselSlice = createSlice({
  name: "carousel",
  initialState: {
    carousels: [],
  },
  reducers: {
    setCarousels: (state, action) => {
      state.carousels = action.payload.carousels;
    },
  },
});

export const { setCarousels } = carouselSlice.actions;
export default carouselSlice.reducer;

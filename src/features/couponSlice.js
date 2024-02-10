import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    coupons: [],
    coupon: {},
  },
  reducers: {
    setCoupons: (state, action) => {
      state.coupons = action.payload.coupons;
    },
    setCoupon: (state, action) => {
      state.coupon = action.payload.coupon;
    },
  },
});

export const { setCoupons, setCoupon } = couponSlice.actions;
export default couponSlice.reducer;

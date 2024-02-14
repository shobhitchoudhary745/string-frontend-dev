import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    homeData: {
      Users: 0,
      Videos: 0,
      Language: 0,
      Category: 0,
      Genres: 0,
      Transaction: 0,
      "Daily Revenue": 10132,
      "Weekly Revenue": 68936,
      "Monthly Revenue": 279035,
      "Yearly Revenue": 876345,
    },
  },
  reducers: {
    setHomeData: (state, action) => {
      state.homeData = { ...state.homeData, ...action.payload.homeData };
    },
  },
});

export const { setHomeData } = homeSlice.actions;
export default homeSlice.reducer;

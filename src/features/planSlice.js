import { createSlice } from "@reduxjs/toolkit";

const planSlice = createSlice({
  name: "plan",
  initialState: {
    plans: [],
    planCount: 0,
    filteredPlans: 0,
  },
  reducers: {
    setPlans: (state, action) => {
      state.plans = action.payload.plans;
      state.planCount = action.payload.planCount;
      state.filteredPlans = action.payload.filteredPlans;
    },
  },
});

export const { setPlans } = planSlice.actions;
export default planSlice.reducer;

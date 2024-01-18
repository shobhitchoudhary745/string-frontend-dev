import { createSlice } from "@reduxjs/toolkit";

const planSlice = createSlice({
  name: "plan",
  initialState: {
    plans: [],
    plan: {},
  },
  reducers: {
    setPlans: (state, action) => {
      state.plans = action.payload.plans;
    },
    setPlan: (state, action) => {
      state.plan = action.payload.plan;
    },
  },
});

export const { setPlans, setPlan } = planSlice.actions;
export default planSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const planSlice = createSlice({
  name: "plan",
  initialState: {
    plans: [],
  },
  reducers: {
    setPlans: (state, action) => {
      state.plans = action.payload.plans;
    },
  },
});

export const { setPlans } = planSlice.actions;
export default planSlice.reducer;

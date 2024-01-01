import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    isOpen:false,
    currentPage:"Dashboard"
  },
  reducers: {
    toggle: (state, action) => {
      state.isOpen = !state.isOpen;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.currentPage
    }
  },
});

export const { toggle, setCurrentPage } =
  generalSlice.actions;
export default generalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    isOpen: false,
    currentPage: "Dashboard",
    loading: false,
  },
  reducers: {
    toggle: (state, action) => {
      state.isOpen = !state.isOpen;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.currentPage;
    },
    setLoading: (state, action) => {
      state.loading = !state.loading;
    },
  },
});

export const { toggle, setCurrentPage, setLoading } = generalSlice.actions;
export default generalSlice.reducer;

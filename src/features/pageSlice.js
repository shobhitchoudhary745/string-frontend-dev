import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    pages: [],
    page: {},
  },
  reducers: {
    setPages: (state, action) => {
      state.pages = action.payload.pages;
    },
    setPage: (state, action) => {
      state.page = action.payload.page;
    },
  },
});

export const { setPages, setPage } = pageSlice.actions;
export default pageSlice.reducer;

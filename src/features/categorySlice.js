import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    category: {},
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload.categories;
    },
    setCategory: (state, action) => {
      state.category = action.payload.category;
    },
  },
});

export const { setCategories, setCategory } = categorySlice.actions;
export default categorySlice.reducer;

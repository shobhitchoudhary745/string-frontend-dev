import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    category: {},
    category_videos: {},
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload.categories;
    },
    setCategory: (state, action) => {
      state.category = action.payload.category;
    },
    setCategory_videos: (state, action) => {
      state.category_videos = action.payload.category_videos;
    },
  },
});

export const { setCategories, setCategory, setCategory_videos } =
  categorySlice.actions;
export default categorySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    abouts: [],
    about: {},
  },
  reducers: {
    setAbouts: (state, action) => {
      state.abouts = action.payload.abouts;
    },
    setAbout: (state, action) => {
      state.about = action.payload.about;
    },
  },
});

export const { setAbouts, setAbout } = aboutSlice.actions;
export default aboutSlice.reducer;

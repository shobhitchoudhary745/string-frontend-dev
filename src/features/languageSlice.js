import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    languages: [],
    language: {},
  },
  reducers: {
    setLanguages: (state, action) => {
      state.languages = action.payload.languages;
    },
    setLanguage: (state, action) => {
      state.language = action.payload.language;
    },
  },
});

export const { setLanguages, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

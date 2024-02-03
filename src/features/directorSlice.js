import { createSlice } from "@reduxjs/toolkit";

const directorSlice = createSlice({
  name: "director",
  initialState: {
    directors: [],
    director: {},
  },
  reducers: {
    setDirectors: (state, action) => {
      state.directors = action.payload.directors;
    },
    setDirector: (state, action) => {
      state.director = action.payload.director;
    },
  },
});

export const { setDirectors, setDirector } = directorSlice.actions;
export default directorSlice.reducer;

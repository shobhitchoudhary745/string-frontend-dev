import { createSlice } from "@reduxjs/toolkit";

const genreSlice = createSlice({
  name: "genre",
  initialState: {
    genres: [],
    genre: {},
  },
  reducers: {
    setGenres: (state, action) => {
      state.genres = action.payload.genres;
    },
    setGenre: (state, action) => {
      state.genre = action.payload.genre;
    },
  },
});

export const { setGenres, setGenre } = genreSlice.actions;
export default genreSlice.reducer;

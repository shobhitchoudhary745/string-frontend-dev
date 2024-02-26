import { createSlice } from "@reduxjs/toolkit";

const trailerSlice = createSlice({
  name: "trailer",
  initialState: {
    trailers: [],
  },
  reducers: {
    setTrailers: (state, action) => {
      state.trailers = action.payload.trailers;
    },
  },
});

export const { setTrailers } = trailerSlice.actions;
export default trailerSlice.reducer;

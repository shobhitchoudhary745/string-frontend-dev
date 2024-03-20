import { createSlice } from "@reduxjs/toolkit";

const trailerSlice = createSlice({
  name: "trailer",
  initialState: {
    trailers: [],
    videos: [],
    totalVideoCount: 0,
  },
  reducers: {
    setTrailers: (state, action) => {
      state.trailers = action.payload.trailers;
    },
    setTrailersVideo: (state, action) => {
      state.videos = action.payload.videos;
      state.totalVideoCount = action.payload.totalVideoCount;
    },
  },
});

export const { setTrailers, setTrailersVideo } = trailerSlice.actions;
export default trailerSlice.reducer;

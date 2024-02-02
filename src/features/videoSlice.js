import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videos: [],
    video: {},
  },
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload.videos;
    },
    setVideo: (state, action) => {
      state.video = action.payload.video;
    },
  },
});

export const { setVideos, setVideo } = videoSlice.actions;
export default videoSlice.reducer;

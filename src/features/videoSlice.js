import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videos: [],
    totalVideoCount: 0,
    video: {},
    videos_category: [],
  },
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload.videos;
      state.totalVideoCount = action.payload.totalVideoCount;
    },
    setVideo: (state, action) => {
      state.video = action.payload.video;
    },
    setCategoryVideos: (state, action) => {
      state.videos_category = action.payload.videos_category;
    },
  },
});

export const { setVideos, setVideo, setCategoryVideos } = videoSlice.actions;
export default videoSlice.reducer;

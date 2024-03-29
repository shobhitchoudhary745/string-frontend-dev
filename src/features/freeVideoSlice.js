import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "free_video",
  initialState: {
    videos: [],
    totalVideoCount: 0,
    video: {},
    videos_category: [],
  },
  reducers: {
    setFreeVideos: (state, action) => {
      state.videos = action.payload.videos;
      state.totalVideoCount = action.payload.totalVideoCount;
    },
    setFreeVideo: (state, action) => {
      state.video = action.payload.video;
    },
    setCategoryVideos: (state, action) => {
      state.videos_category = action.payload.videos_category;
    },
  },
});

export const { setFreeVideos, setFreeVideo, setCategoryVideos } = videoSlice.actions;
export default videoSlice.reducer;

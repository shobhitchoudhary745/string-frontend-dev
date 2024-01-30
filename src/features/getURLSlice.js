import { createSlice } from "@reduxjs/toolkit";

const getURLSlice = createSlice({
  name: "url",
  initialState: {
    url: "",
    imageName:""
  },
  reducers: {
    setURL: (state, action) => {
      state.url = action.payload.url;
      state.imageName = action.payload.imageName;
    },
  },
});

export const { setURL } = getURLSlice.actions;
export default getURLSlice.reducer;

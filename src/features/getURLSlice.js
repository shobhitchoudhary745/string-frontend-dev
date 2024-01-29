import { createSlice } from "@reduxjs/toolkit";

const getURLSlice = createSlice({
  name: "url",
  initialState: {
    url: "",
  },
  reducers: {
    setURL: (state, action) => {
      state.url = action.payload.url;
    },
  },
});

export const { setURL } = getURLSlice.actions;
export default getURLSlice.reducer;

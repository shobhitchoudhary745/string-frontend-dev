import { createSlice } from "@reduxjs/toolkit";

const querySlice = createSlice({
  name: "query",
  initialState: {
    queries: [],
    totalQueryCount: 0,
    query: {},
  },
  reducers: {
    setQueries: (state, action) => {
      state.queries = action.payload.queries;
      state.totalQueryCount = action.payload.totalQueryCount;
    },
    setQuery: (state, action) => {
      state.query = action.payload.query;
    },
  },
});

export const { setQueries, setQuery } = querySlice.actions;
export default querySlice.reducer;

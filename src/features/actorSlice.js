import { createSlice } from "@reduxjs/toolkit";

const actorSlice = createSlice({
  name: "actor",
  initialState: {
    actors: [],
    actor: {},
  },
  reducers: {
    setActors: (state, action) => {
      state.actors = action.payload.actors;
    },
    setActor: (state, action) => {
      state.actor = action.payload.actor;
    },
  },
});

export const { setActors, setActor } = actorSlice.actions;
export default actorSlice.reducer;

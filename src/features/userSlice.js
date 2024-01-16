import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users:[],
    userCount:0,
    filteredUsers:0
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.users;
      state.userCount = action.payload.userCount;
      state.filteredUsers = action.payload.filteredUsers;
    }
  },
});

export const { setUsers } =
  userSlice.actions;
export default userSlice.reducer;

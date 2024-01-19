import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    userCount: 0,
    filteredUsers: 0,
    user:{}
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.users;
      state.userCount = action.payload.userCount;
      state.filteredUsers = action.payload.filteredUsers;
    },
    setUser:(state,action) => {
      state.user = action.payload.user;
    }
  },
});

export const { setUsers,setUser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const deletedUserSlice = createSlice({
  name: "deleted_user",
  initialState: {
    deletedUsers: [],
    deleteduserCount: 0,
    filterDeletedUsers: 0,
  },
  reducers: {
    setDeletedUsers: (state, action) => {
      state.deletedUsers = action.payload.deletedUser;
      state.deleteduserCount = action.payload.deletedUserCount;
      state.filterDeletedUsers = action.payload.filteredDeletedUsers;
    },
  },
});

export const { setDeletedUsers } = deletedUserSlice.actions;
export default deletedUserSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contacts: [],
    contact: {},
  },
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload.contacts;
    },
    setContact: (state, action) => {
      state.contact = action.payload.contact;
    },
  },
});

export const { setContacts, setContact } = contactSlice.actions;
export default contactSlice.reducer;

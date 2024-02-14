import { createSlice } from "@reduxjs/toolkit";

const faqSlice = createSlice({
  name: "faq",
  initialState: {
    faqs: [],
    faq: {},
  },
  reducers: {
    setFaqs: (state, action) => {
      state.faqs = action.payload.faqs;
    },
    setFaq: (state, action) => {
      state.faq = action.payload.faq;
    },
  },
});

export const { setFaqs, setFaq } = faqSlice.actions;
export default faqSlice.reducer;

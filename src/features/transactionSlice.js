import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions:[],
    transactionCount:0,
    filteredTransactions:0
  },
  reducers: {
    setTransactions: (state, action) => {
      console.log(action)
      state.transactions = action.payload.transactions;
      state.transactionCount = action.payload.transactionCount;
      state.filteredTransactions = action.payload.filteredTransactions;
    }
  },
});

export const { setTransactions } =
  transactionSlice.actions;
export default transactionSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import generalReducer from './generalSlice';
import authSlice from './authSlice';
import userSlice from './userSlice';
import transactionSlice from './transactionSlice';
import planSlice from './planSlice';
import languageSlice from './languageSlice';
export default configureStore({
  reducer: {
    general: generalReducer,
    auth: authSlice,
    user: userSlice,
    transaction:transactionSlice,
    plan:planSlice,
    language:languageSlice
  },
});

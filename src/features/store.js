import { configureStore } from '@reduxjs/toolkit';
import generalReducer from './generalSlice';
import authSlice from './authSlice';
export default configureStore({
  reducer: {
    general: generalReducer,
    auth: authSlice
  },
});

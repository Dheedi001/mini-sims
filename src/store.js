import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './studentSlice';
import financeReducer from './financeSlice'; // ADDED THIS
import authReducer from './authSlice'; // ADDED THIS

export const store = configureStore({
  reducer: {
    students: studentReducer,
    finance: financeReducer, // ADDED THIS
    auth: authReducer, // ADDED THIS
  },
});
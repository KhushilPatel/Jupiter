import { configureStore } from '@reduxjs/toolkit';
import checkboxReducer from './checkboxDataSlice';

export const store = configureStore({
  reducer: {
    checkbox: checkboxReducer,
   
 
  },
});


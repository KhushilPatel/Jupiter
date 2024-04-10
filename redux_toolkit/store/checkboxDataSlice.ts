// checkboxDataSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const checkboxDataSlice = createSlice({
  name: 'checkboxData',
  initialState: {
    selectedCheckboxData: [],
    isChecked: {}
  },
  reducers: {
    addSelectedCheckboxData: (state:any, action:any) => {
      state.selectedCheckboxData.push(action.payload);
    },
    removeSelectedCheckboxData: (state, action) => {
      state.selectedCheckboxData = state.selectedCheckboxData.filter((item:any) => item.moduleName !== action.payload.moduleName);
    },
    clearSelectedCheckboxData: (state) => {
      state.selectedCheckboxData = [];
    },
    setisChecked: (state:any, action) => {
      const {key,value}=action.payload;
      state.isChecked[key] = value;
    },
    
  },
});

export const { addSelectedCheckboxData, removeSelectedCheckboxData, clearSelectedCheckboxData ,setisChecked } = checkboxDataSlice.actions;

export default checkboxDataSlice.reducer;

// checkboxDataSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const checkboxDataSlice = createSlice({
  name: 'checkboxData',
  initialState: {
    checkboxData: [],
    selectedCheckboxData: [],
    isChecked: {}
  },
  reducers: {
    setCheckboxData(state, action) {
    state.checkboxData = action.payload;
  },
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

export const {setCheckboxData, addSelectedCheckboxData, removeSelectedCheckboxData, clearSelectedCheckboxData ,setisChecked } = checkboxDataSlice.actions;

export default checkboxDataSlice.reducer;

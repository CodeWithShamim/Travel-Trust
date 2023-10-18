import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  search: {},
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    addSearchData: (state, { payload }) => {
      state.search = payload;
    },
    removesSearchData: (state) => {
      state.search = {};
    },
  },
});

export const { addSearchData, removesSearchData } = serviceSlice.actions;

export default serviceSlice.reducer;

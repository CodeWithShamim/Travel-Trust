import { IUser } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  data: {},
  search: {},
  cart: [],
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
    addServiceToCart: (state, { payload }) => {
      const isExits = state.cart?.filter((c: any) => c.id === payload?.id);
      if (isExits?.length === 0) {
        state.cart.push(payload);
      }
    },
  },
});

export const { addSearchData, removesSearchData, addServiceToCart } =
  serviceSlice.actions;

export default serviceSlice.reducer;

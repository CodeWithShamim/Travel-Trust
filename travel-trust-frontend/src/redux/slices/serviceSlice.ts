import { cartKey } from "@/constants/storageKey";
import { IService, IUser } from "@/types";
import { setValueToLocalStorage } from "@/utils/local-storage";
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
      const isExits = state.cart?.some((c: IService) => c.id === payload?.id);
      if (!isExits) {
        setValueToLocalStorage(
          cartKey,
          JSON.stringify([...state.cart, payload])
        );

        state.cart.push(payload);
      } else {
        const withoutExistService = state.cart?.filter(
          (c: IService) => c.id !== payload?.id
        );

        state.cart = withoutExistService;

        setValueToLocalStorage(cartKey, JSON.stringify(withoutExistService));
      }
    },
    addAllServiceToCart: (state, { payload }) => {
      state.cart = payload;
    },
  },
});

export const {
  addSearchData,
  removesSearchData,
  addServiceToCart,
  addAllServiceToCart,
} = serviceSlice.actions;

export default serviceSlice.reducer;

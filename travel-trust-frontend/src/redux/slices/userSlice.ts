import { IUser } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUser | { data: {}; isLoading: boolean } = {
  data: {},
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.data = payload;
    },
    removeUserData: (state) => {
      state.data = {};
    },
    setUserLoading: (state, {payload}) => {
      state.isLoading = payload;
    },
  },
});

export const { setUserData, removeUserData, setUserLoading } =
  userSlice.actions;

export default userSlice.reducer;

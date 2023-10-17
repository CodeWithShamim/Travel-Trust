import { IUser } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUser | { data: {} } = {
  data: {},
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
  },
});

export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;

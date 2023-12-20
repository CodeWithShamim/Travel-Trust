import { createSlice } from "@reduxjs/toolkit";

const initialState: { dictionaries: string } = {
  dictionaries: "",
};

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setDictionaries: (state, { payload }) => {
      state.dictionaries = payload;
    },
  },
});

export const { setDictionaries } = i18nSlice.actions;

export default i18nSlice.reducer;

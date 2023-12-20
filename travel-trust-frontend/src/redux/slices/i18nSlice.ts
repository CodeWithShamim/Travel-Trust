import { ILanguage } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface IStateProps {
  dictionaries: any;
  lang: ILanguage;
}

const initialState: IStateProps = {
  dictionaries: "",
  lang: "en",
};

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setDictionaries: (state, { payload }) => {
      state.dictionaries = payload;
    },
    setLanguage: (state, { payload }) => {
      state.lang = payload;
    },
  },
});

export const { setDictionaries, setLanguage } = i18nSlice.actions;

export default i18nSlice.reducer;

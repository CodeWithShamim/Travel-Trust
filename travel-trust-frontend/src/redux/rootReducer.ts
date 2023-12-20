import { baseApi } from "./api/baseApi";
import serviceReducer from "./slices/serviceSlice";
import userReducer from "./slices/userSlice";
import i18nReducer from "./slices/i18nSlice";

export const reducer = {
  user: userReducer,
  service: serviceReducer,
  i18n: i18nReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};

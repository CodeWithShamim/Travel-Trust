import { baseApi } from "./api/baseApi";
import userReducer from "./slices/userSlice";

export const reducer = {
  user: userReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};

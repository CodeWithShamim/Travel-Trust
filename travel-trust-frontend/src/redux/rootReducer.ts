import { baseApi } from "./api/baseApi";
import serviceReducer from "./slices/serviceSlice";
import userReducer from "./slices/userSlice";

export const reducer = {
  user: userReducer,
  service: serviceReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};

import { authKey } from "@/constants/storageKey";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getValueFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

instance.interceptors.request.use(
  (config) => {
    const accessToken = getValueFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const responseObject: any = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  (error) => {
    const responseObject: IGenericErrorResponse = {
      success: error?.response?.data?.success,
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong",
      errorMessages: error?.response?.data?.message,
    };
    return responseObject;
  }
);

export { instance };

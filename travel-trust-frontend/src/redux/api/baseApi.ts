import { backendURL } from "@/constants/url";
import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: backendURL }),
  endpoints: () => ({}),
  tagTypes: ["user", "service", "booking", "review", "notification", "message"],
});

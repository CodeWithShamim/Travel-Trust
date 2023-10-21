import { baseURL } from "@/constants/url";
import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: baseURL }),
  endpoints: () => ({}),
  tagTypes: ["user", "booking", "review"],
});

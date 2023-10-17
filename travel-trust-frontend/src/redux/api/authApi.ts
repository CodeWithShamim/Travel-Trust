import { baseApi } from "./baseApi";

const REGISTER_URL = "/user";
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (data: any) => ({
        url: `${REGISTER_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["user"],
    }),
    login: build.mutation({
      query: (data: any) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

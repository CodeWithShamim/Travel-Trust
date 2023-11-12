import Register from "@/views/Register";
import { baseApi } from "./baseApi";

const USER_URL = "/user";
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (data: any) => ({
        url: `${USER_URL}`,
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
    getUserById: build.query({
      query: (id: string) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUser: build.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/${data?.id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = authApi;

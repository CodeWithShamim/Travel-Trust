import Register from "@/views/Register";
import { baseApi } from "./baseApi";
import { IMeta, IUser } from "@/types";

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
    getAllUser: build.query({
      query: (filtersData: any) => ({
        url: `${USER_URL}/`,
        method: "GET",
        params: filtersData,
      }),
      transformResponse: (response: IUser[], meta: IMeta) => {
        return {
          users: response,
          meta,
        };
      },
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
    deleteSingleUser: build.mutation({
      query: (id: string) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    createUserToAdmin: build.mutation({
      query: (id: string) => ({
        url: `${USER_URL}/user-to-admin`,
        method: "POST",
        data: { id },
      }),
      invalidatesTags: ["user"],
    }),
    createAdminToSuperAdmin: build.mutation({
      query: (id: string) => ({
        url: `${USER_URL}/admin-to-super-admin`,
        method: "POST",
        data: { id },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserByIdQuery,
  useGetAllUserQuery,
  useUpdateUserMutation,
  useDeleteSingleUserMutation,
  useCreateUserToAdminMutation,
  useCreateAdminToSuperAdminMutation,
} = authApi;

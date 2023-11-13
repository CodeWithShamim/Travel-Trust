import { IMeta, IService } from "@/types";
import { baseApi } from "./baseApi";

const SERVICE_URL = "/service";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createService: build.mutation({
      query: (data: IService) => ({
        url: `${SERVICE_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["service"],
    }),
    getAllService: build.query({
      query: (filtersData: any) => ({
        url: `${SERVICE_URL}?${filtersData}`,
        method: "GET",
        params: filtersData,
      }),
      transformResponse: (data: IService, meta: IMeta) => {
        return {
          services: data,
          meta,
        };
      },
      providesTags: ["service"],
    }),
    getSingleService: build.query({
      query: (id: string) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),
    deleteSingleService: build.mutation({
      query: (id: string) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServiceQuery,
  useGetSingleServiceQuery,
  useDeleteSingleServiceMutation,
} = serviceApi;

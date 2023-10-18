import { IService } from "@/types";
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
    }),
    getAllService: build.query({
      query: (filtersData: any) => ({
        url: `${SERVICE_URL}?${filtersData}`,
        method: "GET",
      }),
    }),
    getSingleService: build.query({
      query: (id: string) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServiceQuery,
  useGetSingleServiceQuery,
} = serviceApi;

import { IMessage, IMeta } from "@/types";
import { baseApi } from "./baseApi";

const MESSAGE_URL = "/message";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMessage: build.query({
      query: (filterData: any) => ({
        url: `${MESSAGE_URL}`,
        method: "GET",
        params: filterData,
      }),
      transformResponse: (response: IMessage[], meta: IMeta) => {
        return {
          messages: response,
          meta,
        };
      },
      providesTags: ["message"],
    }),
  }),
});

export const { useGetAllMessageQuery } = messageApi;

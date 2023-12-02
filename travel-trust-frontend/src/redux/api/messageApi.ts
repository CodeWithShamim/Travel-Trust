import { IMessage, IMeta } from "@/types";
import { baseApi } from "./baseApi";

const MESSAGE_URL = "/message";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMessage: build.query({
      query: () => ({
        url: `${MESSAGE_URL}`,
        method: "GET",
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

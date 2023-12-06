import { INotification, IMeta } from "@/types";
import { baseApi } from "./baseApi";

const NOTIFICATION_URL = "/notification";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllNotification: build.query({
      query: (filterData: any) => ({
        url: `${NOTIFICATION_URL}`,
        method: "GET",
        params: filterData,
      }),
      transformResponse: (response: INotification[], meta: IMeta) => {
        return {
          notifications: response,
          meta,
        };
      },
      providesTags: ["notification"],
    }),
  }),
});

export const { useGetAllNotificationQuery } = notificationApi;

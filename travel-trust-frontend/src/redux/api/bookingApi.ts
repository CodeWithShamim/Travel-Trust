import { IBooking, IMeta } from "@/types";
import { baseApi } from "./baseApi";

const BOOKING_URL = "/booking";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createbooking: build.mutation({
      query: (data: IBooking) => ({
        url: `${BOOKING_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["booking"],
    }),
    getAllBooking: build.query({
      query: (filtersData: any) => ({
        url: `${BOOKING_URL}`,
        method: "GET",
        params: filtersData,
      }),
      transformResponse: (response: IBooking[], meta: IMeta) => {
        return {
          bookings: response,
          meta,
        };
      },
      providesTags: ["booking"],
    }),
    updateStatuses: build.mutation({
      query: (data: { statuses: { id: string; value: string }[] }) => ({
        url: `${BOOKING_URL}/update-statuses`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["booking"],
    }),

    deleteSingleBooking: build.mutation({
      query: (id: string) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useCreatebookingMutation,
  useGetAllBookingQuery,
  useUpdateStatusesMutation,
  useDeleteSingleBookingMutation,
} = bookingApi;

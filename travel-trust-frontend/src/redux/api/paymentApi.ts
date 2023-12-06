import { IPayment, IMeta } from "@/types";
import { baseApi } from "./baseApi";

const PAYMENT_URL = "/payment";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPaymentIntent: build.mutation({
      query: (data: IPayment) => ({
        url: `${PAYMENT_URL}/create-payment-intent`,
        method: "POST",
        data,
      }),
    }),
    getAllPayment: build.query({
      query: (filtersData: any) => ({
        url: `${PAYMENT_URL}`,
        method: "GET",
        params: filtersData,
      }),
      transformResponse: (response: IPayment[], meta: IMeta) => {
        return {
          payments: response,
          meta,
        };
      },
    }),
    updatePayment: build.mutation({
      query: (data: Partial<IPayment>) => ({
        url: `${PAYMENT_URL}/${data?.id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["booking"],
    }),
    deleteSinglePayment: build.mutation({
      query: (id: string) => ({
        url: `${PAYMENT_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useGetAllPaymentQuery,
  useUpdatePaymentMutation,
  useDeleteSinglePaymentMutation,
} = paymentApi;

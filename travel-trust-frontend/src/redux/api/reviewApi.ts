import { IReview, IMeta } from "@/types";
import { baseApi } from "./baseApi";

const REVIEW_URL = "/review";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReview: build.mutation({
      query: (data: IReview) => ({
        url: `${REVIEW_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["review"],
    }),
    getAllReview: build.query({
      query: (filtersData: any) => ({
        url: `${REVIEW_URL}`,
        method: "GET",
        params: filtersData,
      }),
      providesTags: ["review"],
    }),
    deleteSingleReview: build.mutation({
      query: (id: string) => ({
        url: `${REVIEW_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetAllReviewQuery,
  useDeleteSingleReviewMutation,
} = reviewApi;

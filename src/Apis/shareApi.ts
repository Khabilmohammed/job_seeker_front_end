import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";

const shareApi = createApi({
  reducerPath: "shareApi",
  baseQuery: createBaseQuery(), 
  endpoints: (builder) => ({
    sharePost: builder.mutation({
      query: (shareData) => ({
        url: "Share",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: shareData,
      }),
    }),
    getUserShares: builder.query({
      query: (userId) => ({
        url: `Share/UserShares/${userId}`,
        method: "GET",
      }),
    }),
    getShareById: builder.query({
      query: (id) => ({
        url: `Share/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSharePostMutation,
  useGetUserSharesQuery,
  useGetShareByIdQuery,
} = shareApi;

export default shareApi;

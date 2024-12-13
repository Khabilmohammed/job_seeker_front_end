import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";

const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    initialPayment: builder.mutation({
      query: (userId: string) => ({
        url: `payment/makepayment`, // Ensure your backend route is `/api/payment/makepayment`
        method: "POST",
        params: { userId },
      }),
    }),
  }),
});

export const { useInitialPaymentMutation } = paymentApi;

export default paymentApi;

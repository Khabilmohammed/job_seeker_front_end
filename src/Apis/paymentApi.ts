import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";
import { PAYMENT_API_ENDPOINTS } from "./baseApiConfig/apiEndpoints";

const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    initialPayment: builder.mutation({
      query: (userId: string) => ({
        url: PAYMENT_API_ENDPOINTS.INITIAL_PAYMENT, // Ensure your backend route is `/api/payment/makepayment`
        method: "POST",
        params: { userId },
      }),
    }),
  }),
});

export const { useInitialPaymentMutation } = paymentApi;

export default paymentApi;

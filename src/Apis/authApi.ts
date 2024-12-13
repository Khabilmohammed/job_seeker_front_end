import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: "auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userCredentials,
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "auth/validate-otp",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { email, otp },
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "auth/forgot-password",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { email },
      }),
    }),
    resendOtpRegistration: builder.mutation({
      query: (email) => ({
        url: "auth/registration-resend-otp",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        params: { email }, // Use `params` for query string
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ email, token, newPassword }) => ({
        url: "auth/reset-password",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { email, token, newPassword },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useVerifyOtpMutation,
  useForgetPasswordMutation,  
  useResetPasswordMutation,   
  useLogoutUserMutation,
  useResendOtpRegistrationMutation,
} = authApi;

export default authApi;

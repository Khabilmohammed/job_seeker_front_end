import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";
import { AUTH_API_ENDPOINTS } from "./baseApiConfig/apiEndpoints";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: AUTH_API_ENDPOINTS.REGISTER,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: AUTH_API_ENDPOINTS.LOGIN,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userCredentials,
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: AUTH_API_ENDPOINTS.VALIDATE_OTP,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { email, otp },
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url:  AUTH_API_ENDPOINTS.LOGOUT,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: AUTH_API_ENDPOINTS.FORGOT_PASSWORD,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { email },
      }),
    }),
    resendOtpRegistration: builder.mutation({
      query: (email) => ({
        url:  AUTH_API_ENDPOINTS.RESEND_OTP,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        params: { email }, // Use `params` for query string
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ email, token, newPassword }) => ({
        url: AUTH_API_ENDPOINTS.RESET_PASSWORD,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { email, token, newPassword },
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url:AUTH_API_ENDPOINTS.REFRESH_TOKEN,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { refreshToken },
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
  useRefreshTokenMutation,
} = authApi;

export default authApi;

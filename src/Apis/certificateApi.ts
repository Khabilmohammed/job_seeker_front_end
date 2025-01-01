import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";
import { CERTIFICATE_API_ENDPOINTS } from "./baseApiConfig/apiEndpoints";

const certificateApi = createApi({
  reducerPath: "certificateApi",
  baseQuery: createBaseQuery(), 
  endpoints: (builder) => ({
    getCertificateById: builder.query({
      query: (id) => ({
        url: `${CERTIFICATE_API_ENDPOINTS.GET_BY_ID}/${id}`,
        method: "GET",
      }),
    }),
    getCertificatesByUser: builder.query({
      query: (userId) => ({
        url: `${CERTIFICATE_API_ENDPOINTS.GET_BY_USER}/${userId}`,
        method: "GET",
      }),
    }),
    createCertificate: builder.mutation({
      query: ({ formData, userId }) => ({
        url: CERTIFICATE_API_ENDPOINTS.CREATE,
        method: "POST",
        body: formData,
        params: { userId },
      }),
    }),
    deleteCertificate: builder.mutation({
      query: ({ id, userId }) => ({
        url:  `${CERTIFICATE_API_ENDPOINTS.DELETE}/${id}`,
        method: "DELETE",
        headers: { userId },
      }),
    }),
  }),
});

export const {
  useGetCertificateByIdQuery,
  useGetCertificatesByUserQuery,
  useCreateCertificateMutation,
  useDeleteCertificateMutation
} = certificateApi;

export default certificateApi;

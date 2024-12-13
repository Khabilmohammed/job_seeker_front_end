import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";

const certificateApi = createApi({
  reducerPath: "certificateApi",
  baseQuery: createBaseQuery(), 
  endpoints: (builder) => ({
    getCertificateById: builder.query({
      query: (id) => ({
        url: `/Certificate/${id}`,
        method: "GET",
      }),
    }),
    getCertificatesByUser: builder.query({
      query: (userId) => ({
        url: `/Certificate/user/${userId}`,
        method: "GET",
      }),
    }),
    createCertificate: builder.mutation({
      query: ({ formData, userId }) => ({
        url: `/Certificate`,
        method: "POST",
        body: formData,
        params: { userId },
      }),
    }),
    deleteCertificate: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/Certificate/${id}`,
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

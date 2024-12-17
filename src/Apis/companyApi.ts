import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";

const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getCompanyById: builder.query({
      query: (id) => `Company/${id}`,
    }),
    getCompanyByUserId: builder.query({
      query: (userId) => `Company/user/${userId}`,
    }),
    createCompany: builder.mutation({
      query: (companyData) => ({
        url: "Company/create",
        method: "POST",
        body: companyData,
      }),
    }),
    updateCompany: builder.mutation({
      query: ({ id, companyData }) => ({
        url: `Company/${id}`,
        method: "PUT",
        body: companyData,
        headers: {
          // Content-Type is automatically set to 'multipart/form-data' for FormData
        },
      }),
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCompanyByIdQuery,
  useGetCompanyByUserIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;

export default companyApi;

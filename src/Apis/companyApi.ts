import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5134/api/Company",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCompanyById: builder.query({
      query: (id) => `${id}`,
    }),
    getCompanyByUserId: builder.query({
      query: (userId) => `user/${userId}`,
    }),
    createCompany: builder.mutation({
      query: (companyData) => ({
        url: "create",
        method: "POST",
        body: companyData,
      }),
    }),
    updateCompany: builder.mutation({
      query: ({ id, companyData }) => ({
        url: `${id}`,
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

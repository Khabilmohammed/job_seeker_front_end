import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";
import { COMPANY_API_ENDPOINTS } from "./baseApiConfig/apiEndpoints";

const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getCompanyById: builder.query({
      query: (id) => `${COMPANY_API_ENDPOINTS.GET_COMPANY_BY_ID}/${id}`,
    }),
    getCompanyByUserId: builder.query({
      query: (userId) => `${COMPANY_API_ENDPOINTS.GET_COMPANY_BY_USER_ID}/${userId}`,
    }),
    createCompany: builder.mutation({
      query: (companyData) => ({
        url: COMPANY_API_ENDPOINTS.CREATE_COMPANY,
        method: "POST",
        body: companyData,
      }),
    }),
    updateCompany: builder.mutation({
      query: ({ id, companyData }) => ({
        url: `${COMPANY_API_ENDPOINTS.UPDATE_COMPANY}/${id}`,
        method: "PUT",
        body: companyData,
        headers: {
          // Content-Type is automatically set to 'multipart/form-data' for FormData
        },
      }),
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `${COMPANY_API_ENDPOINTS.DELETE_COMPANY}/${id}`,
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

import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";
import { EDUCATION_API_ENDPOINTS } from "./baseApiConfig/apiEndpoints";

const educationApi = createApi({
  reducerPath: "educationApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getEducationById: builder.query({
      query: (id) => EDUCATION_API_ENDPOINTS.GET_BY_ID(id), 
    }),
    getEducationsByUser: builder.query({
      query: (userId) => EDUCATION_API_ENDPOINTS.GET_BY_USER(userId),
    }),
    createEducation: builder.mutation({
      query: ({ formData, userId }) => ({
        url:  EDUCATION_API_ENDPOINTS.CREATE,
        method: "POST",
        body: formData,
        headers: { UserId: userId },
      }),
    }),
    updateEducation: builder.mutation({
      query: ({ id, formData }) => ({
        url: EDUCATION_API_ENDPOINTS.UPDATE(id),
        method: "PUT",
        body: formData,
      }),
    }),
    deleteEducation: builder.mutation({
      query: (id) => ({
        url:  EDUCATION_API_ENDPOINTS.DELETE(id),
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetEducationByIdQuery,
  useGetEducationsByUserQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} = educationApi;

export default educationApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";
import { EXPERIENCE_API_ENDPOINTS } from "./baseApiConfig/apiEndpoints";

const experienceApi = createApi({
  reducerPath: "experienceApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getExperiences: builder.query({
      query: (userId) => ({
        url: EXPERIENCE_API_ENDPOINTS.BASE,
        method: "GET",
        params: { userId }, 
      }),
    }),
    createExperience: builder.mutation({
      query: (experienceData) => ({
        url: EXPERIENCE_API_ENDPOINTS.BASE,
        method: "POST",
        body: experienceData,
      }),
    }),
    updateExperience: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: EXPERIENCE_API_ENDPOINTS.BY_ID(id),
        method: "PUT",
        body: updatedData,
      }),
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url:  EXPERIENCE_API_ENDPOINTS.BY_ID(id),
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetExperiencesQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;

export default experienceApi;

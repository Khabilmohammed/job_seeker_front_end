// services/experienceApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";

const experienceApi = createApi({
  reducerPath: "experienceApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getExperiences: builder.query({
      query: (userId) => ({
        url: "experience",
        method: "GET",
        params: { userId }, 
      }),
    }),
    createExperience: builder.mutation({
      query: (experienceData) => ({
        url: "experience",
        method: "POST",
        body: experienceData,
      }),
    }),
    updateExperience: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `experience/${id}`,
        method: "PUT",
        body: updatedData,
      }),
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `experience/${id}`,
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

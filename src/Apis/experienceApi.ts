// services/experienceApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const experienceApi = createApi({
  reducerPath: "experienceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5134/api/experience",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExperiences: builder.query({
      query: (userId) => ({
        url: "",
        method: "GET",
        params: { userId }, 
      }),
    }),
    createExperience: builder.mutation({
      query: (experienceData) => ({
        url: "",
        method: "POST",
        body: experienceData,
      }),
    }),
    updateExperience: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `${id}`,
        method: "PUT",
        body: updatedData,
      }),
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `${id}`,
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

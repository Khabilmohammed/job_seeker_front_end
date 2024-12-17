import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";

const educationApi = createApi({
  reducerPath: "educationApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getEducationById: builder.query({
      query: (id) => `Education/${id}`, 
    }),
    getEducationsByUser: builder.query({
      query: (userId) => `Education/user/${userId}`,
    }),
    createEducation: builder.mutation({
      query: ({ formData, userId }) => ({
        url: "Education/create",
        method: "POST",
        body: formData,
        headers: { UserId: userId },
      }),
    }),
    updateEducation: builder.mutation({
      query: ({ id, formData }) => ({
        url: `Education/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `Education/${id}`,
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

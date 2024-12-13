import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const educationApi = createApi({
  reducerPath: "educationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5134/api/Education",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEducationById: builder.query({
      query: (id) => `${id}`, // Simplified, automatically uses GET method
    }),
    getEducationsByUser: builder.query({
      query: (userId) => `user/${userId}`,
    }),
    createEducation: builder.mutation({
      query: ({ formData, userId }) => ({
        url: "create",
        method: "POST",
        body: formData,
        headers: { UserId: userId },
      }),
    }),
    updateEducation: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `${id}`,
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

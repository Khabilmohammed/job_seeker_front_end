import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storyApi = createApi({
  reducerPath: "storyApi", 
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5134/api/stories",  
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); 
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); 
      }
      return headers; 
    },
  }),
  endpoints: (builder) => ({
   
    getStoriesByUserId: builder.query({
      query: (userId) => `/user/${userId}`,
    }),
    getArchivedStories: builder.query({
      query: (userId) => `/archived?userId=${userId}`,  
    }),
    getStoriesFromOthers: builder.query({
      query: (userId) => `/otherstories/${userId}`, 
    }),

    createStory: builder.mutation({
      query: (storyData) => ({
        url: "/create",  
        method: "POST",  
        body: storyData, 
      }),
    }),
    deleteStory: builder.mutation({
      query: (storyId) => ({
        url: `/${storyId}`, 
        method: "DELETE", 
      }),
    }),
  }),
});

export const { 
  useGetStoriesByUserIdQuery, 
  useCreateStoryMutation,
  useGetStoriesFromOthersQuery,
  useDeleteStoryMutation, 
  useGetArchivedStoriesQuery,
} = storyApi;

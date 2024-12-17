import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";

export const storyApi = createApi({
  reducerPath: "storyApi", 
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
   
    getStoriesByUserId: builder.query({
      query: (userId) => `stories/user/${userId}`,
    }),
    getArchivedStories: builder.query({
      query: (userId) => `stories/archived?userId=${userId}`,  
    }),
    getStoriesFromOthers: builder.query({
      query: (userId) => `stories/otherstories/${userId}`, 
    }),

    createStory: builder.mutation({
      query: (storyData) => ({
        url: "stories/create",  
        method: "POST",  
        body: storyData, 
      }),
    }),
    deleteStory: builder.mutation({
      query: (storyId) => ({
        url: `stories/${storyId}`, 
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

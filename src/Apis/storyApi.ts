import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";
import { STORY_API_ENDPOINTS } from "./baseApiConfig/apiEndpoints";

export const storyApi = createApi({
  reducerPath: "storyApi", 
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
   
    getStoriesByUserId: builder.query({
      query: (userId: string) => STORY_API_ENDPOINTS.GET_STORIES_BY_USER_ID(userId),
    }),
    getArchivedStories: builder.query({
      query: (userId: string) => STORY_API_ENDPOINTS.GET_ARCHIVED_STORIES(userId),  
    }),
    getStoriesFromOthers: builder.query({
      query: (userId: string) => STORY_API_ENDPOINTS.GET_STORIES_FROM_OTHERS(userId),
    }),

    createStory: builder.mutation({
      query: (storyData) => ({
        url:  STORY_API_ENDPOINTS.CREATE_STORY, 
        method: "POST",  
        body: storyData, 
      }),
    }),
    deleteStory: builder.mutation({
      query: (storyId) => ({
        url: STORY_API_ENDPOINTS.DELETE_STORY(storyId), 
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

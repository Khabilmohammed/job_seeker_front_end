import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './baseApiConfig/baseApiConfig';
import { SAVED_POST_API_ENDPOINTS } from './baseApiConfig/apiEndpoints';

const savedPostApi = createApi({
  reducerPath: 'savedPostApi',
  baseQuery: createBaseQuery(),

  // ✅ This tells RTK Query what tag types you're using
  tagTypes: ['SavedPosts'],

  endpoints: (builder) => ({
    getUserSavedPosts: builder.query({
      query: (userId: string) => ({
        url: SAVED_POST_API_ENDPOINTS.GET_USER_SAVED_POSTS(userId),
        method: 'GET',
      }),
      // ✅ Helps with automatic refetch after invalidation
      providesTags: ['SavedPosts'],
    }),

    savePost: builder.mutation({
      query: (postId: number) => ({
        url: SAVED_POST_API_ENDPOINTS.SAVE_POST(postId),
        method: 'POST',
      }),
      // ✅ Triggers refetch for getUserSavedPosts
      invalidatesTags: ['SavedPosts'],
    }),

    removeSavedPost: builder.mutation({
      query: (postId: number) => ({
        url: SAVED_POST_API_ENDPOINTS.REMOVE_SAVED_POST(postId),
        method: 'DELETE',
      }),
      invalidatesTags: ['SavedPosts'], // ✅ Add this to reflect removal
    }),
  }),
});

export const {
  useGetUserSavedPostsQuery,
  useSavePostMutation,
  useRemoveSavedPostMutation,
} = savedPostApi;

export default savedPostApi;

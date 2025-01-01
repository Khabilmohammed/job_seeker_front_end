import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './baseApiConfig/baseApiConfig';
import { SAVED_POST_API_ENDPOINTS } from './baseApiConfig/apiEndpoints';

const savedPostApi = createApi({
  reducerPath: 'savedPostApi',
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getUserSavedPosts: builder.query({
      query: (userId: string) => ({
        url: SAVED_POST_API_ENDPOINTS.GET_USER_SAVED_POSTS(userId), // Adjusted to include userId as a path parameter
        method: 'GET',
      }),
    }),
    savePost: builder.mutation({
      query: (postId: number) => ({
        url:SAVED_POST_API_ENDPOINTS.SAVE_POST(postId), // Calls the SavePost action with the postId as a parameter
        method: 'POST',
      }),
    }),
    removeSavedPost: builder.mutation({
      query: (postId: number) => ({
        url: SAVED_POST_API_ENDPOINTS.REMOVE_SAVED_POST(postId), // Calls the RemoveSavedPost action with the postId as a parameter
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUserSavedPostsQuery,
  useSavePostMutation,
  useRemoveSavedPostMutation,
} = savedPostApi;

export default savedPostApi;

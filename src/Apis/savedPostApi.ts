import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './baseApiConfig/baseApiConfig';

const savedPostApi = createApi({
  reducerPath: 'savedPostApi',
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getUserSavedPosts: builder.query({
      query: (userId: string) => ({
        url: `savedpost/${userId}`, // Adjusted to include userId as a path parameter
        method: 'GET',
      }),
    }),
    savePost: builder.mutation({
      query: (postId: number) => ({
        url: `savedpost/${postId}`, // Calls the SavePost action with the postId as a parameter
        method: 'POST',
      }),
    }),
    removeSavedPost: builder.mutation({
      query: (postId: number) => ({
        url: `savedpost/${postId}`, // Calls the RemoveSavedPost action with the postId as a parameter
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

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const savedPostApi = createApi({
  reducerPath: 'savedPostApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5134/api', // Make sure this matches your backend URL
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Attach the token if it exists
      }
      return headers;
    },
  }),
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

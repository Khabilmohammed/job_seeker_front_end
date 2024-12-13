import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";

const likeApi = createApi({
  reducerPath: "likeApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getLikesForPost: builder.query({
      query: (postId) => ({
        url: `like/GetLikesForPost/${postId}`,
        method: "GET",
      }),
      }),
    createLike: builder.mutation({
      query: (likeData) => ({
        url: "like/AddLike",
        method: "POST",
        body: likeData,
      }),
    }),
    getLikesCountPosts: builder.query<number, number>({ // Adjust the types for postId and likesCount
      query: (postId) => ({
        url: `like/GetLikesCountForPost/${postId}`,
        method: "GET",
      }),
    }),
    deleteLike: builder.mutation({
      query: (likeData) => ({
        url: `like/RemoveLike`, // Use the correct endpoint
        method: "DELETE",
        body: likeData, // Expecting likeData to contain PostId and UserId
      }),
    }),    
  }),
});

export const {
  useGetLikesCountPostsQuery,
  useGetLikesForPostQuery,
  useCreateLikeMutation,
  useDeleteLikeMutation,
  
} = likeApi;

export default likeApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";
import { POST_API_ENDPOINTS } from "./baseApiConfig/apiEndpoints";

const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (formData:FormData) => ({
        url: POST_API_ENDPOINTS.CREATE_POST,
        method: "POST",
        body: formData, 
      }),
    }),
    getAllPosts: builder.query({
      query: () => ({
        url: POST_API_ENDPOINTS.GET_ALL_POSTS,
        method: "GET",
      }),
    }),
    getPostById: builder.query({
      query: (postId) => ({
        url:  POST_API_ENDPOINTS.GET_POST_BY_ID(postId),
        method: "GET",
      }),
    }),
    getPostByuserId: builder.query({
      query: (userId) => ({
        url: POST_API_ENDPOINTS.GET_POSTS_BY_USER(userId),
        method: "GET",
      }),
    }),
    updatePost: builder.mutation({
      query: ({ postId, updatedPost }) => ({
        url: POST_API_ENDPOINTS.UPDATE_POST(postId),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: updatedPost,
      }),
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: POST_API_ENDPOINTS.DELETE_POST(postId),
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostByuserIdQuery,
} = postApi;

export default postApi;



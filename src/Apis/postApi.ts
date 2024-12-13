import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";

const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (formData:FormData) => ({
        url: "post/CreatePost",
        method: "POST",
        body: formData, 
      }),
    }),
    getAllPosts: builder.query({
      query: () => ({
        url: "post/GetAllPosts",
        method: "GET",
      }),
    }),
    getPostById: builder.query({
      query: (postId) => ({
        url: `post/GetPost/${postId}`,
        method: "GET",
      }),
    }),
    getPostByuserId: builder.query({
      query: (userId) => ({
        url: `post/GetPostsByUser/${userId}`,
        method: "GET",
      }),
    }),
    updatePost: builder.mutation({
      query: ({ postId, updatedPost }) => ({
        url: `post/UpdatePost/${postId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: updatedPost,
      }),
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `post/DeletePost/${postId}`,
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



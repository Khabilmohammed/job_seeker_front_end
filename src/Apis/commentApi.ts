import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";

const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getCommentsForPost: builder.query({
      query: (postId) => ({
        url: `comment/GetCommentsByPost/${postId}`,
        method: "GET",
      }),
    }),
    createComment: builder.mutation({
      query: (commentData) => ({
        url: "comment/CreateComment",
        method: "POST",
        body: commentData,
      }),
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `comment/DeleteComment/${commentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { 
  useGetCommentsForPostQuery, 
  useCreateCommentMutation, 
  useDeleteCommentMutation 
} = commentApi;

export default commentApi;

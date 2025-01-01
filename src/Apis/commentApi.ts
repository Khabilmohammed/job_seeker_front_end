import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";
import { COMMENT_API_ENDPOINTS } from "./baseApiConfig/apiEndpoints";

const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getCommentsForPost: builder.query({
      query: (postId) => ({
        url:  `${COMMENT_API_ENDPOINTS.GET_COMMENTS_BY_POST}/${postId}`,
        method: "GET",
      }),
    }),
    createComment: builder.mutation({
      query: (commentData) => ({
        url: COMMENT_API_ENDPOINTS.CREATE_COMMENT,
        method: "POST",
        body: commentData,
      }),
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url:  `${COMMENT_API_ENDPOINTS.DELETE_COMMENT}/${commentId}`,
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

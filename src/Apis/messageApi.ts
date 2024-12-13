import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";

const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getMessagesForUser: builder.query({
      query: (params) => ({
        url: `message`,
        method: "GET",
        params, 
      }),
    }),
    getMessageThread: builder.query({
      query: (username) => ({
        url: `message/thread/${username}`,
        method: "GET",
      }),
    }),
    createMessage: builder.mutation({
      query: (messageData) => ({
        url: "message",
        method: "POST",
        body: messageData,
      }),
    }),
    getChattedUsers: builder.query({
      query: () => ({
        url: "message/chatted-users",
        method: "GET",
      }),
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `message/${id}`, // Assuming your DELETE endpoint is set up like this
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMessagesForUserQuery,
  useGetMessageThreadQuery,
  useCreateMessageMutation,
  useGetChattedUsersQuery,
  useDeleteMessageMutation,
} = messageApi;

export default messageApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const followApi = createApi({
  reducerPath: "followApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5134/api/Follow", // Backend base route
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    followUser: builder.mutation({
      query: (followDto: { followerId: string; followingId: string }) => ({
        url: `follow`,
        method: "POST",
        body: followDto,
      }),
    }),
    unfollowUser: builder.mutation({
      query: (followDto: { followerId: string; followingId: string }) => ({
        url: `unfollow`,
        method: "POST",
        body: followDto,
      }),
    }),
    getFollowers: builder.query({
      query: (userId: string) => ({
        url: `${userId}/followers`,
        method: "GET",
      }),
    }),
    getFollowing: builder.query({
      query: (userId: string) => ({
        url: `${userId}/following`,
        method: "GET",
      }),
    }),
    isFollowing: builder.query({
      query: ({ followerId, followingId }: { followerId: string; followingId: string }) => ({
        url: `${followerId}/${followingId}/status`,
        method: "GET",
      }),
    }),
    getPeopleYouMayKnow: builder.query({
      query: ({ userId, count }: { userId: string; count: number }) => ({
        url: `${userId}/people-you-may-know`,
        method: "GET",
        params: { count },
      }),
    }),
  }),
});

export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetFollowersQuery,
  useGetFollowingQuery,
  useIsFollowingQuery,
  useGetPeopleYouMayKnowQuery,
} = followApi;

export default followApi;

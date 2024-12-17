import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";

const followApi = createApi({
  reducerPath: "followApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    followUser: builder.mutation({
      query: (followDto: { followerId: string; followingId: string }) => ({
        url: `Follow/follow`,
        method: "POST",
        body: followDto,
      }),
    }),
    unfollowUser: builder.mutation({
      query: (followDto: { followerId: string; followingId: string }) => ({
        url: `Follow/unfollow`,
        method: "POST",
        body: followDto,
      }),
    }),
    getFollowers: builder.query({
      query: (userId: string) => ({
        url: `Follow/${userId}/followers`,
        method: "GET",
      }),
    }),
    getFollowing: builder.query({
      query: (userId: string) => ({
        url: `Follow/${userId}/following`,
        method: "GET",
      }),
    }),
    isFollowing: builder.query({
      query: ({ followerId, followingId }: { followerId: string; followingId: string }) => ({
        url: `Follow/${followerId}/${followingId}/status`,
        method: "GET",
      }),
    }),
    getPeopleYouMayKnow: builder.query({
      query: ({ userId, count }: { userId: string; count: number }) => ({
        url: `Follow/${userId}/people-you-may-know`,
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

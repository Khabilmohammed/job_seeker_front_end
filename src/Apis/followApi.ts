import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";
import { FOLLOW_API_ENDPOINTS } from "./baseApiConfig/apiEndpoints";

const followApi = createApi({
  reducerPath: "followApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    followUser: builder.mutation({
      query: (followDto: { followerId: string; followingId: string }) => ({
        url: FOLLOW_API_ENDPOINTS.FOLLOW,
        method: "POST",
        body: followDto,
      }),
    }),
    unfollowUser: builder.mutation({
      query: (followDto: { followerId: string; followingId: string }) => ({
        url: FOLLOW_API_ENDPOINTS.UNFOLLOW,
        method: "POST",
        body: followDto,
      }),
    }),
    getFollowers: builder.query({
      query: (userId: string) => ({
        url:  FOLLOW_API_ENDPOINTS.FOLLOWERS(userId),
        method: "GET",
      }),
    }),
    getFollowing: builder.query({
      query: (userId: string) => ({
        url: FOLLOW_API_ENDPOINTS.FOLLOWING(userId),
        method: "GET",
      }),
    }),
    isFollowing: builder.query({
      query: ({ followerId, followingId }: { followerId: string; followingId: string }) => ({
        url: FOLLOW_API_ENDPOINTS.FOLLOW_STATUS(followerId, followingId),
        method: "GET",
      }),
    }),
    getPeopleYouMayKnow: builder.query({
      query: ({ userId, count }: { userId: string; count: number }) => ({
        url:FOLLOW_API_ENDPOINTS.PEOPLE_YOU_MAY_KNOW(userId),
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

import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";

const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    searchJobPosts: builder.query({
      query: (query) => ({
        url: `Search/job-posts?query=${encodeURIComponent(query)}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSearchJobPostsQuery } = searchApi;

export default searchApi;

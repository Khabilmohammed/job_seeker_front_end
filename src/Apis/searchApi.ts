import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";
import { SEARCH_API_ENDPOINTS } from "./baseApiConfig/apiEndpoints";

const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    searchJobPosts: builder.query({
      query: (query) => ({
        url: SEARCH_API_ENDPOINTS.SEARCH_JOB_POSTS(query),
        method: "GET",
      }),
    }),
  }),
});

export const { useSearchJobPostsQuery } = searchApi;

export default searchApi;

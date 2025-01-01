import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";
import { JOB_APPLICATION_API_ENDPOINTS } from "./baseApiConfig/apiEndpoints";

const jobApplicationApi = createApi({
  reducerPath: "jobApplicationApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    applyForJob: builder.mutation({
        query: (jobApplicationData: FormData) => ({
          url: JOB_APPLICATION_API_ENDPOINTS.APPLY, 
          method: "POST",
          body: jobApplicationData, 
        }),
      }),
    getApplicationById: builder.query({
      query: (jobApplicationId) => ({
        url:  JOB_APPLICATION_API_ENDPOINTS.GET_BY_ID(jobApplicationId),
        method: "GET",
      }),
    }),
    getApplicationsForJobPosting: builder.query({
      query: (jobPostingId) => ({
        url: JOB_APPLICATION_API_ENDPOINTS.GET_BY_JOB_POSTING(jobPostingId),
        method: "GET",
      }),
    }),
    getUserApplications: builder.query({
      query: (userId) => ({
        url:  JOB_APPLICATION_API_ENDPOINTS.GET_BY_USER(userId),
        method: "GET",
      }),
    }),
    changeApplicationStatus: builder.mutation({
      query: ({ jobApplicationId, status }) => ({
          url: JOB_APPLICATION_API_ENDPOINTS.CHANGE_STATUS(jobApplicationId),
          method: "PUT",
          body: JSON.stringify(status),
          headers: {
              "Content-Type": "application/json",
          },
      }),
  }),
    removeApplication: builder.mutation({
      query: (jobApplicationId) => ({
        url: `${jobApplicationId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useApplyForJobMutation,
  useGetApplicationByIdQuery,
  useGetApplicationsForJobPostingQuery,
  useGetUserApplicationsQuery,
  useChangeApplicationStatusMutation,
  useRemoveApplicationMutation,
} = jobApplicationApi;

export default jobApplicationApi;

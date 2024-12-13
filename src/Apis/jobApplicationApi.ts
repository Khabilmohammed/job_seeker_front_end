import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";

const jobApplicationApi = createApi({
  reducerPath: "jobApplicationApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    applyForJob: builder.mutation({
        query: (jobApplicationData: FormData) => ({
          url: "JobApplication/Apply", 
          method: "POST",
          body: jobApplicationData, 
        }),
      }),
    getApplicationById: builder.query({
      query: (jobApplicationId) => ({
        url: `JobApplication/${jobApplicationId}`,
        method: "GET",
      }),
    }),
    getApplicationsForJobPosting: builder.query({
      query: (jobPostingId) => ({
        url: `JobApplication/ByJobPosting/${jobPostingId}`,
        method: "GET",
      }),
    }),
    getUserApplications: builder.query({
      query: (userId) => ({
        url: `JobApplication/ByUser/${userId}`,
        method: "GET",
      }),
    }),
    changeApplicationStatus: builder.mutation({
      query: ({ jobApplicationId, status }) => ({
          url: `JobApplication/ChangeStatus/${jobApplicationId}`,
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

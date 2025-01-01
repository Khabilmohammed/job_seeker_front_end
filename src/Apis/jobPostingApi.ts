import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";
import { JOB_POSTING_API_ENDPOINTS } from "./baseApiConfig/apiEndpoints";

const jobPostingApi = createApi({
  reducerPath: "jobPostingApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    createJobPosting: builder.mutation({
      query: (jobData) => ({
        url:JOB_POSTING_API_ENDPOINTS.CREATE,
        method: "POST",
        body: jobData,
      }),
    }),
    getAllJobPostings: builder.query({
      query: () => ({
        url:  JOB_POSTING_API_ENDPOINTS.GET_ALL,
        method: "GET",
      }),
    }),

    getAllJobPostingsAdmin: builder.query({
      query: () => ({
        url: JOB_POSTING_API_ENDPOINTS.GET_ALL_ADMIN,
        method: "GET",
      }),
    }),

    // Endpoint to get a job posting by its ID
    getJobPostingById: builder.query({
      query: (jobId) => ({
        url: JOB_POSTING_API_ENDPOINTS.GET_BY_ID(jobId),
        method: "GET",
      }),
    }),

    // Endpoint to get job postings by a company ID
    getCompanyJobPostings: builder.query({
      query: (companyId) => ({
        url:  JOB_POSTING_API_ENDPOINTS.GET_BY_COMPANY(companyId),
        method: "GET",
      }),
    }),

    // Endpoint to update a job posting
    updateJobPosting: builder.mutation({
      query: ({ jobId, ...updatedData }) => ({
        url: JOB_POSTING_API_ENDPOINTS.UPDATE(jobId),
        method: "PUT",
        body: updatedData,
      }),
    }),

    // Endpoint to delete a job posting
    deleteJobPosting: builder.mutation({
      query: (jobId) => ({
        url:  JOB_POSTING_API_ENDPOINTS.DELETE(jobId),
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateJobPostingMutation,
  useGetAllJobPostingsQuery,
  useGetJobPostingByIdQuery,
  useGetCompanyJobPostingsQuery,
  useUpdateJobPostingMutation,
  useDeleteJobPostingMutation,
  useGetAllJobPostingsAdminQuery,
} = jobPostingApi;

export default jobPostingApi;

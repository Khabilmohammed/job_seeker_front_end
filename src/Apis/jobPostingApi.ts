import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseApiConfig/baseApiConfig";

const jobPostingApi = createApi({
  reducerPath: "jobPostingApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    createJobPosting: builder.mutation({
      query: (jobData) => ({
        url: `JobPosting/create`,
        method: "POST",
        body: jobData,
      }),
    }),
    getAllJobPostings: builder.query({
      query: () => ({
        url: "JobPosting/all",
        method: "GET",
      }),
    }),

    getAllJobPostingsAdmin: builder.query({
      query: () => ({
        url: "JobPosting/all-job-admin",
        method: "GET",
      }),
    }),

    // Endpoint to get a job posting by its ID
    getJobPostingById: builder.query({
      query: (jobId) => ({
        url: `JobPosting/${jobId}`,
        method: "GET",
      }),
    }),

    // Endpoint to get job postings by a company ID
    getCompanyJobPostings: builder.query({
      query: (companyId) => ({
        url: `JobPosting/company/${companyId}`,
        method: "GET",
      }),
    }),

    // Endpoint to update a job posting
    updateJobPosting: builder.mutation({
      query: ({ jobId, ...updatedData }) => ({
        url: `JobPosting/${jobId}/update`,
        method: "PUT",
        body: updatedData,
      }),
    }),

    // Endpoint to delete a job posting
    deleteJobPosting: builder.mutation({
      query: (jobId) => ({
        url: `JobPosting/${jobId}/delete`,
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

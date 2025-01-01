import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './baseApiConfig/baseApiConfig';
import { DASHBOARD_API_ENDPOINTS } from './baseApiConfig/apiEndpoints';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: createBaseQuery(), 
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => DASHBOARD_API_ENDPOINTS.STATS,
    }),
    getMonthlyStats: builder.query({
      query: () => DASHBOARD_API_ENDPOINTS.MONTHLY_STATS,
    }),
    getEngagementMetrics: builder.query({
      query: () => DASHBOARD_API_ENDPOINTS.ENGAGEMENT_METRICS,
    }),
  }),
});

export const { 
  useGetDashboardStatsQuery, 
  useGetMonthlyStatsQuery, 
  useGetEngagementMetricsQuery 
} = dashboardApi;

import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './baseApiConfig/baseApiConfig';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: createBaseQuery(), 
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => 'Dashboard/stats',
    }),
    getMonthlyStats: builder.query({
      query: () => 'Dashboard/monthly-stats',
    }),
    getEngagementMetrics: builder.query({
      query: () => 'Dashboard/engagement-metrics',
    }),
  }),
});

export const { 
  useGetDashboardStatsQuery, 
  useGetMonthlyStatsQuery, 
  useGetEngagementMetricsQuery 
} = dashboardApi;

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useGetEngagementMetricsQuery, useGetMonthlyStatsQuery } from '../../../Apis/dashboardApi ';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartCard = () => {
  const { data: monthlyStats, isLoading: monthlyStatsLoading } = useGetMonthlyStatsQuery({});
  const { data: engagementMetrics, isLoading: engagementMetricsLoading } = useGetEngagementMetricsQuery({});

  if (monthlyStatsLoading || engagementMetricsLoading) {
    return <div>Loading chart data...</div>;
  }

  const months = monthlyStats?.months || [];
  const jobPosts = monthlyStats?.jobPosts || [];
  const applications = monthlyStats?.applications || [];
  const postsCreated = engagementMetrics?.postsCreated || [];
  const likesReceived = engagementMetrics?.likesReceived || [];

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Job Posts',
        data: jobPosts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Applications',
        data: applications,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Posts Created',
        data: postsCreated,
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: 'Likes Received',
        data: likesReceived,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
        Activity Overview
      </h2>
      <Bar data={chartData}/>
    </div>
  );
};

export default ChartCard;

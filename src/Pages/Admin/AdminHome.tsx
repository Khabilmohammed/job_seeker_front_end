import React, { useEffect, useState } from 'react';
import { MoneyIcon, PeopleIcon, CartIcon, ChatIcon } from '../../Componenets/Admin/Cards/icons';
import RoundIcon from '../../Componenets/Admin/RoundIcon';
import InfoCard from '../../Componenets/Admin/Cards/InfoCard';
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from '@windmill/react-ui';
import { useGetAllPostsQuery } from '../../Apis/postApi';
import { useGetAllJobPostingsAdminQuery } from '../../Apis/jobPostingApi';
import ChartCard from '../../Componenets/Admin/BarChrt/ChartCard';
import { useGetDashboardStatsQuery } from '../../Apis/dashboardApi ';

function AdminHome() {
  const { data: postsData = { result: [] }, error: postsError, isLoading: postsLoading } = useGetAllPostsQuery({});
  const { data: statsData, error: statsError, isLoading: statsLoading } = useGetDashboardStatsQuery({});
  const { data: jobPostingsData = [], error: jobPostingsError, isLoading: jobPostingsLoading } = useGetAllJobPostingsAdminQuery({});
  
  const posts = postsData.result || [];
  
  const stats = statsData || {};
  const jobPostings = jobPostingsData.result || [];
  
  const [page, setPage] = useState<number>(1);
  const [paginatedData, setPaginatedData] = useState<any[]>([]);

  const resultsPerPage = 10;
  const [jobPage, setJobPage] = useState<number>(1);
const [jobPaginatedData, setJobPaginatedData] = useState<any[]>([]);

useEffect(() => {
  if (Array.isArray(jobPostings)) {
    const slicedData = jobPostings.slice((jobPage - 1) * resultsPerPage, jobPage * resultsPerPage);
    setJobPaginatedData(slicedData);
  }
}, [jobPage, jobPostings]);

const onJobPageChange = (p: number) => {
  setJobPage(p);
};
  useEffect(() => {
    if (Array.isArray(posts)) {
      const slicedData = posts.slice((page - 1) * resultsPerPage, page * resultsPerPage);
      setPaginatedData(slicedData);
    }
  }, [page, posts]);

  const onPageChange = (p: number) => {
    setPage(p);
  };

  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Dashboard</h1>

      {/* Info Cards */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Users" value={stats.totalUsers || 'Loading...'}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Company Users" value={stats.companyUsers || 'Loading...'}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Social Media Posts" value={stats.socialMediaPosts || 'Loading...'}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Job Posts" value={stats.jobPosts || 'Loading...'}>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Job Applications" value={stats.jobApplications || 'Loading...'}>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-purple-500 dark:text-purple-100"
            bgColorClass="bg-purple-100 dark:bg-purple-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      {/* Chart Card */}
      <div className="mb-8">
        <ChartCard />
      </div>

      {/* Posts Table */}
      <h2 className="my-6 text-xl font-semibold text-gray-700 dark:text-gray-200">Social Media Posts</h2>
      {postsLoading ? (
        <p>Loading posts...</p>
      ) : postsError ? (
        <p>Error loading posts</p>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Username</TableCell>
                  <TableCell>Post Image</TableCell>
                  <TableCell>Content</TableCell>
                  <TableCell>Likes</TableCell>
                  <TableCell>Shares</TableCell>
                  <TableCell>Comments</TableCell>
                  <TableCell>Date</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {paginatedData.map((post, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Avatar className="hidden mr-3 md:block" src={post.avatarUrl} alt="User image" />
                        <div>
                          <p className="font-semibold">{post.userName}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{post.userJob}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {post.images?.[0] ? (
                        <img src={post.images[0].imageUrl} alt="Post" className="h-10 w-10" />
                      ) : (
                        <span>No Image</span>
                      )}
                    </TableCell>
                    <TableCell>
                      
                      <Badge>{post.content.length > 50 ? `${post.content.slice(0, 50)}...` : post.content}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{post.likes?.length || 0}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{post.shares?.length || 0}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{post.comments?.length || 0}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={posts.length}
                resultsPerPage={resultsPerPage}
                label="Table navigation"
                onChange={onPageChange}
              />
            </TableFooter>
          </TableContainer>
        </>
      )}

      {/* Job Postings Table */}
      <h2 className="my-6 text-xl font-semibold text-gray-700 dark:text-gray-200">Job Postings</h2>
{jobPostingsLoading ? (
  <p>Loading job postings...</p>
) : jobPostingsError ? (
  <p>Error loading job postings</p>
) : (
  <>
    <TableContainer>
      <Table>
        <TableHeader>
          <tr>
            <TableCell>Job Title</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Date Posted</TableCell>
          </tr>
        </TableHeader>
        <TableBody>
          {jobPaginatedData.map((job: any, i: any) => (
            <TableRow key={i}>
              <TableCell>
                <span className="text-sm font-semibold">{job.title}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{job.companyName}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{job.location}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{job.jobType}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{new Date(job.createdAt).toLocaleDateString()}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableFooter>
        <Pagination
          totalResults={jobPostings.length}
          resultsPerPage={resultsPerPage}
          label="Job postings navigation"
          onChange={onJobPageChange}
        />
      </TableFooter>
    </TableContainer>
  </>
)}
    </>
  );
}

export default AdminHome;

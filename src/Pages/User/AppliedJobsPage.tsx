import React, { useState } from 'react';
import { useGetUserApplicationsQuery } from '../../Apis/jobApplicationApi';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../Storage/Redux/store';
import { useNavigate } from 'react-router-dom';

const AppliedJobsPage = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const { data, error, isLoading } = useGetUserApplicationsQuery(userId);
  
  // State to manage pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error fetching applied jobs. Please try again later.</div>;

  const appliedJobs = data?.result || [];

  // Get the paginated jobs
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = appliedJobs.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination
  const totalPages = Math.ceil(appliedJobs.length / itemsPerPage);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Applied Jobs</h1>
      {appliedJobs.length === 0 ? (
        <div className="text-center text-gray-500">No jobs applied yet.</div>
      ) : (
        <div className="space-y-4">
          {currentJobs.map((job: any) => (
            <div key={job.jobApplicationId} className="bg-white p-4 rounded-lg shadow-md border">
              <h2 className="text-xl font-semibold">{job.jobPosting.title}</h2>
              <p className="text-gray-600">Address: {job.address}</p>
              <p className="text-gray-600">Expected Salary: ${job.expectedSalary}</p>
              <p className="text-gray-600">
                Resume:{" "}
                <a
                  href={`${job.resumeUrl.replace('/raw/upload/', '/raw/upload/fl_attachment/')}`}
                  className="text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  Download Resume
                </a>
              </p>
              <p className="text-gray-600">Cover Letter: {job.coverLetter}</p>
              <p className="text-gray-600">Applied On: {new Date(job.applicationDate).toLocaleDateString()}</p>
              <div className="flex justify-between items-center mt-2">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    job.status === 'Applied'
                      ? 'bg-blue-100 text-blue-800'
                      : job.status === 'In Review'
                      ? 'bg-yellow-100 text-yellow-800'
                      : job.status === 'Shortlisted'
                      ? 'bg-green-100 text-green-800'
                      : job.status === 'Rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {job.status}
                </span>
                <button
                  onClick={() => navigate(`/user/singleJobDetailsPage/${job.jobApplicationId}`)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AppliedJobsPage;

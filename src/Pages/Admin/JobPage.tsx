import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllJobPostingsAdminQuery } from '../../Apis/jobPostingApi';
import JobTable from '../../Componenets/Admin/JobTable';

function JobPage() {
  const navigate = useNavigate();
  const { data: jobData, isLoading: isJobsLoading, isError: isJobsError } = useGetAllJobPostingsAdminQuery({});
  const jobs = jobData?.result || [];
  console.log(jobs);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Pagination control functions
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Job Postings</h2>

      {isJobsLoading ? (
        <p>Loading...</p>
      ) : isJobsError ? (
        <p>Error loading data.</p>
      ) : (
        <>
          <JobTable jobs={currentJobs} />
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow ${
                currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-400'
              }`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow ${
                currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-400'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default JobPage;

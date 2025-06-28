import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCompanyByUserIdQuery } from '../../Apis/companyApi';
import { Rootstate } from '../../Storage/Redux/store';
import { useSelector } from 'react-redux';
import JobTable from '../../Componenets/Comapany/JobTable';
import { useGetCompanyJobPostingsQuery } from '../../Apis/jobPostingApi';

function JobPage() {
  const navigate = useNavigate();
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const { data: companyData, isLoading: isCompanyLoading, isError: isCompanyError } = useGetCompanyByUserIdQuery(userId);
  const companyId = companyData?.result?.companyId;

  // Fetch job postings by company ID
  const { data: jobData, isLoading: isJobsLoading, isError: isJobsError } = useGetCompanyJobPostingsQuery(companyId, {
    skip: !companyId, // Skip query if companyId is not available
  });
  
  const jobs = jobData?.result || [];
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  
  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Navigate to Create Job Page
  const handleCreateJob = () => {
    navigate('/company/createJobPage');
  };

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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Job Postings</h2>
        <button
          onClick={handleCreateJob}
          className="px-5 py-2 bg-[#187a43] text-white rounded-lg shadow hover:bg-[#2fa060]"
        >
          + Create Job
        </button>
      </div>

      {isCompanyLoading || isJobsLoading ? (
        <p>Loading...</p>
      ) : isCompanyError || isJobsError ? (
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

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetJobPostingByIdQuery } from '../../Apis/jobPostingApi';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaCalendarAlt, FaBuilding, FaFileAlt } from 'react-icons/fa';

const JobDetailPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  
  const navigate = useNavigate();

  // Fetch job detail using jobId
  const { data, isLoading, error } = useGetJobPostingByIdQuery(jobId);

  // Handle Apply button click
  const handleApply = () => {
    navigate(`/user/jobApplicationPage/${jobId}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading job details...</p>
      </div>
    );
  }

  // Error handling
  if (error) {
    if ('message' in error) {
      return <div className="text-red-500 text-center">Error fetching job details: {error.message}</div>;
    }
    return <div className="text-red-500 text-center">Error fetching job details.</div>;
  }

  // Job detail rendering
  const job = data?.result;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Job Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white p-6 rounded-lg shadow-lg mb-8">
        <img
          src={job?.companyLogo || '/company-logo.png'}
          alt="Company Logo"
          className="w-32 h-32 rounded-md object-cover border"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">{job?.title}</h1>
          <p className="text-blue-600 font-medium flex items-center gap-2">
            <FaBuilding /> {job?.companyName}
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-500" />
              <span>{job?.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBriefcase className="text-gray-500" />
              <span>Experience: {job?.experienceRequired}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="text-gray-500" />
              <span>Salary: {job?.salaryRange}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" />
              <span>Job Type: {job?.jobType}</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleApply}
          className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Apply Now
        </button>
      </div>

      {/* Job Description */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Description</h2>
        <p className="text-gray-700 mb-6">{job?.description}</p>

        {/* Additional Details */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <FaFileAlt className="text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Skills Required</h3>
              <p className="text-gray-600">{job?.skills || 'Not specified'}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaCalendarAlt className="text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Posted Date</h3>
              <p className="text-gray-600">{job?.postedDate || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;

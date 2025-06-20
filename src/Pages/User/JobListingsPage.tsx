import React, { useState } from 'react';
import { useGetAllJobPostingsQuery } from '../../Apis/jobPostingApi';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const JobListingsPage = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    experience: '',
  });

  const { data, isLoading, isError, refetch } = useGetAllJobPostingsQuery(filters);
  const jobList = data?.result || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleViewJob = (jobId: string) => {
    navigate(`/user/jobDetailPage/${jobId}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8">Job Listings</h1>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="Filter by Location"
          className="p-2 border rounded-lg"
        />
        <select
          name="jobType"
          value={filters.jobType}
          onChange={handleChange}
          className="p-2 border rounded-lg"
        >
          <option value="">All Job Types</option>
          <option value="Full-Time">Full Time</option>
          <option value="Part-Time">Part Time</option>
          <option value="Internship">Internship</option>
        </select>
        <input
          type="text"
          name="experience"
          value={filters.experience}
          onChange={handleChange}
          placeholder="Experience (e.g. 2+ years)"
          className="p-2 border rounded-lg"
        />
      </div>

      {/* Refresh Filter */}
      <div className="mb-6">
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      {/* Job List */}
      <div className="space-y-8">
        {isLoading ? (
          <p>Loading jobs...</p>
        ) : isError ? (
          <p className="text-gray-500">No jobs available at the moment.</p>
        ) : jobList.length === 0 ? (
          <p>No jobs available at the moment.</p>
        ) : (
          jobList.map((job:any, index:any) => (
            <div
              key={job.jobId}
              className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-100 p-6 rounded-lg shadow-lg"
            >
              <div className="flex flex-col md:flex-row items-start">
                <img
                  src={job.logoUrl || '/company-logo.png'}
                  alt="Company Logo"
                  className="w-20 h-20 rounded-full object-cover border mb-4 md:mb-0 md:mr-4"
                />
                <div>
                  <h2 className="text-xl font-bold">{job.title}</h2>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBriefcase className="text-gray-500" />
                      <span>Experience: {job.experienceRequired}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMoneyBillWave className="text-gray-500" />
                      <span>Salary: {job.salaryRange}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleViewJob(job.jobId)}
                className="mt-4 md:mt-0 px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobListingsPage;

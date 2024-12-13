import React from 'react';
import { useNavigate } from 'react-router-dom';
import JobPosting from '../../Interfaces/JobPostingModel';

interface JobTableProps {
  jobs: JobPosting[];
}

const JobTable: React.FC<JobTableProps> = ({ jobs }) => {
  const navigate = useNavigate();

  const handleRowClick = (jobId: number) => {
    navigate(`/company/jobDetailsPage/${jobId}`); 
  };
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left font-medium text-gray-600">#</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600">Title</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600">Location</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600">Experience</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600">Job Type</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600">Posted Date</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {jobs.map((job, index) => (
            <tr
              key={job.jobId}
              onClick={() => handleRowClick(job.jobId)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4 font-semibold text-gray-800">{job.title}</td>
              <td className="px-6 py-4 text-gray-600">{job.location}</td>
              <td className="px-6 py-4 text-gray-600">{job.experienceRequired}</td>
              <td className="px-6 py-4">{job.jobType}</td>
              <td className="px-6 py-4">{new Date(job.postedDate).toLocaleString()}</td>
              <td className="px-6 py-4">
                {job.isActive ? (
                  <span className="text-green-600">Active</span>
                ) : (
                  <span className="text-red-600">Inactive</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;

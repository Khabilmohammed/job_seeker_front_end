import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetJobPostingByIdQuery, useDeleteJobPostingMutation } from '../../Apis/jobPostingApi';
import ConfirmationModal from '../../Componenets/Shared/ConfirmationModal';

const JobDetailsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  // Fetch job details using RTK Query
  const { data, isLoading, error } = useGetJobPostingByIdQuery(jobId || '');
  const [deleteJobPosting] = useDeleteJobPostingMutation();

  const [showModal, setShowModal] = useState(false);


  // Access job details from the `result` property
  const job = data?.result;

  if (isLoading) return <div>Loading...</div>;
  if (error || !job) return <div>Job not found or an error occurred</div>;



  // Handle job deletion
  const handleDelete = async () => {
    try {
      await deleteJobPosting(job.jobId).unwrap();
      navigate('/admin/jobPage');
      setShowModal(false);
    } catch (err) {
      console.error('Error deleting job:', err);
      setShowModal(false);
    }
  };
  const handleShowModal = () => setShowModal(true);
  const handleCancelModal = () => setShowModal(false);

  const handleViewApplicants = () => {
    navigate(`/Admin/ApplicantsPage/${jobId}/applicants`);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <img
            src={job.companyLogo || '/company-logo.png'}
            alt="Company Logo"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-3xl font-bold">{job.title}</h2>
            <p className="text-gray-500 text-lg">{job.location}</p>
            <p className="text-sm text-gray-400">
              Posted on: {new Date(job.postedDate).toLocaleDateString()} | Expires on: {new Date(job.expiryDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <button
            onClick={handleShowModal}
            className="px-6 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition"
          >
            <i className="fas fa-trash-alt mr-2"></i> Delete
          </button>
          <button
            onClick={handleViewApplicants}
            className="px-6 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-600 hover:text-white transition"
          >
            <i className="fas fa-users mr-2"></i> View Applicants
          </button>
        </div>
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Job Overview</h3>
          <ul className="space-y-3 text-gray-600">
            <li><span className="font-medium">Experience Required:</span> {job.experienceRequired}</li>
            <li><span className="font-medium">Salary Range:</span> {job.salaryRange}</li>
            <li><span className="font-medium">Job Type:</span> {job.jobType}</li>
            <li><span className="font-medium">Skills:</span> {job.skills}</li>
            <li><span className="font-medium">Status:</span> {job.isActive ? "Active" : "Closed"}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Job Description</h3>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showModal}
        message="Are you sure you want to delete this job posting?"
        title="Confirm Deletion"
        onConfirm={handleDelete}
        onCancel={handleCancelModal}
      />
    </div>
  );
};

export default JobDetailsPage;

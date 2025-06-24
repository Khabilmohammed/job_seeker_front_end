import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetJobPostingByIdQuery, useDeleteJobPostingMutation, useUpdateJobPostingMutation } from '../../Apis/jobPostingApi';
import ConfirmationModal from '../../Componenets/Shared/ConfirmationModal';
import { FaBuilding } from 'react-icons/fa';

const JobDetailsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  // Fetch job details using RTK Query
  const { data, isLoading, error } = useGetJobPostingByIdQuery(jobId || '');
  const [deleteJobPosting] = useDeleteJobPostingMutation();
  const [updateJobPosting] = useUpdateJobPostingMutation();
  console.log(data);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Initialize updated data without CompanyId
  const [updatedData, setUpdatedData] = useState({
    title: '',
    location: '',
    experienceRequired: '',
    salaryRange: '',
    jobType: '',
    skills: '',
    description: '',
    expiryDate: '',
  });

  // Access job details from the `result` property
  const job = data?.result;
  console.log(job);

  if (isLoading) return <div>Loading...</div>;
  if (error || !job) return <div>Job not found or an error occurred</div>;

  const openUpdateModal = () => {
     const formatDateForInput = (isoString: string) => {
      return new Date(isoString).toISOString().split('T')[0]; // "2025-06-26"
    };

    setUpdatedData({
      title: job.title,
      location: job.location,
      experienceRequired: job.experienceRequired,
      salaryRange: job.salaryRange,
      jobType: job.jobType,
      skills: job.skills,
      description: job.description,
      expiryDate: formatDateForInput(job.expiryDate),
    });
    setShowUpdateModal(true);
  };

  // Handle input change for update form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle job deletion
  const handleDelete = async () => {
    try {
      await deleteJobPosting(job.jobId).unwrap();
      navigate('/company/jobPage');
      setShowModal(false);
    } catch (err) {
      console.error('Error deleting job:', err);
      setShowModal(false);
    }
  };

  // Handle job update
  const handleUpdate = async () => {
    try {
      await updateJobPosting({ jobId: job.jobId, ...updatedData }).unwrap();
      setShowUpdateModal(false);
      navigate('/company/jobPage');
    } catch (err) {
      console.error('Error updating job:', err);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCancelModal = () => setShowModal(false);

  const handleViewApplicants = () => {
    navigate(`/company/ApplicantsPage/${jobId}/applicants`);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
  <div className="w-20 h-20 rounded-full border overflow-hidden bg-white flex items-center justify-center">
    {job.logoUrl ? (
      <img
        src={job.logoUrl}
        alt="Company Logo"
        className="w-full h-full object-cover"
      />
    ) : (
      <FaBuilding className="w-10 h-10 text-gray-500" />
    )}
  </div>

  <div>
    <h2 className="text-3xl font-bold">{job.title}</h2>
    <p className="text-gray-500 text-lg">{job.location}</p>
    <p className="text-sm text-gray-400">
      Posted on: {new Date(job.postedDate).toLocaleDateString()} | Expires on:{" "}
      {new Date(job.expiryDate).toLocaleDateString()}
    </p>
  </div>
</div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <button
            onClick={openUpdateModal}
            className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            <i className="fas fa-edit mr-2"></i> Update
          </button>
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
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-center">
              <i className="fas fa-briefcase text-blue-500 mr-2"></i>
              <span className="font-medium">Experience Required:</span> {job.experienceRequired}
            </li>
            <li className="flex items-center">
              <i className="fas fa-dollar-sign text-blue-500 mr-2"></i>
              <span className="font-medium">Salary Range:</span> {job.salaryRange}
            </li>
            <li className="flex items-center">
              <i className="fas fa-clock text-blue-500 mr-2"></i>
              <span className="font-medium">Job Type:</span> {job.jobType}
            </li>
            <li className="flex items-center">
              <i className="fas fa-cogs text-blue-500 mr-2"></i>
              <span className="font-medium">Skills:</span> {job.skills}
            </li>
            <li className="flex items-center">
              <i className="fas fa-check-circle text-green-500 mr-2"></i>
              <span className="font-medium">Status:</span> {job.isActive ? "Active" : "Closed"}
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Job Description</h3>
          <div className="border border-gray-300 p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
          </div>
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

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setShowUpdateModal(false)}
              className="absolute top-2 right-2 text-gray-500"
            >
              <i className="fas fa-times"></i>
            </button>
            <h3 className="text-2xl font-bold mb-4">Update Job</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={updatedData.title}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={updatedData.location}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="experienceRequired" className="block text-sm font-medium text-gray-700">Experience Required</label>
                <input
                  type="text"
                  id="experienceRequired"
                  name="experienceRequired"
                  value={updatedData.experienceRequired}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700">Salary Range</label>
                <input
                  type="text"
                  id="salaryRange"
                  name="salaryRange"
                  value={updatedData.salaryRange}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">Job Type</label>
                <select
                  id="jobType"
                  name="jobType"
                  value={updatedData.jobType}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                >
                  <option value="FullTime">Full Time</option>
                  <option value="PartTime">Part Time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
                <textarea
                  id="skills"
                  name="skills"
                  value={updatedData.skills}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={updatedData.description}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={updatedData.expiryDate}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button type="button" onClick={() => setShowUpdateModal(false)} className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg">Cancel</button>
                <button type="submit" className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailsPage;

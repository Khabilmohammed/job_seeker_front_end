import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const OrderConformationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleViewJobs = () => {
    navigate('/company/jobPage'); // Navigate to the job page
  };

  const handleCreateNewJob = () => {
    navigate('/company/createJob'); // Navigate to the job creation page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Success Icon using React Icons */}
          <FaCheckCircle className="text-green-500 h-16 w-16" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Payment Successful!
          </h2>
          <p className="text-gray-600 text-center">
            Your order has been successfully processed, and your job posting has been created.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t my-4"></div>

        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-lg font-medium text-gray-700">What's next?</h3>
          <p className="text-gray-500 text-center">
            You can now view your job postings or create a new job listing.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between space-x-4">
          <button
            onClick={handleViewJobs}
            className="w-full flex items-center justify-center py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            View Job Postings
          </button>
          <button
            onClick={handleCreateNewJob}
            className="w-full flex items-center justify-center py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
            Create New Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConformationPage;

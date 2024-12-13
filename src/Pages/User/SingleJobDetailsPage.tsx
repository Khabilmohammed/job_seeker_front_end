import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetApplicationByIdQuery } from '../../Apis/jobApplicationApi';
import { FaFileAlt, FaLocationArrow, FaUser, FaBriefcase, FaMoneyBill } from 'react-icons/fa';

const SingleJobDetailsPage = () => {
  const { jobApplicationId } = useParams();
  const { data, error, isLoading } = useGetApplicationByIdQuery(jobApplicationId);

  if (isLoading) return <div className="text-center text-lg font-medium">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-lg">Error fetching job application details. Please try again later.</div>;

  const jobApplication = data?.result;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Job Application Details</h1>
      {jobApplication ? (
        <div className="bg-white rounded-lg shadow-lg border p-6">
          {/* Applicant Details */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
              <FaUser /> Applicant Details
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700"><strong>Full Name:</strong> {jobApplication.fullName}</p>
              <p className="text-gray-700"><strong>Address:</strong> {jobApplication.address}</p>
              <p className="text-gray-700"><strong>Expected Salary:</strong> ₹{jobApplication.expectedSalary.toLocaleString()}</p>
              <p className="text-gray-700 flex items-center gap-2">
                <FaFileAlt />
                <span>
                  Resume:{" "}
                  <a
                    href={jobApplication.resumeUrl.replace('/raw/upload/', '/raw/upload/fl_attachment/')}
                    className="text-blue-600 hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    Download Resume
                  </a>
                </span>
              </p>
              <p className="text-gray-700"><strong>Cover Letter:</strong> {jobApplication.coverLetter}</p>
              <p className="text-gray-700">
                <strong>Applied On:</strong> {new Date(jobApplication.applicationDate).toLocaleDateString()}
              </p>
                          <p
              className={`inline-block text-sm font-medium mt-4 px-4 py-1 rounded-full ${
                jobApplication.status === 'Applied'
                  ? 'bg-blue-100 text-blue-800'
                  : jobApplication.status === 'In Review'
                  ? 'bg-yellow-100 text-yellow-800' 
                  : jobApplication.status === 'Shortlisted'
                  ? 'bg-green-100 text-green-800' 
                  : jobApplication.status === 'Rejected'
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-gray-100 text-gray-800' 
              }`}
            >
              Status: {jobApplication.status}
            </p>
            </div>
          </section>

          {/* Job Posting Details */}
          {jobApplication.jobPosting && (
            <section className="mt-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                <FaBriefcase /> Job Posting Details
              </h2>
              <div className="space-y-3">
                <p className="text-gray-700"><strong>Title:</strong> {jobApplication.jobPosting.title}</p>
                <p className="text-gray-700"><strong>Description:</strong> {jobApplication.jobPosting.description}</p>
                <p className="text-gray-700 flex items-center gap-2">
                  <FaLocationArrow />
                  <span><strong>Location:</strong> {jobApplication.jobPosting.location}</span>
                </p>
                <p className="text-gray-700"><strong>Experience Required:</strong> {jobApplication.jobPosting.experienceRequired}</p>
                <p className="text-gray-700"><strong>Skills:</strong> {jobApplication.jobPosting.skills}</p>
                <p className="text-gray-700 flex items-center gap-2">
                  <FaMoneyBill />
                  <span><strong>Salary Range:</strong> {jobApplication.jobPosting.salaryRange}</span>
                </p>
                <p className="text-gray-700"><strong>Job Type:</strong> {jobApplication.jobPosting.jobType}</p>
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500">Job application details not found.</div>
      )}
    </div>
  );
};

export default SingleJobDetailsPage;

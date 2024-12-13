import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useChangeApplicationStatusMutation,
  useGetApplicationByIdQuery,
} from "../../Apis/jobApplicationApi";
import { FaFileAlt, FaUser, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

const SingleJobDetailsPage: React.FC = () => {
  const { jobApplicationId } = useParams();
  const { data, error, isLoading, refetch } = useGetApplicationByIdQuery(jobApplicationId);
  const [updateStatus, { isLoading: isUpdating }] = useChangeApplicationStatusMutation();

  const [status, setStatus] = useState<string>("");
  const [feedback, setFeedback] = useState<string | null>(null);

  // Update status when data is loaded
  useEffect(() => {
    if (data?.result?.status) {
      setStatus(data.result.status);
    }
  }, [data]);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  const handleSaveStatus = async () => {
    if (!jobApplicationId || !status) {
      setFeedback("Job application ID or status is missing.");
      return;
    }
    try {
      console.log("Sending payload:", { jobApplicationId, status });
      await updateStatus({ jobApplicationId, status }).unwrap();
      setFeedback("Status updated successfully!");
      refetch(); // Refetch the data after updating the status
      setTimeout(() => setFeedback(null), 5000);
    } catch (error) {
      console.error("Error updating status:", error);
      setFeedback("Failed to update status. Try again.");
    }
  };

  useEffect(() => {
    // Clear feedback timeout when component unmounts
    return () => setFeedback(null);
  }, []);

  if (isLoading)
    return <div className="text-center text-lg font-medium text-gray-500">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 text-lg">
        Error fetching job application details. Please try again later.
      </div>
    );

  const jobApplication = data?.result;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Job Application Details</h1>
      {jobApplication ? (
        <div className="bg-white rounded-lg shadow-lg border p-8 space-y-6">
          {/* Applicant Details */}
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
              <FaUser className="text-blue-500" /> Applicant Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <p className="text-gray-700">
                <strong>Full Name:</strong> {jobApplication.fullName}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {jobApplication.email}
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> {jobApplication.address}
              </p>
              <p className="text-gray-700">
                <strong>Expected Salary:</strong> ₹{jobApplication.expectedSalary.toLocaleString()}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <FaFileAlt />
                <span>
                  Resume:{" "}
                  <a
                    href={jobApplication.resumeUrl.replace(
                      "/raw/upload/",
                      "/raw/upload/fl_attachment/"
                    )}
                    className="text-blue-600 hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </span>
              </p>
              <p className="text-gray-700">
                <strong>Applied On:</strong>{" "}
                <span className="flex items-center gap-2">
                  <FaCalendarAlt />
                  {new Date(jobApplication.applicationDate).toLocaleDateString()}
                </span>
              </p>
            </div>
          </section>

          {/* Cover Letter */}
          <section className="bg-gray-100 rounded-md p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-2">Cover Letter</h2>
            <p className="text-gray-700">{jobApplication.coverLetter}</p>
          </section>

          {/* Status Management */}
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
              <FaEnvelope className="text-blue-500" /> Application Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    status === "Rejected"
                      ? "bg-red-100 text-red-600"
                      : status === "Shortlisted"
                      ? "bg-green-100 text-green-600"
                      : status === "In Review"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  Current Status: {status || "N/A"}
                </span>
              </div>
              <select
                id="status"
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Applied">Applied</option>
                <option value="In Review">In Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Rejected">Rejected</option>
              </select>
              <button
                onClick={handleSaveStatus}
                className={`w-full px-4 py-2 rounded-md font-semibold text-white ${
                  isUpdating ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save Status"}
              </button>
            </div>
            {feedback && (
              <p
                className={`mt-4 text-center font-medium ${
                  feedback.includes("success") ? "text-green-600" : "text-red-600"
                }`}
              >
                {feedback}
              </p>
            )}
          </section>
        </div>
      ) : (
        <div className="text-center text-gray-500">Job application details not found.</div>
      )}
    </div>
  );
};

export default SingleJobDetailsPage;

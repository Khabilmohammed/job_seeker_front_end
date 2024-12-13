import React from 'react';
import { useGetApplicationsForJobPostingQuery } from '../../Apis/jobApplicationApi';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ApplicantsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const { data: applicantsData, isLoading, error } = useGetApplicationsForJobPostingQuery(jobId || '');
  console.log('applicantsData', applicantsData);

  if (isLoading) return <div>Loading applicants...</div>;
  if (error || !applicantsData) return <div>Error fetching applicants</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Applicants for Job</h2>
      {applicantsData.result.length === 0 ? (
        <div className="text-center text-gray-500 py-6">
          <p>No one has applied for this job yet.</p>
        </div>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Expected Salary</th>
              <th className="px-4 py-2 border">Resume</th>
              <th className="px-4 py-2 border">Cover Letter</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Date Applied</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicantsData.result.map((applicant: any) => (
              <tr key={applicant.jobApplicationId} className="border-t">
                <td className="px-4 py-2 border">
                  <Link
                    to={`/company/getUserProfilePage/${applicant.userId}`}
                    className="text-blue-600 hover:underline"
                  >
                    {applicant.fullName}
                  </Link>
                </td>
                <td className="px-4 py-2 border">{applicant.address}</td>
                <td className="px-4 py-2 border">{applicant.expectedSalary}</td>
                <td className="px-4 py-2 border">
                  <a href={applicant.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View Resume
                  </a>
                </td>
                <td className="px-4 py-2 border">{applicant.coverLetter}</td>
                <td className="px-4 py-2 border">{applicant.status}</td>
                <td className="px-4 py-2 border">{new Date(applicant.applicationDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => navigate(`/company/singleJobDetailsPage/${applicant.jobApplicationId}`)}
                  >
                    Manage Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApplicantsPage;

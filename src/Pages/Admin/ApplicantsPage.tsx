import React, { useState } from 'react';
import { useGetApplicationsForJobPostingQuery } from '../../Apis/jobApplicationApi';
import { useParams, Link } from 'react-router-dom';
import TableComponent from '../../Componenets/Shared/TableComponent';

const ApplicantsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  
  const { data: applicantsData, isLoading, error } = useGetApplicationsForJobPostingQuery(jobId || '');
   const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 8;

  if (isLoading) return <div>Loading applicants...</div>;
  if (error || !applicantsData) return <div>Error fetching applicants</div>;

  const { result } = applicantsData;
  const totalResults = result.length;
  const paginatedData = result.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );
  const headers = [
    'Name',
    'Address',
    'Expected Salary',
    'Resume',
    'Cover Letter',
    'Status',
    'Date Applied',
    
  ];

   const renderRow = (applicant: any) => (
      <tr key={applicant.jobApplicationId} className="border-t">
        <td className="px-4 py-2 border">
          <Link
            to={`/Admin/getUserProfilePage/${applicant.userId}`}
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
        
      </tr>
    );


  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Applicants for Job</h2>
      {result.length === 0 ? (
        <div className="text-center text-gray-500 py-6">
          <p>No one has applied for this job yet.</p>
        </div>
      ) : (
        <TableComponent
          headers={headers}
          data={paginatedData} 
          resultsPerPage={resultsPerPage} 
          totalResults={totalResults}
          onPageChange={setCurrentPage}
          renderRow={renderRow} // Render each row
        />
      )}

     
    </div>
  );
};

export default ApplicantsPage;

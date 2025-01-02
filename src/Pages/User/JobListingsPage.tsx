import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllJobPostingsQuery } from '../../Apis/jobPostingApi'; 
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from 'react-icons/fa';

const JobListingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1); 
  const [jobList, setJobList] = useState<any[]>([]); 
  const [hasMore, setHasMore] = useState(true); 
  const observerRef = useRef<IntersectionObserver | null>(null);
  console.log("jobList",jobList)
  const { data, isLoading, error, isFetching } = useGetAllJobPostingsQuery({ page, limit: 8 });

  useEffect(() => {
    if (data?.result) {
      setJobList((prevJobs) => [...prevJobs, ...data.result]);
      if (data.result.length < 8) setHasMore(false); // No more jobs to load if fewer than 8 returned
    }
  }, [data]);

  // Infinite scrolling handler
  const lastJobElementRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isFetching) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (lastJobElementRef.current) {
      observer.observe(lastJobElementRef.current);
    }

    return () => {
      if (lastJobElementRef.current) {
        observer.unobserve(lastJobElementRef.current);
      }
    };
  }, [isLoading, hasMore, isFetching]);

  // Navigate to job detail page
  const handleViewJob = (jobId: string) => {
    navigate(`/user/jobDetailPage/${jobId}`);
  };

  // Loading and error handling
  if (isLoading && page === 1) return <div>Loading jobs...</div>;
  if (error) {
    return <div className="text-red-500 text-center">Error fetching jobs.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8">Job Listings</h1>

      {/* Job List */}
      <div className="space-y-8">
        {jobList.length === 0 ? (
          <p>No jobs available at the moment.</p>
        ) : (
          jobList.map((job, index) => (
            <div
              key={job.jobId}
              className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-100 p-6 rounded-lg shadow-lg"
              ref={index === jobList.length - 1 ? lastJobElementRef : null}
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

      {/* Loader for more data */}
      {isFetching && <div className="text-center mt-4">Loading more jobs...</div>}
      {!hasMore && !isFetching && (
        <div className="text-center mt-4 text-gray-500">No more jobs to load</div>
      )}
    </div>
  );
};

export default JobListingsPage;

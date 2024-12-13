import React from 'react';

interface JobOpening {
  title: string;
  location: string;
  applyLink: string;
}

const CompanyJobOpenings: React.FC = () => {
  const jobOpenings: JobOpening[] = [
    { title: 'Software Engineer', location: 'Remote', applyLink: '#apply-software-engineer' },
    { title: 'Product Manager', location: 'San Francisco, CA', applyLink: '#apply-product-manager' },
    { title: 'UX Designer', location: 'New York, NY', applyLink: '#apply-ux-designer' },
  ];

  return (
    <div className="mt-8 bg-white p-6 rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Job Openings</h2>
      {jobOpenings.map((job, index) => (
        <div key={index} className="flex justify-between items-center border-b border-gray-200 py-2">
          <div>
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.location}</p>
          </div>
          <a href={job.applyLink} className="text-blue-600 hover:underline">
            Apply Now
          </a>
        </div>
      ))}
    </div>
  );
};

export default CompanyJobOpenings;

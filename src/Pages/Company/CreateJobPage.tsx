import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInitialPaymentMutation } from '../../Apis/paymentApi';
import { Rootstate } from '../../Storage/Redux/store';
import { useSelector } from 'react-redux';
import { useGetCompanyByUserIdQuery } from '../../Apis/companyApi';

// Define JobPosting interface
interface JobPosting {
  CompanyId:any;
  title: string;
  description: string;
  location: string;
  experienceRequired: string;
  skills: string;
  salaryRange: string;
  postedDate: string;
  expiryDate: string;
  jobType: string;
  isActive: boolean;
}

const CreateJobPage: React.FC = () => {
  const navigate = useNavigate();
  const [makePayment] = useInitialPaymentMutation();
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const { data, isLoading, isError } = useGetCompanyByUserIdQuery(userId);


  
  const company = data?.result;


  const [formData, setFormData] = useState<JobPosting>({
    CompanyId:company?.companyId || "",
    title: '',
    description: '',
    location: '',
    experienceRequired: '',
    skills: '',
    salaryRange: '',
    postedDate: '',
    expiryDate: '',
    jobType: 'Full-time',
    isActive: true,
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const paymentResponse = await makePayment(userId).unwrap();
        navigate("/company/payment", { state: { 
          paymentResponse:paymentResponse,
          formData: formData,
        }});
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment creation failed. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-r p-8 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Create Job Posting</h2>
        <form onSubmit={handleSubmit}>
          {/* Job Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full px-4 py-3 border rounded-md mb-4"
            required
          />
          
          {/* Job Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            className="w-full px-4 py-3 border rounded-md mb-4"
            rows={4}
            required
          />
          
          {/* Job Location */}
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Job Location"
            className="w-full px-4 py-3 border rounded-md mb-4"
            required
          />
          
          {/* Experience Required */}
          <input
            type="text"
            name="experienceRequired"
            value={formData.experienceRequired}
            onChange={handleChange}
            placeholder="Experience Required"
            className="w-full px-4 py-3 border rounded-md mb-4"
            required
          />
          
          {/* Skills */}
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Skills Required"
            className="w-full px-4 py-3 border rounded-md mb-4"
            rows={3}
            required
          />
          
          {/* Salary Range */}
          <input
            type="text"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            placeholder="Salary Range"
            className="w-full px-4 py-3 border rounded-md mb-4"
            required
          />
          
          {/* Job Type */}
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md mb-4"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
                    <label htmlFor="postedDate" className="block text-gray-700 font-medium mb-2">
            Posted Date
          </label>
          {/* Posted Date */}
          <input
            type="date"
            name="postedDate"
            value={formData.postedDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md mb-4"
            required
          />
          <label htmlFor="expiryDate" className="block text-gray-700 font-medium mb-2">
            Expiry Date
          </label>
            {/* Expiry Date */}
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md mb-4"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md mt-4"
          >
            Create Job Posting and Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPage;

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Rootstate } from "../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { useApplyForJobMutation } from "../../Apis/jobApplicationApi";
import toastNotify from "../../Taghelper/toastNotify";

interface JobApplicationFormData {
  jobPostingId: string;
  UserId: string;
  fullName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  expectedSalary: number;
  resume: FileList;
  coverLetter: string;
}
const JobApplicationPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const firstName = useSelector((state: Rootstate) => state.userAuthStore.firstName);
  const email = useSelector((state: Rootstate) => state.userAuthStore.email);
  const country = useSelector((state: Rootstate) => state.userAuthStore.country);
  const city = useSelector((state: Rootstate) => state.userAuthStore.city); 

  const navigate = useNavigate();
  const [applyForJob] = useApplyForJobMutation();

  const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<JobApplicationFormData>({
  defaultValues: {
    jobPostingId: jobId,
    UserId: userId,
    fullName: firstName || "",
    email: email || "",
    city: "Thrissur", // hardcoded fallback
  },
});

  const onSubmit = async (data: JobApplicationFormData) => {
    try {
      const formData = new FormData();
      formData.append("jobPostingId", data.jobPostingId || "");
      formData.append("userId", data.UserId || "");
      formData.append("fullName", data.fullName);
      formData.append("address", data.address);
      formData.append("expectedSalary", data.expectedSalary.toString());
      formData.append("ResumeFile", data.resume[0]);
      formData.append("coverLetter", data.coverLetter);

      await applyForJob(formData).unwrap();
      toastNotify("Successfully applied for the job.", "success");
      navigate("/user/jobListingsPage");
    } catch (error) {
      toastNotify("Some error occurred", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Apply for Your Dream Job</h1>
          <p className="text-gray-500 mt-2">
            Fill in the details to apply for the position. Showcase your potential!
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Full Name</label>
            <input
              {...register("fullName", { required: "Full Name is required." })}
              defaultValue={firstName}
              type="text"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Address</label>
            <input
              {...register("address", { required: "Address is required." })}
              type="text"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>
          
{/* Email */}
<div>
  <label className="block font-semibold mb-2 text-gray-700">Email</label>
  <input
    {...register("email", {
      required: "Email is required.",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format.",
      },
    })}
    type="email"
    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Enter your email"
  />
  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
</div>

{/* City */}
<div>
  <label className="block font-semibold mb-2 text-gray-700">City</label>
  <input
    {...register("city", { required: "City is required." })}
    type="text"
    defaultValue={city } // hardcoded fallback
    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Enter your city"
  />
  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
</div>

{/* Country */}
<div>
  <label className="block font-semibold mb-2 text-gray-700">Country</label>
  <input
    {...register("country", { required: "Country is required." })}
    defaultValue={country} 
    type="text"
    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Enter your country"
  />
  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
</div>

          {/* Expected Salary */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Expected Salary</label>
            <input
              {...register("expectedSalary", {
                required: "Expected Salary is required.",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Expected salary must be greater than 0.",
                },
              })}
              type="number"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter expected salary"
            />
            {errors.expectedSalary && <p className="text-red-500 text-sm mt-1">{errors.expectedSalary.message}</p>}
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Resume</label>
            <input
              type="file"
              {...register("resume", {
                required: "Resume is required.",
                validate: (files) => {
                  const file = files?.[0];
                  if (!file) return "Resume file is required.";
                  const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
                  return allowedTypes.includes(file.type) || "Only PDF or DOCX files are allowed.";
                },
              })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume.message}</p>}
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Cover Letter</label>
            <textarea
              {...register("coverLetter", {
                required: "Cover Letter is required.",
                maxLength: {
                  value: 500,
                  message: "Cover Letter cannot exceed 500 characters.",
                },
              })}
              rows={4}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your cover letter here..."
            />
            {errors.coverLetter && <p className="text-red-500 text-sm mt-1">{errors.coverLetter.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationPage;
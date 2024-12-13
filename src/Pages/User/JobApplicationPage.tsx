import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Rootstate } from "../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { useApplyForJobMutation } from "../../Apis/jobApplicationApi";
import toastNotify from "../../Taghelper/toastNotify";

interface JobApplicationFormData {
  jobPostingId: string;
  UserId:string;
  fullName: string;
  address: string;
  expectedSalary: number;
  resume: FileList;
  coverLetter: string;
}

const JobApplicationPage: React.FC = () => {
    const { jobId } = useParams<{ jobId: string }>();
    const navigate = useNavigate();
    const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
    const [applyForJob] = useApplyForJobMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<JobApplicationFormData>({
        defaultValues: {
          jobPostingId: jobId,
          UserId:userId,
        },
      });
      const onSubmit = async (data: JobApplicationFormData) => {
        try {
          const formData = new FormData();
          formData.append("jobPostingId", data.jobPostingId || ""); // Ensure jobPostingId is added
          formData.append("userId", data.UserId || ""); // Ensure userId is added
          formData.append("fullName", data.fullName);
          formData.append("address", data.address);
          formData.append("expectedSalary", data.expectedSalary.toString());
          formData.append("ResumeFile", data.resume[0]); // Correct key
          formData.append("coverLetter", data.coverLetter);
          const response = await applyForJob(formData).unwrap();
          toastNotify("successfully applied for the job.","success");
          navigate("/user/jobListingsPage");
        } catch (error) {
            toastNotify("some Error occured","error");
        }
      };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Apply for Your Dream Job
          </h1>
          <p className="text-gray-500 mt-2">
            Fill in the details to apply for the position. Showcase your
            potential!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div className="relative">
            <label className="block font-semibold mb-2 text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName", { required: "Full Name is required." })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="relative">
            <label className="block font-semibold mb-2 text-gray-700">
              Address
            </label>
            <input
              type="text"
              {...register("address", { required: "Address is required." })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Expected Salary */}
          <div className="relative">
            <label className="block font-semibold mb-2 text-gray-700">
              Expected Salary
            </label>
            <input
              type="number"
              {...register("expectedSalary", {
                required: "Expected Salary is required.",
                min: { value: 0, message: "Salary cannot be negative." },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter expected salary"
            />
            {errors.expectedSalary && (
              <p className="text-red-500 text-sm mt-1">
                {errors.expectedSalary.message}
              </p>
            )}
          </div>

          {/* Resume Upload */}
          <div className="relative">
            <label className="block font-semibold mb-2 text-gray-700">
              Resume
            </label>
            <input
              type="file"
              {...register("resume", { required: "Resume is required." })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.resume && (
              <p className="text-red-500 text-sm mt-1">{errors.resume.message}</p>
            )}
          </div>

          {/* Cover Letter */}
          <div className="relative">
            <label className="block font-semibold mb-2 text-gray-700">
              Cover Letter
            </label>
            <textarea
              {...register("coverLetter", {
                required: "Cover Letter is required.",
                maxLength: {
                  value: 500,
                  message: "Cover Letter cannot exceed 500 characters.",
                },
              })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your cover letter here..."
            />
            {errors.coverLetter && (
              <p className="text-red-500 text-sm mt-1">
                {errors.coverLetter.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationPage;

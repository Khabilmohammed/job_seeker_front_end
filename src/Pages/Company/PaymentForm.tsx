import React, { useState } from 'react';
import toastNotify from '../../Taghelper/toastNotify';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useCreateJobPostingMutation } from '../../Apis/jobPostingApi';
import { useNavigate } from 'react-router-dom';

interface PaymentFormProps {
  formData: any;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ formData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [createJobPosting, { isLoading }] = useCreateJobPostingMutation();
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState({
    line1: '',
    city: '',
    postalCode: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
        payment_method_data: {
          billing_details: {
            name: customerName,
            address: {
              line1: customerAddress.line1,
              city: customerAddress.city,
              postal_code: customerAddress.postalCode,
            },
          },
        },
      },
      redirect: "if_required",
    });

    if (result.error) {
      console.log(result.error);
      toastNotify("An unexpected error occurred.", "error");
      setIsProcessing(false);
    } else {
      const jobData = {
        CompanyId: formData.CompanyId,
        Title: formData.title,
        Description: formData.description,
        Location: formData.location,
        ExperienceRequired: formData.experienceRequired,
        Skills: formData.skills,
        SalaryRange: formData.salaryRange,
        ExpiryDate: formData.expiryDate,
        JobType: formData.jobType,
      };
      try {
        const response = await createJobPosting(jobData).unwrap();
        toastNotify("Job posting created successfully!", "success");
        console.log("Job Posting Response:", response);
        navigate('/company/orderConformationPage');
      } catch (error) {
        console.error("Job posting creation failed:", error);
        toastNotify("Failed to create job posting.", "error");
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Payment</h2>
      <p className="text-gray-600 mb-6">
        To post a job on our platform, a payment of ₹10 is required. This fee helps maintain the quality and availability of the platform. Please provide your payment details below to proceed.
      </p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-lg shadow-md border px-4 py-3 space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address Line 1</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={customerAddress.line1}
              onChange={(e) =>
                setCustomerAddress({ ...customerAddress, line1: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={customerAddress.city}
              onChange={(e) =>
                setCustomerAddress({ ...customerAddress, city: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Postal Code</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={customerAddress.postalCode}
              onChange={(e) =>
                setCustomerAddress({ ...customerAddress, postalCode: e.target.value })
              }
              required
            />
          </div>
          <PaymentElement />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;

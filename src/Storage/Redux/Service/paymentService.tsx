
interface JobPosting {
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
  
export const createPaymentIntent = async (jobData: JobPosting) => {
   
    try {
      const response = await fetch(`http://localhost:5134/api/jobposting/create-payment-intent?stripeToken=${"dfhgs"}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          amount: 5000, // Adjust the amount as needed
          jobPosting: jobData, // Pass the job posting data here
        }),
      });
      const data = await response.json();
      return data; // Return the payment data (if needed)
    } catch (error) {
      throw new Error('Payment Intent Creation Failed');
    }
  };
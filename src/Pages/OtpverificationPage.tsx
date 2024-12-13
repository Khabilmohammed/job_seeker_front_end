import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CoverImage from '../Assets/Images/Leonardo_Phoenix_A_sleek_modern_laptop_sits_centered_on_a_mini_3.jpg';
import { useResendOtpRegistrationMutation, useVerifyOtpMutation } from '../Apis/authApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import toastNotify from '../Taghelper/toastNotify';

function OtpverificationPage() {
    const { state } = useLocation();
    const [otp, setOtp] = useState('');
    const [apiErrors, setApiErrors] = useState<string[]>([]);
    const [verifyOtp, { isLoading: verifying }] = useVerifyOtpMutation();
    const [resendOtpRegistration, { isLoading: resending }] = useResendOtpRegistrationMutation();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>(state?.email || '');
  
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setOtp(e.target.value);
    };
  
    
    const isFetchBaseQueryError = (
      error: unknown
    ): error is FetchBaseQueryError => {
      return (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof (error as FetchBaseQueryError).data === 'object'
      );
    };
  
    const handleResendOtp = async () => {
      setApiErrors([]); // Clear any previous errors
    
      const response = await resendOtpRegistration(email);
    
      if (response.data) {
        toastNotify("OTP Resent Successfully");
      } else if (response.error) {
        toastNotify("Error resending OTP", "error");
        // Handle error display as you're doing for verifyOtp
        if (isFetchBaseQueryError(response.error)) {
          const errorData = (response.error.data as any)?.errors;
          const flattenedErrors: string[] = [];
    
          if (errorData && typeof errorData === 'object') {
            Object.keys(errorData).forEach((key) => {
              const messages = errorData[key];
              if (Array.isArray(messages)) {
                messages.forEach((message: string) => {
                  flattenedErrors.push(message);
                });
              }
            });
          }
          setApiErrors(flattenedErrors);
          console.log('Resend OTP errors:', flattenedErrors);
        } else {
          console.error('Unexpected error during OTP resend:', response.error);
        }
      }
    };
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setApiErrors([]); 
      // Make API call to verify OTP
      const response = await verifyOtp({ otp, email });
  
      if (response.data) {
        console.log('OTP verified successfully:', response.data);
        toastNotify("Otp verification is Completed");
        navigate('/'); // Navigate to the desired page upon success
        toastNotify("Please Login","info");
      } else if (response.error) {
        toastNotify("some error occur in ur data","error");
        if (isFetchBaseQueryError(response.error)) {
          const errorData = (response.error.data as any)?.errors; // Adjust type if your API error structure is different
          const flattenedErrors: string[] = [];
  
          if (errorData && typeof errorData === 'object') {
            Object.keys(errorData).forEach((key) => {
              const messages = errorData[key];
              if (Array.isArray(messages)) {
                messages.forEach((message: string) => {
                  flattenedErrors.push(message);
                });
              }
            });
          }
          setApiErrors(flattenedErrors);
          console.log('Verification errors:', flattenedErrors);
        } else {
          console.error('An unexpected error occurred:', response.error);
        }
      }
    };
  
  return (
    <div className='w-full h-screen flex flex-col lg:flex-row items-start'>
    {/* Left Section */}
    <div className='w-full lg:w-1/2 h-1/3 lg:h-full flex flex-col relative'>
      <div className='absolute inset-0 bg-black/30'></div> {/* Light black shadow */}
      <div className='absolute top-[25%] left-[10%] flex flex-col p-4 lg:p-0'>
        <h1 className='text-xl lg:text-2xl text-white font-bold my-4'>Secure Your Account with OTP Verification!</h1>
        <p className='text-base lg:text-xl text-white font-normal max-w-[700px]'>
          Enter the OTP sent to your registered email to verify your identity and continue using JobSeeker's services.
        </p>
      </div>
      <img src={CoverImage} className='w-full h-full object-cover' alt='Cover' />
    </div>

    {/* Right Section */}
    <div className='w-full lg:w-1/2 h-full mx-auto bg-[#f5f5f5] flex flex-col p-8 lg:p-20 justify-between items-center'>
      <h1 className='text-lg lg:text-xl max-w-[500px] text-[#060606] font-semibold mr-auto mb-5'>Job Seeker</h1>

      {/* OTP Form */}
      <form className='w-full flex flex-col max-w-[500px]' onSubmit={handleSubmit}>
        <div className='w-full flex flex-col mb-2'>
          <h3 className='text-2xl lg:text-3xl font-semibold mb-4'>OTP Verification</h3>
          <p className='text-sm lg:text-base mb-2'>Enter the OTP sent to your email address.</p>
        </div>

        {apiErrors.length > 0 && (
          <div className='text-red-500 mb-4'>
            {apiErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <div className='w-full flex flex-col'>
          <input
            type='text'
            name='otp'
            value={otp}
            onChange={handleInputChange}
            placeholder='Enter OTP'
            className='w-full text-black bg-transparent border-b py-2 my-2 border-black outline-none focus:outline-none'
          />
        </div>

        <div className='w-full flex flex-col my-5'>
          <button
            type='submit'
            disabled={verifying}
            className='w-full bg-[#060606] font-semibold text-white my-2 rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-[#FCECD3] hover:text-[#060606] hover:border hover:border-[#FCECD3] transition duration-300'
          >
            {verifying ? 'Verifying...' : 'Verify OTP'}
          </button>
        </div>

        <button
  type="button"
  onClick={handleResendOtp}
  disabled={resending}
  className="w-full bg-[#060606] font-semibold text-white my-2 rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-[#FCECD3] hover:text-[#060606] hover:border hover:border-[#FCECD3] transition duration-300"
>
  {resending ? "Resending..." : "Resend OTP"}
</button>
      </form>

      {/* Back to Login */}
      <div className='w-full max-w-[500px] flex justify-between text-sm lg:text-base font-light mt-6'>
        <p className='text-gray-700'>Back to</p>
        <Link to='/' className='font-semibold text-black hover:underline'>
          Login
        </Link>
      </div>
    </div>
  </div>
  );
}

export default OtpverificationPage;

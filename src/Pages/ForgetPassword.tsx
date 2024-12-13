import React, { useState } from 'react';
import { useForgetPasswordMutation } from '../Apis/authApi';
import { Link ,useNavigate } from 'react-router-dom';
import CoverImage from '../Assets/Images/Leonardo_Phoenix_A_sleek_modern_laptop_sits_centered_on_a_mini_3.jpg';
import toastNotify from '../Taghelper/toastNotify';

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading, error, data }] = useForgetPasswordMutation();
  const navigate = useNavigate();
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await forgotPassword(email);

    if (response?.data) {
      toastNotify("the otp has sent to the Mail")// Notify user
      navigate('/'); // Redirect to login page
    }
  };

  return (
    <div className='w-full h-screen flex flex-col lg:flex-row items-start'>
    {/* Left Section */}
    <div className='w-full lg:w-1/2 h-1/3 lg:h-full flex flex-col relative'>
        <div className='absolute inset-0 bg-black/30'></div> {/* Light black shadow */}
        <div className='absolute top-[25%] left-[10%] flex flex-col p-4 lg:p-0'>
            <h1 className='text-xl lg:text-2xl text-white font-bold my-4'>Reset Your Password!</h1>
            <p className='text-base lg:text-xl text-white font-normal max-w-[700px]'>
                Enter your email to receive a link to reset your password. Take the first step to regain access to your account!
            </p>
        </div>
        <img src={CoverImage} className='w-full h-full object-cover' alt='Cover' />
    </div>

    {/* Right Section */}
    <div className='w-full lg:w-1/2 h-full mx-auto bg-[#f5f5f5] flex flex-col p-8 lg:p-20 justify-between items-center'>
        <h1 className='text-lg lg:text-xl max-w-[500px] text-[#060606] font-semibold mr-auto mb-5'>Forgot Password</h1>
        
        {/* Forgot Password Form */}
        <form onSubmit={handleForgotPassword} className='w-full flex flex-col max-w-[500px]'>
            <div className='w-full flex flex-col mb-2'>
                <h3 className='text-2xl lg:text-3xl font-semibold mb-4'>Enter Your Email</h3>
                <p className='text-sm lg:text-base mb-2'>We'll send you a link to reset your password.</p>
            </div>

            {error && <p className='text-red-500 mb-4'>{error.toString()}</p>}

            <div className='w-full flex flex-col mb-4'>
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    required
                    className='w-full text-black bg-transparent border-b py-2 my-2 border-black outline-none focus:outline-none'
                />
            </div>

            <button
                type='submit'
                disabled={isLoading}
                className='w-full bg-[#060606] font-semibold text-white my-2 rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-[#FCECD3] hover:text-[#060606] hover:border hover:border-[#FCECD3] transition duration-300'>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
        </form>

        {/* Display success message if the email is sent successfully */}
        {data && <p style={{ color: 'green' }}>{data.Message}</p>}
        <div className='w-full max-w-[500px] flex justify-between mb-20 text-sm lg:text-base font-light '>
        <p className='text-gray-700'>Remembered your password?</p>
            <Link to='/' className='font-semibold text-black hover:underline'>
                Log in
            </Link>
        </div>
        
    </div>
</div>

  );
};

export default ForgetPassword;

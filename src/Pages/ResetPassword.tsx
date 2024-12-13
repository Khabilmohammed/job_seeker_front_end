import React, { useState } from 'react';
import { useResetPasswordMutation } from '../Apis/authApi';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import CoverImage from '../Assets/Images/Leonardo_Phoenix_A_sleek_modern_laptop_sits_centered_on_a_mini_3.jpg';
import toastNotify from '../Taghelper/toastNotify';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 


const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = decodeURIComponent(searchParams.get('email') || '');
const token = decodeURIComponent(searchParams.get('token') || '');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPassword, { isLoading, error, data }] = useResetPasswordMutation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }


    if (!email || !token) {
        alert('Invalid or missing token');
        return;
      }
      const response = await resetPassword({ email, token, newPassword });
    
      // Check if the password was reset successfully
      if (response?.data) {
        toastNotify("The password has reseted successfully",'success') // Notify user
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
          Enter your new password to regain access to your account!
        </p>
      </div>
      <img src={CoverImage} className='w-full h-full object-cover' alt='Cover' />
    </div>

    {/* Right Section */}
    <div className='w-full lg:w-1/2 h-full mx-auto bg-[#f5f5f5] flex flex-col p-8 lg:p-20 justify-between items-center'>
      <h1 className='text-lg lg:text-xl max-w-[500px] text-[#060606] font-semibold mr-auto mb-5'>Reset Password</h1>
      
      {/* Reset Password Form */}
      <form onSubmit={handleResetPassword} className='w-full flex flex-col max-w-[500px]'>
        <div className='w-full flex flex-col mb-2'>
          <h3 className='text-2xl lg:text-3xl font-semibold mb-4'>Enter Your New Password</h3>
          <p className='text-sm lg:text-base mb-2'>Please enter your new password below.</p>
        </div>

        {error && <p className='text-red-500 mb-4'>{error.toString()}</p>}

        <div className='w-full flex flex-col mb-4'>
          <div className='relative w-full'>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder='New Password'
              required
              className='w-full text-black bg-transparent border-b py-2 my-2 border-black outline-none focus:outline-none'
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute right-0 top-0 mt-2 mr-3'
            >
              {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <div className='relative w-full'>
            <input
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm Password'
              required
              className='w-full text-black bg-transparent border-b py-2 my-2 border-black outline-none focus:outline-none'
            />
            <button
              type='button'
              onClick={toggleConfirmPasswordVisibility}
              className='absolute right-0 top-0 mt-2 mr-3'
            >
              {isConfirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-[#060606] font-semibold text-white my-2 rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-[#FCECD3] hover:text-[#060606] hover:border hover:border-[#FCECD3] transition duration-300'
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      {/* Display success message if the password is reset successfully */}
      {data && <p style={{ color: 'green' }}>{data.Message}</p>}

      <div className='w-full max-w-[500px] flex justify-between mb-20 text-sm lg:text-base font-light'>
        {/* Additional content can go here */}
      </div>
    </div>
  </div>
  );
};

export default ResetPassword;
